/* TidyCents · Pre-K Learning Adventures · Book 4: Fruit & Color Fun (id 'fruit')
   All illustrations are original line art drawn in a 100x100 box and placed with h.icon.
   Line weight stays constant on the page (LW page units) whatever the icon size. */
(function () {
  const K = TCK, h = K.h, INK = K.INK, GREY = K.GREY, SOFT = K.SOFT, LINE = K.LINE;
  const LW = 3.5;
  const COL = { red: '#D9443A', yellow: '#D9A400', green: '#2E9E5B', orange: '#EE8A1F', purple: '#8A4FD0' };
  const PINK = '#EE9AB8';
  const COL_ES = { red: 'rojo', yellow: 'amarillo', green: 'verde', orange: 'naranja', purple: 'morado' };
  const colWord = (d, col) => h.t(d, col, COL_ES[col]);

  // ---------- drawing primitives (inside a 100x100 icon box, k = page units per box unit) ----------
  function st(c, k, o, lw) {
    c.lineWidth = (lw || o.lw || LW) * k * (o.sc || 1); c.strokeStyle = o.trace ? GREY : (o.color || INK);
    c.lineJoin = 'round'; c.lineCap = 'round';
    c.setLineDash(o.trace ? [2 * k, 9 * k] : []);
  }
  // fill colour: white by default; o.pal (cover only) maps part names ('body', 'leaf', 'stem') to colours
  function pf(o, fill) { return (o.pal && o.pal[fill === true ? 'body' : fill]) || '#fff'; }
  function S(c, k, o, d, fill, lw) { const p = new Path2D(d); if (fill && !o.trace) { c.fillStyle = pf(o, fill); c.fill(p); } st(c, k, o, lw); c.stroke(p); }
  function E(c, k, o, x, y, rx, ry, fill, lw) { const p = new Path2D(); p.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); if (fill && !o.trace) { c.fillStyle = pf(o, fill); c.fill(p); } st(c, k, o, lw); c.stroke(p); return p; }
  function dotc(c, x, y, r, col) { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = col; c.fill(); }
  function face(c, k, cx, cy, sc, o = {}) {
    dotc(c, cx - 9 * sc, cy, 3.4 * sc, INK); dotc(c, cx + 9 * sc, cy, 3.4 * sc, INK);
    if (o.shine) { dotc(c, cx - 8 * sc, cy - 1.3 * sc, 1.1 * sc, '#fff'); dotc(c, cx + 10 * sc, cy - 1.3 * sc, 1.1 * sc, '#fff'); }
    if (!o.noBlush) { dotc(c, cx - 16 * sc, cy + 8 * sc, 3.6 * sc, PINK); dotc(c, cx + 16 * sc, cy + 8 * sc, 3.6 * sc, PINK); }
    c.beginPath(); c.arc(cx, cy + 2 * sc, 7 * sc, 0.2 * Math.PI, 0.8 * Math.PI); c.lineWidth = 3 * k * (o.sc || 1); c.strokeStyle = INK; c.lineCap = 'round'; c.setLineDash([]); c.stroke();
  }
  function seedMarks(c, k, o, pts) { pts.forEach(([x, y]) => S(c, k, o, `M${x},${y} l1.2,4`, false, 2.6)); }

  // ---------- whole fruit ----------
  const F = {
    apple(c, k, o) {
      if (!o.noStem) { S(c, k, o, 'M50,30 Q49,18 54,9'); S(c, k, o, 'M53,21 Q64,6 79,12 Q69,25 53,21 Z', 'leaf'); }
      S(c, k, o, 'M50,30 C40,20 14,22 14,52 C14,80 34,94 50,87 C66,94 86,80 86,52 C86,22 60,20 50,30 Z', true);
      if (o.face) face(c, k, 50, 58, 1, o);
    },
    banana(c, k, o) {
      if (o.flip) { c.translate(100, 0); c.scale(-1, 1); }
      S(c, k, o, 'M23,22 L24,9 L37,9 L39,22', 'stem');
      S(c, k, o, 'M23,20 C6,58 36,96 90,82 C93,78 91,73 86,72 C56,74 40,52 40,20 Z', true);
      if (!o.face) S(c, k, o, 'M32,34 C30,58 46,76 72,79', false, 2.4);
      if (o.face) { if (o.flip) { c.translate(100, 0); c.scale(-1, 1); face(c, k, 70, 60, 0.72, o); } else face(c, k, 30, 60, 0.72, o); }
    },
    strawberry(c, k, o) {
      S(c, k, o, 'M50,92 C30,84 14,60 16,42 C18,30 32,26 50,31 C68,26 82,30 84,42 C86,60 70,84 50,92 Z', true);
      S(c, k, o, 'M29,35 L33,20 L43,28 L50,14 L57,28 L67,20 L71,35 Q50,42 29,35 Z', 'leaf');
      S(c, k, o, 'M50,14 L50,6');
      if (!o.noSeeds) seedMarks(c, k, o, o.face ? [[26,50],[72,50],[40,80],[58,80]] : [[30,48],[50,46],[68,48],[38,62],[60,62],[48,76],[26,60],[72,60]]);
      if (o.face) face(c, k, 50, 57, 0.95, o);
    },
    pineapple(c, k, o) {
      S(c, k, o, 'M36,42 L27,14 L42,30 L50,4 L58,30 L73,14 L64,42 Z', 'leaf');
      E(c, k, o, 50, 67, 27, 30, true);
      const pts = o.face ? [[36,48],[50,46],[64,48],[30,64],[70,64],[36,84],[64,84],[50,90]] : [[38,50],[54,48],[30,64],[46,63],[62,63],[70,72],[38,78],[54,78],[46,90],[62,88]];
      if (!o.trace) pts.forEach(([x, y]) => S(c, k, o, `M${x - 4},${y - 3} L${x},${y + 2} L${x + 4},${y - 3}`, false, 2.4));
      if (o.face) face(c, k, 50, 68, 0.95, o);
    },
    orange(c, k, o) {
      if (!o.noLeaf) S(c, k, o, 'M51,21 Q59,7 73,11 Q65,23 51,21 Z', 'leaf');
      E(c, k, o, 50, 57, 36, 36, true);
      S(c, k, o, 'M50,21 L50,17');
      if (!o.trace && !o.face) [[34,46],[64,70],[40,76],[68,44]].forEach(([x, y]) => dotc(c, x, y, 1.6, INK));
      if (o.face) face(c, k, 50, 60, 1, o);
    },
    grapes(c, k, o) {
      S(c, k, o, 'M50,26 Q50,13 57,5');
      S(c, k, o, 'M53,15 Q42,3 30,9 Q38,20 53,15 Z', 'leaf');
      [[50,80],[38,60],[62,60],[26,40],[50,40],[74,40]].forEach(([x, y]) => E(c, k, o, x, y, 13, 13, true));
    },
    pear(c, k, o) {
      if (!o.noStem) { S(c, k, o, 'M50,17 Q50,9 55,3'); S(c, k, o, 'M53,10 Q64,0 77,5 Q67,14 53,10 Z', 'leaf'); }
      S(c, k, o, 'M50,17 C41,17 40,28 38,38 C36,48 18,56 18,72 C18,88 34,95 50,95 C66,95 82,88 82,72 C82,56 64,48 62,38 C60,28 59,17 50,17 Z', true);
    },
    watermelon(c, k, o) {
      const p = E(c, k, o, 50, 56, 43, 32, true);
      if (!o.trace) { c.save(); c.clip(p); [30, 50, 70].forEach(x => S(c, k, o, `M${x},20 Q${x - 7},38 ${x},56 Q${x + 7},74 ${x},92`, false, 2.6)); c.restore(); }
      S(c, k, o, 'M93,54 Q99,50 97,44');
    },
    kiwi(c, k, o) {
      E(c, k, o, 50, 52, 38, 30, true);
      if (!o.trace) [[30,36],[48,30],[66,36],[24,56],[76,56],[38,70],[60,72],[50,52]].forEach(([x, y]) => S(c, k, o, `M${x},${y} l3,-2`, false, 2.4));
      E(c, k, o, 88, 52, 3, 4, false, 2.6);
    },
    cherry(c, k, o) {
      S(c, k, o, 'M34,58 Q40,30 60,12'); if (!o.single) S(c, k, o, 'M66,60 Q62,34 60,12');
      S(c, k, o, 'M60,12 Q74,3 86,13 Q73,21 60,12 Z', 'leaf');
      E(c, k, o, 33, 72, 16, 16, true); if (!o.single) E(c, k, o, 66, 74, 16, 16, true);
    },
    carrot(c, k, o) {
      S(c, k, o, 'M46,28 Q34,12 38,4 Q48,12 49,28', true); S(c, k, o, 'M51,28 Q54,10 64,6 Q64,18 55,28', true);
      S(c, k, o, 'M30,30 Q50,22 70,30 Q62,64 52,94 Q50,98 48,94 Q38,64 30,30 Z', true);
      ['M38,44 L46,44', 'M56,56 L63,56', 'M42,68 L49,68'].forEach(d => S(c, k, o, d, false, 2.4));
    },
    // ---------- insides ----------
    orangeSlice(c, k, o) {
      E(c, k, o, 50, 50, 40, 40, true); E(c, k, o, 50, 50, 33, 33, false, 2.6);
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; S(c, k, o, `M${50 + 5 * Math.cos(a)},${50 + 5 * Math.sin(a)} L${50 + 32 * Math.cos(a)},${50 + 32 * Math.sin(a)}`, false, 2.6); }
    },
    melonSlice(c, k, o) {
      S(c, k, o, 'M8,30 L92,30 A42,42 0 0 1 8,30 Z', true);
      S(c, k, o, 'M17,30 A33,33 0 0 0 83,30', false, 2.6);
      [[34,40],[50,44],[66,40],[42,54],[58,54]].forEach(([x, y]) => S(c, k, o, `M${x},${y} q-3,5 0,7 q3,-2 0,-7 Z`, false, 2.6));
    },
    appleHalf(c, k, o) {
      S(c, k, o, 'M50,30 Q49,18 54,9');
      S(c, k, o, 'M50,30 C40,20 14,22 14,52 C14,80 34,94 50,87 C66,94 86,80 86,52 C86,22 60,20 50,30 Z', true);
      S(c, k, o, 'M50,40 C41,48 38,58 42,68 C45,76 55,76 58,68 C62,58 59,48 50,40 Z', false, 2.6);
      [[45,56],[55,56]].forEach(([x, y]) => S(c, k, o, `M${x},${y} q-3,6 0,9 q3,-3 0,-9 Z`, false, 2.6));
    },
    bananaPeeled(c, k, o) {
      S(c, k, o, 'M39,56 L39,22 Q39,6 50,6 Q61,6 61,22 L61,56', true);
      S(c, k, o, 'M33,52 Q20,54 10,74 Q24,68 35,66', true);
      S(c, k, o, 'M67,52 Q80,54 90,74 Q76,68 65,66', true);
      S(c, k, o, 'M33,52 L41,58 L50,52 L59,58 L67,52 L66,86 Q50,96 34,86 Z', true);
      S(c, k, o, 'M47,88 L47,97 L53,97 L53,89', true);
    },
    kiwiSlice(c, k, o) {
      E(c, k, o, 50, 50, 40, 38, true); E(c, k, o, 50, 50, 33, 31, false, 2.6); E(c, k, o, 50, 50, 12, 9, false, 2.6);
      if (!o.trace) for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; dotc(c, 50 + 21 * Math.cos(a), 50 + 19 * Math.sin(a), 2.2, INK); }
    }
  };
  function fr(ctx, kind, x, y, s, o = {}) { h.icon(ctx, (c, k) => F[kind](c, k, o), x, y, s); }

  // ---------- fruit friends (characters) ----------
  const FRIEND = { // arm y, body half-width at that y, foot x offsets, bottom y (in 100 box)
    strawberry: { ay: 50, ax: [17, 83], fy: 86, fx: [43, 57] },
    banana: { ay: 52, ax: [14, 46], fy: 84, fx: [38, 58] },
    apple: { ay: 54, ax: [15, 85], fy: 88, fx: [40, 60] },
    pineapple: { ay: 64, ax: [24, 76], fy: 95, fx: [42, 58] }
  };
  // o (optional): sc = line-width multiplier, foot/hand = fill colours, fr = extra options for the fruit body (pal, noBlush, shine)
  function friend(ctx, id, x, y, s, wave, o = {}) {
    const A = FRIEND[id] || FRIEND.apple; const k = s / 100, X = v => x - s / 2 + v * k, Y = v => y - s / 2 + v * k;
    const sc = o.sc || 1, lw = LW * sc, hlw = 3 * sc, foot = o.foot || '#fff', hand = o.hand || '#fff';
    // legs and feet
    A.fx.forEach(fx => { h.line(ctx, X(fx), Y(A.fy - 4), X(fx), Y(A.fy + 9), { lw }); ctx.beginPath(); ctx.ellipse(X(fx) + (fx < 50 ? -3 : 3) * k, Y(A.fy + 11), 6 * k, 3.4 * k, 0, 0, Math.PI * 2); ctx.fillStyle = foot; ctx.fill(); h.pen(ctx, lw); ctx.stroke(); });
    // arms
    const L = [X(A.ax[0]), Y(A.ay)], R = [X(A.ax[1]), Y(A.ay)];
    h.line(ctx, L[0] + 3 * k, L[1], L[0] - 13 * k, L[1] + 10 * k, { lw }); h.circle(ctx, L[0] - 14 * k, L[1] + 11 * k, 3.2 * k, { lw: hlw, fill: hand });
    const ry = wave ? -14 : 10;
    h.line(ctx, R[0] - 3 * k, R[1], R[0] + 13 * k, R[1] + ry * k, { lw }); h.circle(ctx, R[0] + 14 * k, R[1] + (ry + (wave ? -1 : 1)) * k, 3.2 * k, { lw: hlw, fill: hand });
    fr(ctx, id, x, y, s, Object.assign({ face: true }, o.fr, sc !== 1 ? { sc } : {}));
  }
  function bubble(ctx, x, y, w, hh, txt, px) { // tail on the left, pointing to (x-18, y+hh*0.75)
    ctx.save(); h.roundRect(ctx, x, y, w, hh, 18); ctx.fillStyle = '#fff'; ctx.fill(); h.pen(ctx, 3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 2, y + hh * 0.45); ctx.lineTo(x - 20, y + hh * 0.8); ctx.lineTo(x + 2, y + hh * 0.7); ctx.fillStyle = '#fff'; ctx.fill(); ctx.stroke();
    ctx.restore(); const f = h.fitText(ctx, txt, w - 30, px, 700); h.text(ctx, txt, x + w / 2, y + hh / 2 + f * 0.36, f, 700, INK, 'center');
  }
  function keyDot(ctx, x, y, col, px = 22, word = true, lab = col) {
    h.font(ctx, 500, px); const w = word ? ctx.measureText(lab).width : 0; const r = px * 0.5; const tot = 2 * r + (word ? 8 + w : 0);
    const x0 = x - tot / 2; h.dot(ctx, x0 + r, y - px * 0.34, r, COL[col]); if (word) h.text(ctx, lab, x0 + 2 * r + 8, y, px, 500, INK);
  }
  function basket(ctx, cx, baseY, w, hh = 66, fill = '#fff', rimFill = fill) {
    const rim = baseY - hh, bw = w - 44;
    ctx.save();
    // side handles
    [-1, 1].forEach(sg => { ctx.beginPath(); ctx.ellipse(cx + sg * (w / 2 + 2), rim + 22, 12, 16, 0, 0, Math.PI * 2); h.pen(ctx, LW); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(cx - w / 2 + 6, rim + 12); ctx.lineTo(cx + w / 2 - 6, rim + 12); ctx.lineTo(cx + bw / 2, baseY); ctx.lineTo(cx - bw / 2, baseY); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); h.pen(ctx, LW); ctx.stroke();
    h.roundRect(ctx, cx - w / 2, rim, w, 16, 8); ctx.fillStyle = rimFill; ctx.fill(); ctx.stroke();
    const mid = rim + 16 + (hh - 16) / 2; h.line(ctx, cx - (w + bw) / 4 + 4, mid, cx + (w + bw) / 4 - 4, mid, { lw: 2.4 });
    for (let i = -2; i <= 2; i++) { const t = i / 5; h.line(ctx, cx + t * (w - 12), rim + 18, cx + t * bw, baseY - 2, { lw: 2.4 }); }
    ctx.restore();
  }
  // fruit pile sitting in a basket: up to 5 per row, bottom row drawn last
  function pile(ctx, kind, n, cx, rim, fs) {
    const rows = n > 5 ? [n - 5, 5] : [n]; const sp = fs * 1.05;
    rows.forEach((m, ri) => { const yy = rim - fs * 0.36 - (rows.length - 1 - ri) * fs * 0.98;
      for (let i = 0; i < m; i++) fr(ctx, kind, cx - (m - 1) * sp / 2 + i * sp, yy, fs); });
  }

  // ---------- pages ----------
  const P1 = {
    title: 'Color by dot', titleEs: 'Colorea según el punto',
    draw(ctx, d) {
      h.header(ctx, d, h.t(d, 'Color by dot', 'Colorea según el punto'), h.t(d, 'Look at the dot under each fruit. Color the fruit that color.', 'Mira el punto debajo de cada fruta. Colorea la fruta de ese color.'));
      const all = [['apple', 'red'], ['banana', 'yellow'], ['orange', 'orange'], ['grapes', 'purple'], ['pear', 'green'], ['strawberry', 'red'], ['pineapple', 'yellow'], ['watermelon', 'green']];
      const n = { 3: 4, 4: 6, 5: 8 }[d.age]; const items = h.shuffle(all.slice(0, n), d.rand);
      const cols = n / 2, cw = 730 / cols, fs = Math.min(230, cw - 36);
      items.forEach(([kind, col], i) => {
        const r = Math.floor(i / cols), cI = i % cols, x = 60 + cw * (cI + 0.5), top = 190 + r * 335, y = top + 130;
        fr(ctx, kind, x, y, fs); keyDot(ctx, x, y + fs / 2 + 46, col, d.age === 5 ? 22 : 26, true, colWord(d, col));
      });
      friend(ctx, d.character, 125, 922, 104, true);
      bubble(ctx, 215, 880, 380, 66, h.t(d, `Let's color, ${d.name}!`, `¡A colorear, ${d.name}!`), 28);
      h.tip(ctx, h.t(d, 'Grown-up tip: name each color together, then find a crayon that matches the dot.', 'Consejo para el adulto: digan juntos el nombre de cada color y busquen un crayón igual al punto.'));
    }
  };

  const P2 = {
    title: 'Which one does not belong?', titleEs: '¿Cuál es diferente?',
    draw(ctx, d) {
      const a5 = d.age === 5;
      h.header(ctx, d, h.t(d, 'Which one does not belong?', '¿Cuál es diferente?'), a5 ? h.t(d, 'Look closely! One fruit in each row is a little different. Circle it.', '¡Mira bien! En cada fila hay una fruta un poquito diferente. Enciérrala.') : h.t(d, 'Look at each row. Circle the one that is different.', 'Mira cada fila. Encierra la que es diferente.'));
      const n = d.age === 3 ? 3 : 4, m = n;
      const gap = 18, bh = (795 - gap * (n - 1)) / n, fs = Math.min(150, bh - 42), cw = 730 / m;
      let rows;
      if (!a5) rows = h.shuffle([['apple', 'carrot'], ['banana', 'grapes'], ['strawberry', 'pineapple'], ['orange', 'banana'], ['pear', 'cherry'], ['grapes', 'orange']], d.rand).slice(0, n).map(([a, b]) => ({ a, b, oa: {}, ob: {}, sb: 1 }));
      else rows = h.shuffle([
        { a: 'apple', b: 'apple', oa: {}, ob: { noStem: true }, sb: 1 }, { a: 'pear', b: 'pear', oa: {}, ob: {}, sb: 0.66 },
        { a: 'strawberry', b: 'strawberry', oa: {}, ob: { noSeeds: true }, sb: 1 }, { a: 'banana', b: 'banana', oa: {}, ob: { flip: true }, sb: 1 },
        { a: 'cherry', b: 'cherry', oa: {}, ob: { single: true }, sb: 1 }, { a: 'orange', b: 'orange', oa: {}, ob: { noLeaf: true }, sb: 1 }], d.rand).slice(0, n);
      rows.forEach((R, r) => {
        const top = 190 + r * (bh + gap); h.box(ctx, 60, top, 730, bh, 18); const odd = Math.floor(d.rand() * m);
        for (let i = 0; i < m; i++) { const x = 60 + cw * (i + 0.5), y = top + bh / 2; if (i === odd) fr(ctx, R.b, x, y + (1 - R.sb) * fs * 0.2, fs * R.sb, R.ob); else fr(ctx, R.a, x, y, fs, R.oa); }
      });
      h.tip(ctx, a5 ? h.t(d, 'Grown-up tip: check the size, stems, leaves, seeds and which way it points.', 'Consejo para el adulto: fíjense en el tamaño, el tallo, las hojas, las semillas y hacia dónde apunta.') : h.t(d, 'Grown-up tip: name each picture out loud. Which one is not like the others?', 'Consejo para el adulto: digan en voz alta el nombre de cada dibujo. ¿Cuál no es como los demás?'));
    }
  };

  const P3 = {
    title: 'Copy the pattern', titleEs: 'Copia el patrón',
    draw(ctx, d) {
      const a5 = d.age === 5;
      h.header(ctx, d, h.t(d, 'Copy the pattern', 'Copia el patrón'), a5 ? h.t(d, 'Color the bottom row just like the top row. Draw the fruit in each empty box.', 'Colorea abajo igual que arriba. Dibuja la fruta en cada cuadro vacío.') : h.t(d, 'Color the bottom row just like the top row.', 'Colorea la fila de abajo igual que la de arriba.'));
      const kindAB = h.shuffle([[['apple', 'red'], ['banana', 'yellow']], [['grapes', 'purple'], ['orange', 'orange']], [['strawberry', 'red'], ['pear', 'green']]], d.rand);
      const colorAB = h.shuffle([[['apple', 'red'], ['apple', 'green']], [['grapes', 'purple'], ['grapes', 'green']]], d.rand);
      const AAB = [['orange', 'orange'], ['orange', 'orange'], ['strawberry', 'red']], ABB = [['pear', 'green'], ['grapes', 'purple'], ['grapes', 'purple']];
      const ABC = [['apple', 'red'], ['banana', 'yellow'], ['grapes', 'purple']], cABB = [['apple', 'red'], ['apple', 'green'], ['apple', 'green']];
      let sets, L;
      if (d.age === 3) { sets = kindAB.slice(0, 2); L = 4; }
      else if (d.age === 4) { sets = h.shuffle([kindAB[0], colorAB[0], d.rand() < 0.5 ? AAB : ABB], d.rand); L = 6; }
      else { sets = h.shuffle([d.rand() < 0.5 ? AAB : ABB, ABC, cABB], d.rand); L = 6; }
      const gap = 20, n = sets.length, bh = (790 - gap * (n - 1)) / n;
      const fs = d.age === 3 ? 120 : 84, sp = d.age === 3 ? 160 : 112, x0 = 455 - (L - 1) * sp / 2;
      sets.forEach((unit, si) => {
        const top = 190 + si * (bh + gap); h.box(ctx, 60, top, 730, bh, 18);
        const yA = top + 18 + fs / 2, yK = yA + fs / 2 + 30, yB = top + bh - 18 - fs / 2;
        h.line(ctx, 120, (yK + yB - fs / 2) / 2 + 2, 780, (yK + yB - fs / 2) / 2 + 2, { lw: 2, color: LINE, dash: [8, 8] });
        // arrow: top row -> copy row
        h.line(ctx, 92, yA - 8, 92, yB + 8, { lw: 3.5, color: SOFT }); h.path(ctx, `M80,${yB - 6} L92,${yB + 10} L104,${yB - 6}`, { lw: 3.5, color: SOFT });
        const blanks = a5 ? h.shuffle([1, 2, 3, 4, 5], d.rand).slice(0, 2) : [];
        for (let i = 0; i < L; i++) {
          const [kind, col] = unit[i % unit.length], x = x0 + i * sp;
          fr(ctx, kind, x, yA, fs); keyDot(ctx, x, yK, col, 17, true, colWord(d, col));
          if (blanks.includes(i)) h.box(ctx, x - fs / 2 - 4, yB - fs / 2 - 4, fs + 8, fs + 8, 12, SOFT, 2.5, [7, 7]);
          else fr(ctx, kind, x, yB, fs);
        }
      });
      h.tip(ctx, h.t(d, 'Grown-up tip: read the top row out loud together, then copy it one fruit at a time.', 'Consejo para el adulto: lean juntos la fila de arriba en voz alta y cópienla fruta por fruta.'));
    }
  };

  const P4 = {
    title: 'More or less?', titleEs: '¿Más o menos?',
    draw(ctx, d) {
      const a5 = d.age === 5;
      h.header(ctx, d, h.t(d, 'Which basket has more?', '¿Qué canasta tiene más?'), a5 ? h.t(d, 'Count the fruit. Circle the basket with MORE. If both are the same, circle the = sign.', 'Cuenta las frutas. Encierra la canasta que tiene MÁS. Si tienen igual, encierra el signo =.') : h.t(d, 'Count the fruit in each basket. Circle the basket with MORE.', 'Cuenta las frutas. Encierra la canasta que tiene MÁS.'));
      const n = d.age === 3 ? 3 : 4, max = { 3: 5, 4: 8, 5: 10 }[d.age], minDiff = { 3: 3, 4: 2, 5: 1 }[d.age];
      const kinds = h.shuffle(['apple', 'orange', 'strawberry', 'pear'], d.rand);
      const sameRow = a5 ? 1 + Math.floor(d.rand() * 3) : -1;
      const used = new Set();
      const top0 = a5 ? 214 : 190, gap = 16, bh = (985 - top0 - gap * (n - 1)) / n;
      for (let r = 0; r < n; r++) {
        let a, b, tries = 0;
        do { a = 1 + Math.floor(d.rand() * max); b = 1 + Math.floor(d.rand() * max); tries++; }
        while (tries < 200 && (r === sameRow ? (a !== b || a < 3) : (Math.abs(a - b) < minDiff || (a5 && Math.abs(a - b) > 4) || used.has(a + ',' + b))));
        used.add(a + ',' + b);
        const top = top0 + r * (bh + gap); h.box(ctx, 60, top, 730, bh, 18);
        const fs = max <= 5 ? 66 : 52, bk = max <= 5 ? 62 : 52, baseY = top + bh - 14, kind = kinds[r % kinds.length];
        [[230, a], [620, b]].forEach(([cx, c]) => { pile(ctx, kind, c, cx, baseY - bk, fs); basket(ctx, cx, baseY, 290, bk); });
        if (a5) { h.circle(ctx, 425, top + bh / 2, 30, { lw: 3 }); h.text(ctx, '=', 425, top + bh / 2 + 15, 44, 700, INK, 'center'); }
      }
      if (a5) h.text(ctx, h.t(d, '=  means the SAME', '=  quiere decir IGUAL'), 425, 200, 18, 500, SOFT, 'center');
      h.tip(ctx, h.t(d, 'Grown-up tip: touch each fruit while you count. Which number is bigger?', 'Consejo para el adulto: toquen cada fruta mientras cuentan. ¿Qué número es más grande?'));
    }
  };

  const P5 = {
    title: 'Market list', titleEs: 'Lista del mercado',
    draw(ctx, d) {
      h.header(ctx, d, h.t(d, "{name}'s market list", 'La lista del mercado de {name}'), h.t(d, 'Count the fruit on the list. At the market, circle just that many.', 'Mira la lista. En el mercado, encierra esa misma cantidad.'));
      const nk = d.age === 3 ? 2 : 3, maxN = { 3: 3, 4: 5, 5: 7 }[d.age], minN = { 3: 1, 4: 2, 5: 3 }[d.age];
      const kinds = h.shuffle(['apple', 'pear', 'orange', 'strawberry', 'banana'], d.rand).slice(0, nk);
      const need = kinds.map(() => minN + Math.floor(d.rand() * (maxN - minN + 1)));
      if (nk > 1 && need.every(v => v === need[0])) need[0] = need[0] === maxN ? maxN - 1 : need[0] + 1;
      const have = need.map(v => Math.min(10, v + 2 + Math.floor(d.rand() * 2)));
      // list card
      const cardW = 540; h.box(ctx, 60, 182, cardW, 150, 18, INK, 3);
      for (let i = 0; i < 4; i++) h.circle(ctx, 120 + i * 140, 182, 7, { lw: 3, fill: '#fff' });
      const cw = cardW / nk;
      kinds.forEach((kind, i) => {
        const cx = 60 + cw * (i + 0.5); h.text(ctx, String(need[i]), cx - 30, 280, 64, 700, d.accent, 'right'); fr(ctx, kind, cx + 30, 257, 86);
        if (d.age === 3) for (let j = 0; j < need[i]; j++) h.dot(ctx, cx - 50 - (need[i] - 1) * 9 + j * 18, 308, 5.5, INK);
      });
      friend(ctx, d.character, 705, 252, 118, true);
      // market stall
      const sx1 = 70, sx2 = 780, aw = 392, ah = 70;
      h.line(ctx, sx1 + 18, aw + ah, sx1 + 18, 975); h.line(ctx, sx2 - 18, aw + ah, sx2 - 18, 975);
      ctx.save(); ctx.beginPath(); ctx.moveTo(sx1, aw + ah - 18); ctx.lineTo(sx1 + 20, aw); ctx.lineTo(sx2 - 20, aw); ctx.lineTo(sx2, aw + ah - 18);
      const sc = 10, sw = (sx2 - sx1) / sc; for (let i = sc; i > 0; i--) { const x = sx1 + i * sw; ctx.arc(x - sw / 2, aw + ah - 18, sw / 2, 0, Math.PI); }
      ctx.closePath(); ctx.fillStyle = '#fff'; ctx.fill(); h.pen(ctx, LW); ctx.stroke(); ctx.restore();
      for (let i = 1; i < sc; i++) h.line(ctx, sx1 + 20 + i * (sx2 - sx1 - 40) / sc, aw, sx1 + i * sw, aw + ah - 18, { lw: 2.4 });
      const sgW = h.t(d, 200, 270), sgX = 425 - sgW / 2, sgT = h.t(d, 'FRUIT MARKET', 'MERCADO DE FRUTAS');
      h.box(ctx, sgX, aw - 34, sgW, 46, 12, INK, 3); ctx.save(); h.roundRect(ctx, sgX + 2, aw - 32, sgW - 4, 42, 11); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore();
      h.box(ctx, sgX, aw - 34, sgW, 46, 12, INK, 3); const sgPx = d.lang === 'es' ? h.fitText(ctx, sgT, sgW - 24, 22, 700) : 22; h.text(ctx, sgT, 425, aw - 3, sgPx, 700, INK, 'center');
      const shTop = aw + ah + 10, shBot = 960, rh = (shBot - shTop) / nk;
      kinds.forEach((kind, i) => {
        const sp = Math.min(d.age === 3 ? 110 : 92, 640 / have[i]), fs = Math.min(d.age === 3 ? 96 : 84, sp - 6), y = shTop + rh * (i + 1) - 22 - fs / 2 + 4;
        for (let j = 0; j < have[i]; j++) fr(ctx, kind, 425 - (have[i] - 1) * sp / 2 + j * sp, y, fs);
        h.line(ctx, sx1 + 18, shTop + rh * (i + 1) - 18, sx2 - 18, shTop + rh * (i + 1) - 18, { lw: LW }); h.line(ctx, sx1 + 18, shTop + rh * (i + 1) - 8, sx2 - 18, shTop + rh * (i + 1) - 8, { lw: 2.4 });
      });
      ctx.save(); h.roundRect(ctx, sx1, 960, sx2 - sx1, 26, 8); ctx.fillStyle = '#fff'; ctx.fill(); h.pen(ctx, LW); ctx.stroke(); ctx.restore();
      h.tip(ctx, h.t(d, 'Grown-up tip: point to each number on the list and count out loud as you circle.', 'Consejo para el adulto: señalen cada número de la lista y cuenten en voz alta mientras encierran.'));
    }
  };

  const P6 = {
    title: "What's inside?", titleEs: '¿Qué hay adentro?',
    draw(ctx, d) {
      h.header(ctx, d, h.t(d, "What's inside?", '¿Qué hay adentro?'), h.t(d, 'Draw a line from each fruit to what it looks like inside.', 'Une con una línea cada fruta con cómo se ve por dentro.'));
      const pairs = [['orange', 'orangeSlice'], ['watermelon', 'melonSlice'], ['apple', 'appleHalf'], ['banana', 'bananaPeeled'], ['kiwi', 'kiwiSlice']];
      const n = { 3: 3, 4: 4, 5: 5 }[d.age]; const L = h.shuffle(pairs.slice(0, n), d.rand); const R = h.shuffle(L.slice(), d.rand);
      if (n > 1 && R.every((p, i) => p === L[i])) R.push(R.shift());
      const y0 = 190, y1 = 750, rh = (y1 - y0) / n, fs = Math.min(150, rh - 12);
      L.forEach((p, i) => { const y = y0 + rh * (i + 0.5); fr(ctx, p[0], 170, y, fs); h.dot(ctx, 290, y, 9, d.accent); });
      R.forEach((p, i) => { const y = y0 + rh * (i + 0.5); fr(ctx, p[1], 680, y, fs); h.dot(ctx, 560, y, 9, d.accent); });
      // drawing box
      const bt = 790; const lab = h.t(d, `Draw ${h.possessive(d.name)} favorite fruit`, `Dibuja la fruta favorita de ${d.name}`);
      const px = h.fitText(ctx, lab, 560, 26, 700); h.text(ctx, lab, 60, bt, px, 700, INK);
      h.box(ctx, 60, bt + 16, 730, 980 - bt - 16, 18, INK, 3);
      friend(ctx, d.character, 735, bt + 70, 84, true);
      h.tip(ctx, h.t(d, 'Grown-up tip: if you can, cut a real fruit together and look inside.', 'Consejo para el adulto: si pueden, corten juntos una fruta de verdad y miren por dentro.'));
    }
  };

  K.register({
    id: 'fruit', title: 'Fruit & Color Fun', titleEs: 'Frutas y colores',
    characters: [{ id: 'strawberry', label: 'Strawberry', labelEs: 'Fresa' }, { id: 'banana', label: 'Banana', labelEs: 'Plátano' }, { id: 'apple', label: 'Apple', labelEs: 'Manzana' }, { id: 'pineapple', label: 'Pineapple', labelEs: 'Piña' }],
    certText: 'You finished your Fruit & Color Fun!', certTextEs: '¡Terminaste tu libro de frutas y colores!',
    hasNameTrace: false,
    charArticleEs(d) { return d.character === 'banana' ? 'el' : 'la'; }, // fresa, manzana, piña = la · plátano = el
    // big line-art fruit friend for the coloring page (size 470) and the reward badges (size 104): white, no colour fills
    drawCharacter(ctx, d, id, cx, cy, size) {
      const BX = { strawberry: [0, 5, 101, 101], banana: [-1, 8, 94, 99], apple: [-3, 8, 103, 103], pineapple: [6, 3, 94, 110] }[id] || [0, 0, 100, 100];
      const bw = BX[2] - BX[0], bh = BX[3] - BX[1], s = size * 0.94 / Math.max(bw, bh) * 100, k = s / 100;
      const x = cx - ((BX[0] + BX[2]) / 2 - 50) * k, y = cy - ((BX[1] + BX[3]) / 2 - 50) * k;
      const sc = Math.max(2.5, size / 90) / LW;
      friend(ctx, id, x, y, s, true, { sc, fr: { noBlush: true } });
    },
    coverSky: '#CDEBFA',
    coverBg(ctx, d) { // fruit-market stall: sky, sun, clouds, hills, striped awning, wooden posts, gingham tablecloth
      let g = ctx.createLinearGradient(0, 30, 0, 700); g.addColorStop(0, '#A9DCF5'); g.addColorStop(1, '#E6F6FD'); ctx.fillStyle = g; ctx.fillRect(0, 0, 850, 800);
      // sun (peeks out on the right)
      ctx.save(); ctx.strokeStyle = '#F7C948'; ctx.lineWidth = 7; ctx.lineCap = 'round';
      for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 + 0.2; ctx.beginPath(); ctx.moveTo(705 + 46 * Math.cos(a), 445 + 46 * Math.sin(a)); ctx.lineTo(705 + 60 * Math.cos(a), 445 + 60 * Math.sin(a)); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(705, 445, 35, 0, Math.PI * 2); ctx.fillStyle = '#FFD75E'; ctx.fill(); ctx.restore();
      const cloud = (x, y, r) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.arc(x + r * 1.1, y - r * 0.45, r * 1.2, 0, Math.PI * 2); ctx.arc(x + r * 2.3, y, r * 0.95, 0, Math.PI * 2); ctx.rect(x, y - r * 0.2, r * 2.3, r * 1.0); ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fill(); };
      cloud(110, 470, 20); cloud(290, 455, 15); cloud(540, 470, 17);
      // hills
      ctx.beginPath(); ctx.moveTo(0, 650); ctx.bezierCurveTo(110, 630, 230, 630, 300, 660); ctx.bezierCurveTo(380, 695, 470, 695, 560, 665); ctx.bezierCurveTo(630, 640, 740, 635, 850, 650); ctx.lineTo(850, 820); ctx.lineTo(0, 820); ctx.closePath(); ctx.fillStyle = '#BFE3A2'; ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, 735); ctx.quadraticCurveTo(250, 690, 440, 700); ctx.quadraticCurveTo(660, 712, 850, 730); ctx.lineTo(850, 820); ctx.lineTo(0, 820); ctx.closePath(); ctx.fillStyle = '#9CD486'; ctx.fill();
      // wooden posts
      [[48, 82], [768, 802]].forEach(([a, b]) => { ctx.fillStyle = '#C98E5A'; ctx.fillRect(a, 380, b - a, 430); ctx.fillStyle = 'rgba(0,0,0,0.08)'; ctx.fillRect(b - 9, 380, 9, 430); });
      // striped awning with scalloped edge
      const ay = 330, ab = 392, n = 12, sw = 850 / n;
      for (let i = 0; i < n; i++) { const x = i * sw; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + sw, 0); ctx.lineTo(x + sw, ab); ctx.arc(x + sw / 2, ab, sw / 2, 0, Math.PI); ctx.closePath(); ctx.fillStyle = i % 2 ? '#FFF4E2' : '#F2786D'; ctx.fill(); }
      ctx.fillStyle = 'rgba(0,0,0,0.07)'; ctx.fillRect(0, ay, 850, 10);
      // bunting in the accent colour
      ctx.save(); ctx.strokeStyle = '#8A6A4A'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(82, 405); ctx.quadraticCurveTo(425, 445, 768, 405); ctx.stroke();
      for (let i = 1; i < 12; i++) { const t = i / 12, x = (1 - t) * (1 - t) * 82 + 2 * t * (1 - t) * 425 + t * t * 768, y = (1 - t) * (1 - t) * 405 + 2 * t * (1 - t) * 445 + t * t * 405;
        if (x > 300 && x < 550) continue; // keep the middle clear for the main character
        ctx.beginPath(); ctx.moveTo(x - 14, y); ctx.lineTo(x + 14, y); ctx.lineTo(x, y + 26); ctx.closePath(); ctx.fillStyle = i % 2 ? d.accent : '#FFF4E2'; ctx.fill(); }
      ctx.restore();
      // table top + gingham tablecloth
      ctx.fillStyle = '#B97A47'; ctx.fillRect(0, 792, 850, 18);
      ctx.fillStyle = '#FFF8EE'; ctx.fillRect(0, 810, 850, 290);
      ctx.fillStyle = 'rgba(232,96,86,0.38)'; for (let x = 0; x < 850; x += 56) ctx.fillRect(x, 810, 28, 290); for (let y = 810; y < 1100; y += 56) ctx.fillRect(0, y, 850, 28);
      ctx.fillStyle = 'rgba(0,0,0,0.10)'; ctx.fillRect(0, 810, 850, 6);
    },
    coverArt(ctx, d) { // colour version (cover only); interior pages stay line art
      const PAL = { strawberry: { body: '#EE5A52', leaf: '#53B36B' }, banana: { body: '#F8D44C', stem: '#9C7A4A' }, apple: { body: '#E8473E', leaf: '#53B36B' },
        pineapple: { body: '#F6B63E', leaf: '#53B36B' }, orange: { body: '#F59A2E', leaf: '#53B36B' }, grapes: { body: '#9B67D6', leaf: '#53B36B' },
        pear: { body: '#B5D65C', leaf: '#53B36B' }, cherry: { body: '#D93A4C', leaf: '#53B36B' } };
      const FO = id => ({ pal: PAL[id], shine: true }), A = d.accent;
      const others = ['strawberry', 'banana', 'apple', 'pineapple'].filter(c => c !== d.character);
      const onGround = (id, gy, sz) => gy - (FRIEND[id].fy + 13 - 50) * sz / 100; // y so the feet rest on ground gy
      friend(ctx, others[0], 170, onGround(others[0], 650, 130), 130, false, { foot: A, fr: FO(others[0]) });
      friend(ctx, others[1], 685, onGround(others[1], 654, 130), 130, true, { foot: A, fr: FO(others[1]) });
      friend(ctx, d.character, 425, 548, 270, true, { sc: 1.35, foot: A, hand: '#fff', fr: FO(d.character) });
      // basket of fruit on the table
      [['grapes', 330, 735], ['orange', 400, 728], ['pear', 470, 726], ['apple', 540, 730]].forEach(([kd, x, y]) => fr(ctx, kd, x, y, 86, { pal: PAL[kd] }));
      basket(ctx, 435, 822, 320, 70, '#E2B07A', '#D19A5E');
      friend(ctx, others[2], 165, 728, 120, false, { foot: A, fr: FO(others[2]) });
      fr(ctx, 'cherry', 700, 752, 100, { pal: PAL.cherry });
      h.sparkle(ctx, 255, 520, 12, '#fff'); h.sparkle(ctx, 600, 525, 14, '#fff');
    },
    certArt(ctx, d) {
      friend(ctx, d.character, 425, 760, 190, true);
      fr(ctx, 'orange', 250, 800, 90); fr(ctx, 'grapes', 600, 800, 90);
      h.sparkle(ctx, 300, 690, 14, d.accent); h.sparkle(ctx, 560, 680, 14, d.accent);
    },
    pages: [P1, P2, P3, P4, P5, P6]
  });
(TCK.ART=TCK.ART||{}).fruit=(ctx,n,x,y,s,f)=>{if(n.startsWith('friend:'))friend(ctx,n.slice(7),x,y,s,true,{});else fr(ctx,n,x,y,s,{});};TCK.ARTLIST=TCK.ARTLIST||{};TCK.ARTLIST.fruit=Object.keys(F).concat(['friend:apple','friend:banana','friend:strawberry','friend:pineapple']);
})();
