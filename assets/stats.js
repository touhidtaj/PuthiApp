/* Puthi download counter: shows how many times the APK was downloaded from GitHub Releases.
   Edit the config below, nothing else. */
var PUTHI_STATS = {
  repo: 'touhidtaj/PuthiApp', // GitHub repository that holds the Release with the APK
  minShow: 1                  // hide the counter until it reaches this number
};

(function () {
  var C = PUTHI_STATS, box = document.querySelector('.pt-dl');
  if (!box || !C.repo) return;
  var out = box.querySelector('[data-stat="downloads"]');
  function fmt(n) { return Number(n).toLocaleString('en-US'); }
  function count(total) {
    var t0 = null, dur = 1100;
    function tick(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      out.textContent = fmt(Math.round(total * e));
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function reveal(total) {
    box.style.display = 'block';
    var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm || total < 20 || !('IntersectionObserver' in window)) { out.textContent = fmt(total); return; }
    out.textContent = '0';
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { io.disconnect(); count(total); }
    }, { threshold: .6 });
    io.observe(box);
  }
  fetch('https://api.github.com/repos/' + C.repo + '/releases?per_page=100')
    .then(function (r) { if (!r.ok) throw 0; return r.json(); })
    .then(function (rel) {
      var total = 0;
      rel.forEach(function (r) { (r.assets || []).forEach(function (a) {
        if (/\.apk$/i.test(a.name)) total += a.download_count || 0;
      }); });
      if (total >= C.minShow) reveal(total);
    })
    .catch(function () {});
})();
