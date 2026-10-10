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
// It also keeps one window playing at a time (see the second part below). Add
// data-one-window="off" to a game that handles that itself.
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
    paused = true;
    var cover = document.createElement('div');
    cover.setAttribute('role', 'dialog');
    cover.setAttribute('aria-modal', 'true');
    cover.style.cssText = 'position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:16px;background:rgba(12,8,22,.82);font-family:system-ui,-apple-system,sans-serif';
    cover.innerHTML = '<div style="max-width:360px;background:#1e1638;color:#f7f2ff;border:2px solid #3d2d6b;border-radius:18px;padding:22px;text-align:center;box-shadow:0 18px 40px rgba(0,0,0,.5)">'
      + '<h2 style="margin:0 0 8px;font-size:1.25rem;color:#ffb83d">Playing in another window</h2>'
      + '<p style="margin:0 0 16px;color:#b9add9;line-height:1.45">This game is open somewhere else, so this window has paused. That keeps your progress from being saved twice.</p>'
      + '<button type="button" style="font:inherit;font-weight:700;border:0;border-radius:999px;padding:9px 20px;background:#ffb83d;color:#1a1030;cursor:pointer">Play here</button></div>';
    cover.querySelector('button').addEventListener('click', function () {
      try { localStorage.setItem(OWNER, me); } catch (e) {}
      location.reload();
    });
    (document.body || document.documentElement).appendChild(cover);
    cover.querySelector('button').focus();
  }
  addEventListener('storage', function (e) {
    if (e.key === OWNER && e.newValue && e.newValue !== me) {
      if (document.body) pause(); else document.addEventListener('DOMContentLoaded', pause);
    }
  });
})();
