/* Puthi logo loader.
   Reads assets/Logo/puthi-mark.svg and paints it everywhere the site shows the mark
   (nav logo, hero flame, download panel). Replace that one file to change the logo
   site-wide; no code edits needed. If the file can't be read, the built-in copy stays. */
(function () {
  var SRC = 'assets/Logo/puthi-mark.svg', NS = 'http://www.w3.org/2000/svg', root = document.documentElement;
  function done() { root.classList.remove('logo-wait'); }
  setTimeout(done, 2000);
  fetch(SRC, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.text() : Promise.reject(); }).then(function (txt) {
    var svg = new DOMParser().parseFromString(txt, 'image/svg+xml').documentElement;
    if (!svg || svg.nodeName.toLowerCase() !== 'svg') return;
    var vb = (svg.getAttribute('viewBox') || '0 0 100 100').split(/[ ,]+/).map(Number), vbw = vb[2], u = vbw / 100;
    var map = {};
    [].forEach.call(svg.querySelectorAll('style'), function (st) {
      st.textContent.replace(/\.([\w-]+)\s*\{([^}]*)\}/g, function (_, c, b) { map[c] = b; });
    });
    function prop(el, p) {
      var v = el.getAttribute(p); if (v) return v;
      var cls = (el.getAttribute('class') || '').split(/\s+/);
      for (var i = 0; i < cls.length; i++) {
        var b = map[cls[i]]; if (!b) continue;
        var m = b.match(new RegExp('(?:^|;|\\s)' + p + '\\s*:\\s*([^;]+)')); if (m) return m[1].trim();
      }
      return '';
    }
    var px = [], bk = [];
    [].forEach.call(svg.querySelectorAll('rect'), function (r) {
      var f = prop(r, 'fill'), o = prop(r, 'opacity');
      if (!f || f === 'none' || (o !== '' && +o === 0)) return;
      px.push({ x: +r.getAttribute('x'), y: +r.getAttribute('y'), w: +r.getAttribute('width'), h: +r.getAttribute('height'), f: f.toLowerCase() });
    });
    [].forEach.call(svg.querySelectorAll('path,polyline'), function (p) {
      var s = prop(p, 'stroke');
      if (!s || s === 'none') return;
      bk.push({ tag: p.nodeName.toLowerCase(), d: p.getAttribute('d'), pts: p.getAttribute('points'), sw: parseFloat(prop(p, 'stroke-width')) || 10 * u, lj: prop(p, 'stroke-linejoin') || 'miter', lc: prop(p, 'stroke-linecap') || '', s: s });
    });
    if (!px.length) return;
    function sig(list, w) { return list.map(function (r) { return Math.round(r.x / w * 1000) + ',' + Math.round(r.y / w * 1000) + ',' + r.f; }).sort().join('|'); }
    var mine = sig(px, vbw);
    var maxY = Math.max.apply(null, px.map(function (r) { return r.y; })), minY = Math.min.apply(null, px.map(function (r) { return r.y; }));
    var cx = (Math.min.apply(null, px.map(function (r) { return r.x; })) + Math.max.apply(null, px.map(function (r) { return r.x + r.w; }))) / 2;
    function isolated(r) {
      return !px.some(function (o) { return o !== r && Math.abs(o.x - r.x) <= r.w * 1.3 && Math.abs(o.y - r.y) <= r.h * 1.3; });
    }
    function el(n, a) { var e = document.createElementNS(NS, n); for (var k in a) if (a[k] !== '' && a[k] != null) e.setAttribute(k, a[k]); return e; }
    function paint(t, animated) {
      var old = [].map.call(t.querySelectorAll('rect'), function (r) {
        return { x: +r.getAttribute('x'), y: +r.getAttribute('y'), f: (r.getAttribute('fill') || '').toLowerCase() };
      });
      var ovb = (t.getAttribute('viewBox') || '0 0 100 100').split(/[ ,]+/).map(Number);
      if (!animated && sig(old, ovb[2]) === mine && Math.abs(ovb[2] - vbw) < .001 && t.querySelector('path,polyline')) return; /* unchanged: leave as is */
      var keep = t.querySelector('path,polyline'), cls = keep ? keep.getAttribute('class') : '';
      while (t.firstChild) t.removeChild(t.firstChild);
      t.setAttribute('viewBox', vb.join(' '));
      px.forEach(function (r) {
        var a = { x: r.x, y: r.y, width: r.w, height: r.h, fill: r.f };
        if (animated) {
          var d = Math.round(200 + 11.9 * (maxY - r.y) / u + 5.9 * Math.abs(r.x + r.w / 2 - cx) / u);
          a['class'] = 'px' + ((r.y === minY || isolated(r)) ? ' em' : '');
          a.style = '--d:' + d + 'ms';
        }
        t.appendChild(el('rect', a));
      });
      bk.forEach(function (b) {
        var a = { d: b.d, points: b.pts, fill: 'none', 'stroke-width': b.sw, 'stroke-linejoin': b.lj, 'stroke-linecap': b.lc };
        if (cls) a['class'] = cls; else a.stroke = b.s;
        t.appendChild(el(b.tag, a));
      });
    }
    [].forEach.call(document.querySelectorAll('.pt-logo,.pt-mark'), function (t) { paint(t, false); });
    [].forEach.call(document.querySelectorAll('.pt-wm'), function (t) { paint(t, true); });
    done();
  }).catch(function () { done(); /* keep built-in logo */ });
})();
