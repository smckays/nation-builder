// Nation Builders now lives inside Fun Time Studio. Browser saves belong to
// the web address, so the old address hands its save over on the way out: it
// redirects to the new address with the save in the URL fragment (the part after
// #, which browsers never send to a server), and the new address keeps whichever
// save is further along. Runs before the game loads, so the game only ever sees
// the save that won.
(function () {
  var OLD_HOST = 'nation-builders.netlify.app';
  var NEW_URL = 'https://funtime-studio.com/nation-builders/';
  var SAVE_KEY = 'nation-builder:tabletop:v1';
  var EXTRA_KEYS = ['nb-tt-sound'];   // kept only where the new address has none
  // Which game in progress to keep: the one played most recently.
  function progress(raw) {
    try { return Number(JSON.parse(raw).savedAt) || 0; } catch (e) { return -1; }
  }

  var TAG = '#fts-handoff=';
  var KEYS = [SAVE_KEY].concat(EXTRA_KEYS);

  if (location.hostname === OLD_HOST) {
    var data = {};
    try {
      for (var i = 0; i < KEYS.length; i++) {
        var v = localStorage.getItem(KEYS[i]);
        if (v != null) data[KEYS[i]] = v;
      }
    } catch (e) { /* storage blocked: move on without the save */ }
    var payload = Object.keys(data).length ? TAG + encodeURIComponent(JSON.stringify(data)) : '';
    document.documentElement.style.visibility = 'hidden';
    location.replace(NEW_URL + payload);
    return;
  }

  if (location.hash.indexOf(TAG) !== 0) return;
  try {
    var incoming = JSON.parse(decodeURIComponent(location.hash.slice(TAG.length)));
    for (var j = 0; j < KEYS.length; j++) {
      var key = KEYS[j], val = incoming[key];
      if (typeof val !== 'string') continue;
      var have = localStorage.getItem(key);
      var take = key === SAVE_KEY ? progress(val) > (have == null ? -1 : progress(have)) : have == null;
      if (take) localStorage.setItem(key, val);
    }
  } catch (e) { /* a damaged handoff is ignored; the old address still has the save */ }
  history.replaceState(null, '', location.pathname + location.search);
})();
