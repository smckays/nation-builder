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
