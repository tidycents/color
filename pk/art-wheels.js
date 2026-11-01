/* TidyCents · Pre-K Learning Adventures · Book 6 · Little Explorers on Wheels (id: wheels) */
(function () {
  const K = TCK, h = K.h, INK = K.INK, GREY = K.GREY, LINE = K.LINE, SOFT = K.SOFT, BLUE = K.BLUE;
  const WHITE = '#fff';

  // ---------------------------------------------------------------- vehicle library
  // Each vehicle is drawn in its own local box (w x h units, ground = bottom). Parts can be solid, dotted or hidden.
  function sp(ctx, g, d, fill, mul = 1) { const p = new Path2D(d); if (fill) { ctx.fillStyle = fill; ctx.fill(p); } h.pen(ctx, g.lw * mul); ctx.stroke(p); }
  function sc(ctx, g, x, y, r, fill, mul = 1) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); if (fill) { ctx.fillStyle = fill; ctx.fill(); } h.pen(ctx, g.lw * mul); ctx.stroke(); }
  function acc(g) { return g.o.accent || null; }
  // part fill: WHITE for line art; a palette color only when o.pal is set (color cover)
  function F(g, part) { const p = g.o.pal; return p ? (p[part] || p.body || WHITE) : WHITE; }

  const VK = {
    car: {
      w: 200, h: 112, wheels: [[52, 94, 18], [152, 94, 18]], wins: [[66, 22, 30, 24], [104, 22, 30, 24]],
      body(ctx, g) {
        sp(ctx, g, 'M16,92 L186,92 Q194,92 194,84 L194,64 Q194,54 184,52 L158,49 L138,18 Q135,13 128,13 L70,13 Q63,13 60,18 L42,49 L18,53 Q6,55 6,66 L6,84 Q6,92 16,92 Z', F(g, 'body'));
        sp(ctx, g, 'M100,52 L100,86', null, 0.7); sp(ctx, g, 'M108,60 L118,60', null, 0.7);
        sc(ctx, g, 185, 63, 4, acc(g), 0.7);
      }
    },
    racecar: {
      w: 200, h: 100, wheels: [[50, 82, 18], [156, 82, 18]], tris: [[24, 10, 56, 18, 24, 26]], face: [103, 34, 26],
      body(ctx, g) {
        sp(ctx, g, 'M24,50 L24,12', null, 0.8);
        sp(ctx, g, 'M76,46 Q84,20 104,20 Q122,20 128,46', F(g, 'dome'));
        sp(ctx, g, 'M16,84 L188,84 Q196,84 196,76 L196,68 Q196,58 184,56 L132,48 L124,42 L80,42 L68,48 L20,50 Q8,51 8,62 L8,76 Q8,84 16,84 Z', F(g, 'body'));
        if (!g.o.face) sc(ctx, g, 100, 64, 11, null, 0.8);
        sp(ctx, g, 'M8,64 L26,64', null, 0.7);
        if (acc(g)) sp(ctx, g, 'M184,58 L196,64 L196,70 L182,70 Z', acc(g), 0.6);
      }
    },
    bus: {
      w: 200, h: 118, wheels: [[46, 100, 18], [160, 100, 18]], wins: [[16, 20, 26, 26], [47, 20, 26, 26], [78, 20, 26, 26], [109, 20, 26, 26]], face: [96, 80, 30],
      body(ctx, g) {
        sp(ctx, g, 'M16,98 L190,98 Q196,98 196,92 L196,64 Q196,56 188,55 L166,52 L166,18 Q166,10 158,10 L18,10 Q8,10 8,20 L8,90 Q8,98 16,98 Z', F(g, 'body'));
        sp(ctx, g, 'M8,58 L166,58', null, 0.6);
        sp(ctx, g, 'M146,20 L160,20 L160,92 L146,92 Z', g.o.pal ? F(g, 'door') : null, 0.8); sp(ctx, g, 'M153,20 L153,92', null, 0.6);
        sc(ctx, g, 189, 64, 4, acc(g), 0.7);
      }
    },
    train: {
      w: 200, h: 124, wheels: [[42, 108, 16], [100, 108, 16], [150, 108, 16]], wins: [[26, 36, 34, 30]], face: [128, 70, 30],
      body(ctx, g) {
        if (g.o.smoke) { const sm = g.o.pal ? F(g, 'smoke') : null; sc(ctx, g, 150, 4, 7, sm, 0.6); sc(ctx, g, 166, -10, 10, sm, 0.6); }
        sp(ctx, g, 'M136,44 L134,28 L124,14 L160,14 L150,28 L148,44', F(g, 'chimney'));
        sp(ctx, g, 'M96,44 Q96,32 107,32 Q118,32 118,44', F(g, 'dome'));
        sp(ctx, g, 'M74,44 L168,44 Q182,44 182,58 L182,100 L74,100 Z', F(g, 'body'));
        sp(ctx, g, 'M14,100 L14,26 L74,26 L74,100 Z', F(g, 'cab'));
        sp(ctx, g, 'M6,16 L82,16 L82,26 L6,26 Z', F(g, 'roof'));
        sp(ctx, g, 'M182,78 L196,104 L182,104 Z', F(g, 'front'), 0.8);
        sp(ctx, g, 'M8,100 L186,100', null, 1);
        if (acc(g)) sc(ctx, g, 176, 54, 4, acc(g), 0.6);
      }
    },
    firetruck: {
      w: 200, h: 120, wheels: [[38, 102, 18], [94, 102, 18], [164, 102, 18]], wins: [[144, 34, 22, 20], [22, 50, 44, 32], [76, 50, 44, 32]], face: [158, 70, 22],
      body(ctx, g) {
        sp(ctx, g, 'M146,26 Q146,14 154,14 Q162,14 162,26', acc(g) || WHITE, 0.8);
        sp(ctx, g, 'M14,100 L190,100 Q196,100 196,94 L196,62 Q196,56 190,54 L182,52 L170,30 Q168,26 162,26 L142,26 Q136,26 136,32 L136,38 L14,38 Q8,38 8,44 L8,94 Q8,100 14,100 Z', F(g, 'body'));
        sp(ctx, g, 'M136,38 L136,98', null, 0.7);
        sp(ctx, g, 'M30,30 L30,38 M114,30 L114,38', null, 0.7);
        sp(ctx, g, 'M12,18 L130,18 L130,30 L12,30 Z', F(g, 'ladder'), 0.8);
        for (let x = 26; x < 130; x += 15) sp(ctx, g, `M${x},18 L${x},30`, null, 0.6);
      }
    },
    truck: {
      w: 200, h: 116, wheels: [[28, 100, 16], [62, 100, 16], [126, 100, 16], [172, 100, 16]], wins: [[158, 36, 20, 20]],
      body(ctx, g) {
        sp(ctx, g, 'M8,94 L8,16 Q8,10 14,10 L136,10 Q142,10 142,16 L142,94 Z', WHITE);
        sp(ctx, g, 'M150,94 L150,34 Q150,28 156,28 L176,28 L190,54 Q196,56 196,64 L196,88 Q196,94 190,94 Z', WHITE);
        sp(ctx, g, 'M6,94 L196,94', null, 1); sp(ctx, g, 'M142,86 L150,86', null, 0.8);
        sc(ctx, g, 190, 66, 3.5, acc(g), 0.7);
      }
    },
    excavator: {
      w: 200, h: 132,
      body(ctx, g) {
        sp(ctx, g, 'M26,100 L126,100 Q140,100 140,114 Q140,128 126,128 L26,128 Q12,128 12,114 Q12,100 26,100 Z', WHITE);
        [30, 76, 122].forEach(x => sc(ctx, g, x, 114, 8, null, 0.7));
        sp(ctx, g, 'M36,100 L36,40 Q36,34 42,34 L82,34 L98,58 L98,100 Z', WHITE);
        sp(ctx, g, 'M46,42 L76,42 L86,60 L46,60 Z', WHITE, 0.8);
        sp(ctx, g, 'M98,100 L98,64 L128,64 L128,100', WHITE);
        sp(ctx, g, 'M104,66 L144,16 L156,22 L116,74 Z', WHITE);
        sp(ctx, g, 'M146,14 L188,64 L178,72 L140,26 Z', WHITE);
        sp(ctx, g, 'M172,62 L198,68 L192,98 Q170,100 166,84 Z', WHITE);
        sc(ctx, g, 150, 20, 4, WHITE, 0.7);
      }
    },
    bicycle: {
      w: 200, h: 112, wheels: [[44, 82, 30], [160, 82, 30]], wheelsFirst: true, noFill: true,
      body(ctx, g) {
        sp(ctx, g, 'M44,82 L86,40 L100,82 Z', null);
        sp(ctx, g, 'M86,40 L146,40 L100,82', null);
        sp(ctx, g, 'M146,40 L160,82', null);
        sp(ctx, g, 'M86,40 L84,30 M72,30 L96,30', null);
        sp(ctx, g, 'M146,40 L140,24 L156,20', null);
        sc(ctx, g, 100, 82, 7, WHITE, 0.8);
      }
    },
    airplane: {
      w: 200, h: 104,
      body(ctx, g) {
        sp(ctx, g, 'M8,28 L24,28 L46,50 L160,50 Q196,52 196,66 Q196,80 160,82 L36,82 Q20,82 14,70 Z', F(g, 'body'));
        [72, 92, 112, 132].forEach(x => sc(ctx, g, x, 62, 5, g.o.pal ? F(g, 'win') : null, 0.7));
        sp(ctx, g, 'M168,56 Q182,56 188,62 L170,62 Z', null, 0.8);
        sp(ctx, g, 'M88,70 L64,100 L88,100 L124,70 Z', F(g, 'wing'));
        if (acc(g)) sp(ctx, g, 'M12,40 L28,40', null, 0.6);
      }
    },
    helicopter: {
      w: 200, h: 106,
      body(ctx, g) {
        sp(ctx, g, 'M30,10 L170,10', null, 1.1); sp(ctx, g, 'M100,10 L100,28', null);
        sp(ctx, g, 'M70,50 L18,44 L18,56 L70,66 Z', WHITE);
        sc(ctx, g, 14, 42, 9, null, 0.8);
        sp(ctx, g, 'M66,60 Q66,28 104,28 Q140,28 150,58 Q154,86 120,86 L82,86 Q66,86 66,70 Z', WHITE);
        sp(ctx, g, 'M112,34 Q136,36 144,60 L112,60 Z', null, 0.8);
        sp(ctx, g, 'M80,86 L76,100 M134,86 L138,100 M56,100 L156,100 Q164,100 166,94', null);
      }
    },
    boat: {
      w: 200, h: 96,
      body(ctx, g) {
        sp(ctx, g, 'M64,52 L76,24 L128,24 L134,52', WHITE);
        sp(ctx, g, 'M86,30 L120,30 L122,46 L82,46 Z', null, 0.8);
        sp(ctx, g, 'M8,52 L196,52 L176,86 Q172,92 164,92 L30,92 Q22,92 18,86 Z', WHITE);
        sp(ctx, g, 'M16,64 L188,64', null, 0.6);
      }
    },
    sailboat: {
      w: 200, h: 160, tris: [[104, 16, 104, 116, 168, 116], [96, 28, 96, 116, 40, 116]],
      body(ctx, g) {
        sp(ctx, g, 'M100,8 L100,124', null);
        sp(ctx, g, 'M100,8 L118,13 L100,18', acc(g), 0.8);
        sp(ctx, g, 'M14,124 L186,124 L166,152 Q162,156 156,156 L44,156 Q38,156 34,152 Z', WHITE);
      }
    },
    ship: {
      w: 200, h: 116,
      body(ctx, g) {
        sp(ctx, g, 'M118,40 L122,12 L146,12 L148,40', WHITE); sp(ctx, g, 'M121,22 L147,22', null, 0.7);
        sp(ctx, g, 'M40,64 L40,40 L164,40 L164,64', WHITE);
        [60, 82, 104].forEach(x => sc(ctx, g, x, 52, 6, null, 0.7));
        sp(ctx, g, 'M6,64 L194,64 L176,106 Q173,112 166,112 L30,112 Q24,112 21,106 Z', WHITE);
      }
    },
    balloon: {
      w: 200, h: 168,
      body(ctx, g) {
        sp(ctx, g, 'M88,128 L84,146 M112,128 L116,146', null, 0.8);
        sp(ctx, g, 'M80,144 L120,144 L116,166 L84,166 Z', F(g, 'basket'));
        sp(ctx, g, 'M100,8 C150,8 168,50 160,80 C152,108 120,118 112,128 L88,128 C80,118 48,108 40,80 C32,50 50,8 100,8 Z', F(g, 'body'));
        if (g.o.pal && g.o.pal.stripe) { ctx.fillStyle = g.o.pal.stripe; ctx.fill(new Path2D('M100,8 C80,40 78,92 92,128 L108,128 C122,92 120,40 100,8 Z')); }
        sp(ctx, g, 'M100,8 C80,40 78,92 92,128 M100,8 C120,40 122,92 108,128', null, 0.7);
      }
    }
  };
  const VNAME = { car: 'car', racecar: 'race car', bus: 'school bus', train: 'train', firetruck: 'fire truck', truck: 'truck', excavator: 'excavator', bicycle: 'bicycle', airplane: 'airplane', helicopter: 'helicopter', boat: 'boat', sailboat: 'sailboat', ship: 'ship', balloon: 'hot-air balloon' };

  function rr(ctx, x, y, w, hh, r) { h.roundRect(ctx, x, y, w, hh, r); }
  function dotPen(ctx, g) { ctx.lineWidth = 4.5 * g.k; ctx.strokeStyle = GREY; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.setLineDash([0.5 * g.k, 10 * g.k]); }
  function startDot(ctx, g, x, y) { ctx.setLineDash([]); ctx.beginPath(); ctx.arc(x, y, 6.5 * g.k, 0, Math.PI * 2); ctx.fillStyle = BLUE; ctx.fill(); }
  function modeOf(m, i) { return Array.isArray(m) ? (m[i] || 'solid') : (m || 'solid'); }

  function drawWheels(ctx, V, g) {
    (V.wheels || []).forEach((w, i) => {
      const m = modeOf(g.o.wheels, i); if (m === 'none') return; const [x, y, r] = w;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      if (!V.noFill) { ctx.fillStyle = g.o.pal ? F(g, 'wheel') : WHITE; ctx.fill(); }
      if (m === 'dot') { dotPen(ctx, g); ctx.stroke(); ctx.setLineDash([]); if (g.o.start !== false) startDot(ctx, g, x, y - r); }
      else { h.pen(ctx, g.lw); ctx.stroke(); sc(ctx, g, x, y, r * 0.36, g.o.pal ? F(g, 'hub') : null, 0.8); }
    });
  }
  function drawParts(ctx, V, g) {
    (V.wins || []).forEach((r, i) => {
      const m = modeOf(g.o.wins, i); if (m === 'none') return;
      rr(ctx, r[0], r[1], r[2], r[3], m === 'dot' ? 1 : 4); ctx.fillStyle = F(g, 'win'); ctx.fill();
      if (m === 'dot') { dotPen(ctx, g); ctx.stroke(); ctx.setLineDash([]); if (g.o.start !== false) startDot(ctx, g, r[0], r[1]); }
      else { h.pen(ctx, g.lw * 0.85); ctx.stroke(); }
    });
    (V.tris || []).forEach((t, i) => {
      const m = modeOf(g.o.tris, i); if (m === 'none') return;
      ctx.beginPath(); ctx.moveTo(t[0], t[1]); ctx.lineTo(t[2], t[3]); ctx.lineTo(t[4], t[5]); ctx.closePath(); ctx.fillStyle = F(g, 'tri'); ctx.fill();
      if (m === 'dot') { dotPen(ctx, g); ctx.stroke(); ctx.setLineDash([]); if (g.o.start !== false) startDot(ctx, g, t[0], t[1]); }
      else { h.pen(ctx, g.lw); ctx.stroke(); }
    });
  }
  function drawFace(ctx, g, f) {
    const [x, y, s] = f, e = s * 0.13;
    [-1, 1].forEach(sg => {
      ctx.beginPath(); ctx.ellipse(x + sg * s * 0.3, y - s * 0.12, e * 0.8, e, 0, 0, Math.PI * 2); ctx.fillStyle = INK; ctx.fill();
      ctx.beginPath(); ctx.arc(x + sg * s * 0.3 + e * 0.25, y - s * 0.12 - e * 0.4, e * 0.3, 0, Math.PI * 2); ctx.fillStyle = WHITE; ctx.fill();
    });
    h.pen(ctx, g.lw * 0.75); ctx.beginPath(); ctx.arc(x, y + s * 0.02, s * 0.2, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
    if (g.o.accent) { ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = g.o.accent; [-1, 1].forEach(sg => { ctx.beginPath(); ctx.arc(x + sg * s * 0.5, y + s * 0.1, s * 0.1, 0, Math.PI * 2); ctx.fill(); }); ctx.restore(); }
  }
  // draw vehicle `kind` fitted in a maxW x maxH box centered at (cx, cy). Returns its page box.
  function veh(ctx, kind, cx, cy, maxW, maxH, o = {}) {
    const V = VK[kind]; const s = Math.min(maxW / V.w, maxH / V.h); const W = V.w * s, H = V.h * s;
    const x0 = cx - W / 2, y0 = cy - H / 2;
    ctx.save(); ctx.translate(x0, y0); if (o.flip) { ctx.translate(W, 0); ctx.scale(-1, 1); } ctx.scale(s, s);
    const lwPage = o.lw || Math.max(3, Math.min(4.5, W / 60));
    const g = { k: 1 / s, lw: lwPage / s, s, o };
    if (V.wheelsFirst) drawWheels(ctx, V, g);
    V.body(ctx, g);
    drawParts(ctx, V, g);
    if (!V.wheelsFirst) drawWheels(ctx, V, g);
    if (o.face && V.face) drawFace(ctx, g, V.face);
    ctx.restore();
    return { x: x0, y: y0, w: W, h: H, s, bottom: y0 + H };
  }
  function vehBottom(ctx, kind, cx, bottom, maxW, maxH, o) { const V = VK[kind]; const s = Math.min(maxW / V.w, maxH / V.h); return veh(ctx, kind, cx, bottom - V.h * s / 2, maxW, maxH, o); }

  // ---------------------------------------------------------------- scene icons (100-unit boxes via h.icon)
  function ip(ctx, k, d, fill, mul = 1) { const p = new Path2D(d); if (fill) { ctx.fillStyle = fill; ctx.fill(p); } h.pen(ctx, 3.5 * k * mul); ctx.stroke(p); }
  const IC = {
    house(ctx, k) {
      ip(ctx, k, 'M18,46 L82,46 L82,96 L18,96 Z', WHITE);
      ip(ctx, k, 'M6,50 L50,8 L94,50 Z', WHITE);
      ip(ctx, k, 'M66,28 L66,12 L78,12 L78,38', WHITE, 0.8);
      ip(ctx, k, 'M41,68 L59,68 L59,96 L41,96 Z', null, 0.8);
      ip(ctx, k, 'M24,58 L36,58 L36,72 L24,72 Z M64,58 L76,58 L76,72 L64,72 Z', null, 0.8);
    },
    school(ctx, k, a) {
      ip(ctx, k, 'M50,16 L50,2', null, 0.8); ip(ctx, k, 'M50,2 L66,6 L50,10 Z', a || WHITE, 0.7);
      ip(ctx, k, 'M4,44 L96,44 L96,96 L4,96 Z', WHITE);
      ip(ctx, k, 'M28,44 L50,16 L72,44', WHITE);
      ip(ctx, k, 'M50,26 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0', null, 0.7);
      ip(ctx, k, 'M40,70 L60,70 L60,96 L40,96 Z M50,70 L50,96', null, 0.8);
      ip(ctx, k, 'M12,54 L26,54 L26,66 L12,66 Z M74,54 L88,54 L88,66 L74,66 Z M12,76 L26,76 L26,88 L12,88 Z M74,76 L88,76 L88,88 L74,88 Z', null, 0.7);
    },
    park(ctx, k) {
      ip(ctx, k, 'M30,96 L30,62 M72,96 L72,56', null, 1);
      ip(ctx, k, 'M30,64 Q8,64 10,44 Q10,24 30,22 Q50,24 50,44 Q52,64 30,64 Z', WHITE);
      ip(ctx, k, 'M72,58 Q50,58 52,34 Q54,8 72,8 Q92,10 92,34 Q94,58 72,58 Z', WHITE);
      ip(ctx, k, 'M4,96 L96,96', null, 0.8);
    },
    pond(ctx, k) {
      ip(ctx, k, 'M50,58 m-46,0 a46,24 0 1,0 92,0 a46,24 0 1,0 -92,0', WHITE);
      ip(ctx, k, 'M22,58 q7,-6 14,0 t14,0 M52,68 q7,-6 14,0 t14,0', null, 0.7);
      ip(ctx, k, 'M60,44 Q60,30 70,30 Q80,30 78,40 L86,42 L78,46 Q86,52 80,58 L60,58 Q52,50 60,44 Z', WHITE, 0.8);
    },
    barrier(ctx, k) {
      ip(ctx, k, 'M20,60 L12,96 M80,60 L88,96', null);
      ip(ctx, k, 'M6,38 L94,38 L94,62 L6,62 Z', WHITE);
      ip(ctx, k, 'M18,38 L34,62 M42,38 L58,62 M66,38 L82,62', null, 0.8);
    },
    cloud(ctx, k) { ip(ctx, k, 'M18,72 Q2,72 4,58 Q6,44 22,46 Q24,26 44,28 Q56,12 74,24 Q94,24 92,44 Q102,50 98,62 Q96,72 84,72 Z', WHITE); },
    sun(ctx, k, a) {
      ip(ctx, k, 'M50,50 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0', null);
      for (let i = 0; i < 8; i++) { const t = i * Math.PI / 4; ip(ctx, k, `M${50 + 28 * Math.cos(t)},${50 + 28 * Math.sin(t)} L${50 + 40 * Math.cos(t)},${50 + 40 * Math.sin(t)}`, null, 0.9); }
      if (a) { ctx.beginPath(); ctx.arc(50, 50, 8, 0, 7); ctx.fillStyle = a; ctx.fill(); }
    },
    waves(ctx, k) { ip(ctx, k, 'M6,40 q11,-10 22,0 t22,0 t22,0 t22,0 M6,64 q11,-10 22,0 t22,0 t22,0 t22,0', null); },
    road(ctx, k) { ip(ctx, k, 'M30,8 L8,92 M70,8 L92,92', null); ip(ctx, k, 'M50,12 L50,26 M50,42 L50,58 M50,74 L50,90', null, 0.8); },
    flagFinish(ctx, k) {
      ip(ctx, k, 'M20,98 L20,4', null);
      ip(ctx, k, 'M20,6 L84,6 L84,50 L20,50 Z', WHITE);
      ctx.fillStyle = INK; for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) if ((r + c) % 2 === 0) ctx.fillRect(20 + c * 64 / 6, 6 + r * 11, 64 / 6, 11);
      ip(ctx, k, 'M20,6 L84,6 L84,50 L20,50 Z', null);
    }
  };
  function ic(ctx, name, x, y, s, a) { h.icon(ctx, IC[name], x, y, s, a); }

  // ---------------------------------------------------------------- page helpers
  const CH = { racecar: 'racecar', bus: 'bus', train: 'train', firetruck: 'firetruck' };
  function charKind(d) { return CH[d.character] || 'racecar'; }
  const VNAME_ES = { car: 'carro', racecar: 'carro de carreras', bus: 'autobús escolar', train: 'tren', firetruck: 'camión de bomberos', truck: 'camión', excavator: 'excavadora', bicycle: 'bicicleta', airplane: 'avión', helicopter: 'helicóptero', boat: 'bote', sailboat: 'velero', ship: 'barco', balloon: 'globo aerostático' };
  function charLabel(d) { return h.t(d, VNAME[charKind(d)], VNAME_ES[charKind(d)]); }
  const T = h.t;
  function shapeChip(ctx, kind, x, y, label) { // dotted sample shape + word
    ctx.save(); ctx.lineWidth = 4.5; ctx.strokeStyle = GREY; ctx.lineCap = 'round'; ctx.setLineDash([0.5, 10]); ctx.beginPath();
    if (kind === 'circle') ctx.arc(x + 20, y, 18, 0, Math.PI * 2);
    else if (kind === 'square') ctx.rect(x + 2, y - 18, 36, 36);
    else { ctx.moveTo(x + 20, y - 19); ctx.lineTo(x + 40, y + 17); ctx.lineTo(x, y + 17); ctx.closePath(); }
    ctx.stroke(); ctx.restore(); h.text(ctx, label, x + 52, y + 8, 22, 500, SOFT);
  }
  function prompt(ctx, d, n, s, x, y, maxW) { h.numCircle(ctx, x + 20, y - 8, n, d.accent, 20); const px = h.fitText(ctx, s, maxW - 56, 24, 500); h.text(ctx, s, x + 54, y, px, 500, INK); }
  function richLine(ctx, parts, x, y, px, align = 'left') { // [[text, bold?]] mixed weight line
    let tot = 0; parts.forEach(([t, b]) => { h.font(ctx, b ? 700 : 500, px); tot += ctx.measureText(t).width; });
    let cx = align === 'center' ? x - tot / 2 : x;
    parts.forEach(([t, b]) => { h.text(ctx, t, cx, y, px, b ? 700 : 500, INK); h.font(ctx, b ? 700 : 500, px); cx += ctx.measureText(t).width; });
  }
  function water(ctx, x1, x2, y) { h.pen(ctx, 3); ctx.beginPath(); for (let x = x1; x < x2 - 1; x += 32) { ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 8, y - 8, x + 16, y); ctx.quadraticCurveTo(x + 24, y + 8, x + 32, y); } ctx.stroke(); }

  // ---------------------------------------------------------------- pages
  // 1 · Finish the vehicles
  function p1(ctx, d) {
    const a = d.age;
    h.header(ctx, d, T(d, 'Help {name} finish the vehicles', 'Ayuda a {name} a terminar los vehículos'), a === 3 ? T(d, 'Trace the dotted circles to give each vehicle its wheels. Then color.', 'Traza los círculos punteados para ponerle ruedas a cada vehículo. Luego colorea.') : T(d, 'Trace the dotted circles, squares and triangles. Then color the vehicles.', 'Traza los círculos, cuadrados y triángulos punteados. Luego colorea los vehículos.'));
    const SC = T(d, 'circle', 'círculo'), SQ = T(d, 'square', 'cuadrado'), TR = T(d, 'triangle', 'triángulo');
    if (a === 3) shapeChip(ctx, 'circle', 60, 215, SC);
    else { shapeChip(ctx, 'circle', 60, 215, SC); shapeChip(ctx, 'square', 250, 215, SQ); shapeChip(ctx, 'triangle', 440, 215, TR); }
    if (a === 3) {
      const L = [['car', { wheels: 'dot' }], ['bus', { wheels: 'dot' }], ['bicycle', { wheels: 'dot' }]];
      L.forEach(([k, o], i) => { const top = 255 + i * 245; h.box(ctx, 60, top, 730, 230, 18); vehBottom(ctx, k, 425, top + 210, 470, 185, o); line(ctx, 130, top + 211, 720, top + 211); });
      h.tip(ctx, T(d, 'Grown-up tip: start at the blue dot and go all the way around the circle.', 'Consejo para el adulto: empiecen en el punto azul y den toda la vuelta al círculo.'));
      return;
    }
    const cells = [['car', { wheels: 'dot' }], ['bus', { wins: 'dot', wheels: 'dot' }], ['sailboat', { tris: 'dot' }], ['racecar', { tris: 'dot', wheels: 'dot' }]];
    const top0 = 255, ch = a === 4 ? 355 : 262, gap = 12;
    cells.forEach(([k, o], i) => {
      const cx = i % 2, cy = (i / 2) | 0; const x = 60 + cx * 371, y = top0 + cy * (ch + gap);
      h.box(ctx, x, y, 359, ch, 18);
      const b = vehBottom(ctx, k, x + 180, y + ch - 30, 300, ch - 70, o);
      if (k !== 'sailboat') line(ctx, x + 30, y + ch - 29, x + 329, y + ch - 29);
      else water(ctx, x + 40, x + 320, y + ch - 22);
    });
    if (a === 5) {
      const y = top0 + 2 * (ch + gap), H = 985 - y; h.box(ctx, 60, y, 730, H, 18);
      // ship with a flag pole and an empty dotted box for a freehand flag
      const b = vehBottom(ctx, 'ship', 210, y + H - 30, 240, H - 95, {});
      const px = b.x + b.w * 0.3, top = y + 18; line(ctx, px, b.y + b.h * 0.345, px, top + 4, { lw: 3.5 });
      h.box(ctx, px + 6, top, 120, 76, 8, GREY, 3, [8, 8]);
      water(ctx, 80, 360, y + H - 22);
      const t = T(d, 'Draw a flag for ' + h.possessive(d.name) + ' boat in the dotted box.', 'Dibuja una bandera para el barco de ' + d.name + ' en el cuadro punteado.');
      if (d.lang === 'es') { const nL = h.wrapLines(ctx, t, 300, 23, 500).length; h.wrapText(ctx, t, 465, y + H / 2 + 8 - (nL - 1) * 15, 300, 23, 30, 500, INK); }
      else h.wrapText(ctx, t, 470, y + H / 2 - 8, 290, 24, 32, 500, INK);
    }
    h.tip(ctx, T(d, 'Grown-up tip: name each shape while tracing: circle, square, triangle.', 'Consejo para el adulto: digan el nombre de cada figura mientras trazan: círculo, cuadrado, triángulo.'));
  }
  function line(ctx, x1, y1, x2, y2, o) { h.line(ctx, x1, y1, x2, y2, o || { lw: 3 }); }

  // 2 · First, next, last
  function p2(ctx, d) {
    const a = d.age, n = a + 0; // 3, 4 or 5 vehicles
    h.header(ctx, d, T(d, 'First, next, last', 'Primero, después, último'), T(d, 'The vehicles are driving to the flag. The FIRST one is next to the flag.', 'Los vehículos van hacia la bandera. El PRIMERO es el que está junto a la bandera.'));
    const pool = h.shuffle(['car', 'bus', 'firetruck', 'racecar', 'truck', 'excavator', 'train', 'bicycle'], d.rand).slice(0, n);
    const vh = a === 3 ? 150 : a === 4 ? 125 : 105, roadY = 200 + vh + 20;
    ic(ctx, 'flagFinish', 92, roadY - 55, 110);
    line(ctx, 60, roadY + 2, 790, roadY + 2, { lw: 3 });
    const x1 = 140, slot = (790 - x1) / n;
    pool.forEach((k, i) => vehBottom(ctx, k, x1 + slot * (i + 0.5), roadY, slot - 12, vh, { flip: true }));
    const P = [T(d, 'Color the FIRST one.', 'Colorea el PRIMERO.'), T(d, 'Circle the LAST one.', 'Encierra en un círculo el ÚLTIMO.')];
    if (a === 5) P.push(T(d, 'Put a dot on the SECOND one.', 'Pon un punto en el SEGUNDO.'), T(d, 'Draw a line under the THIRD one.', 'Dibuja una línea debajo del TERCERO.'));
    let y = roadY + 70; P.forEach((s, i) => { prompt(ctx, d, i + 1, s, 60, y, 730); y += 52; });
    // top / bottom panels
    const top = y + 8, H = 985 - top, W = 355;
    h.box(ctx, 60, top, W, H, 18); h.box(ctx, 435, top, W, H, 18);
    const es = d.lang === 'es';
    if (es) {
      richLine(ctx, [['Encierra el que va', 0]], 60 + W / 2, top + 30, 20, 'center'); richLine(ctx, [['ARRIBA', 1], [' de las nubes.', 0]], 60 + W / 2, top + 55, 20, 'center');
      richLine(ctx, [['Encierra el que va', 0]], 435 + W / 2, top + 30, 20, 'center'); richLine(ctx, [['DEBAJO', 1], [' del puente.', 0]], 435 + W / 2, top + 55, 20, 'center');
    } else {
    richLine(ctx, [['Circle the one ', 0], ['ABOVE', 1], [' the clouds.', 0]], 60 + W / 2, top + 38, 21, 'center');
    richLine(ctx, [['Circle the one ', 0], ['BELOW', 1], [' the bridge.', 0]], 435 + W / 2, top + 38, 21, 'center'); }
    const sh = H - 60, sy = top + 55; // scene area
    // clouds scene
    const cy = sy + sh * 0.5; ic(ctx, 'cloud', 165, cy, Math.min(150, sh * 0.5)); ic(ctx, 'cloud', 305, cy + 6, Math.min(130, sh * 0.44));
    veh(ctx, 'airplane', 175 + 60, sy + sh * 0.16, 150, sh * 0.27, {});
    veh(ctx, 'helicopter', 175 + 30, sy + sh * 0.84, 140, sh * 0.27, {});
    // bridge scene
    const bx1 = 455, bx2 = 770, deck = sy + sh * 0.40;
    vehBottom(ctx, 'car', 612, deck - 2, 130, sh * 0.27, {});
    ctx.save(); h.pen(ctx, 3.5); h.roundRect(ctx, bx1, deck, bx2 - bx1, 16, 4); ctx.fillStyle = WHITE; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bx1 + 24, deck + 16); ctx.lineTo(bx1 + 24, sy + sh * 0.93); ctx.moveTo(bx2 - 24, deck + 16); ctx.lineTo(bx2 - 24, sy + sh * 0.93); ctx.stroke(); ctx.restore();
    vehBottom(ctx, 'boat', 612, sy + sh * 0.9, 150, sh * 0.32, {});
    water(ctx, bx1 + 4, bx2 - 4, sy + sh * 0.93);
    h.tip(ctx, T(d, 'Grown-up tip: point and count together: first, second, third... The last one is at the end of the line.', 'Consejo para el adulto: señalen y cuenten juntos: primero, segundo, tercero... El último está al final de la fila.'));
  }

  // 3 · Which road goes to school?
  function roadPath(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); }
  function road(ctx, pts) {
    ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'butt';
    roadPath(ctx, pts); ctx.lineWidth = 52; ctx.strokeStyle = INK; ctx.stroke();
    roadPath(ctx, pts); ctx.lineWidth = 45; ctx.strokeStyle = WHITE; ctx.stroke();
    roadPath(ctx, pts); ctx.lineWidth = 3; ctx.strokeStyle = LINE; ctx.setLineDash([12, 12]); ctx.stroke(); ctx.restore();
  }
  function curve(ys, ye, amp, ph) {
    const pts = []; const xa = 222, xb = 628;
    for (let i = 0; i <= 80; i++) { const t = i / 80, u = Math.max(0, Math.min(1, (t - 0.14) / 0.72)), sm = u * u * (3 - 2 * u); const bump = Math.sin(Math.PI * u);
      pts.push([xa + (xb - xa) * t, ys + (ye - ys) * sm + amp * Math.sin(2 * Math.PI * 1.5 * t + ph) * bump]); }
    return pts;
  }
  function p3(ctx, d) {
    const a = d.age;
    if (a === 5) return p3maze(ctx, d);
    h.header(ctx, d, T(d, 'Which road goes to school?', '¿Qué camino llega a la escuela?'), T(d, `Follow each road from ${h.possessive(d.name)} house with your finger. Color the road that goes to the school.`, `Sigue con el dedo cada camino que sale de la casa de ${d.name}. Colorea el camino que llega a la escuela.`));
    const n = a === 3 ? 2 : 3;
    const dests = a === 3 ? [360, 820] : [310, 590, 870];
    const starts = a === 3 ? [575, 655] : [545, 615, 685];
    let perm = a === 3 ? [0, 1] : h.shuffle([[1, 2, 0], [2, 0, 1], [1, 0, 2], [0, 2, 1], [2, 1, 0]], d.rand)[0];
    const kinds = a === 3 ? h.shuffle(['school', 'park'], d.rand) : h.shuffle(['school', 'park', 'barrier'], d.rand);
    const amps = a === 3 ? [40, 40] : [28, 28, 28];
    for (let i = 0; i < n; i++) road(ctx, curve(starts[i], dests[perm[i]], amps[i], 0.3));
    dests.forEach((y, i) => { const k = kinds[i]; ic(ctx, k, 712, y, k === 'school' ? 150 : 120, d.accent); if (k === 'school') h.text(ctx, T(d, 'School', 'Escuela'), 712, y + 92, 20, 700, INK, 'center'); });
    ic(ctx, 'house', 138, 612, 180);
    if (d.lang === 'es') { h.text(ctx, 'La casa de', 138, 474, 20, 700, INK, 'center'); const px = h.fitText(ctx, d.name, 170, 26, 700); h.text(ctx, d.name, 138, 506, px, 700, d.accent, 'center'); }
    else { const lab = h.possessive(d.name); const px = h.fitText(ctx, lab, 170, 26, 700); h.text(ctx, lab, 138, 506, px, 700, d.accent, 'center'); }
    veh(ctx, charKind(d), 140, 790, 160, 100, { face: true, accent: d.accent });
    h.tip(ctx, T(d, `Grown-up tip: let the ${charLabel(d)} "drive" each road with a finger before coloring.`, `Consejo para el adulto: dejen que el ${charLabel(d)} “maneje” por cada camino con un dedo antes de colorear.`));
  }
  function p3maze(ctx, d) {
    h.header(ctx, d, T(d, 'Which road goes to school?', '¿Qué camino llega a la escuela?'), T(d, `Help ${d.name} get from home to school. Draw a line along the road through the maze.`, `Ayuda a ${d.name} a ir de su casa a la escuela. Dibuja una línea por el camino del laberinto.`));
    const C = 6, R = 5, S = 95, X = 425 - C * S / 2, Y = 330;
    // perfect maze by depth-first search (only one way through)
    const vis = [], wallR = [], wallB = []; for (let r = 0; r < R; r++) { vis.push([]); wallR.push([]); wallB.push([]); for (let c = 0; c < C; c++) { vis[r].push(false); wallR[r].push(true); wallB[r].push(true); } }
    const st = [[0, 0]]; vis[0][0] = true;
    while (st.length) { const [r, c] = st[st.length - 1]; const nb = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].filter(([rr2, cc]) => rr2 >= 0 && rr2 < R && cc >= 0 && cc < C && !vis[rr2][cc]);
      if (!nb.length) { st.pop(); continue; } const [nr, nc] = nb[Math.floor(d.rand() * nb.length)];
      if (nr === r) wallR[r][Math.min(c, nc)] = false; else wallB[Math.min(r, nr)][c] = false; vis[nr][nc] = true; st.push([nr, nc]); }
    ctx.save(); h.pen(ctx, 6); ctx.beginPath();
    ctx.moveTo(X + S, Y); ctx.lineTo(X + C * S, Y); // top (entrance above cell 0,0)
    ctx.moveTo(X, Y); ctx.lineTo(X, Y + R * S); ctx.lineTo(X + (C - 1) * S, Y + R * S); // left + bottom (exit below last cell)
    ctx.moveTo(X + C * S, Y); ctx.lineTo(X + C * S, Y + R * S);
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      if (c < C - 1 && wallR[r][c]) { ctx.moveTo(X + (c + 1) * S, Y + r * S); ctx.lineTo(X + (c + 1) * S, Y + (r + 1) * S); }
      if (r < R - 1 && wallB[r][c]) { ctx.moveTo(X + c * S, Y + (r + 1) * S); ctx.lineTo(X + (c + 1) * S, Y + (r + 1) * S); }
    }
    ctx.stroke(); ctx.restore();
    h.dot(ctx, X + S / 2, Y + 18, 9, BLUE);
    ic(ctx, 'house', X + S / 2, Y - 68, 120);
    const lab = T(d, h.possessive(d.name) + ' house', 'La casa de ' + d.name); const px = h.fitText(ctx, lab, 380, 28, 700); h.text(ctx, lab, X + S + 20, Y - 55, px, 700, d.accent);
    const sx = X + (C - 0.5) * S; ic(ctx, 'school', sx, Y + R * S + 82, 130, d.accent);
    h.text(ctx, T(d, 'School', 'Escuela'), sx - 85, Y + R * S + 100, 22, 700, INK, 'right');
    veh(ctx, charKind(d), X + 150, Y + R * S + 85, 180, 110, { face: true, accent: d.accent });
    h.tip(ctx, T(d, `Grown-up tip: start at the blue dot. Trace with a finger first, then with a crayon.`, 'Consejo para el adulto: empiecen en el punto azul. Tracen primero con el dedo y luego con un crayón.'));
  }

  // 4 · Land, water or air?
  const CAT = { air: ['airplane', 'helicopter', 'balloon'], water: ['sailboat', 'boat', 'ship'], road: ['car', 'bus', 'firetruck', 'bicycle'] };
  function p4(ctx, d) {
    const a = d.age;
    h.header(ctx, d, T(d, 'Land, water or air?', '¿Tierra, agua o aire?'), T(d, 'Listen to each row. Circle the right vehicles. Then color them.', 'Escucha cada fila. Encierra los vehículos correctos. Luego coloréalos.'));
    const rows = a === 3 ? ['air', 'road'] : ['air', 'water', 'road'];
    const TX = d.lang === 'es' ? { air: [['Encierra los que ', 0], ['VUELAN', 1], ['.', 0]], water: [['Encierra los que van por el ', 0], ['AGUA', 1], ['.', 0]], road: [['Encierra los que van por la ', 0], ['CARRETERA', 1], ['.', 0]] } : { air: [['Circle the ones that ', 0], ['FLY', 1], ['.', 0]], water: [['Circle the ones that go on ', 0], ['WATER', 1], ['.', 0]], road: [['Circle the ones that drive on the ', 0], ['ROAD', 1], ['.', 0]] };
    const ICN = { air: 'cloud', water: 'waves', road: 'road' };
    const top = 195, gap = 16, H = (985 - top - gap * (rows.length - 1)) / rows.length;
    rows.forEach((cat, ri) => {
      const y = top + ri * (H + gap); h.box(ctx, 60, y, 730, H, 18);
      ic(ctx, ICN[cat], 108, y + 42, 54); richLine(ctx, TX[cat], 150, y + 52, 25);
      const nOk = a === 5 ? 1 + Math.floor(d.rand() * 3) : 2;
      const ok = h.shuffle(CAT[cat].slice(), d.rand).slice(0, nOk);
      const others = h.shuffle(Object.keys(CAT).filter(c => c !== cat).reduce((s, c) => s.concat(CAT[c]), []), d.rand).slice(0, 4 - nOk);
      const items = h.shuffle(ok.concat(others), d.rand);
      const slot = 710 / 4, vy = y + 92 + (H - 110) / 2;
      items.forEach((k, i) => veh(ctx, k, 70 + slot * (i + 0.5), vy, slot - 16, Math.min(H - 110, 190), {}));
    });
    h.tip(ctx, T(d, 'Grown-up tip: ask "Where does it go?" for each vehicle before circling.', 'Consejo para el adulto: pregunta “¿Por dónde va?” con cada vehículo antes de encerrarlo.'));
  }

  // 5 · Add the missing wheels
  function p5(ctx, d) {
    const a = d.age;
    h.header(ctx, d, T(d, 'Add the missing wheels', 'Pon las ruedas que faltan'), a === 5 ? T(d, 'Look at the number. Draw the missing wheels so each vehicle has that many.', 'Mira el número. Dibuja las ruedas que faltan para que cada vehículo tenga esa cantidad.') : T(d, 'Count the wheels each vehicle needs. Trace the dotted wheels to finish it.', 'Cuenta las ruedas que necesita cada vehículo. Traza las ruedas punteadas para terminarlo.'));
    const list = a === 3 ? ['bicycle', 'car', 'firetruck'] : a === 4 ? ['bicycle', 'car', 'firetruck', 'truck'] : ['bicycle', 'racecar', 'train', 'firetruck', 'truck'];
    const kinds = h.shuffle(list.slice(), d.rand);
    const top = 195, gap = 12, n = kinds.length, H = (985 - top - gap * (n - 1)) / n;
    kinds.forEach((k, i) => {
      const y = top + i * (H + gap); h.box(ctx, 60, y, 730, H, 18);
      const N = VK[k].wheels.length; const miss = a === 3 ? 1 : 1 + Math.floor(d.rand() * (a === 4 ? Math.min(2, N - 1) : N - 1));
      const idx = h.shuffle([...Array(N).keys()], d.rand).slice(0, miss);
      const modes = [...Array(N).keys()].map(j => idx.includes(j) ? (a === 5 ? 'none' : 'dot') : 'solid');
      const b = vehBottom(ctx, k, 285, y + H - 16, 400, H - 30, { wheels: modes });
      line(ctx, 80, y + H - 15, 500, y + H - 15);
      // the number of wheels needed
      const nx = 535, ny = y + H / 2; const r = Math.min(38, H * 0.28);
      h.numCircle(ctx, nx + r, ny + (a === 5 ? 0 : -r * 0.15), N, d.accent, r);
      if (a < 5) for (let j = 0; j < N; j++) { const wr = Math.min(13, H * 0.1); const wx = nx + 2 * r + 20 + wr + j * (wr * 2 + 8); h.circle(ctx, wx, ny, wr, { lw: 3 }); h.circle(ctx, wx, ny, wr * 0.36, { lw: 2.5 }); }
    });
    h.tip(ctx, a === 5 ? T(d, 'Grown-up tip: count the wheels that are there, then count on to the number.', 'Consejo para el adulto: cuenten las ruedas que ya están y sigan contando hasta llegar al número.') : T(d, 'Grown-up tip: count the wheels out loud, then touch each one on the vehicle.', 'Consejo para el adulto: cuenten las ruedas en voz alta y luego toquen cada una en el vehículo.'));
  }

  // 6 · Driver's license
  function p6(ctx, d) {
    const a = d.age, A = d.accent;
    const es = d.lang === 'es';
    const t = es ? 'La licencia de conducir de {name}' : '{name}' + h.possessive(d.name).slice(d.name.length) + " driver's license";
    h.header(ctx, d, t, es ? (a === 3 ? 'Colorea tu nombre. Traza tu edad. Dibuja tu cara. Colorea el vehículo que te guste.' : a === 4 ? 'Traza tu nombre. Escribe tu edad. Dibuja tu cara. Colorea el vehículo que te guste.' : 'Escribe tu nombre y tu edad. Dibuja tu cara. Colorea el vehículo que te guste.') : a === 3 ? 'Color your name. Trace your age. Draw your face. Color the vehicle you like.' : a === 4 ? 'Trace your name. Write your age. Draw your face. Color the vehicle you like.' : 'Write your name and your age. Draw your face. Color the vehicle you like.');
    ctx.save(); h.pen(ctx, 5, A); h.roundRect(ctx, 60, 192, 730, 793, 28); ctx.stroke(); ctx.restore();
    if (es) { const hp = h.fitText(ctx, 'LICENCIA DE CONDUCIR', 400, 32, 700); h.text(ctx, 'LICENCIA DE CONDUCIR', 95, 246, hp, 700, A); const sw = 755 - (95 + ctx.measureText('LICENCIA DE CONDUCIR').width) - 24; const sp2 = h.fitText(ctx, 'Exploradores sobre ruedas', sw, 18, 500); h.text(ctx, 'Exploradores sobre ruedas', 755, 244, sp2, 500, SOFT, 'right'); }
    else { h.text(ctx, "DRIVER'S LICENSE", 95, 246, 32, 700, A);
    h.text(ctx, 'Little Explorers on Wheels', 755, 244, 18, 500, SOFT, 'right'); }
    line(ctx, 80, 268, 770, 268, { lw: 2, color: LINE });
    // name
    h.text(ctx, T(d, 'Name', 'Nombre'), 95, 304, 22, 700, SOFT);
    const base = 410;
    if (a === 3) { const px = h.fitText(ctx, d.name, 640, 116, 700); h.font(ctx, 700, px); ctx.textAlign = 'center'; ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.strokeText(d.name, 425, base); }
    else if (a === 4) { const z = h.fitStroke(d.name, 640, 88, 36); h.guide(ctx, 95, 755, base, z); const w = h.measureStroke(d.name, z); h.drawStroke(ctx, d.name, 425 - w / 2, base, z, { dash: [2, 10], lw: 4.5, color: GREY, startDot: BLUE }); }
    else { const nx = es ? 200 : 170; h.text(ctx, d.name, nx, 304, h.fitText(ctx, d.name, 730 - nx, 22, 700), 700, A); h.guide(ctx, 95, 755, base, 80); }
    // face frame
    h.box(ctx, 95, 462, 250, 280, 18, INK, 3);
    h.text(ctx, T(d, 'Draw your face', 'Dibuja tu cara'), 220, 770, 20, 500, SOFT, 'center');
    // age
    h.text(ctx, T(d, 'Age', 'Edad'), 380, 488, 22, 700, SOFT);
    h.box(ctx, 380, 502, 130, 130, 14, INK, 3);
    if (a === 3) { const z = 90, w = h.measureStroke('3', z); h.drawStroke(ctx, '3', 445 - w / 2, 612, z, { dash: [2, 10], lw: 4.5, color: GREY, startDot: BLUE }); }
    // explorer stamp with the favorite character
    ctx.save(); h.pen(ctx, 3, A); ctx.beginPath(); ctx.arc(650, 590, 112, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.arc(650, 590, 100, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    veh(ctx, charKind(d), 650, 580, 150, 95, { face: true, accent: A });
    h.text(ctx, T(d, 'EXPLORER', 'EXPLORADOR'), 650, 655, 20, 700, A, 'center');
    h.text(ctx, T(d, 'Signature', 'Firma'), 380, 690, 20, 700, SOFT); line(ctx, 380, 742, 530, 742, { lw: 2 });
    // my vehicle
    richLine(ctx, es ? [['Mi vehículo: ', 1], ['colorea el que te guste.', 0]] : [['My vehicle: ', 1], ['color the one you like.', 0]], 95, 815, 22);
    const opts = h.shuffle([charKind(d)].concat(h.shuffle(['car', 'bicycle', 'airplane', 'sailboat', 'helicopter', 'excavator'], d.rand).slice(0, 2)), d.rand);
    opts.forEach((k, i) => { const x = 95 + i * 228; h.box(ctx, x, 832, 205, 130, 16); veh(ctx, k, x + 102, 897, 165, 100, k === charKind(d) ? { face: true } : {}); });
    h.tip(ctx, T(d, 'Grown-up tip: cut out the license when it is done and keep it for pretend play.', 'Consejo para el adulto: cuando esté lista, recorten la licencia y guárdenla para jugar.'));
  }

  // ---------------------------------------------------------------- cover / certificate
  // ---- color cover (v2): full-color scene behind, colored vehicles in front; interior stays line art
  const CP = { wheel: '#3A4250', hub: '#DDE3EC', win: '#D3ECFA', smoke: '#FFFFFF' };
  const PAL = {
    racecar: { body: '#3E88DD', dome: '#FFF4DC' },
    bus: { body: '#FFC83D', door: '#D3ECFA' },
    train: { body: '#E5533D', cab: '#3B7DD8', roof: '#2D4E86', chimney: '#56606E', dome: '#FFC83D', front: '#FFC83D' },
    firetruck: { body: '#E2453B', ladder: '#EEF2F6' },
    car: { body: '#7CC56A' },
    airplane: { body: '#FFFFFF', wing: '#FF8A65' },
    balloon: { body: '#FF9F4A', stripe: '#FFD45C', basket: '#C98A4B' }
  };
  function pal(kind, accent) { const p = Object.assign({}, CP, PAL[kind] || {}); if (kind === 'racecar') p.tri = accent; return p; }
  const SKY = '#BFE4F8', GRASS = '#7CC063', HILL = '#A7D886', ROAD = '#8E97A4';
  function railRoad(ctx, y1, y2) { // side view: gravel bed, sleepers, one steel rail on top (wheels sit on y1)
    ctx.fillStyle = '#C9B89C'; ctx.fillRect(0, y1 + 6, 850, y2 - y1 - 6);
    ctx.fillStyle = '#9A6B4A'; for (let x = 4; x < 850; x += 40) { h.roundRect(ctx, x, y1 + 8, 26, 18, 3); ctx.fill(); }
    ctx.fillStyle = '#5B6470'; ctx.fillRect(0, y1, 850, 10); ctx.fillStyle = '#8A939E'; ctx.fillRect(0, y1, 850, 3);
  }
  function blob(ctx, x, y, s, c) { ctx.fillStyle = c; ctx.beginPath(); [[0, 0, 1], [-0.9, 0.25, 0.7], [0.95, 0.25, 0.72], [-0.4, -0.35, 0.75], [0.45, -0.3, 0.7]].forEach(([dx, dy, r]) => { ctx.moveTo(x + dx * s + r * s, y + dy * s); ctx.arc(x + dx * s, y + dy * s, r * s, 0, Math.PI * 2); }); ctx.fill(); }
  function flower(ctx, x, y, c) { ctx.fillStyle = c; for (let i = 0; i < 5; i++) { const t = i * Math.PI * 2 / 5; ctx.beginPath(); ctx.arc(x + 9 * Math.cos(t), y + 9 * Math.sin(t), 7, 0, Math.PI * 2); ctx.fill(); } ctx.fillStyle = '#FFD45C'; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill(); }
  function coverBg(ctx, d) {
    const k = charKind(d);
    const gr = ctx.createLinearGradient(0, 340, 0, 660); gr.addColorStop(0, '#A9DAF6'); gr.addColorStop(1, '#E3F4FD'); ctx.fillStyle = gr; ctx.fillRect(0, 0, 850, 700);
    // sun
    ctx.save(); ctx.strokeStyle = '#FFCB45'; ctx.lineWidth = 8; ctx.lineCap = 'round';
    for (let i = 0; i < 10; i++) { const t = i * Math.PI / 5 + 0.2; ctx.beginPath(); ctx.moveTo(700 + 58 * Math.cos(t), 430 + 58 * Math.sin(t)); ctx.lineTo(700 + 78 * Math.cos(t), 430 + 78 * Math.sin(t)); ctx.stroke(); }
    ctx.fillStyle = '#FFD45C'; ctx.beginPath(); ctx.arc(700, 430, 46, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    // clouds
    blob(ctx, 175, 418, 34, '#FFFFFF'); blob(ctx, 470, 392, 26, '#FFFFFF'); blob(ctx, 560, 560, 20, '#FFFFFF');
    // hills
    ctx.fillStyle = HILL; ctx.beginPath(); ctx.moveTo(0, 640); ctx.bezierCurveTo(140, 545, 300, 560, 420, 615); ctx.bezierCurveTo(540, 560, 720, 540, 850, 610); ctx.lineTo(850, 720); ctx.lineTo(0, 720); ctx.closePath(); ctx.fill();
    ctx.fillStyle = GRASS; ctx.beginPath(); ctx.moveTo(0, 668); ctx.bezierCurveTo(200, 628, 420, 640, 560, 655); ctx.bezierCurveTo(680, 668, 780, 640, 850, 648); ctx.lineTo(850, 1100); ctx.lineTo(0, 1100); ctx.closePath(); ctx.fill();
    // trees on the hills
    [[250, 585, 26], [600, 588, 22], [785, 600, 20]].forEach(([x, y, r]) => { ctx.fillStyle = '#8A5A3C'; ctx.fillRect(x - 4, y, 8, r * 1.3); ctx.fillStyle = '#4FA35A'; ctx.beginPath(); ctx.arc(x, y - r * 0.2, r, 0, Math.PI * 2); ctx.fill(); });
    // back road on the hill (small companions drive here)
    ctx.fillStyle = '#B4BCC7'; ctx.fillRect(0, 676, 850, 16);
    // front road (or rail track for the train)
    if (k === 'train') { ctx.fillStyle = ROAD; railRoad(ctx, 736, 808); }
    else {
      ctx.fillStyle = ROAD; ctx.fillRect(0, 712, 850, 96);
      ctx.fillStyle = '#C3CAD3'; ctx.fillRect(0, 712, 850, 6); ctx.fillRect(0, 802, 850, 6);
      ctx.fillStyle = '#FFFFFF'; for (let x = 10; x < 850; x += 70) ctx.fillRect(x, 757, 40, 7);
    }
    // flowers in the grass (beside the name box)
    [[96, 870, '#FF8FB1'], [130, 935, '#FFFFFF'], [92, 1000, '#B79CF2'], [752, 880, '#FFFFFF'], [722, 945, '#FF8FB1'], [758, 1005, '#FFB25C']].forEach(([x, y, c]) => flower(ctx, x, y, c));
  }
  function coverArt(ctx, d) {
    const A = d.accent, k = charKind(d);
    // sky vehicles
    veh(ctx, 'airplane', 335, 458, 150, 80, { pal: pal('airplane', A), lw: 3 });
    veh(ctx, 'balloon', 130, 520, 90, 112, { pal: pal('balloon', A), lw: 3 });
    // small friends on the back road
    const friends = ['bus', 'firetruck', 'racecar', 'car'].filter(x => x !== k).slice(0, 2);
    vehBottom(ctx, friends[0], 125, 686, 120, 66, { pal: pal(friends[0], A), lw: 3, face: true });
    vehBottom(ctx, friends[1], 728, 686, 120, 66, { pal: pal(friends[1], A), lw: 3, face: true });
    // main character, big, in color
    const ground = k === 'train' ? 736 : 772;
    vehBottom(ctx, k, 425, ground, k === 'racecar' ? 470 : 420, 230, { face: true, accent: A, smoke: true, pal: pal(k, A), lw: 4.5 });
  }
  // big friendly line art for the coloring page and reward badges (no color fills)
  function drawCharacter(ctx, d, id, cx, cy, size) {
    const kind = CH[id] || 'racecar', V = VK[kind], lw = Math.max(2.5, size / 90);
    const s = Math.min(size * 0.96 / V.w, size * 0.9 / V.h), H = V.h * s, top = kind === 'train' ? 22 * s : 0; // room for the smoke puffs
    const y = cy + top / 2;
    veh(ctx, kind, cx, y, size * 0.96, size * 0.9, { face: true, smoke: true, lw });
    if (size >= 200) h.line(ctx, cx - size * 0.56, y + H / 2 + lw / 2, cx + size * 0.56, y + H / 2 + lw / 2, { lw });
  }
  function certArt(ctx, d) {
    const k = charKind(d); vehBottom(ctx, k, 425, 870, 260, 140, { face: true, accent: d.accent, smoke: true });
    line(ctx, 200, 872, 650, 872, { lw: 3 });
    h.sparkle(ctx, 250, 740, 14, d.accent); h.sparkle(ctx, 610, 720, 14, d.accent);
  }

  K.register({
    id: 'wheels', title: 'Little Explorers on Wheels', titleEs: 'Pequeños exploradores sobre ruedas',
    characters: [{ id: 'racecar', label: 'Race car', labelEs: 'Carro de carreras' }, { id: 'bus', label: 'School bus', labelEs: 'Autobús escolar' }, { id: 'train', label: 'Train', labelEs: 'Tren' }, { id: 'firetruck', label: 'Fire truck', labelEs: 'Camión de bomberos' }],
    certText: 'You are a super explorer on wheels!', certTextEs: '¡Exploraste el mundo sobre ruedas!',
    hasNameTrace: true, coverSky: SKY, coverBg, coverArt, certArt, drawCharacter,
    charArticleEs(d) { return 'el'; }, // carro, autobús, tren, camión: all masculine
    pages: [
      { title: 'Finish the vehicles', titleEs: 'Termina los vehículos', draw: p1 },
      { title: 'First, next, last', titleEs: 'Primero, después, último', draw: p2 },
      { title: 'Which road goes to school?', titleEs: '¿Qué camino llega a la escuela?', draw: p3 },
      { title: 'Land, water or air?', titleEs: '¿Tierra, agua o aire?', draw: p4 },
      { title: 'Add the missing wheels', titleEs: 'Pon las ruedas que faltan', draw: p5 },
      { title: "Driver's license", titleEs: 'Licencia de conducir', draw: p6 }
    ]
  });
(TCK.ART=TCK.ART||{}).wheels=(ctx,n,x,y,s,f)=>{if(IC[n])h.icon(ctx,(c,k)=>IC[n](c,k,'#fff'),x,y,s);else veh(ctx,n,x,y,s,s*0.8,{face:true,flip:f,lw:3.5});};TCK.ARTLIST=TCK.ARTLIST||{};TCK.ARTLIST.wheels=Object.keys(VK).concat(Object.keys(IC));
})();
