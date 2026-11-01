/* TidyCents · Pre-K Learning Adventures · Book 3 · Nature Explorers (id: nature) */
(function () {
  const K = TCK, h = K.h, INK = K.INK, GREY = K.GREY, LINE = K.LINE, SOFT = K.SOFT, BLUE = K.BLUE, W = '#fff';
  const GL = window.TC_GLYPHS;

  // ---------- drawing kit inside a 100x100 icon box (k = icon units per page unit) ----------
  function G(ctx, k) {
    const st = (p, o) => {
      if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(p); }
      if (o.noStroke) return;
      h.pen(ctx, (o.lw || 3.5) * k, o.color || INK);
      if (o.dash) ctx.setLineDash(o.dash.map(v => v * k));
      ctx.stroke(p); ctx.setLineDash([]);
    };
    return {
      p: (d, o = {}) => st(new Path2D(d), o),
      c: (x, y, r, o = {}) => { const p = new Path2D(); p.arc(x, y, r, 0, Math.PI * 2); st(p, o); },
      e: (x, y, rx, ry, rot, o = {}) => { const p = new Path2D(); p.ellipse(x, y, rx, ry, rot || 0, 0, Math.PI * 2); st(p, o); },
      dot: (x, y, r, col = INK) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); }
    };
  }
  // draw another art inside the current 100-box at center x,y with size s (keeps line weight)
  function sub(ctx, k, name, x, y, s, ...args) { ctx.save(); ctx.translate(x - s / 2, y - s / 2); ctx.scale(s / 100, s / 100); ART[name](ctx, k * 100 / s, ...args); ctx.restore(); }
  const mirror = (ctx, fn) => { ctx.save(); ctx.translate(100, 0); ctx.scale(-1, 1); fn(); ctx.restore(); };
  const leafPair = (g, y, sz, o = {}) => {
    g.p(`M50,${y} Q${50 - sz * 0.45},${y - sz} ${50 - sz},${y - sz * 0.75} Q${50 - sz * 0.7},${y - sz * 0.05} 50,${y} Z`, Object.assign({ fill: W }, o));
    g.p(`M50,${y} Q${50 + sz * 0.45},${y - sz} ${50 + sz},${y - sz * 0.75} Q${50 + sz * 0.7},${y - sz * 0.05} 50,${y} Z`, Object.assign({ fill: W }, o));
  };
  const drop = (g, x, y, A) => g.p(`M${x},${y - 8} Q${x + 6},${y + 1} ${x},${y + 4} Q${x - 6},${y + 1} ${x},${y - 8} Z`, { fill: A, lw: 2.5 });
  const CLOUD = 'M26,72 Q10,72 11,59 Q12,46 27,47 Q29,30 46,30 Q61,30 66,42 Q80,38 86,52 Q92,68 78,72 Z';
  const SOIL = 'M6,70 Q28,64 50,70 Q72,76 94,70 L94,94 L6,94 Z';
  const PUDDLE = 'M10,80 Q12,68 32,70 Q46,62 64,68 Q86,64 90,77 Q93,90 70,90 L28,92 Q8,92 10,80 Z';

  const ART = {
    // ----- characters -----
    // P (optional) = palette: undefined -> interior style (unchanged); {mono:1} -> coloring line art; colors -> cover
    ladybug(ctx, k, A, P) {
      const g = G(ctx, k);
      g.p('M24,48 L12,42 M21,62 L9,63 M25,78 L14,86 M76,48 L88,42 M79,62 L91,63 M75,78 L86,86', { lw: 3 });
      g.c(50, 60, 31, { fill: P && P.body || W });
      g.p('M50,40 L50,91');
      [[37, 52, 6], [35, 72, 5], [63, 52, 6], [65, 72, 5]].forEach(([x, y, r]) => g.c(x, y, P && P.mono ? r * 1.25 : r, { fill: P ? P.spot || W : A, lw: 2.5 }));
      g.p('M44,16 Q40,7 32,6 M56,16 Q60,7 68,6', { lw: 3 }); g.dot(32, 6, 3); g.dot(68, 6, 3);
      g.c(50, 28, 15, { fill: P && P.head || W });
      const e = P && P.eye || INK;
      g.dot(44, 26, 2.6, e); g.dot(56, 26, 2.6, e); g.p('M45,32 Q50,36 55,32', { lw: 2.5, color: e });
      if (P && P.cheek) { g.c(40, 32, 2.6, { fill: P.cheek, noStroke: true }); g.c(60, 32, 2.6, { fill: P.cheek, noStroke: true }); }
    },
    bee(ctx, k, A, P) {
      const g = G(ctx, k);
      g.e(42, 26, 11, 17, -0.35, { fill: P && P.wing || W, lw: 3 }); g.e(60, 26, 11, 17, 0.35, { fill: P && P.wing || W, lw: 3 });
      g.p('M82,51 L96,58 L82,65 Z', { fill: P && P.stripe || W, lw: 3 });
      g.e(50, 58, 36, 24, 0, { fill: P && P.body || W });
      if (P && P.stripe) {
        ctx.save(); const cl = new Path2D(); cl.ellipse(50, 58, 36, 24, 0, 0, Math.PI * 2); ctx.clip(cl);
        g.p('M57,30 Q64,58 57,86 M72,30 Q78,58 72,86', { lw: 8, color: P.stripe }); ctx.restore();
        g.e(50, 58, 36, 24, 0, {});
      } else g.p('M56,35 Q63,58 56,81 M71,39 Q77,58 71,77');
      g.dot(28, 52, 3.2); g.p('M22,62 Q28,68 35,63', { lw: 2.5 });
      if (P && P.mono) g.c(39, 61, 4, { fill: W, lw: 2.5 }); else g.c(39, 61, 3.5, { fill: P && P.cheek || A, noStroke: true });
      g.p('M24,41 Q18,29 11,27 M31,37 Q29,25 25,17', { lw: 3 }); g.dot(11, 27, 3); g.dot(25, 17, 3);
    },
    butterfly(ctx, k, A, P) {
      const g = G(ctx, k);
      const wing = () => {
        g.p('M50,46 C36,14 8,8 8,30 C8,46 28,54 50,52 Z', { fill: P && P.wing || W });
        g.p('M50,54 C32,56 16,68 22,82 C28,94 46,80 50,60 Z', { fill: P && P.wing2 || P && P.wing || W });
        if (P) { g.c(26, 30, 7, { fill: P.spot || W, lw: 3 }); g.c(33, 72, 5, { fill: P.spot || W, lw: 3 }); }
        else { g.c(26, 30, 7, { color: A, lw: 3 }); g.c(33, 72, 5, { color: A, lw: 3 }); }
      };
      wing(); mirror(ctx, wing);
      g.e(50, 58, 6, 24, 0, { fill: P && P.body || W });
      g.p('M46,24 Q40,11 32,10 M54,24 Q60,11 68,10', { lw: 3 }); g.dot(32, 10, 3); g.dot(68, 10, 3);
      g.c(50, 30, 8, { fill: P && P.head || W }); g.dot(47, 29, 1.8); g.dot(53, 29, 1.8);
      if (P && (P.mono || P.cheek)) g.p('M47.5,33 Q50,35 52.5,33', { lw: 2 });
    },
    frog(ctx, k, A, P) {
      const g = G(ctx, k);
      g.p('M12,78 C8,52 26,38 50,38 C74,38 92,52 88,78 C82,90 18,90 12,78 Z', { fill: P && P.body || W });
      if (P && P.belly) g.e(50, 76, 22, 10, 0, { fill: P.belly, lw: 2.5 });
      g.e(28, 87, 12, 5.5, 0, { fill: P && P.body || W, lw: 3 }); g.e(72, 87, 12, 5.5, 0, { fill: P && P.body || W, lw: 3 });
      g.c(32, 32, 13, { fill: P && P.body || W }); g.c(68, 32, 13, { fill: P && P.body || W });
      if (P && P.body) { g.c(33, 33, 8.5, { fill: W, lw: 2.5 }); g.c(67, 33, 8.5, { fill: W, lw: 2.5 }); }
      g.dot(34, 33, 4.5); g.dot(66, 33, 4.5);
      g.dot(45, 50, 1.8); g.dot(55, 50, 1.8);
      g.p('M30,60 Q50,76 70,60');
      if (P && P.mono) { g.c(22, 64, 4.5, { fill: W, lw: 2.5 }); g.c(78, 64, 4.5, { fill: W, lw: 2.5 }); }
      else { g.c(22, 64, 4, { fill: P && P.cheek || A, noStroke: true }); g.c(78, 64, 4, { fill: P && P.cheek || A, noStroke: true }); }
    },
    ant(ctx, k) {
      const g = G(ctx, k);
      g.p('M40,60 L30,72 L22,78 M47,63 L46,78 L40,86 M53,61 L62,72 L70,78', { lw: 3 });
      g.e(22, 56, 17, 13, 0, { fill: W }); g.e(46, 56, 10, 8, 0, { fill: W }); g.c(69, 48, 13, { fill: W });
      g.dot(73, 45, 2.8); g.p('M69,54 Q74,58 79,53', { lw: 2.5 });
      g.p('M71,35 Q75,24 85,22 M64,36 Q61,26 65,18', { lw: 3 }); g.dot(85, 22, 3); g.dot(65, 18, 3);
    },
    // ----- plants -----
    plant(ctx, k, A, stage) {
      const g = G(ctx, k);
      g.p(SOIL);
      [[16, 84], [30, 90], [74, 86], [86, 80], [62, 90]].forEach(([x, y]) => g.dot(x, y, 1.8, GREY));
      if (stage <= 1) g.p('M40,84 Q48,72 60,80 Q54,92 40,84 Z', { fill: A, lw: 3 });
      if (stage === 1) { g.p('M50,78 Q47,64 50,52'); leafPair(g, 54, 18); }
      if (stage === 2) { g.p('M50,71 Q47,52 50,32'); leafPair(g, 62, 22); leafPair(g, 42, 15); }
      if (stage === 3) {
        g.p('M50,71 Q47,50 50,26'); leafPair(g, 62, 22); leafPair(g, 44, 15);
        g.p('M50,6 C61,14 60,26 50,28 C40,26 39,14 50,6 Z', { fill: W }); g.p('M50,11 L50,24', { color: A, lw: 3 });
        g.p('M42,24 Q50,33 58,24', { lw: 3 });
      }
      if (stage === 4) { g.p('M50,71 Q47,50 50,30'); leafPair(g, 62, 22); leafPair(g, 46, 15); ART.head(ctx, k, A, 50, 21, 1); }
    },
    head(ctx, k, A, x, y, s) { // little flower head
      const g = G(ctx, k);
      for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; g.c(x + 11 * s * Math.cos(a), y + 11 * s * Math.sin(a), 8.5 * s, { fill: W, lw: 3 }); }
      g.c(x, y, 7 * s, { fill: A, lw: 3 });
    },
    bloom(ctx, k, A) { // flower without soil (decoration)
      const g = G(ctx, k);
      g.p('M50,98 Q46,64 50,34'); leafPair(g, 80, 22); leafPair(g, 60, 15); ART.head(ctx, k, A, 50, 22, 1.25);
    },
    wilted(ctx, k, A) {
      const g = G(ctx, k);
      g.p(SOIL);
      [[16, 84], [30, 90], [74, 86], [86, 80]].forEach(([x, y]) => g.dot(x, y, 1.8, GREY));
      g.p('M50,70 Q47,36 62,24 Q76,16 80,30');
      g.p('M50,60 Q40,58 30,70 Q44,72 50,62 Z', { fill: W, lw: 3 });
      g.p('M50,48 Q60,50 66,62 Q54,62 50,50 Z', { fill: W, lw: 3 });
      g.c(80, 34, 5, { fill: A, lw: 3 });
      g.e(72, 46, 5, 11, 0.4, { fill: W, lw: 3 }); g.e(88, 46, 5, 11, -0.4, { fill: W, lw: 3 }); g.e(80, 49, 5.5, 12, 0, { fill: W, lw: 3 });
    },
    // ----- weather -----
    sun(ctx, k, A) {
      const g = G(ctx, k);
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; g.p(`M${50 + 28 * Math.cos(a)},${50 + 28 * Math.sin(a)} L${50 + 41 * Math.cos(a)},${50 + 41 * Math.sin(a)}`, { color: A }); }
      g.c(50, 50, 21, { fill: W });
      g.dot(43, 46, 2.6); g.dot(57, 46, 2.6); g.p('M42,55 Q50,62 58,55', { lw: 3 });
    },
    cloud(ctx, k) { G(ctx, k).p(CLOUD, { fill: W }); },
    rain(ctx, k, A) {
      const g = G(ctx, k);
      ctx.save(); ctx.translate(0, -16); g.p(CLOUD, { fill: W }); ctx.restore();
      drop(g, 30, 72, A); drop(g, 50, 80, A); drop(g, 70, 72, A); drop(g, 40, 93, A); drop(g, 62, 93, A);
    },
    wind(ctx, k, A) {
      const g = G(ctx, k);
      g.p('M8,30 L56,30 Q70,30 70,20 Q70,10 60,10 Q52,10 52,18');
      g.p('M8,50 L74,50 Q90,50 90,62 Q90,74 78,74 Q70,74 70,66');
      g.p('M18,68 L52,68');
      g.p('M14,92 Q22,76 38,80 Q30,96 14,92 Z', { fill: W, lw: 3 }); g.p('M16,91 L32,83', { color: A, lw: 2.5 });
    },
    cool(ctx, k, A) {
      const g = G(ctx, k);
      for (let i = 0; i < 5; i++) { const a = Math.PI * (1.1 + i * 0.2); g.p(`M${40 + 26 * Math.cos(a)},${72 + 26 * Math.sin(a)} L${40 + 36 * Math.cos(a)},${72 + 36 * Math.sin(a)}`, { color: A }); }
      g.p('M20,72 A20,20 0 0 1 60,72 Z', { fill: W });
      g.p('M4,72 L96,72');
      g.p('M12,84 L36,84 M48,84 L70,84', { lw: 3 });
      ctx.save(); ctx.lineWidth = 3.5 * k; ctx.strokeStyle = INK; ctx.fillStyle = W; h.roundRect(ctx, 76, 8, 12, 46, 6); ctx.fill(); ctx.stroke(); ctx.restore();
      g.c(82, 58, 8, { fill: A, lw: 3 }); g.p('M82,40 L82,52', { color: A, lw: 4 });
    },
    // ----- clothes -----
    sunwear(ctx, k, A) {
      const g = G(ctx, k);
      g.e(50, 40, 42, 10, 0, { fill: W });
      g.p('M29,40 C29,12 71,12 71,40 Z', { fill: W });
      g.p('M30,33 Q50,37 70,33', { color: A, lw: 4 });
      ctx.save(); ctx.lineWidth = 3.5 * k; ctx.strokeStyle = INK; ctx.fillStyle = W;
      h.roundRect(ctx, 20, 62, 26, 20, 8); ctx.fill(); ctx.stroke(); h.roundRect(ctx, 54, 62, 26, 20, 8); ctx.fill(); ctx.stroke(); ctx.restore();
      g.p('M46,68 Q50,64 54,68 M20,67 L10,63 M80,67 L90,63', { lw: 3 });
      g.p('M26,74 L31,68 M60,74 L65,68', { color: A, lw: 2.5 });
    },
    rainwear(ctx, k, A) {
      const g = G(ctx, k);
      g.p('M38,44 L38,78 Q38,87 31,87 Q24,87 24,80');
      g.p('M8,44 Q10,12 38,10 Q66,12 68,44 Q61,38 53,44 Q45,38 38,44 Q31,38 23,44 Q15,38 8,44 Z', { fill: W });
      g.p('M38,11 Q30,24 23,43 M38,11 Q46,24 53,43 M38,10 L38,4', { lw: 3 });
      g.p('M70,54 L86,54 L86,80 Q95,81 95,89 L95,94 L68,94 Z', { fill: W });
      g.p('M70,61 L86,61', { color: A, lw: 4 });
    },
    kite(ctx, k, A) {
      const g = G(ctx, k);
      g.p('M50,72 Q40,80 50,86 Q60,92 52,98', { lw: 3 });
      g.p('M50,6 L76,38 L50,72 L24,38 Z', { fill: W });
      g.p('M50,6 L50,72 M24,38 L76,38', { lw: 2.5 });
      [[45, 80], [56, 91]].forEach(([x, y]) => g.p(`M${x - 6},${y - 4} L${x + 6},${y + 4} L${x + 6},${y - 4} L${x - 6},${y + 4} Z`, { fill: A, lw: 2 }));
    },
    jacket(ctx, k, A) {
      const g = G(ctx, k);
      g.p('M30,16 L42,12 Q50,22 58,12 L70,16 L90,42 L80,52 L72,42 L72,92 L28,92 L28,42 L20,52 L10,42 Z', { fill: W });
      g.p('M42,12 L45,30 L50,22 L55,30 L58,12', { lw: 3 });
      g.p('M50,24 L50,92', { lw: 3 });
      g.p('M34,68 L44,68 M56,68 L66,68', { lw: 3 });
      g.p('M14,46 L24,38 M86,46 L76,38', { color: A, lw: 3 });
      g.c(50, 40, 2.8, { fill: A, noStroke: true });
    },
    // ----- ice cream -----
    ice(ctx, k, A, v) {
      const g = G(ctx, k);
      const cone = (dy) => { g.p(`M36,${52 + dy} L50,${94} L64,${52 + dy} Z`, { fill: W }); g.p(`M41,${62 + dy * 0.5} L57,${70} M59,${62 + dy * 0.5} L45,${76}`, { lw: 2.5 }); };
      const scoop = (y) => g.p(`M33,${y} Q28,${y - 24} 50,${y - 28} Q72,${y - 24} 67,${y} Q62,${y + 4} 56,${y} Q50,${y + 4} 44,${y} Q38,${y + 4} 33,${y} Z`, { fill: W });
      if (v === 'double') { cone(4); scoop(36); scoop(58); g.p('M50,8 Q52,3 56,2', { lw: 2.5 }); g.c(50, 11, 4.5, { fill: A, lw: 2.5 }); return; }
      cone(0); scoop(54); g.p('M50,22 Q52,17 56,16', { lw: 2.5 }); g.c(50, 25, 4.5, { fill: A, lw: 2.5 });
      if (v === 'frozen') {
        [[14, 30, 9], [86, 22, 8], [84, 60, 6]].forEach(([x, y, r]) => g.p(`M${x - r},${y} L${x + r},${y} M${x},${y - r} L${x},${y + r} M${x - r * 0.7},${y - r * 0.7} L${x + r * 0.7},${y + r * 0.7} M${x - r * 0.7},${y + r * 0.7} L${x + r * 0.7},${y - r * 0.7}`, { lw: 2.5, color: A }));
      }
    },
    melted(ctx, k, A) {
      const g = G(ctx, k);
      g.e(50, 91, 40, 7, 0, { fill: W });
      g.p('M36,50 L50,92 L64,50 Z', { fill: W }); g.p('M41,60 L57,70 M59,60 L45,76', { lw: 2.5 });
      g.p('M30,60 Q24,30 50,26 Q76,30 70,52 L70,66 Q70,71 66,71 Q62,71 62,66 L62,57 Q56,60 52,57 L52,74 Q52,79 48,79 Q44,79 44,74 L44,57 Q40,59 38,57 L38,62 Q38,66 34,66 Q30,66 30,62 Z', { fill: W });
      g.p('M42,40 Q44,34 50,33', { lw: 2.5 });
      drop(g, 66, 82, A); drop(g, 22, 84, A); g.c(78, 90, 4, { fill: A, lw: 2.5 });
    },
    // ----- kite scenes -----
    kiteHigh(ctx, k, A) {
      const g = G(ctx, k);
      g.p('M4,96 L96,96', { lw: 3 });
      g.p('M64,40 Q34,58 14,96', { lw: 2.5 });
      sub(ctx, k, 'cloud', 22, 22, 40);
      sub(ctx, k, 'kite', 66, 24, 46, A);
    },
    kiteGround(ctx, k, A) {
      const g = G(ctx, k);
      g.p('M4,82 L96,82');
      g.p('M14,82 L12,74 M18,82 L20,74 M80,82 L78,74 M86,82 L88,75', { lw: 3 });
      g.p('M26,78 L52,62 L80,74 L52,82 Z', { fill: W });
      g.p('M52,62 L52,82 M26,78 L80,74', { lw: 2.5 });
      g.p('M80,74 Q86,66 92,70', { lw: 2.5 });
    },
    kitePuddle(ctx, k, A) {
      const g = G(ctx, k);
      g.p(PUDDLE, { fill: W });
      g.p('M28,78 L52,66 L76,76 L52,84 Z', { fill: W });
      g.p('M52,66 L52,84 M28,78 L76,76', { lw: 2.5 });
      drop(g, 24, 30, A); drop(g, 50, 18, A); drop(g, 76, 34, A);
    },
    puddle(ctx, k, A) {
      const g = G(ctx, k);
      g.p(PUDDLE, { fill: W }); g.e(48, 80, 16, 4, 0, { lw: 2.5 }); g.e(48, 80, 7, 1.5, 0, { lw: 2.5 });
      drop(g, 30, 30, A); drop(g, 56, 18, A); drop(g, 74, 40, A);
    },
    can(ctx, k, A) { // watering can, spout to the right
      const g = G(ctx, k);
      g.p('M22,44 Q6,46 10,60 Q14,70 24,66', { lw: 3.5 });
      g.p('M58,52 L84,30', { lw: 5 }); g.p('M80,24 L90,36', { lw: 4 });
      g.p('M22,36 L58,36 L60,80 L20,80 Z', { fill: W });
      g.p('M22,48 L58,48', { color: A, lw: 3 });
    },
    // ----- cause scenes -----
    causeRain(ctx, k, A) { sub(ctx, k, 'rain', 34, 28, 58, A); sub(ctx, k, 'plant', 64, 66, 66, A, 2); },
    causeSun(ctx, k, A) { sub(ctx, k, 'sun', 28, 28, 52, A); sub(ctx, k, 'ice', 66, 62, 70, A, 'normal'); },
    causeWind(ctx, k, A) { sub(ctx, k, 'wind', 34, 30, 58, A); sub(ctx, k, 'kiteGround', 56, 68, 84, A); },
    causeWater(ctx, k, A) {
      const g = G(ctx, k);
      sub(ctx, k, 'can', 32, 28, 56, A);
      drop(g, 62, 30, A); drop(g, 70, 42, A); drop(g, 60, 48, A);
      sub(ctx, k, 'plant', 64, 70, 60, A, 0);
    },
    // ----- page 4 big art -----
    bigfly(ctx, k, A, mode) {
      const g = G(ctx, k);
      const wing = (o, sp) => {
        g.p('M50,46 C36,12 6,6 6,30 C6,48 28,55 50,52 Z', Object.assign({ fill: W }, o));
        g.p('M44,45 C33,22 15,16 14,30 C14,42 30,48 44,48', Object.assign({ lw: 2.5 }, o));
        g.p('M50,54 C30,56 14,68 20,84 C26,96 46,82 50,60 Z', Object.assign({ fill: W }, o));
        g.c(26, 30, 7, Object.assign({}, o, sp)); g.c(38, 38, 3.5, Object.assign({}, o, sp)); g.c(32, 73, 6, Object.assign({}, o, sp));
      };
      wing({}, { color: A });
      if (mode === 'trace') mirror(ctx, () => wing({ color: GREY, dash: [3, 10], lw: 4, fill: null }, { color: GREY }));
      g.e(50, 58, 5.5, 26, 0, { fill: W });
      g.p('M47,24 Q41,11 33,10 M53,24 Q59,11 67,10', { lw: 3 }); g.dot(33, 10, 2.6); g.dot(67, 10, 2.6);
      g.c(50, 30, 8, { fill: W }); g.dot(47.4, 29, 1.6); g.dot(52.6, 29, 1.6);
    },
    bigbug(ctx, k, A, n) {
      const g = G(ctx, k);
      g.p('M24,48 L12,42 M21,62 L9,63 M25,78 L14,86 M76,48 L88,42 M79,62 L91,63 M75,78 L86,86', { lw: 3.5 });
      g.c(50, 60, 31, { fill: W });
      g.p('M50,42 L50,91');
      const S = { 2: [[38, 50], [38, 72]], 3: [[38, 46], [32, 62], [41, 77]], 4: [[39, 44], [30, 57], [42, 66], [36, 78]] }[n];
      S.forEach(([x, y]) => g.c(x, y, 5, { fill: A, lw: 2.5 }));
      g.p('M44,16 Q40,7 32,6 M56,16 Q60,7 68,6', { lw: 3 }); g.dot(32, 6, 2.6); g.dot(68, 6, 2.6);
      g.c(50, 28, 15, { fill: W });
      g.dot(44, 26, 2.2); g.dot(56, 26, 2.2); g.p('M45,32 Q50,36 55,32', { lw: 2.5 });
    }
  };

  // ---------- page-level helpers ----------
  const art = (ctx, name, x, y, s, ...a) => h.icon(ctx, ART[name], x, y, s, ...a);
  const artR = (ctx, name, x, y, s, rot, ...a) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); h.icon(ctx, ART[name], 0, 0, s, ...a); ctx.restore(); };
  const guideChar = (ctx, d, x, y, s) => art(ctx, d.character, x, y, s, d.accent);
  function bubble(ctx, x, y, w, hh, txt, tail) { // tail: 'left' | 'right' | 'down'
    ctx.save(); ctx.fillStyle = W; h.pen(ctx, 3, INK); h.roundRect(ctx, x, y, w, hh, 20); ctx.fill(); ctx.stroke();
    let P;
    if (tail === 'left') P = [[x + 2, y + hh * 0.45], [x - 24, y + hh * 0.75], [x + 2, y + hh * 0.7]];
    else if (tail === 'right') P = [[x + w - 2, y + hh * 0.45], [x + w + 24, y + hh * 0.75], [x + w - 2, y + hh * 0.7]];
    else P = [[x + w * 0.2, y + hh - 2], [x + w * 0.14, y + hh + 22], [x + w * 0.3, y + hh - 2]];
    ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); ctx.lineTo(P[1][0], P[1][1]); ctx.lineTo(P[2][0], P[2][1]); ctx.stroke(); ctx.restore();
    const px = h.fitText(ctx, txt, w - 34, 24, 500, 14); h.text(ctx, txt, x + w / 2, y + hh / 2 + px * 0.36, px, 500, INK, 'center');
  }
  const label = (ctx, s, x, y, px = 18, color = SOFT) => { const z = h.fitText(ctx, s, 220, px, 500, 12); h.text(ctx, s, x, y, z, 500, color, 'center'); };
  function arrow(ctx, x1, x2, y) { h.line(ctx, x1, y, x2, y, { lw: 4 }); h.path(ctx, `M${x2 - 14},${y - 12} L${x2},${y} L${x2 - 14},${y + 12}`, { lw: 4 }); }
  const sameOrder = (a, b) => a.every((v, i) => v === b[i]);

  // flower with a big center (page coords)
  function flower(ctx, cx, cy, R, groundY, A) {
    h.line(ctx, cx, cy + R, cx, groundY, { lw: 3.5 });
    const ly = cy + R + (groundY - cy - R) * 0.55, L = Math.min(34, R * 0.6);
    if (groundY - cy - R > 30) {
      h.path(ctx, `M${cx},${ly} Q${cx + L * 0.4},${ly - L} ${cx + L},${ly - L * 0.75} Q${cx + L * 0.7},${ly} ${cx},${ly} Z`, { fill: W, lw: 3.5 });
      h.path(ctx, `M${cx},${ly + 8} Q${cx - L * 0.4},${ly + 8 - L} ${cx - L},${ly + 8 - L * 0.75} Q${cx - L * 0.7},${ly + 8} ${cx},${ly + 8} Z`, { fill: W, lw: 3.5 });
    }
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; h.circle(ctx, cx + R * 0.8 * Math.cos(a), cy + R * 0.8 * Math.sin(a), R * 0.3, { fill: W, lw: 3.5 }); }
    h.circle(ctx, cx, cy, R * 0.74, { fill: W, lw: 3.5, color: A });
  }
  // vertical extents of a glyph in glyph units (cap top 0, baseline 100)
  function ext(ch) {
    let top = 50;
    if (/[A-ZÑ]/.test(ch) || /[bdfhklt]/.test(ch)) top = 0;
    if (/[ÁÉÍÓÚ]/.test(ch) || ch === 'Ñ') top = -24; // accent reaches -23
    if (/[ij]/.test(ch)) top = 28; if (/[áéíóú]/.test(ch)) top = 25; if (ch === 'ñ' || ch === 'ü') top = 28;
    const bottom = /[gjpqy]/.test(ch) ? 140 : 100;
    return { top, bottom, w: GL[ch] ? GL[ch][0] : 60 };
  }
  // draw one letter centered at cx,cy fitting in a box of size bw x bh
  function letterIn(ctx, ch, cx, cy, bw, bh, mode, A) {
    const e = ext(ch);
    if (!GL[ch] || mode === 'solid') { const px = Math.min(h.fitText(ctx, ch, bw, Math.round(bh * 1.05), 700, 14), 200); h.text(ctx, ch, cx, cy + px * 0.36, px, 700, INK, 'center'); return; }
    const s = Math.min(bh * 100 / (e.bottom - e.top), bw * 100 / e.w, 150);
    const capTop = cy - (e.bottom - e.top) * s / 200 - e.top * s / 100;
    h.drawStroke(ctx, ch, cx - e.w * s / 200, capTop + s, s, { dash: [3, 9], lw: 4, color: GREY, startDot: BLUE });
    solidAccent(ctx, ch, cx - e.w * s / 200, capTop, s, 4);
  }
  // accent marks are tiny: draw them solid so they stay visible next to the dotted letter (only for á é í ó ú)
  function solidAccent(ctx, ch, x, top, s, lw) {
    if (!/[áéíóúÁÉÍÓÚñÑ]/.test(ch) || !GL[ch]) return;
    const S = GL[ch][1], k = s / 100; ctx.save(); ctx.translate(x, top); ctx.scale(k, k);
    ctx.lineWidth = lw / k; ctx.strokeStyle = GREY; ctx.lineCap = 'round'; ctx.setLineDash([]); ctx.stroke(new Path2D(S[S.length - 1])); ctx.restore();
  }

  // cover palettes (cover only; interior stays line art)
  const PAL = {
    ladybug: { body: '#E8473E', spot: '#2C3A55', head: '#2C3A55', eye: '#FFFFFF', cheek: '#F7A0A0' },
    bee: { body: '#FFD045', stripe: '#2C3A55', wing: '#E3F4FF', cheek: '#F59A9A' },
    butterfly: { wing: '#FF9F5A', wing2: '#FFC46B', spot: '#FFF3C4', body: '#B49AE6', head: '#B49AE6', cheek: 1 },
    frog: { body: '#7CCB6A', belly: '#D5F2B8', cheek: '#F59A9A' }
  };
  K.register({
    id: 'nature', title: 'Nature Explorers', titleEs: 'Explorando la naturaleza',
    characters: [{ id: 'ladybug', label: 'Ladybug', labelEs: 'Mariquita' }, { id: 'bee', label: 'Bee', labelEs: 'Abeja' }, { id: 'butterfly', label: 'Butterfly', labelEs: 'Mariposa' }, { id: 'frog', label: 'Frog', labelEs: 'Rana' }],
    certText: 'You explored nature like a real scientist!',
    certTextEs: '¡Exploraste la naturaleza con mucha curiosidad, como en la ciencia!',
    hasNameTrace: true, // page 6 is the name flower garden
    charArticleEs(d) { return 'la'; }, // mariquita, abeja, mariposa, rana
    drawCharacter(ctx, d, id, cx, cy, size) {
      if (!ART[id]) id = 'ladybug';
      const C = { ladybug: [50, 48, 84], bee: [53, 47, 86], butterfly: [50, 49, 85], frog: [50, 57, 77] }[id]; // art center + extent in box units
      const s = size * 100 / C[2], lw = Math.max(2.5, size / 90);
      ctx.save(); ctx.translate(cx - C[0] * s / 100, cy - C[1] * s / 100); ctx.scale(s / 100, s / 100);
      ART[id](ctx, (100 / s) * (lw / 3.5), d.accent, { mono: 1 }); ctx.restore();
    },
    coverSky: '#BFE4F8',
    coverBg(ctx, d) {
      const sky = ctx.createLinearGradient(0, 0, 0, 760); sky.addColorStop(0, '#A9DAF5'); sky.addColorStop(1, '#E6F6FF');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, 850, 1100);
      const fillP = (dd, c, lw) => { const p = new Path2D(dd); ctx.fillStyle = c; ctx.fill(p); if (lw) { h.pen(ctx, lw, INK); ctx.stroke(p); } };
      const cloud = (x, y, s) => { ctx.save(); ctx.translate(x - s / 2, y - s / 2); ctx.scale(s / 100, s / 100); fillP(CLOUD, '#FFFFFF'); h.pen(ctx, 300 / s, INK); ctx.stroke(new Path2D(CLOUD)); ctx.restore(); };
      cloud(700, 415, 160); cloud(560, 372, 90); cloud(320, 395, 80); cloud(780, 520, 70);
      fillP('M0,700 Q160,590 330,660 Q470,715 600,640 Q730,570 850,640 L850,1100 L0,1100 Z', '#A8DB8F', 3);
      fillP('M0,770 Q200,700 420,760 Q620,812 850,735 L850,1100 L0,1100 Z', '#7EC86C', 3);
      // grass tufts + little flowers in the meadow (around and under the name box)
      const tuft = (x, y) => { h.pen(ctx, 3, '#3F8F45'); ctx.beginPath(); ctx.moveTo(x - 10, y - 14); ctx.quadraticCurveTo(x - 4, y - 4, x - 2, y); ctx.moveTo(x, y - 20); ctx.lineTo(x + 1, y); ctx.moveTo(x + 11, y - 14); ctx.quadraticCurveTo(x + 5, y - 4, x + 3, y); ctx.stroke(); };
      [[95, 1000], [250, 1028], [610, 1030], [760, 995], [140, 880], [710, 880], [520, 818], [330, 820]].forEach(([x, y]) => tuft(x, y));
      const mini = (x, y, pc, cc) => { for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5 - Math.PI / 2; h.circle(ctx, x + 11 * Math.cos(a), y + 11 * Math.sin(a), 8, { fill: pc, lw: 2.5 }); } h.circle(ctx, x, y, 7, { fill: cc, lw: 2.5 }); };
      [[105, 930, '#F7A8C8'], [745, 945, '#FFFFFF'], [180, 1010, '#C9B2F0'], [690, 1012, '#FFD45C'], [80, 820, '#FFD45C'], [775, 815, '#F7A8C8']].forEach(([x, y, c]) => mini(x, y, c, c === '#FFD45C' ? '#F08A3A' : '#FFD45C'));
    },
    coverArt(ctx, d) {
      const A = d.accent;
      // sun
      ctx.save(); h.pen(ctx, 6, '#F2A93B'); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + 0.2; ctx.beginPath(); ctx.moveTo(150 + 58 * Math.cos(a), 440 + 58 * Math.sin(a)); ctx.lineTo(150 + 78 * Math.cos(a), 440 + 78 * Math.sin(a)); ctx.stroke(); } ctx.restore();
      h.circle(ctx, 150, 440, 44, { fill: '#FFD45C', lw: 4 });
      h.dot(ctx, 136, 434, 5, INK); h.dot(ctx, 164, 434, 5, INK); h.path(ctx, 'M134,452 Q150,466 166,452', { lw: 4 });
      h.circle(ctx, 127, 452, 6, { fill: '#F7A0A0', lw: 0.01, color: '#F7A0A0' }); h.circle(ctx, 173, 452, 6, { fill: '#F7A0A0', lw: 0.01, color: '#F7A0A0' });
      // colored flowers (page coords): stem, leaves, petals, accent center
      const fl = (x, y, R, pc, gy) => {
        h.line(ctx, x, y + R, x, gy, { lw: 5, color: '#3F8F45' });
        const ly = y + R + (gy - y - R) * 0.5, L = R * 0.9;
        h.path(ctx, `M${x},${ly} Q${x + L * 0.4},${ly - L} ${x + L},${ly - L * 0.75} Q${x + L * 0.7},${ly} ${x},${ly} Z`, { fill: '#8FD07A', lw: 3.5 });
        h.path(ctx, `M${x},${ly + 10} Q${x - L * 0.4},${ly + 10 - L} ${x - L},${ly + 10 - L * 0.75} Q${x - L * 0.7},${ly + 10} ${x},${ly + 10} Z`, { fill: '#8FD07A', lw: 3.5 });
        for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; h.circle(ctx, x + R * 0.78 * Math.cos(a), y + R * 0.78 * Math.sin(a), R * 0.48, { fill: pc, lw: 3.5 }); }
        h.circle(ctx, x, y, R * 0.42, { fill: A, lw: 3.5 });
        h.circle(ctx, x - R * 0.12, y - R * 0.12, R * 0.1, { fill: 'rgba(255,255,255,0.75)', lw: 0.01, color: 'rgba(255,255,255,0)' });
      };
      fl(118, 690, 40, '#F7A8C8', 828); fl(232, 735, 30, '#FFFFFF', 828); fl(618, 735, 30, '#FFE07A', 828); fl(732, 690, 40, '#C9B2F0', 828);
      // little friends (not the chosen one)
      const P = PAL;
      const others = ['butterfly', 'bee', 'ladybug'].filter(c => c !== d.character);
      ctx.save(); ctx.translate(640, 560); ctx.rotate(0.18); h.icon(ctx, (c, k) => ART[others[0]](c, k, A, P[others[0]]), 0, 0, 92); ctx.restore();
      ctx.save(); ctx.translate(222, 575); ctx.rotate(-0.15); h.icon(ctx, (c, k) => ART[others[1]](c, k, A, P[others[1]]), 0, 0, 74); ctx.restore();
      // main character with a soft shadow on the grass
      ctx.save(); ctx.fillStyle = 'rgba(40,90,40,0.22)'; ctx.beginPath(); ctx.ellipse(425, 590 + ({ ladybug: 91, bee: 84, butterfly: 90, frog: 92 }[d.character] - 50) * 3.2 + 8, 120, 16, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      h.icon(ctx, (c, k) => ART[d.character](c, k, A, P[d.character]), 425, 590, 320);
    },
    certArt(ctx, d) {
      const A = d.accent;
      art(ctx, 'bloom', 230, 815, 120, A); art(ctx, 'bloom', 620, 815, 120, A);
      h.line(ctx, 150, 878, 700, 878, { lw: 3 });
      guideChar(ctx, d, 425, 775, 170);
    },
    pages: [
      // 1 ---------------------------------------------------------------- sequencing
      {
        title: 'How a seed grows', titleEs: 'Cómo crece una semilla', draw(ctx, d) {
          const A = d.accent, age = d.age, r = d.rand;
          const stages = age === 3 ? [0, 1, 4] : age === 4 ? [0, 1, 3, 4] : [0, 1, 2, 3];
          const NAMES = h.t(d, ['seed', 'sprout', 'small plant', 'bud', 'flower'], ['semilla', 'brote', 'plantita', 'capullo', 'flor']);
          let order = stages.slice(); while (sameOrder(order, stages)) h.shuffle(order, r);
          const sub = age === 3 ? h.t(d, 'Which comes first, next and last? Circle 1, 2 or 3 under each picture.', '¿Qué va primero, después y al final? Encierra 1, 2 o 3 debajo de cada dibujo.')
            : age === 4 ? h.t(d, 'Put the pictures in order. Write 1, 2, 3 or 4 in each box.', 'Pon los dibujos en orden. Escribe 1, 2, 3 o 4 en cada cuadro.')
              : h.t(d, 'Put the pictures in order. Write 1, 2, 3 or 4 in each box. Then draw what comes last.', 'Pon los dibujos en orden. Escribe 1, 2, 3 o 4 en cada cuadro. Luego dibuja lo que viene al final.');
          h.header(ctx, d, h.t(d, 'How a seed grows', 'Cómo crece una semilla'), sub);
          if (age === 3) {
            const w = 230, gap = 15, y = 205, hh = 420;
            order.forEach((st, i) => {
              const x = 60 + i * (w + gap), cx = x + w / 2;
              h.box(ctx, x, y, w, hh, 18, LINE, 2);
              art(ctx, 'plant', cx, y + 190, 226, A, st);
              label(ctx, NAMES[st], cx, y + hh - 28, 22);
              [1, 2, 3].forEach((n, j) => h.numCircle(ctx, cx + (j - 1) * 70, y + hh + 60, n, A, 28));
            });
            guideChar(ctx, d, 160, 860, 160);
            bubble(ctx, 290, 805, 470, 96, h.t(d, 'Plants grow little by little!', '¡Las plantas crecen poco a poco!'), 'left');
          } else {
            const w = 355, hh = age === 4 ? 320 : 280, gx = 20, gy = 15, y0 = 200, ps = age === 4 ? 250 : 210;
            order.forEach((st, i) => {
              const x = 60 + (i % 2) * (w + gx), y = y0 + Math.floor(i / 2) * (hh + gy), cx = x + w / 2;
              h.box(ctx, x, y, w, hh, 18, LINE, 2);
              art(ctx, 'plant', cx, y + ps / 2 + 18, ps, A, st);
              label(ctx, NAMES[st], cx, y + hh - 22, 22);
              h.answerBox(ctx, x + 16, y + 16, 64, 64, A);
            });
            if (age === 4) {
              guideChar(ctx, d, 130, 930, 110);
              bubble(ctx, 220, 885, 400, 80, h.t(d, 'What grows first?', '¿Qué crece primero?'), 'left');
            } else {
              const by = 800, bh = 190;
              h.box(ctx, 60, by, 560, bh, 18, INK, 2.5);
              { const q = h.t(d, 'What comes after the bud? Draw it!', '¿Qué viene después del capullo? ¡Dibújalo!'); h.text(ctx, q, 80, by + 34, h.fitText(ctx, q, 520, 20, 700, 14), 700, INK); }
              guideChar(ctx, d, 710, by + 105, 150);
            }
          }
          h.tip(ctx, h.t(d, 'Grown-up tip: name each step out loud: seed, sprout' + (age === 5 ? ', small plant, bud, flower.' : age === 4 ? ', bud, flower.' : ', flower.'),
            'Consejo para adultos: digan cada paso en voz alta: semilla, brote' + (age === 5 ? ', plantita, capullo, flor.' : age === 4 ? ', capullo, flor.' : ', flor.')));
        }
      },
      // 2 ---------------------------------------------------------------- weather matching
      {
        title: 'What will I wear?', titleEs: '¿Qué me pongo?', draw(ctx, d) {
          const A = d.accent, r = d.rand;
          h.header(ctx, d, h.t(d, 'What will {name} wear?', '¿Qué se pone {name}?'), h.t(d, 'Look at the weather. Draw a line to what you wear.', 'Mira el tiempo. Une con una línea lo que te pones.'));
          const WX = [['sun', h.t(d, 'Sunny', 'Soleado'), 'sunwear'], ['rain', h.t(d, 'Rainy', 'Lluvioso'), 'rainwear'], ['wind', h.t(d, 'Windy', 'Con viento'), 'kite'], ['cool', h.t(d, 'Cool morning', 'Mañana fresca'), 'jacket']];
          const idx = [0, 1, 2, 3]; let right = idx.slice(); while (right.some((v, i) => v === i)) h.shuffle(right, r);
          const y0 = 200, rh = 172;
          WX.forEach((w, i) => {
            const y = y0 + i * rh;
            h.box(ctx, 70, y, 170, 158, 18, LINE, 2);
            art(ctx, w[0], 155, y + 64, 112, A);
            label(ctx, w[1], 155, y + 145, 20, INK);
            h.dot(ctx, 272, y + 79, 10, BLUE);
            const it = WX[right[i]][2];
            h.box(ctx, 610, y, 170, 158, 18, LINE, 2);
            art(ctx, it, 695, y + 79, 136, A);
            h.dot(ctx, 578, y + 79, 10, BLUE);
          });
          guideChar(ctx, d, 115, 945, 90);
          bubble(ctx, 190, 905, 520, 72, h.t(d, 'Florida weather can change every day!', '¡En Florida el tiempo cambia mucho!'), 'left');
          h.tip(ctx, h.t(d, 'Grown-up tip: look outside together. Is it sunny, rainy, windy or cool today?', 'Consejo para adultos: miren afuera juntos. ¿Hoy hace sol, llueve, hace viento o está fresco?'));
        }
      },
      // 3 ---------------------------------------------------------------- cause & effect
      {
        title: 'What happens next?', titleEs: '¿Qué pasa después?', draw(ctx, d) {
          const A = d.accent, age = d.age, r = d.rand;
          h.header(ctx, d, h.t(d, 'What happens next?', '¿Qué pasa después?'), h.t(d, 'Look at the first picture. What happens next? Circle it.', 'Mira el primer dibujo. ¿Qué pasa después? Enciérralo.'));
          const ROWS = [
            { c: 'causeRain', t: h.t(d, 'Rain on the plant.', 'Llueve en la planta.'), ok: ['plant', 4], w: [['wilted'], ['plant', 0]] },
            { c: 'causeSun', t: h.t(d, 'Ice cream in the sun.', 'Un helado al sol.'), ok: ['melted'], w: [['ice', 'double'], ['ice', 'frozen']] },
            { c: 'causeWind', t: h.t(d, 'Wind blows the kite.', 'Sopla el viento.'), ok: ['kiteHigh'], w: [['kiteGround'], ['kitePuddle']] },
            { c: 'causeWater', t: h.t(d, 'We water the seed.', 'Regamos la semilla.'), ok: ['plant', 1], w: [['wilted'], ['puddle']] }
          ].slice(0, age === 3 ? 3 : 4);
          const nOpt = age === 5 ? 3 : 2, rh = age === 3 ? 240 : 186, gap = 14, y0 = 196;
          ROWS.forEach((R, i) => {
            const y = y0 + i * (rh + gap), cy = y + rh / 2;
            h.box(ctx, 60, y, 730, rh, 18, LINE, 2);
            const ps = age === 3 ? 165 : 128;
            h.box(ctx, 74, y + 12, 216, rh - 24, 14, INK, 2.5);
            art(ctx, R.c, 182, cy - 14, ps, A);
            { const z = h.fitText(ctx, R.t, 196, 18, 500, 12); h.text(ctx, R.t, 182, y + rh - 24, z, 500, SOFT, 'center'); }
            arrow(ctx, 302, 346, cy);
            const opts = h.shuffle([R.ok].concat(R.w.slice(0, nOpt - 1)), r);
            const xs = nOpt === 2 ? [475, 670] : [430, 565, 700];
            const os = nOpt === 2 ? (age === 3 ? 180 : 140) : 122;
            opts.forEach((o, j) => art(ctx, o[0], xs[j], cy, os, A, o[1]));
          });
          h.tip(ctx, h.t(d, 'Grown-up tip: read the sentence, then ask "What will happen?" Talk about why.', 'Consejo para adultos: lean la frase y pregunten: "¿Qué va a pasar?". Hablen del porqué.'));
        }
      },
      // 4 ---------------------------------------------------------------- symmetry
      {
        title: 'Finish the butterfly', titleEs: 'Completa la mariposa', draw(ctx, d) {
          const A = d.accent, age = d.age;
          const n = age === 3 ? 2 : age === 4 ? 3 : 4;
          h.header(ctx, d, h.t(d, 'Finish the butterfly', 'Completa la mariposa'), age === 5 ? h.t(d, 'Draw the other wings so both sides match. Then give the ladybug the same spots.', 'Dibuja las otras alas para que los dos lados sean iguales. Luego ponle a la mariquita los mismos puntos.') : h.t(d, 'Trace the dotted wings so both sides match. Then give the ladybug the same spots.', 'Traza las alas punteadas para que los dos lados sean iguales. Luego ponle a la mariquita los mismos puntos.'));
          h.numCircle(ctx, 88, 228, 1, A, 24);
          h.text(ctx, age === 5 ? h.t(d, 'Draw the missing wings.', 'Dibuja las alas que faltan.') : h.t(d, 'Trace the missing wings.', 'Traza las alas que faltan.'), 124, 237, 22, 700, INK);
          art(ctx, 'bigfly', 425, 430, 380, A, age === 5 ? 'empty' : 'trace');
          h.numCircle(ctx, 88, 668, 2, A, 24);
          { const q = h.t(d, 'Draw the same number of spots on the other side.', 'Dibuja el mismo número de puntos del otro lado.'); h.text(ctx, q, 124, 677, d.lang === 'es' ? h.fitText(ctx, q, 670, 22, 700, 16) : 22, 700, INK); }
          art(ctx, 'bigbug', 320, 845, 290, A, n);
          if (d.character !== 'ladybug') { guideChar(ctx, d, 660, 900, 130); bubble(ctx, 540, 735, 240, 76, h.t(d, 'Count the spots!', '¡Cuenta los puntos!'), 'down'); }
          else { bubble(ctx, 540, 760, 240, 76, h.t(d, 'Count the spots!', '¡Cuenta los puntos!'), 'left'); }
          h.tip(ctx, h.t(d, 'Grown-up tip: fold the page in the middle to see both sides. Count the spots together.', 'Consejo para adultos: doblen la hoja por la mitad para ver los dos lados. Cuenten los puntos juntos.'));
        }
      },
      // 5 ---------------------------------------------------------------- bug count graph
      {
        title: 'Bug count graph', titleEs: 'Gráfica de bichitos', draw(ctx, d) {
          const A = d.accent, age = d.age, r = d.rand;
          const kinds = age === 3 ? ['ladybug', 'bee'] : ['ladybug', 'bee', 'ant'];
          const max = age === 3 ? 4 : age === 4 ? 6 : 8, min = age === 5 ? 2 : 1;
          const pool = []; for (let v = min; v <= max; v++) pool.push(v);
          const counts = h.shuffle(pool, r).slice(0, kinds.length);
          h.header(ctx, d, h.t(d, 'Help {name} count the bugs', 'Ayuda a {name} a contar los bichitos'), h.t(d, 'Count each bug. Color one square for each one. Then circle the bug with ' + (kinds.length === 2 ? 'MORE.' : 'the MOST.'), 'Cuenta cada bichito. Colorea un cuadro por cada uno. Luego encierra el bichito del que hay MÁS.'));
          // scene
          const sx = 60, sy = 196, sw = 730, sh = 344;
          h.box(ctx, sx, sy, sw, sh, 20, LINE, 2);
          const cols = 9, rows = 3, cw = (sw - 30) / cols, ch = (sh - 30) / rows, cells = [];
          for (let i = 0; i < cols * rows; i++) cells.push(i);
          h.shuffle(cells, r);
          let c = 0;
          kinds.forEach((kd, ki) => { for (let j = 0; j < counts[ki]; j++) { const cell = cells[c++]; const x = sx + 15 + (cell % cols + 0.5) * cw + (r() - 0.5) * 10, y = sy + 15 + (Math.floor(cell / cols) + 0.5) * ch + (r() - 0.5) * 18; artR(ctx, kd, x, y, 72, (r() - 0.5) * 0.6, A); } });
          let deco = 0;
          while (c < cells.length && deco < 5) { const cell = cells[c++]; if (Math.floor(cell / cols) !== rows - 1) continue; deco++; art(ctx, 'bloom', sx + 15 + (cell % cols + 0.5) * cw, sy + 15 + (rows - 0.5) * ch, 70, A); }
          // graph
          const gy = 566; h.text(ctx, h.t(d, 'My bug graph', 'Mi gráfica de bichitos'), 60, gy + 12, 24, 700, INK);
          const rh = kinds.length === 2 ? 150 : 120, sq = Math.min(70, Math.floor((780 - 210) / max) - 6);
          kinds.forEach((kd, ki) => {
            const y = gy + 30 + ki * (rh + 6), cy = y + rh / 2;
            h.box(ctx, 60, y, 730, rh, 16, LINE, 2);
            art(ctx, kd, 132, cy, Math.min(96, rh - 16), A);
            h.line(ctx, 200, y + 12, 200, y + rh - 12, { lw: 2, color: LINE });
            for (let j = 0; j < max; j++) h.box(ctx, 214 + j * (sq + 6), cy - sq / 2, sq, sq, 6, INK, 2.5);
          });
          h.tip(ctx, h.t(d, 'Grown-up tip: touch each bug as you count it, then color one square.', 'Consejo para adultos: toquen cada bichito al contarlo y luego coloreen un cuadro.'));
        }
      },
      // 6 ---------------------------------------------------------------- name flowers
      {
        title: 'My flower garden', titleEs: 'Mi jardín de flores', draw(ctx, d) {
          const A = d.accent, age = d.age;
          const title = h.t(d, '{name}' + h.possessive(d.name).slice(d.name.length) + ' flower garden', 'El jardín de flores de {name}');
          const sub = age === 3 ? h.t(d, 'Trace the big letter. Then color one flower for each letter of {name}.', 'Traza la letra grande. Luego colorea una flor por cada letra de {name}.')
            : age === 4 ? h.t(d, 'Trace one letter in each flower to spell your name. Then color the flowers.', 'Traza una letra en cada flor para formar tu nombre. Luego colorea las flores.')
              : h.t(d, 'Trace the letters in the flowers. Then write your name on the line.', 'Traza las letras de las flores. Luego escribe tu nombre en la línea.');
          h.header(ctx, d, title, sub);
          const L = [...d.name].filter(ch => ch !== ' ' && ch !== '-');
          let y0, y1;
          if (age === 3) {
            const f = L[0], e = ext(f), s = 210;
            h.box(ctx, 60, 200, 330, 280, 20, LINE, 2);
            const cx = 225, cy = 340, capTop = cy - (e.bottom - e.top) * s / 200 - e.top * s / 100;
            if (GL[f]) { h.drawStroke(ctx, f, cx - e.w * s / 200, capTop + s, s, { dash: [3, 12], lw: 6, color: GREY, startDot: BLUE }); solidAccent(ctx, f, cx - e.w * s / 200, capTop, s, 6); }
            else letterIn(ctx, f, cx, cy, 240, 220, 'solid', A);
            guideChar(ctx, d, 500, 400, 130);
            bubble(ctx, 470, 230, 310, 90, h.t(d, 'This is the first letter!', '¡Esta es la primera letra!'), 'down');
            y0 = 510; y1 = 990;
          } else {
            guideChar(ctx, d, 730, 245, 100);
            y0 = 290; y1 = age === 4 ? 990 : 850;
          }
          const rowsN = L.length <= 4 ? 1 : (L.length > 8 && age === 4) ? 3 : 2, per = Math.ceil(L.length / rowsN), rowH = (y1 - y0) / rowsN;
          for (let ri = 0; ri < rowsN; ri++) {
            const part = L.slice(ri * per, ri * per + per); if (!part.length) continue;
            const w = Math.min(740 / per, 180), R = Math.min(w * 0.42, (rowH - 80) / 2.2, 82);
            const top = y0 + ri * rowH, cy = top + R * 1.1 + 6, gyL = top + rowH - 14;
            const x0 = 425 - (part.length * w) / 2;
            h.line(ctx, Math.max(60, x0 + w * 0.1), gyL, Math.min(790, x0 + part.length * w - w * 0.1), gyL, { lw: 3 });
            part.forEach((ch, i) => {
              const cx = x0 + (i + 0.5) * w;
              flower(ctx, cx, cy, R, gyL, A);
              const bx = R * 0.74 * 1.3;
              letterIn(ctx, ch, cx, cy, bx, bx, age === 3 ? 'solid' : 'trace', A);
            });
          }
          if (age === 5) {
            h.text(ctx, h.t(d, 'Write your name:', 'Escribe tu nombre:'), 60, 880, 20, 700, INK);
            h.guide(ctx, 60, 790, 985, 80);
          }
          h.tip(ctx, age === 3 ? h.t(d, 'Grown-up tip: start at the blue dot. Say each letter of the name as your child colors a flower.', 'Consejo para adultos: empiecen en el punto azul. Digan cada letra del nombre mientras su niño o niña colorea una flor.')
            : h.t(d, 'Grown-up tip: start each letter at the blue dot. Say the letter sound together.', 'Consejo para adultos: empiecen cada letra en el punto azul. Digan juntos el sonido de cada letra.'));
        }
      }
    ]
  });
(TCK.ART=TCK.ART||{}).nature=(ctx,n,x,y,s,f)=>{ctx.save();ctx.translate(x,y);if(f)ctx.scale(-1,1);ctx.translate(-s/2,-s/2);ctx.scale(s/100,s/100);ART[n](ctx,100/s,'#fff',n==='plant'?3:{mono:1});ctx.restore();};TCK.ARTLIST=TCK.ARTLIST||{};TCK.ARTLIST.nature=Object.keys(ART);
})();
