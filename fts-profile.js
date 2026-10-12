// Fun Time Studio player profiles, for one game. Each game keeps a copy of this
// file (the original is fun-time-studio/kit/fts-profile.js: change it there, then
// copy it into every game). Load it before the game's own scripts:
//
//   <script src="fts-profile.js" data-game="apiary" data-keys="save-key other-key"></script>
//
// The game keeps reading and writing its usual keys. Before it starts, this swaps
// the active player's copy of those keys in, after putting the previous player's
// copy away under 'fts:<player id>:<key>'. The first player to open a game gets
// whatever save the device already had. It also shows the player's avatar and
// name next to the game's "Fun Time Studio" link (a.studio), and reloads the game
// if the player is switched in another tab. With no players set up it does nothing.
//
// With family sync on (a family code set up on the hub) and a player picked, it
// also keeps that player's save for this game the same on every device (the
// second part below). And it keeps one window playing at a time (the third part).
// Add data-one-window="off" to a game that handles that itself.
var ftsKit = {
  paused: false,   // is this window paused by the one-window part?
  // A card over the whole game (dark, in the hub's colors) with one button.
  // Only ever given fixed text from this file.
  cover: function (title, text, label, onClick) {
    var cover = document.createElement('div');
    cover.setAttribute('role', 'dialog');
    cover.setAttribute('aria-modal', 'true');
    cover.style.cssText = 'position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:16px;background:rgba(12,8,22,.82);font-family:system-ui,-apple-system,sans-serif';
    cover.innerHTML = '<div style="max-width:360px;background:#1e1638;color:#f7f2ff;border:2px solid #3d2d6b;border-radius:18px;padding:22px;text-align:center;box-shadow:0 18px 40px rgba(0,0,0,.5)">'
      + '<h2 style="margin:0 0 8px;font-size:1.25rem;color:#ffb83d">' + title + '</h2>'
      + '<p style="margin:0 0 16px;color:#b9add9;line-height:1.45">' + text + '</p>'
      + '<button type="button" style="font:inherit;font-weight:700;border:0;border-radius:999px;padding:9px 20px;background:#ffb83d;color:#1a1030;cursor:pointer">' + label + '</button></div>';
    cover.querySelector('button').addEventListener('click', onClick);
    (document.body || document.documentElement).appendChild(cover);
    cover.querySelector('button').focus();
    return cover;
  }
};

(function () {
  var script = document.currentScript;
  var GAME = script && script.getAttribute('data-game');
  var KEYS = ((script && script.getAttribute('data-keys')) || '').split(/\s+/).filter(Boolean);
  var REGISTRY = 'fts-profiles';

  function registry() {
    try { return JSON.parse(localStorage.getItem(REGISTRY) || 'null'); } catch (e) { return null; }
  }
  function find(reg, id) {
    for (var i = 0; i < reg.profiles.length; i++) if (reg.profiles[i].id === id) return reg.profiles[i];
    return null;
  }
  function copy(from, to) {
    var v = localStorage.getItem(from);
    if (v == null) localStorage.removeItem(to); else localStorage.setItem(to, v);
  }

  var reg = registry();
  if (!GAME || !KEYS.length || !reg || !reg.profiles || !reg.active) return;
  var player = find(reg, reg.active);
  if (!player) return;

  try {
    var ownerKey = 'fts-owner:' + GAME;
    var owner = localStorage.getItem(ownerKey);
    if (owner !== player.id) {
      if (owner) {
        // Put the last player's save away (unless they've been deleted), then bring this player's out.
        if (find(reg, owner)) KEYS.forEach(function (k) { copy(k, 'fts:' + owner + ':' + k); });
        KEYS.forEach(function (k) { copy('fts:' + player.id + ':' + k, k); });
      }
      localStorage.setItem(ownerKey, player.id);
    }
    // Which keys this game saves in, so the hub can move a player's saves (combining two players).
    if (localStorage.getItem('fts-keys:' + GAME) !== KEYS.join(' ')) localStorage.setItem('fts-keys:' + GAME, KEYS.join(' '));
  } catch (e) {
    return;   // storage blocked or full: the game plays its shared save as before
  }

  function badge() {
    var link = document.querySelector('a.studio');
    if (!link || !player.svg) return;
    var span = document.createElement('span');
    span.className = 'fts-player';
    span.style.cssText = 'display:inline-flex;align-items:center;gap:5px;margin-left:6px;vertical-align:middle;text-transform:none;letter-spacing:normal';
    var img = document.createElement('img');
    img.src = 'data:image/svg+xml,' + encodeURIComponent(player.svg);
    img.alt = '';
    img.width = img.height = 20;
    img.style.cssText = 'width:20px;height:20px;border-radius:50%;display:block';
    var name = document.createElement('b');
    name.textContent = player.name;
    span.appendChild(img);
    span.appendChild(name);
    link.appendChild(span);
    link.title = 'Playing as ' + player.name + '. Back to Fun Time Studio to switch players.';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', badge); else badge();

  addEventListener('storage', function (e) {
    if (e.key !== REGISTRY) return;
    var now = registry();
    if (!now || now.active !== player.id) location.reload();
  });
})();

// Family sync for this game's saves. Only runs when the hub has a family code
// ('fts-family') and a player is picked; otherwise it does nothing at all.
//
// For each save key this device keeps 'fts-sync:<player id>:<key>' = { t, n, d }:
// when it last wrote the key, the server's revision its copy grew from, and
// whether it has changes still to send.
// - A write the game makes while someone is playing (a tap or key press in the
//   last 3 minutes) counts as progress: it's marked and sent ~5 s later, or at
//   once (keepalive) when the page is hidden or closed. Saves the game makes on
//   its own (at start-up, or ticking while nobody's there) aren't sent, so an
//   idle window can't overwrite progress made on another device.
// - Sending is "compare and set": the server takes the change only if its copy is
//   still the revision this device's grew from. If another device saved first,
//   the game is covered with "Played on another device", and "Load the newest"
//   reloads into the newer save. Nothing is overwritten silently either way:
//   this device's unsent progress is kept in 'fts-sync-backup:<player id>:<key>'.
// - On load it fetches the save (giving up after 3 s: slow or no internet just
//   plays). If the server's is newer and nobody has played on this page yet, it
//   puts it in place and reloads once behind "Getting your save...".
// - When the page is shown again (a tablet woken up the next morning), or tapped
//   after a long pause, it checks the server's revisions, so a stale window gets
//   the cover before anyone plays on.
(function () {
  var script = document.currentScript;
  var GAME = script && script.getAttribute('data-game');
  var KEYS = ((script && script.getAttribute('data-keys')) || '').split(/\s+/).filter(Boolean);
  var fam, reg, player = null, i;
  try {
    fam = JSON.parse(localStorage.getItem('fts-family') || 'null');
    if (!fam || typeof fam.code !== 'string') return;
    reg = JSON.parse(localStorage.getItem('fts-profiles') || 'null');
  } catch (e) { return; }
  if (!GAME || !KEYS.length || !reg || !reg.profiles || !reg.active || typeof fetch !== 'function') return;
  for (i = 0; i < reg.profiles.length; i++) if (reg.profiles[i] && reg.profiles[i].id === reg.active) player = reg.active;
  var CODE = fam.code.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!player || !CODE) return;   // a guest, or no real code: no syncing

  var API = '/api/family/' + CODE + '/save/' + encodeURIComponent(player) + '/' + encodeURIComponent(GAME);
  var STATE = 'fts-sync:' + player + ':';
  var GUARD = 'fts-sync-reload:' + GAME;
  var ACTIVE_MS = 180000;
  var setItem = Storage.prototype.setItem, removeItem = Storage.prototype.removeItem;
  var lastTouch = 0;       // last tap or key press on this page
  var played = false;      // progress was saved on this page
  var pulled = false;      // the server has answered
  var stopped = false;     // reloading, or covered: no more syncing on this page
  var dirty = {};          // keys to send
  var ahead = {};          // key → sends on their way (each will bump the server's revision)
  var timer = null, lastCheck = 0;
  var had = {};            // save keys that existed when the page loaded
  for (i = 0; i < KEYS.length; i++) had[KEYS[i]] = localStorage.getItem(KEYS[i]) != null;

  function state(k) {
    try {
      var s = JSON.parse(localStorage.getItem(STATE + k) || 'null');
      if (s && typeof s === 'object') return { t: Number(s.t) || 0, n: Number(s.n) || 0, d: !!s.d };
    } catch (e) {}
    return { t: 0, n: 0, d: false };
  }
  function setState(k, s) { setItem.call(localStorage, STATE + k, JSON.stringify({ t: s.t, n: s.n, d: s.d ? 1 : 0 })); }
  function playing() { return Date.now() - lastTouch < ACTIVE_MS; }

  // Watch the game's writes to its save keys. (The one-window part wraps these
  // again around this, so a paused window's ignored writes never get here.)
  Storage.prototype.setItem = function (k, v) { var r = setItem.call(this, k, v); if (this === localStorage) wrote(k); return r; };
  Storage.prototype.removeItem = function (k) { var r = removeItem.call(this, k); if (this === localStorage) wrote(k); return r; };
  function wrote(k) {
    if (stopped || KEYS.indexOf(k) < 0 || !playing()) return;
    try { var s = state(k); s.t = Date.now(); s.d = true; setState(k, s); } catch (e) { return; }
    played = true;
    dirty[k] = true;
    clearTimeout(timer);
    timer = setTimeout(push, 5000);
  }
  function touch() {
    var idle = Date.now() - Math.max(lastTouch, lastCheck) > 120000;
    lastTouch = Date.now();
    if (idle && pulled) check();   // back after a long pause: anything new elsewhere?
  }
  addEventListener('pointerdown', touch, true);
  addEventListener('keydown', touch, true);
  addEventListener('touchstart', touch, true);

  function get(meta, ms, done) {
    var finished = false, ctl = typeof AbortController === 'function' ? new AbortController() : null;
    var wait = setTimeout(function () { end(null); }, ms);
    function end(keys) {
      if (finished) return;
      finished = true;
      clearTimeout(wait);
      if (!keys && ctl) ctl.abort();
      done(keys);
    }
    try {
      fetch(API + (meta ? '?meta=1' : ''), { cache: 'no-store', signal: ctl ? ctl.signal : undefined }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      }).then(function (data) {
        end(data && data.keys && typeof data.keys === 'object' ? data.keys : null);
      }, function () { end(null); });
    } catch (e) { end(null); }
  }

  function push(going) {
    clearTimeout(timer);
    if (stopped || ftsKit.paused) return;
    var keys = {}, sent = {}, any = false, k, s;
    for (k in dirty) {
      s = state(k);
      keys[k] = { v: localStorage.getItem(k), t: s.t, base: s.n + (ahead[k] || 0) };
      sent[k] = s.t;
      ahead[k] = (ahead[k] || 0) + 1;
      any = true;
    }
    if (!any) return;
    dirty = {};
    var body = JSON.stringify({ keys: keys });
    var opts = { method: 'PUT', headers: { 'content-type': 'application/json' }, body: body };
    if (going && body.length < 60000) opts.keepalive = true;   // browsers cap keepalive bodies at 64 KB
    function landed() { for (var k in sent) ahead[k]--; }
    function again() { landed(); for (var k in sent) dirty[k] = true; }
    try {
      fetch(API, opts).then(function (res) {
        if (res.status === 200) {
          return res.json().then(function (data) {
            landed();
            for (var k in sent) {
              var r = data && data.keys && data.keys[k], s = state(k);
              if (!r || typeof r.n !== 'number') continue;
              if (r.n > s.n) s.n = r.n;
              if (s.t === sent[k]) s.d = false; else dirty[k] = true;   // written again meanwhile
              try { setState(k, s); } catch (e) {}
            }
          }, landed);
        }
        if (res.status === 409) { landed(); return conflict(); }
        // Offline, server trouble, or the player hasn't reached the server yet:
        // try again later. (Unsent changes stay marked, so the next load sends them.)
        if (res.status >= 500 || res.status === 428 || res.status === 429) again(); else landed();
      }, again);
    } catch (e) { again(); }
  }
  addEventListener('pagehide', function () { push(true); });
  addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') push(true); else check();
  });
  addEventListener('pageshow', function (e) { if (e && e.persisted) check(); });
  addEventListener('online', function () { if (pulled) push(); else pull(); });

  function reloadedLately() {
    try { return Date.now() - Number(sessionStorage.getItem(GUARD)) < 60000; } catch (e) { return true; }
  }

  // Before the server's copy replaces this device's, keep what only this device has.
  function keep(k, s, server) {
    var mine = localStorage.getItem(k);
    if (mine != null && mine !== server && (s.d || (!s.n && had[k]))) {
      setItem.call(localStorage, 'fts-sync-backup:' + player + ':' + k, JSON.stringify({ v: mine, t: s.t, at: Date.now() }));
    }
  }

  // Puts the server's copy of `keys` in place and reloads into it.
  function useServer(keys, remote) {
    try {
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i], r = remote[k];
        if (!r || (typeof r.v !== 'string' && r.v !== null) || typeof r.n !== 'number') return false;
        keep(k, state(k), r.v);
        if (r.v == null) removeItem.call(localStorage, k); else setItem.call(localStorage, k, r.v);
        setState(k, { t: r.t, n: r.n, d: false });
      }
    } catch (e) { return false; }   // storage full: keep playing this device's save
    stopped = true;
    var cover = document.createElement('div');
    cover.setAttribute('role', 'status');
    cover.style.cssText = 'position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;background:#120c24;color:#f7f2ff;font:700 1.2rem system-ui,-apple-system,sans-serif';
    cover.textContent = 'Getting your save…';
    (document.body || document.documentElement).appendChild(cover);
    location.reload();
    return true;
  }

  // Which keys the server has moved on (another device saved), and whether any of
  // those also has unsent changes here. Marks keys this device should send.
  function compare(remote) {
    var newer = [], clash = false;
    for (var i = 0; i < KEYS.length; i++) {
      var k = KEYS[i], r = remote[k], s = state(k);
      if (!r || typeof r.n !== 'number') {   // the server has none: send ours as new
        if (localStorage.getItem(k) != null) {
          if (s.n || !s.d) { try { setState(k, { t: s.t || Date.now(), n: 0, d: true }); } catch (e) {} }
          dirty[k] = true;
        }
        continue;
      }
      if (r.n === s.n) { if (s.d) dirty[k] = true; continue; }
      newer.push(k);
      if (s.d) clash = true;
    }
    return { newer: newer, clash: clash };
  }

  // Another device saved this game since this one last did.
  function conflict() {
    if (stopped || ftsKit.paused) return;
    stopped = true;
    clearTimeout(timer);
    var cover = ftsKit.cover('Played on another device',
      'This game was saved on another device since this one last saved. Load the newest to keep playing from there. What was played here is kept safe as a backup.',
      'Load the newest', function () {
        get(false, 8000, function (remote) {
          var keys = [], k, s;
          if (remote) {
            for (var i = 0; i < KEYS.length; i++) {
              k = KEYS[i]; s = state(k);
              if (remote[k] && (remote[k].n !== s.n || s.d)) keys.push(k);
            }
          }
          if (!remote || !useServer(keys, remote)) {
            cover.querySelector('p').textContent = 'Couldn’t get the newest save. Check the internet connection, then try again.';
          }
        });
      });
  }

  // What to do with the server's copy.
  function decide(remote) {
    var c = compare(remote);
    if (c.clash) return conflict();
    if (c.newer.length) {
      if (ftsKit.paused) return;
      if (!played && !reloadedLately()) {
        try { sessionStorage.setItem(GUARD, String(Date.now())); } catch (e) {}
        if (useServer(c.newer, remote)) return;
      }
      return conflict();   // already playing an older copy: ask
    }
    push();
  }

  function pull() {
    get(false, 3000, function (remote) {
      if (!remote || stopped) return;   // offline or slow: play what's here
      pulled = true;
      lastCheck = Date.now();
      decide(remote);
    });
  }

  // The page is back (or someone's back after a while): has another device saved since?
  function check() {
    if (stopped || ftsKit.paused || Date.now() - lastCheck < 10000) return;
    lastCheck = Date.now();
    if (!pulled) return pull();
    get(true, 5000, function (meta) {
      if (!meta || stopped) return;
      var c = compare(meta);
      if (c.clash || (c.newer.length && played)) return conflict();
      if (c.newer.length) get(false, 8000, function (full) { if (full && !stopped) decide(full); });
      else push();
    });
  }
  pull();
})();

// One window at a time. With a game open in two places (two tabs, or the installed
// app and a browser tab), each copy saves over the other. The copy opened last
// plays; any other is covered by a "Playing in another window" screen and its
// writes to the game's save keys are ignored, until "Play here" takes over and
// reloads from the latest save.
(function () {
  var script = document.currentScript;
  var GAME = script && script.getAttribute('data-game');
  var KEYS = ((script && script.getAttribute('data-keys')) || '').split(/\s+/).filter(Boolean);
  if (!GAME || !KEYS.length || (script && script.getAttribute('data-one-window') === 'off')) return;
  var OWNER = 'fts-window:' + GAME;
  var me = Math.random().toString(36).slice(2);
  var paused = false;

  try {
    var setItem = Storage.prototype.setItem, removeItem = Storage.prototype.removeItem;
    Storage.prototype.setItem = function (k, v) { if (paused && this === localStorage && KEYS.indexOf(k) >= 0) return; return setItem.call(this, k, v); };
    Storage.prototype.removeItem = function (k) { if (paused && this === localStorage && KEYS.indexOf(k) >= 0) return; return removeItem.call(this, k); };
    localStorage.setItem(OWNER, me);
  } catch (e) { return; }   // no storage: nothing to protect

  function pause() {
    if (paused) return;
    paused = ftsKit.paused = true;
    ftsKit.cover('Playing in another window',
      'This game is open somewhere else, so this window has paused. That keeps your progress from being saved twice.',
      'Play here', function () {
        try { localStorage.setItem(OWNER, me); } catch (e) {}
        location.reload();
      });
  }
  addEventListener('storage', function (e) {
    if (e.key === OWNER && e.newValue && e.newValue !== me) {
      if (document.body) pause(); else document.addEventListener('DOMContentLoaded', pause);
    }
  });
})();
