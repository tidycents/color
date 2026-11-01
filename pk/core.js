/* TidyCents · Pre-K Learning Adventures · shared core (canvas pages, 850 x 1100 design units = US Letter at 100 units/inch)
   Books register with TCK.register({...}). Everything renders in the buyer's browser; nothing is sent anywhere. */
window.TCK = (function () {
  const GL = window.TC_GLYPHS;
  const INK = '#1B2A44', GREY = '#7C8796', LINE = '#C9D3E3', SOFT = '#55606F', BLUE = '#2E6FD8';
  const COLORS = {
    red: ['#D9443A', 'red'], orange: ['#EE8A1F', 'orange'], yellow: ['#D9A400', 'yellow'], green: ['#2E9E5B', 'green'],
    blue: ['#2E6FD8', 'blue'], purple: ['#8A4FD0', 'purple'], pink: ['#E0559A', 'pink'], teal: ['#15979A', 'teal']
  };
  const LIMITS = { name: 12, ded: 140, from: 24, msg: 60 };
  const BOOKS = {};
  // safe area: 0.5 in margins => x 50..800, y 50..1050. Headers start at y 100.
  const SAFE = { x1: 50, x2: 800, y1: 50, y2: 1050 };

  // ---------- small helpers ----------
  function rng(seed) { let s = 0; for (const ch of String(seed)) s = (s * 31 + ch.charCodeAt(0)) >>> 0; s = s || 7; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  function shuffle(a, r) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function cleanName(n) {
    n = String(n || '').replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ \-]/g, '').replace(/\s+/g, ' ').trim().slice(0, LIMITS.name);
    return n.split(/([ \-])/).map(w => w.length ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w).join('');
  }
  function clean(s, max) { return String(s || '').replace(/[<>{}\\]/g, '').replace(/\s+/g, ' ').trim().slice(0, max); }
  function possessive(n) { return n + "'s"; }
  function t(d, en, es) { return d && d.lang === 'es' && es != null ? es : en; }
  function bt(d, B, k) { return t(d, B[k], B[k + 'Es']); }
  function font(ctx, w, px) { ctx.font = `${w} ${px}px Poppins, Arial, sans-serif`; }
  function text(ctx, s, x, y, px, w = 500, color = INK, align = 'left') { font(ctx, w, px); ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.fillText(s, x, y); }
  function fitText(ctx, s, maxW, px, w = 700, min = 12) { font(ctx, w, px); while (ctx.measureText(s).width > maxW && px > min) { px -= 2; font(ctx, w, px); } return px; }
  function wrapLines(ctx, s, maxW, px, w = 500) { font(ctx, w, px); const out = []; let line = ''; for (const wd of String(s).split(' ')) { const t = line ? line + ' ' + wd : wd; if (ctx.measureText(t).width > maxW && line) { out.push(line); line = wd; } else line = t; } if (line) out.push(line); return out; }
  function wrapText(ctx, s, x, y, maxW, px, lh, w = 500, color = SOFT, align = 'left') { const L = wrapLines(ctx, s, maxW, px, w); L.forEach((l, i) => text(ctx, l, x, y + i * lh, px, w, color, align)); return y + (L.length - 1) * lh; }
  function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function box(ctx, x, y, w, h, r = 18, color = LINE, lw = 2, dash) { ctx.save(); if (dash) ctx.setLineDash(dash); ctx.lineWidth = lw; ctx.strokeStyle = color; roundRect(ctx, x, y, w, h, r); ctx.stroke(); ctx.restore(); }
  function pen(ctx, lw = 3, color = INK) { ctx.lineWidth = lw; ctx.strokeStyle = color; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.setLineDash([]); }
  function path(ctx, d, o = {}) { // svg path string, drawn as outline (fill optional)
    const p = new Path2D(d); if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(p); } pen(ctx, o.lw || 3, o.color || INK); if (o.dash) ctx.setLineDash(o.dash); ctx.stroke(p); ctx.setLineDash([]); }
  // draw an icon defined in a 100x100 box, at center x,y with size s (px)
  function icon(ctx, fn, x, y, s, ...args) { ctx.save(); ctx.translate(x - s / 2, y - s / 2); ctx.scale(s / 100, s / 100); fn(ctx, 100 / s, ...args); ctx.restore(); }
  function circle(ctx, x, y, r, o = {}) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); } pen(ctx, o.lw || 3, o.color || INK); if (o.dash) ctx.setLineDash(o.dash); ctx.stroke(); ctx.setLineDash([]); }
  function line(ctx, x1, y1, x2, y2, o = {}) { pen(ctx, o.lw || 3, o.color || INK); if (o.dash) ctx.setLineDash(o.dash); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]); }
  function dot(ctx, x, y, r = 7, c = BLUE) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill(); }
  function star(ctx, x, y, r, lw = 3, fill) { ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + rr * Math.cos(a), y + rr * Math.sin(a)); } ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } pen(ctx, lw); ctx.stroke(); }
  function sparkle(ctx, x, y, r, color) { ctx.beginPath(); ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); pen(ctx, 3, color); ctx.stroke(); }
  function numCircle(ctx, x, y, n, accent, r = 30) { circle(ctx, x, y, r, { color: accent, lw: 3 }); text(ctx, String(n), x, y + r * 0.45, r * 1.25, 700, INK, 'center'); }
  function answerBox(ctx, x, y, w = 56, h = 56, accent = INK) { box(ctx, x, y, w, h, 10, accent, 2.5); }
  function dashedPath(ctx, pts, o = {}) { ctx.save(); ctx.setLineDash(o.dash || [3, 12]); ctx.lineCap = 'round'; ctx.lineWidth = o.lw || 5; ctx.strokeStyle = o.color || GREY; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); if (o.start !== false) dot(ctx, pts[0][0], pts[0][1], 8, BLUE); }

  // ---------- single-stroke tracing letters (glyphs.js) ----------
  function measureStroke(s, size) { const k = size / 100; let w = 0; for (const ch of s) { if (ch === ' ') { w += 40 * k; continue; } const g = GL[ch]; if (!g) continue; w += (g[0] + 22) * k; } return Math.max(0, w - 22 * k); }
  function drawStroke(ctx, s, x, y, size, o = {}) {
    const k = size / 100, top = y - size; let cx = x; ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const ch of s) {
      if (ch === ' ') { cx += 40 * k; continue; }
      const g = GL[ch]; if (!g) continue;
      ctx.save(); ctx.translate(cx, top); ctx.scale(k, k);
      ctx.lineWidth = (o.lw || 4) / k; ctx.strokeStyle = o.color || GREY; ctx.setLineDash(o.dash ? o.dash.map(v => v / k) : []);
      g[1].forEach(d => ctx.stroke(new Path2D(d))); ctx.setLineDash([]);
      if (g[2]) { const p = g[2].split(':')[1].split(',').map(Number); for (let i = 0; i < p.length; i += 2) { ctx.beginPath(); ctx.arc(p[i], p[i + 1], 5 / k * (o.lw || 4) / 4, 0, Math.PI * 2); ctx.fillStyle = o.color || GREY; ctx.fill(); } }
      if (o.startDot) { const m = g[1][0].match(/M\s*(-?[\d.]+)[ ,](-?[\d.]+)/); if (m) { ctx.beginPath(); ctx.arc(+m[1], +m[2], 7 / k, 0, Math.PI * 2); ctx.fillStyle = o.startDot; ctx.fill(); } }
      ctx.restore(); cx += (g[0] + 22) * k;
    }
    ctx.restore(); return cx - x;
  }
  function fitStroke(s, maxW, maxSize, minSize = 36) { let z = maxSize; while (measureStroke(s, z) > maxW && z > minSize) z -= 2; return z; }
  function guide(ctx, x1, x2, y, size) {
    ctx.save(); ctx.lineWidth = 2; ctx.strokeStyle = LINE; ctx.beginPath(); ctx.moveTo(x1, y - size); ctx.lineTo(x2, y - size); ctx.stroke();
    ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(x1, y - size / 2); ctx.lineTo(x2, y - size / 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.restore();
  }

  // ---------- page furniture ----------
  // title can contain the token {name}, which is drawn in the accent color
  function header(ctx, d, title, sub) {
    const parts = String(title).split('{name}');
    if (parts.length === 1) { const px = fitText(ctx, title, 740, 44); text(ctx, title, 60, 100, px, 700, INK); }
    else {
      let px = 44; const full = parts.join(d.name); px = fitText(ctx, full, 740, 44); let x = 60;
      parts.forEach((p, i) => { text(ctx, p, x, 100, px, 700, INK); font(ctx, 700, px); x += ctx.measureText(p).width; if (i < parts.length - 1) { text(ctx, d.name, x, 100, px, 700, d.accent); x += ctx.measureText(d.name).width; } });
    }
    if (sub) wrapText(ctx, sub.split('{name}').join(d.name), 60, 142, 740, 21, 28, 500, SOFT);
  }
  function tip(ctx, s) { const L = wrapLines(ctx, s, 690, 16); L.slice(0, 2).forEach((l, i) => text(ctx, l, 60, 1032 + i * 22 - (L.length > 1 ? 22 : 0), 16, 500, GREY)); }
  function footer(ctx, d, n) { text(ctx, String(n), 790, 1062, 15, 500, GREY, 'right'); }

  function cover(ctx, d, B) {
    const A = d.accent; const COL = !!B.coverBg;
    if (COL) { ctx.save(); roundRect(ctx, 30, 30, 790, 1040, 36); ctx.clip(); ctx.fillStyle = B.coverSky || '#EAF4FF'; ctx.fillRect(0, 0, 850, 1100); B.coverBg(ctx, d); ctx.restore();
      ctx.save(); ctx.globalAlpha = 0.93; ctx.fillStyle = '#fff'; roundRect(ctx, 70, 62, 710, 286, 28); ctx.fill(); ctx.restore(); }
    pen(ctx, 6, A); roundRect(ctx, 30, 30, 790, 1040, 36); ctx.stroke();
    text(ctx, B.kicker ? B.kicker(d) : t(d, `PRE-K ACTIVITY BOOK · AGE ${d.age}`, `CUADERNO PRE-K · ${d.age} AÑOS`), 425, 112, 24, 500, A, 'center');
    const t1 = t(d, possessive(d.name), d.name); const px = fitText(ctx, t1, COL ? 660 : 700, 100); text(ctx, t1, 425, 222, px, 700, INK, 'center');
    const T2 = bt(d, B, 'title'); const px2 = fitText(ctx, T2, COL ? 660 : 720, 66); text(ctx, T2, 425, 312, px2, 700, A, 'center');
    ctx.save(); B.coverArt(ctx, d); ctx.restore();
    ctx.save(); if (COL) { ctx.fillStyle = '#fff'; roundRect(ctx, 175, 845, 500, 120, 20); ctx.fill(); } ctx.setLineDash([10, 8]); pen(ctx, 3); roundRect(ctx, 175, 845, 500, 120, 20); ctx.stroke(); ctx.restore();
    if (COL && d.from) { ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = '#fff'; font(ctx, 500, 20); const fw = ctx.measureText(t(d, 'A gift from ', 'Un regalo de ') + d.from).width; roundRect(ctx, 425 - fw / 2 - 16, 978, fw + 32, 32, 16); ctx.fill(); ctx.restore(); }
    text(ctx, t(d, 'This book belongs to', 'Este libro es de'), 425, 885, 22, 500, SOFT, 'center'); const npx = fitText(ctx, d.name, 460, 38); text(ctx, d.name, 425, 935, npx, 700, INK, 'center');
    if (d.from) text(ctx, t(d, 'A gift from ', 'Un regalo de ') + d.from, 425, 1000, 20, 500, SOFT, 'center');
    text(ctx, B.brand || 'TidyCents · Pre-K Learning Adventures', 425, 1046, 15, 500, COL ? INK : GREY, 'center');
  }
  function dedication(ctx, d, B) {
    const A = d.accent; pen(ctx, 4, A); roundRect(ctx, 90, 250, 670, 560, 30); ctx.stroke();
    let y = 330;
    if (d.msg) { const px = fitText(ctx, d.msg, 600, 40); text(ctx, d.msg, 425, y, px, 700, A, 'center'); y += 70; }
    else { text(ctx, t(d, 'A note for ', 'Una nota para ') + d.name, 425, y, 36, 700, A, 'center'); y += 70; }
    if (d.ded) { let fz = 28, L = wrapLines(ctx, d.ded, 560, fz); while (L.length > 6 && fz > 20) { fz -= 2; L = wrapLines(ctx, d.ded, 600, fz); } const lh = Math.round(fz * 1.5); L.slice(0, 7).forEach((l, i) => text(ctx, l, 425, y + i * lh, fz, 500, INK, 'center')); y += Math.min(7, L.length) * lh + 20; }
    if (d.from) text(ctx, t(d, 'With love, ', 'Con cariño, ') + d.from, 425, Math.max(y + 30, 700), 26, 500, SOFT, 'center');
    [[140, 210], [710, 210], [140, 850], [710, 850]].forEach(([x, yy]) => sparkle(ctx, x, yy, 18, A));
    if (B.dedicationArt) { ctx.save(); B.dedicationArt(ctx, d); ctx.restore(); }
  }
  function certificate(ctx, d, B) {
    pen(ctx, 8, d.accent); roundRect(ctx, 40, 40, 770, 1020, 30); ctx.stroke(); pen(ctx, 2); roundRect(ctx, 60, 60, 730, 980, 22); ctx.stroke();
    for (let i = 0; i < 5; i++) star(ctx, 265 + i * 80, 200 - (i === 2 ? 30 : i % 2 ? 12 : 0), i === 2 ? 46 : 34, 4);
    text(ctx, t(d, 'Great job,', '¡Muy bien,'), 425, 370, 56, 700, INK, 'center'); const px = fitText(ctx, d.name + '!', 640, 110); text(ctx, d.name + '!', 425, 495, px, 700, d.accent, 'center');
    wrapText(ctx, bt(d, B, 'certText') || t(d, 'You finished your adventure!', '¡Terminaste tu aventura!'), 425, 580, 640, 30, 40, 500, INK, 'center');
    ctx.save(); B.certArt && B.certArt(ctx, d); ctx.restore();
    line(ctx, 110, 960, 380, 960, { lw: 2 }); line(ctx, 470, 960, 740, 960, { lw: 2 });
    text(ctx, t(d, 'Date', 'Fecha'), 245, 990, 18, 500, SOFT, 'center'); text(ctx, t(d, 'Signed', 'Firma'), 605, 990, 18, 500, SOFT, 'center');
  }

  // ---------- bonus pages (shared by every book) ----------
  function charLabel(d, B) { const c = (B.characters || []).find(x => x.id === d.character) || (B.characters || [])[0] || {}; return t(d, c.label || '', c.labelEs || c.label || '').toLowerCase(); }
  function coloring(ctx, d, B) {
    header(ctx, d, t(d, "Color {name}'s " + charLabel(d, B), 'Colorea ' + (B.charArticleEs ? B.charArticleEs(d) : 'el') + ' ' + charLabel(d, B) + ' de {name}'), t(d, 'Use your favorite colors. Then draw a home around it.', 'Usa tus colores favoritos. Luego dibuja dónde vive.'));
    box(ctx, 60, 190, 730, 790, 26, LINE, 2.5);
    ctx.save(); B.drawCharacter(ctx, d, d.character, 425, 585, 610); ctx.restore();
    tip(ctx, t(d, 'Grown-up tip: name the colors together while coloring. There is no wrong color!', 'Consejo para el adulto: digan juntos los colores mientras colorean. ¡No hay colores equivocados!'));
  }
  function traceName(ctx, d, B) {
    header(ctx, d, t(d, 'I can write my name', 'Sé escribir mi nombre'), t(d, 'Trace the dotted letters. Start at the blue dot. Then write it on your own.', 'Traza las letras punteadas. Empieza en el punto azul. Luego escríbelo tú solo.'));
    const nm = d.name; const x1 = 80, x2 = 770; const big = fitStroke(nm, x2 - x1 - 20, d.age === 3 ? 170 : 150, 50);
    // model row (solid) + 2 dotted rows + empty row
    let y = 230 + big; guide(ctx, x1, x2, y, big); drawStroke(ctx, nm, x1 + 10, y, big, { color: INK, lw: 5 });
    const rows = d.age === 3 ? 2 : 2; for (let i = 0; i < rows; i++) { y += big + 85; guide(ctx, x1, x2, y, big); drawStroke(ctx, nm, x1 + 10, y, big, { color: GREY, lw: 4, dash: [2, 11], startDot: BLUE }); }
    y += big + 85; if (y < 990) { guide(ctx, x1, x2, y, big); }
    tip(ctx, t(d, 'Grown-up tip: say each letter out loud as your child traces it.', 'Consejo para el adulto: digan cada letra en voz alta mientras el niño la traza.'));
  }
  function stars(ctx, d, B) {
    header(ctx, d, t(d, "{name}'s star chart", 'Las estrellas de {name}'), t(d, 'Color a star for every page you finish.', 'Colorea una estrella por cada página que termines.'));
    const P = B.pages; const top = 200, rowH = Math.min(118, 760 / P.length);
    P.forEach((p, i) => { const y = top + i * rowH; box(ctx, 60, y, 730, rowH - 16, 18, LINE, 2);
      numCircle(ctx, 112, y + (rowH - 16) / 2, i + 1, d.accent, 26);
      const tt = t(d, p.title, p.titleEs); const px = fitText(ctx, tt, 330, 26, 600); text(ctx, tt, 160, y + (rowH - 16) / 2 + px * 0.35, px, 600, INK);
      for (let k = 0; k < 3; k++) star(ctx, 560 + k * 78, y + (rowH - 16) / 2 + 2, 30, 3); });
    const yb = top + P.length * rowH + 10; text(ctx, t(d, 'I finished my book!', '¡Terminé mi libro!'), 425, yb + 40, 30, 700, d.accent, 'center');
    tip(ctx, t(d, 'Grown-up tip: celebrate each finished page. Hang the chart on the fridge!', 'Consejo para el adulto: celebren cada página terminada. ¡Peguen la tabla en el refrigerador!'));
  }
  function rewards(ctx, d, B) {
    header(ctx, d, t(d, 'Rewards for {name}', 'Premios para {name}'), t(d, 'Grown-up: cut out a badge each time a page is done.', 'Adulto: recorta una medalla cada vez que termine una página.'));
    const W = [['Super\n' + d.name + '!', '¡Súper\n' + d.name + '!'], ['Great job!', '¡Muy bien!'], ['I can count!', '¡Sé contar!'], ['Super tracer!', '¡Gran trazador!'], ['Brave explorer!', '¡Gran explorador!'], ['Book finished!', '¡Libro terminado!']];
    W.forEach((w, i) => { const cx = 235 + (i % 2) * 380, cy = 315 + Math.floor(i / 2) * 250, r = 104;
      ctx.save(); ctx.setLineDash([9, 9]); pen(ctx, 2, GREY); ctx.beginPath(); ctx.arc(cx, cy, r + 14, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      circle(ctx, cx, cy, r, { color: d.accent, lw: 5 }); circle(ctx, cx, cy, r - 12, { color: LINE, lw: 2 });
      if (B.drawCharacter && i % 2 === 0) { ctx.save(); B.drawCharacter(ctx, d, d.character, cx, cy - 20, 104); ctx.restore(); } else { star(ctx, cx, cy - 20, 42, 4); }
      const s2 = t(d, w[0], w[1]); const ls = s2.split('\n'); if (ls.length > 1) { text(ctx, ls[0], cx, cy + 50, 20, 600, SOFT, 'center'); const px = fitText(ctx, ls[1], 170, 26, 700); text(ctx, ls[1], cx, cy + 78, px, 700, INK, 'center'); } else { const px = fitText(ctx, s2, 168, 24, 700); text(ctx, s2, cx, cy + 62, px, 700, INK, 'center'); } });
    tip(ctx, t(d, 'Grown-up tip: an adult should do the cutting. Tape the badge on a shirt or the star chart.', 'Consejo para el adulto: el adulto recorta. Pega la medalla en la camisa o en la tabla de estrellas.'));
  }

  // ---------- data ----------
  function data(bookId, input) {
    const B = BOOKS[bookId]; const d = Object.assign({ color: 'blue', age: 4 }, input || {});
    d.book = bookId; d.lang = d.lang === 'es' ? 'es' : 'en'; d.name = cleanName(d.name) || 'Lucas'; d.age = [3, 4, 5].includes(+d.age) ? +d.age : 4;
    d.accent = (COLORS[d.color] || COLORS.blue)[0]; d.colorName = (COLORS[d.color] || COLORS.blue)[1];
    d.ded = clean(d.ded, LIMITS.ded); d.from = clean(d.from, LIMITS.from); d.msg = clean(d.msg, LIMITS.msg);
    if (B && B.characters) { if (!B.characters.some(c => c.id === d.character)) d.character = B.characters[0].id; }
    d.rand = rng(bookId + '|' + d.name + '|' + d.age);
    return d;
  }
  function pages(bookId, d) {
    const B = BOOKS[bookId]; const L = [{ cap: t(d, 'Cover', 'Portada'), fn: (c, dd) => cover(c, dd, B) }];
    if (d.ded || d.msg) L.push({ cap: t(d, 'Dedication', 'Dedicatoria'), fn: (c, dd) => dedication(c, dd, B) });
    B.pages.forEach((p, i) => L.push({ cap: (i + 1) + ' · ' + t(d, p.title, p.titleEs), fn: (c, dd) => { p.draw(c, dd, i + 1); footer(c, dd, i + 1); } }));
    const bn = B.pages.length; let k = bn;
    if (B.storyMode) { (B.endPages || []).forEach(p => { const n = ++k; L.push({ cap: n + ' · ' + t(d, p.title, p.titleEs), fn: (cc, dd) => { p.draw(cc, dd, n); footer(cc, dd, n); } }); }); L.push({ cap: t(d, 'Certificate', 'Diploma'), fn: (cc, dd) => certificate(cc, dd, B) }); return L; }
    if (B.drawCharacter) L.push({ cap: (++k) + ' · ' + t(d, 'Coloring page', 'Para colorear'), fn: (c, dd) => { coloring(c, dd, B); } });
    if (!B.hasNameTrace) L.push({ cap: (++k) + ' · ' + t(d, 'My name', 'Mi nombre'), fn: (c, dd) => { traceName(c, dd, B); } });
    L.push({ cap: (++k) + ' · ' + t(d, 'Star chart', 'Tabla de estrellas'), fn: (c, dd) => { stars(c, dd, B); } });
    L.push({ cap: (++k) + ' · ' + t(d, 'Rewards to cut out', 'Premios para recortar'), fn: (c, dd) => { rewards(c, dd, B); } });
    L.push({ cap: t(d, 'Certificate', 'Diploma'), fn: (c, dd) => certificate(c, dd, B) });
    return L;
  }
  function render(canvas, bookId, idx, input, scale = 1, watermark) {
    const d = data(bookId, input); const P = pages(bookId, d)[idx]; const ctx = canvas.getContext('2d');
    canvas.width = Math.round(850 * scale); canvas.height = Math.round(1100 * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 850, 1100);
    d.rand = rng(bookId + '|' + d.name + '|' + d.age + '|' + idx);
    ctx.save(); P.fn(ctx, d); ctx.restore();
    if (watermark) { ctx.save(); ctx.translate(425, 550); ctx.rotate(-0.6); text(ctx, watermark, 0, 0, 120, 700, 'rgba(214,40,40,0.16)', 'center'); ctx.restore(); }
    return P;
  }
  // ---------- minimal PDF writer (JPEG page images, US Letter) ----------
  function b64bytes(u) { const b = atob(u.split(',')[1]); const a = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function makePDF(jpegs, W, H, title) {
    const enc = new TextEncoder(); const parts = []; let len = 0; const offs = [];
    const push = x => { const b = typeof x === 'string' ? enc.encode(x) : x; parts.push(b); len += b.length; };
    const n = jpegs.length; const obj = i => { offs[i] = len; };
    push('%PDF-1.4\n%TCPDF\n');
    const info = 3 + n * 3; const safeT = String(title || 'TidyCents').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[()\\]/g, '').replace(/[^\x20-\x7E]/g, '');
    obj(1); push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    const kids = []; for (let i = 0; i < n; i++) kids.push((3 + i * 3) + ' 0 R');
    obj(2); push(`2 0 obj\n<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${n} >>\nendobj\n`);
    jpegs.forEach((j, i) => {
      const p = 3 + i * 3, c = p + 1, im = p + 2; const cs = `q 612 0 0 792 0 0 cm /Im${i} Do Q`;
      obj(p); push(`${p} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /XObject << /Im${i} ${im} 0 R >> >> /Contents ${c} 0 R >>\nendobj\n`);
      obj(c); push(`${c} 0 obj\n<< /Length ${cs.length} >>\nstream\n${cs}\nendstream\nendobj\n`);
      obj(im); push(`${im} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${W} /Height ${H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${j.length} >>\nstream\n`); push(j); push('\nendstream\nendobj\n');
    });
    obj(info); push(`${info} 0 obj\n<< /Title (${safeT}) /Producer (TidyCents) >>\nendobj\n`);
    const total = info + 1; const xref = len; let x = `xref\n0 ${total}\n0000000000 65535 f \n`;
    for (let i = 1; i < total; i++) x += String(offs[i]).padStart(10, '0') + ' 00000 n \n';
    push(x + `trailer\n<< /Size ${total} /Root 1 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF`);
    return new Blob(parts, { type: 'application/pdf' });
  }
  async function pdf(bookId, input, scale = 2, onProgress, watermark) {
    const d = data(bookId, input); const L = pages(bookId, d); const jp = []; const cv = document.createElement('canvas');
    for (let i = 0; i < L.length; i++) { render(cv, bookId, i, input, scale, watermark); jp.push(b64bytes(cv.toDataURL('image/jpeg', 0.9))); onProgress && onProgress(i + 1, L.length); await new Promise(r => setTimeout(r, 0)); }
    return makePDF(jp, cv.width, cv.height, bt(d, BOOKS[bookId], 'title') + ' - ' + d.name);
  }
  function register(B) { BOOKS[B.id] = B; }
  return {
    INK, GREY, LINE, SOFT, BLUE, COLORS, LIMITS, SAFE, BOOKS, register, data, pages, render, pdf, makePDF, b64bytes,
    h: { t, bt, rng, shuffle, cleanName, possessive, font, text, fitText, wrapLines, wrapText, roundRect, box, pen, path, icon, circle, line, dot, star, sparkle, numCircle, answerBox, dashedPath, measureStroke, drawStroke, fitStroke, guide, header, tip }
  };
})();
