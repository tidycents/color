/* TidyCents · Pre-K Learning Adventures · Book 2: Ocean & Beach Adventure (id 'ocean') */
(function () {
  const K = TCK, h = K.h, INK = K.INK, GREY = K.GREY, LINE = K.LINE, SOFT = K.SOFT, BLUE = K.BLUE;
  let LW = 3.5; // on-page line weight for every illustration (drawCharacter scales it temporarily)
  let PAL = null; // cover-only color palette; null = white fills (interior pages)
  const C = key => (PAL && PAL[key]) || undefined; // undefined -> default white fill

  // ---------- drawing primitives (local 100x100 box, k = page units -> local) ----------
  function st(c, k, fill) { if (fill !== null) { c.fillStyle = fill || '#fff'; c.fill(); } c.lineWidth = LW * k; c.strokeStyle = INK; c.lineJoin = 'round'; c.lineCap = 'round'; c.setLineDash([]); c.stroke(); }
  function P(c, d, k, fill) { const p = new Path2D(d); if (fill !== null) { c.fillStyle = fill || '#fff'; c.fill(p); } c.lineWidth = LW * k; c.strokeStyle = INK; c.lineJoin = 'round'; c.lineCap = 'round'; c.setLineDash([]); c.stroke(p); }
  function L(c, d, k, color) { const p = new Path2D(d); c.lineWidth = LW * k; c.strokeStyle = color || INK; c.lineJoin = 'round'; c.lineCap = 'round'; c.setLineDash([]); c.stroke(p); }
  function ell(c, x, y, rx, ry, k, fill) { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); st(c, k, fill); }
  function eye(c, x, y, r) { c.beginPath(); c.arc(x, y, r, 0, 7); c.fillStyle = INK; c.fill(); c.beginPath(); c.arc(x + r * 0.35, y - r * 0.35, r * 0.34, 0, 7); c.fillStyle = '#fff'; c.fill(); }
  function cheek(c, x, y, r, a) { if (!a) return; c.save(); c.globalAlpha = 0.5; c.beginPath(); c.ellipse(x, y, r, r * 0.62, 0, 0, 7); c.fillStyle = a; c.fill(); c.restore(); }
  function tube(c, d, w, k, col) { const p = new Path2D(d); c.lineCap = 'round'; c.lineJoin = 'round'; c.setLineDash([]); c.lineWidth = w; c.strokeStyle = INK; c.stroke(p); c.lineWidth = Math.max(0.5, w - 2 * LW * k); c.strokeStyle = col || '#fff'; c.stroke(p); }

  // ---------- illustrations ----------
  const I = {};
  I.fish = (c, k, a) => {
    P(c, 'M68,50 L95,29 Q88,50 95,71 Z', k, C('fishFin'));
    P(c, 'M30,32 Q42,12 62,30 Z', k, C('fishFin'));
    ell(c, 42, 50, 34, 24, k, C('fish'));
    L(c, 'M56,34 Q63,50 56,66', k);
    eye(c, 26, 45, 4.6); L(c, 'M17,57 Q23,62 30,58', k); cheek(c, 34, 57, 4.5, a);
  };
  I.starfish = (c, k, a) => {
    c.beginPath(); for (let i = 0; i < 10; i++) { const an = Math.PI / 5 * i - Math.PI / 2, r = i % 2 ? 21 : 46; c.lineTo(50 + r * Math.cos(an), 54 + r * Math.sin(an)); } c.closePath(); st(c, k, C('star'));
    eye(c, 43, 50, 3.6); eye(c, 57, 50, 3.6); L(c, 'M44,60 Q50,65 56,60', k);
  };
  I.shell = (c, k) => {
    P(c, 'M50,86 L15,44 Q12,12 50,9 Q88,12 85,44 Z', k, C('shell'));
    ['M50,84 L28,17', 'M50,84 L50,10', 'M50,84 L72,17', 'M50,84 L18,32', 'M50,84 L82,32'].forEach(s => L(c, s, k));
    P(c, 'M39,83 L61,83 L65,94 L35,94 Z', k, C('shell2'));
  };
  I.jellyfish = (c, k, a) => {
    ['M30,54 Q22,66 30,76 Q38,86 30,95', 'M43,58 Q36,70 43,80 Q50,90 43,97', 'M57,58 Q64,70 57,80 Q50,90 57,97', 'M70,54 Q78,66 70,76 Q62,86 70,95'].forEach(s => L(c, s, k));
    P(c, 'M15,54 Q15,10 50,10 Q85,10 85,54 Q76,62 67,54 Q58,62 50,54 Q42,62 33,54 Q24,62 15,54 Z', k);
    eye(c, 39, 36, 4.4); eye(c, 61, 36, 4.4); L(c, 'M44,45 Q50,50 56,45', k); cheek(c, 30, 44, 4.5, a); cheek(c, 70, 44, 4.5, a);
  };
  I.whale = (c, k, a) => {
    P(c, 'M72,66 Q86,58 86,42 Q78,38 74,26 Q85,28 90,36 Q93,28 99,25 Q98,41 91,46 Q91,62 76,74 Z', k);
    P(c, 'M6,62 C6,38 26,30 47,30 C69,30 82,46 82,62 C82,77 68,83 46,83 L24,83 C12,83 6,74 6,62 Z', k);
    L(c, 'M12,70 Q42,80 76,70', k);
    P(c, 'M42,72 Q46,86 60,84 Q56,76 54,73 Z', k);
    L(c, 'M40,27 L40,16', k); L(c, 'M40,17 Q34,7 27,11', k); L(c, 'M40,17 Q46,7 53,11', k);
    eye(c, 22, 54, 4.6); L(c, 'M11,62 Q16,66 22,64', k); cheek(c, 30, 62, 4.5, a);
  };
  I.dolphin = (c, k, a) => {
    P(c, 'M20,64 Q10,60 3,50 Q4,62 9,68 Q3,76 4,88 Q12,76 24,70 Z', k, C('dolFin')); // tail
    P(c, 'M42,44 Q48,26 62,22 Q57,33 60,42 Z', k, C('dolFin')); // dorsal fin
    P(c, 'M50,64 Q48,78 38,84 Q56,82 62,64 Z', k, C('dolFin')); // flipper
    P(c, 'M8,70 Q20,50 42,42 Q62,35 77,39 Q87,42 90,48 L98,51 Q95,57 88,57 Q82,66 64,68 Q42,70 26,66 Q16,66 8,70 Z', k, C('dol'));
    L(c, 'M30,63 Q52,62 72,60', k);
    eye(c, 76, 47, 3.8); L(c, 'M92,56 Q86,61 79,59', k); cheek(c, 72, 56, 4, a);
  };
  I.turtle = (c, k, a) => {
    P(c, 'M58,62 Q76,64 80,82 Q64,82 52,66 Z', k, C('turSkin'));
    P(c, 'M28,62 Q14,68 8,82 Q24,82 36,66 Z', k, C('turSkin'));
    P(c, 'M12,56 L3,61 L13,64 Z', k, C('turSkin'));
    c.beginPath(); c.arc(83, 47, 14, 0, 7); st(c, k, C('turSkin'));
    P(c, 'M10,60 Q10,22 46,22 Q80,22 80,60 Z', k, C('turShell'));
    P(c, 'M7,60 L83,60 Q85,69 76,69 L14,69 Q5,69 7,60 Z', k, C('turRim'));
    let hx = ''; for (let i = 0; i < 6; i++) { const an = Math.PI / 3 * i + Math.PI / 6; hx += (i ? 'L' : 'M') + (45 + 12 * Math.cos(an)).toFixed(1) + ',' + (42 + 11 * Math.sin(an)).toFixed(1); } P(c, hx + 'Z', k, PAL ? PAL.turHex : null);
    ['M45,31 L45,23', 'M35,48 L22,57', 'M55,48 L68,57', 'M35,36 L22,34', 'M55,36 L68,34'].forEach(s => L(c, s, k));
    eye(c, 87, 43, 3.8); L(c, 'M85,53 Q90,55 94,51', k); cheek(c, 80, 52, 3.8, a);
  };
  I.octopus = (c, k, a) => {
    ['M28,50 Q14,66 18,78 Q22,88 10,90', 'M39,56 Q35,74 38,85 Q40,94 31,95', 'M61,56 Q65,74 62,85 Q60,94 69,95', 'M72,50 Q86,66 82,78 Q78,88 90,90'].forEach(s => tube(c, s, 12, k, C('oct')));
    P(c, 'M20,44 Q18,7 50,7 Q82,7 80,44 Q80,62 50,62 Q20,62 20,44 Z', k, C('oct'));
    eye(c, 40, 36, 4.6); eye(c, 60, 36, 4.6); L(c, 'M43,47 Q50,53 57,47', k); cheek(c, 31, 45, 5, a); cheek(c, 69, 45, 5, a);
  };
  I.crab = (c, k, a) => {
    ['M30,62 L15,70 L11,80', 'M32,70 L22,78 L20,86', 'M70,62 L85,70 L89,80', 'M68,70 L78,78 L80,86'].forEach(s => L(c, s, k));
    L(c, 'M27,56 Q17,54 16,44', k); L(c, 'M73,56 Q83,54 84,44', k);
    P(c, 'M16,46 Q3,42 5,28 Q7,19 13,21 L16,31 L22,22 Q30,24 28,35 Q26,46 16,46 Z', k, C('crab'));
    P(c, 'M84,46 Q97,42 95,28 Q93,19 87,21 L84,31 L78,22 Q70,24 72,35 Q74,46 84,46 Z', k, C('crab'));
    L(c, 'M42,46 L40,32', k); L(c, 'M58,46 L60,32', k);
    c.beginPath(); c.arc(40, 27, 6.5, 0, 7); st(c, k); c.beginPath(); c.arc(60, 27, 6.5, 0, 7); st(c, k);
    eye(c, 41, 28, 3.2); eye(c, 61, 28, 3.2);
    ell(c, 50, 60, 26, 18, k, C('crab'));
    L(c, 'M43,64 Q50,70 57,64', k); cheek(c, 34, 62, 4.5, a); cheek(c, 66, 62, 4.5, a);
  };
  I.bucket = (c, k, a, o) => {
    if (!(o && o.noHandle)) L(c, 'M24,38 Q24,6 50,6 Q76,6 76,38', k);
    P(c, 'M24,40 L76,40 L68,92 L32,92 Z', k, C('bucket'));
    P(c, 'M20,32 L80,32 L78,42 L22,42 Z', k, C('bucketRim'));
    L(c, 'M36,64 Q43,57 50,64 Q57,71 64,64', k, a || INK);
  };
  I.shovel = (c, k) => {
    P(c, 'M45,18 L55,18 L55,58 L45,58 Z', k);
    P(c, 'M36,7 L64,7 Q66,7 66,10 L66,17 Q66,20 63,20 L37,20 Q34,20 34,17 L34,10 Q34,7 36,7 Z', k);
    P(c, 'M30,54 L70,54 L68,76 Q50,100 32,76 Z', k);
  };
  I.castle = (c, k, a, o) => {
    if (!(o && o.noFlag)) { L(c, 'M50,26 L50,6', k); P(c, 'M50,6 L67,11 L50,16 Z', k, a || '#fff'); }
    P(c, 'M34,62 L34,26 L40,26 L40,32 L46,32 L46,26 L54,26 L54,32 L60,32 L60,26 L66,26 L66,62 Z', k, C('castle2'));
    let s = 'M10,94 L10,52'; for (let i = 0; i < 5; i++) { const x = 10 + i * 18; s += ` L${x + 8},52`; if (i < 4) s += ` L${x + 8},58 L${x + 18},58 L${x + 18},52`; } s += ' L90,52 L90,94 Z'; P(c, s, k, C('castle'));
    if (PAL) P(c, 'M41,94 L41,80 Q50,68 59,80 L59,94 Z', k, PAL.castleDoor); else L(c, 'M41,94 L41,80 Q50,68 59,80 L59,94', k);
    c.beginPath(); c.arc(50, 42, 4, 0, 7); st(c, k, null);
  };
  I.umbrella = (c, k, a) => {
    L(c, 'M50,14 L50,86 Q50,94 43,94 Q37,94 37,88', k);
    P(c, 'M6,48 Q10,10 50,8 Q90,10 94,48 Q83,40 72,48 Q61,40 50,48 Q39,40 28,48 Q17,40 6,48 Z', k);
    L(c, 'M50,8 Q38,24 28,47', k); L(c, 'M50,8 Q62,24 72,47', k);
    c.beginPath(); c.arc(50, 6, 3.5, 0, 7); c.fillStyle = a || INK; c.fill();
  };
  I.ball = (c, k, a) => {
    c.beginPath(); c.arc(50, 52, 40, 0, 7); st(c, k);
    L(c, 'M50,12 Q28,52 50,92', k); L(c, 'M50,12 Q72,52 50,92', k);
    c.beginPath(); c.ellipse(50, 18, 7, 4, 0, 0, 7); st(c, k, a || '#fff');
  };
  I.chair = (c, k, a) => {
    L(c, 'M24,52 L14,96', k); L(c, 'M78,52 L88,96', k);
    P(c, 'M14,48 L27,8 L38,11 L27,50 Z', k);
    L(c, 'M19,33 L31,36', k, a || INK);
    P(c, 'M14,45 L86,45 Q89,45 89,48 L89,52 Q89,55 86,55 L14,55 Q11,55 11,52 L11,48 Q11,45 14,45 Z', k);
  };
  I.sun = (c, k) => {
    c.beginPath(); c.arc(50, 50, 24, 0, 7); st(c, k);
    for (let i = 0; i < 8; i++) { const an = Math.PI / 4 * i; L(c, `M${50 + 33 * Math.cos(an)},${50 + 33 * Math.sin(an)} L${50 + 45 * Math.cos(an)},${50 + 45 * Math.sin(an)}`, k); }
  };
  I.rock = (c, k) => P(c, 'M6,90 Q8,62 32,56 Q48,40 68,50 Q92,56 94,90 Z', k);
  I.seaweed = (c, k) => { tube(c, 'M50,98 Q34,80 50,64 Q66,48 50,32 Q38,20 50,6', 13, k); };

  const CHAR = { turtle: I.turtle, dolphin: I.dolphin, octopus: I.octopus, crab: I.crab };
  const CHARNAME = { turtle: 'sea turtle', dolphin: 'dolphin', octopus: 'octopus', crab: 'crab' };
  const CHARNAME_ES = { turtle: 'a la tortuga', dolphin: 'al delfín', octopus: 'al pulpo', crab: 'al cangrejo' };
  const TIP = d => h.t(d, 'Grown-up tip: ', 'Consejo para el adulto: ');

  // place an illustration centered at x,y with size s (page units)
  function draw(c, fn, x, y, s, o = {}) { c.save(); c.translate(x, y); if (o.rot) c.rotate(o.rot); c.scale((o.flip ? -1 : 1) * s / 100, s / 100); c.translate(-50, -50); fn(c, 100 / s, o.a || null, o); c.restore(); }
  // same, but the local y "bottom" sits on groundY
  function drawOn(c, fn, x, groundY, s, bottom, o) { draw(c, fn, x, groundY - (bottom - 50) * s / 100, s, o); }
  // silhouette (shadow) of an illustration
  function shadow(c, fn, x, y, s) {
    const T = c.getTransform(); const sc = Math.hypot(T.a, T.b) || 1; const px = Math.ceil(s * sc) + 8;
    const cv = document.createElement('canvas'); cv.width = cv.height = px; const g = cv.getContext('2d');
    g.translate(px / 2, px / 2); g.scale(s * sc / 100, s * sc / 100); g.translate(-50, -50); fn(g, 100 / (s * sc), null, {});
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-in'; g.fillStyle = INK; g.fillRect(0, 0, px, px);
    c.drawImage(cv, x - px / sc / 2, y - px / sc / 2, px / sc, px / sc);
  }
  function waveLine(c, x1, x2, y, amp, per, color, lw) { c.save(); c.beginPath(); for (let x = x1; x <= x2; x += 3) { const yy = y + amp * Math.sin((x - x1) / per * Math.PI * 2); x === x1 ? c.moveTo(x, yy) : c.lineTo(x, yy); } h.pen(c, lw || 3, color || INK); c.stroke(); c.restore(); }
  function rr(r, a, b) { return a + Math.floor(r() * (b - a + 1)); }
  function catmull(pts, step = 6) {
    const out = []; for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const len = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]), n = Math.max(2, Math.round(len / step));
      for (let j = 0; j < n; j++) { const t = j / n, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(q => 0.5 * ((2 * p1[q]) + (-p0[q] + p2[q]) * t + (2 * p0[q] - 5 * p1[q] + 4 * p2[q] - p3[q]) * t2 + (-p0[q] + 3 * p1[q] - 3 * p2[q] + p3[q]) * t3))); }
    } out.push(pts[pts.length - 1]); return out;
  }
  function polyStroke(c, pts, lw, color) { c.save(); c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.lineCap = 'round'; c.lineJoin = 'round'; c.lineWidth = lw; c.strokeStyle = color; c.stroke(); c.restore(); }

  // ---------- page 3 scenes (local units: ground y=0, x -115..115, y -135..20) ----------
  const SZ = { bucket: [88, 92], chair: [100, 96], umbrella: [86, 94], castle: [90, 94] };
  function crabAt(c, x, bottomY, s, A) { drawOn(c, I.crab, x, bottomY, s || 62, 86, { a: A }); }
  function scene(c, obj, rel, A) {
    const [s, b] = SZ[obj], fn = I[obj], o = { noHandle: true, noFlag: true, a: A };
    const top = { bucket: -(b - 32) * s / 100, chair: -(b - 45) * s / 100, umbrella: -(b - 8) * s / 100, castle: -(b - 26) * s / 100 }[obj];
    c.save(); c.setLineDash([]); waveLine(c, -105, 105, 2, 2, 60, LINE, 3); c.restore();
    if (rel === 'next') { drawOn(c, fn, -38, 0, s, b, o); crabAt(c, 62, 0, 62, A); return; }
    if (rel === 'in') { crabAt(c, 0, top + 36, 64, A); drawOn(c, fn, 0, 0, s, b, o); return; }
    if (rel === 'behind') { crabAt(c, 14, top + 32, 62, A); drawOn(c, fn, 0, 0, s, b, o); return; }
    drawOn(c, fn, 0, 0, s, b, o);
    if (rel === 'on') crabAt(c, obj === 'chair' ? 8 : 0, top + 2, 62, A);
    else if (rel === 'front') crabAt(c, 18, 10, 62, A);
    else if (rel === 'under') { if (obj === 'chair') crabAt(c, 2, 0, 50, A); else crabAt(c, 30, 0, 62, A); }
  }
  const REL = { in: 'IN', on: 'ON', under: 'UNDER', next: 'NEXT TO', behind: 'BEHIND', front: 'IN FRONT OF' };
  const OBJ = { bucket: 'the bucket', chair: 'the beach chair', umbrella: 'the umbrella', castle: 'the sandcastle' };
  const REL_ES = { in: 'DENTRO', on: 'ENCIMA', under: 'DEBAJO', next: 'AL LADO', behind: 'DETRÁS', front: 'DELANTE' };
  const OBJ_ES = { bucket: [false, 'la cubeta'], chair: [false, 'la silla de playa'], umbrella: [false, 'la sombrilla'], castle: [true, 'castillo de arena'] };

  K.register({
    id: 'ocean', title: 'Ocean Adventure', titleEs: 'Aventura en el mar',
    characters: [{ id: 'turtle', label: 'Sea turtle', labelEs: 'Tortuga marina' }, { id: 'dolphin', label: 'Dolphin', labelEs: 'Delfín' }, { id: 'octopus', label: 'Octopus', labelEs: 'Pulpo' }, { id: 'crab', label: 'Crab', labelEs: 'Cangrejo' }],
    certText: 'You explored the ocean and the beach!', certTextEs: '¡Exploraste el mar y la playa!',

    coverSky: '#BFE6F8',
    coverBg(ctx, d) {
      const HZ = 470; // horizon
      let g = ctx.createLinearGradient(0, 30, 0, HZ); g.addColorStop(0, '#8FD0F2'); g.addColorStop(1, '#DDF2FC');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 850, HZ + 2);
      // sun
      ctx.save(); ctx.translate(695, 408);
      ctx.fillStyle = '#FFE28A'; for (let i = 0; i < 12; i++) { ctx.save(); ctx.rotate(Math.PI / 6 * i); ctx.beginPath(); ctx.moveTo(-9, -52); ctx.lineTo(0, -72); ctx.lineTo(9, -52); ctx.closePath(); ctx.fill(); ctx.restore(); }
      ctx.beginPath(); ctx.arc(0, 0, 46, 0, 7); ctx.fillStyle = '#FFD24D'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#F2B632'; ctx.stroke(); ctx.restore();
      // clouds
      const cloud = (x, y, s) => { ctx.save(); ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.95; [[0, 0, 26], [28, -12, 30], [58, 0, 24], [30, 8, 24]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, 7); ctx.fill(); }); ctx.restore(); };
      cloud(120, 410, 0.95); cloud(430, 390, 0.7);
      // sea
      const sea = new Path2D(); sea.moveTo(0, HZ); sea.lineTo(850, HZ); sea.lineTo(850, 770); for (let x = 850; x >= 0; x -= 5) sea.lineTo(x, 748 + 14 * Math.sin(x / 95 * Math.PI)); sea.closePath();
      g = ctx.createLinearGradient(0, HZ, 0, 760); g.addColorStop(0, '#2F8FC6'); g.addColorStop(1, '#6CC6E6'); ctx.fillStyle = g; ctx.fill(sea);
      ctx.fillStyle = '#257DB2'; ctx.fillRect(0, HZ, 850, 6);
      [[505, 110, 0.55], [560, 130, 0.65], [620, 120, 0.75], [690, 140, 0.85]].forEach(([y, per, al], i) => { ctx.save(); ctx.globalAlpha = al; ctx.beginPath();
        for (let x = 0; x <= 850; x += 4) { const yy = y + 6 * Math.sin((x + i * 40) / per * Math.PI * 2); x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.strokeStyle = '#E8F8FF'; ctx.setLineDash([60, 46]); ctx.lineDashOffset = i * 37; ctx.stroke(); ctx.restore(); });
      // sand + wet sand + foam
      const shore = x => 748 + 14 * Math.sin(x / 95 * Math.PI);
      const sand = new Path2D(); sand.moveTo(0, 1100); for (let x = 0; x <= 850; x += 5) sand.lineTo(x, shore(x) + 8); sand.lineTo(850, 1100); sand.closePath();
      ctx.fillStyle = '#F6E0A8'; ctx.fill(sand);
      ctx.save(); ctx.beginPath(); for (let x = 0; x <= 850; x += 5) x ? ctx.lineTo(x, shore(x) + 14) : ctx.moveTo(x, shore(x) + 14); ctx.lineWidth = 16; ctx.strokeStyle = '#EBCB88'; ctx.stroke();
      ctx.beginPath(); for (let x = 0; x <= 850; x += 5) x ? ctx.lineTo(x, shore(x) + 3 + 3 * Math.sin(x / 18)) : ctx.moveTo(x, shore(x) + 3); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = '#FFFFFF'; ctx.stroke(); ctx.restore();
      const r = h.rng('oceancover'); ctx.fillStyle = '#E2BF79'; for (let i = 0; i < 70; i++) { const x = 40 + r() * 770, y = 790 + r() * 270; ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fill(); }
    },
    coverArt(ctx, d) {
      const A = d.accent;
      PAL = { fish: '#FFC94D', fishFin: '#F59A3C', star: '#F7955E', shell: '#F9C9C2', shell2: '#F2A9A0', dol: '#8CC3EC', dolFin: '#64A6DD',
        turSkin: '#9ED88E', turShell: '#4FAE72', turRim: '#F4D99A', turHex: '#86CF8C', oct: '#C69AEC', crab: '#F27E5E',
        bucket: '#FFD34F', bucketRim: '#5BB8E6', castle: '#F2CB82', castle2: '#EDBE6C', castleDoor: '#C99A4C' };
      try {
        [[118, 600, 10], [140, 560, 7], [258, 570, 6], [620, 560, 8], [600, 528, 5]].forEach(([x, y, r]) => h.circle(ctx, x, y, r, { lw: 3, color: '#fff' }));
        draw(ctx, I.fish, 175, 620, 96, { a: A, rot: -0.2 });
        draw(ctx, I.fish, 690, 600, 64, { a: A, rot: 0.15, flip: true });
        draw(ctx, CHAR[d.character], 425, 640, 300, { a: A });
        drawOn(ctx, I.castle, 160, 832, 150, 94, { a: A });
        drawOn(ctx, I.bucket, 700, 830, 100, 92, { a: A });
        draw(ctx, I.starfish, 575, 818, 58, { rot: 0.3 });
        draw(ctx, I.shell, 290, 822, 44, { rot: -0.3 });
      } finally { PAL = null; }
    },
    certArt(ctx, d) {
      draw(ctx, CHAR[d.character], 425, 765, 200, { a: d.accent });
      draw(ctx, I.starfish, 245, 820, 90, { rot: -0.2 });
      draw(ctx, I.shell, 605, 820, 84, { rot: 0.2 });
      h.sparkle(ctx, 290, 700, 16, d.accent); h.sparkle(ctx, 565, 690, 16, d.accent);
    },

    // bonus coloring page + reward badges: plain line art, no color, line weight scaled to size
    drawCharacter(ctx, d, id, cx, cy, size) {
      const fn = CHAR[id] || CHAR.turtle; const lw = Math.max(2.5, size / 90); const old = LW;
      const off = { turtle: [0, -2], dolphin: [0, -5], octopus: [0, -1], crab: [0, -3] }[id] || [0, 0]; // optical centering
      LW = lw; try { draw(ctx, fn, cx - off[0] * size / 100, cy - off[1] * size / 100, size * 0.98, {}); } finally { LW = old; }
    },
    charArticleEs(d) { return d.character === 'turtle' ? 'la' : 'el'; },

    pages: [
      // 1 ---------------- Big and small
      { title: 'Big and small', titleEs: 'Grande y pequeño', draw(ctx, d) {
        const r = d.rand, A = d.accent, age = d.age;
        const pool = h.shuffle(['fish', 'starfish', 'shell', 'jellyfish', 'turtle', 'crab', 'octopus', 'whale', 'bucket', 'ball', 'dolphin', 'castle'], r);
        if (age === 3) {
          h.header(ctx, d, h.t(d, 'Big and small', 'Grande y pequeño'), h.t(d, 'Look at each row. Circle the BIG one.', 'Mira cada fila. Encierra el que es GRANDE.'));
          const rows = 4, H = 196;
          for (let i = 0; i < rows; i++) {
            const y = 192 + i * H, cy = y + (H - 14) / 2; h.box(ctx, 60, y, 730, H - 14, 18);
            const bigLeft = r() < 0.5; const fn = I[pool[i]];
            draw(ctx, fn, bigLeft ? 260 : 590, cy, 160, { a: A }); draw(ctx, fn, bigLeft ? 590 : 260, cy + 40, 72, { a: A });
          }
          h.tip(ctx, TIP(d) + h.t(d, 'hold your arms wide for BIG and close together for small.', 'abre bien los brazos para GRANDE y júntalos para pequeño.'));
        } else if (age === 4) {
          h.header(ctx, d, h.t(d, 'Big and small', 'Grande y pequeño'), h.t(d, 'Listen to the word in each row. Circle the BIG one or the SMALL one.', 'Escucha la palabra de cada fila. Encierra el GRANDE o el PEQUEÑO.'));
          const rows = 5, H = 160; const words = h.shuffle(['BIG', 'SMALL', 'BIG', 'SMALL', r() < 0.5 ? 'BIG' : 'SMALL'], r);
          for (let i = 0; i < rows; i++) {
            const y = 192 + i * H, cy = y + (H - 14) / 2; h.box(ctx, 60, y, 730, H - 14, 18);
            const w = words[i]; h.box(ctx, 80, cy - 34, 170, 68, 34, A, 3);
            if (d.lang === 'es') { const ws = w === 'BIG' ? 'GRANDE' : 'PEQUEÑO', wp = h.fitText(ctx, ws, 148, w === 'BIG' ? 38 : 24); h.text(ctx, ws, 165, cy + Math.round(wp * 0.36), wp, 700, INK, 'center'); }
            else h.text(ctx, w, 165, cy + (w === 'BIG' ? 15 : 9), w === 'BIG' ? 42 : 24, 700, INK, 'center');
            const bigLeft = r() < 0.5; const fn = I[pool[i]];
            draw(ctx, fn, bigLeft ? 400 : 650, cy, 132, { a: A }); draw(ctx, fn, bigLeft ? 650 : 400, cy + 30, 64, { a: A });
          }
          h.tip(ctx, TIP(d) + h.t(d, 'read each word out loud, then point to the big one and the small one.', 'lee cada palabra en voz alta y luego señalen juntos el grande y el pequeño.'));
        } else {
          h.header(ctx, d, h.t(d, 'Small, bigger, biggest', 'Pequeño, mediano, grande'), h.t(d, 'Number them: 1 = smallest, 2 = middle, 3 = biggest.', 'Numéralos: 1 = el más pequeño, 2 = el mediano, 3 = el más grande.'));
          const rows = 4, H = 198;
          for (let i = 0; i < rows; i++) {
            const y = 192 + i * H; h.box(ctx, 60, y, 730, H - 12, 18);
            const sizes = h.shuffle([62, 96, 132], r); const fn = I[pool[i]];
            [190, 425, 660].forEach((x, j) => { const s = sizes[j]; draw(ctx, fn, x, y + 76 + (132 - s) / 2, s, { a: A }); h.answerBox(ctx, x - 24, y + 146, 48, 32, A); });
          }
          h.tip(ctx, TIP(d) + h.t(d, 'find the smallest one first and say "1". Then the middle one is "2".', 'busquen primero el más pequeño y digan "1". Luego el mediano es el "2".'));
        }
      } },

      // 2 ---------------- Sand or sea?
      { title: 'Sand or sea?', titleEs: '¿Arena o mar?', draw(ctx, d) {
        const r = d.rand, A = d.accent, n = { 3: 6, 4: 8, 5: 10 }[d.age];
        h.header(ctx, d, h.t(d, 'Sand or sea?', '¿Arena o mar?'), h.t(d, 'Does it go in the WATER or on the SAND? Draw a line to the right side.', '¿Va en el AGUA o en la ARENA? Únelo con una línea al lado correcto.'));
        const sea = h.shuffle(['fish', 'whale', 'jellyfish', 'octopus', 'dolphin', 'turtle'], r).slice(0, n / 2);
        const sand = h.shuffle(['bucket', 'shovel', 'castle', 'umbrella', 'ball', 'chair'], r).slice(0, n / 2);
        const items = h.shuffle(sea.concat(sand), r);
        const top = 192, bot = 990;
        // sand side (left)
        h.box(ctx, 60, top, 190, bot - top, 22, INK, 3);
        h.text(ctx, h.t(d, 'SAND', 'ARENA'), 155, top + 44, 32, 700, INK, 'center');
        draw(ctx, I.sun, 155, top + 100, 70);
        for (let y = top + 170, row = 0; y < bot - 20; y += 34, row++) for (let x = 84 + (row % 2) * 22; x < 232; x += 44) h.dot(ctx, x + (r() - 0.5) * 10, y + (r() - 0.5) * 10, 3.5, LINE);
        // water side (right)
        h.box(ctx, 600, top, 190, bot - top, 22, INK, 3);
        h.text(ctx, h.t(d, 'WATER', 'AGUA'), 695, top + 44, 32, 700, INK, 'center');
        for (let y = top + 90; y < bot - 20; y += 52) waveLine(ctx, 622, 768, y, 6, 48, y === top + 90 ? A : LINE, 3);
        const step = (bot - top) / n, s = Math.min(112, step - 12);
        items.forEach((it, i) => {
          const y = top + step * (i + 0.5);
          draw(ctx, I[it], 425, y, s, { a: A, noHandle: false });
          h.dot(ctx, 425 - s / 2 - 26, y, 7, BLUE); h.dot(ctx, 425 + s / 2 + 26, y, 7, BLUE);
        });
        h.tip(ctx, TIP(d) + h.t(d, 'name each picture together, then ask: water or sand?', 'nombren juntos cada dibujo y luego pregunta: ¿agua o arena?'));
      } },

      // 3 ---------------- Where is the crab?
      { title: 'Where is the crab?', titleEs: '¿Dónde está el cangrejo?', draw(ctx, d) {
        const r = d.rand, A = d.accent;
        h.header(ctx, d, h.t(d, 'Where is the crab?', '¿Dónde está el cangrejo?'), h.t(d, 'Listen to each sentence. Circle the picture that shows it.', 'Escucha cada oración. Encierra el dibujo que la muestra.'));
        const T = {
          3: [['in', 'bucket', ['on', 'next']], ['on', 'chair', ['under', 'next']], ['under', 'umbrella', ['on', 'next']]],
          4: [['in', 'bucket', ['on', 'next']], ['on', 'chair', ['under', 'next']], ['under', 'umbrella', ['on', 'next']], ['next', 'bucket', ['in', 'on']]],
          5: [['under', 'chair', ['on', 'next']], ['in', 'bucket', ['on', 'next']], ['next', 'umbrella', ['under', 'on']], ['behind', 'castle', ['front', 'on']], ['front', 'bucket', ['behind', 'in']]]
        }[d.age];
        const rows = h.shuffle(T.slice(), r), top = 186, H = (1002 - top) / rows.length;
        rows.forEach(([rel, obj, dis], i) => {
          const y = top + i * H; let x = 62; let px = d.age === 5 ? 23 : 26; const py = y + 30;
          const segs = d.lang === 'es'
            ? [['El cangrejo está ', INK, 500], [REL_ES[rel] + (OBJ_ES[obj][0] ? ' DEL' : ' DE'), A, 700], [' ' + OBJ_ES[obj][1] + '.', INK, 500]]
            : [['The crab is ', INK, 500], [REL[rel], A, 700], [' ' + OBJ[obj] + '.', INK, 500]];
          if (d.lang === 'es') while (px > 16 && segs.reduce((sum, [s, , w]) => { h.font(ctx, w, px); return sum + ctx.measureText(s).width; }, 0) > 726) px -= 1;
          segs.forEach(([s, col, w]) => { h.text(ctx, s, x, py, px, w, col); h.font(ctx, w, px); x += ctx.measureText(s).width; });
          const opts = h.shuffle([rel].concat(dis), r), bw = 236, gap = 11, by = y + 40, bh = H - 50;
          opts.forEach((rl, j) => {
            const bx = 60 + j * (bw + gap); h.box(ctx, bx, by, bw, bh, 16);
            const sc = Math.min((bh - 8) / 128, (bw - 10) / 225);
            ctx.save(); ctx.translate(bx + bw / 2, by + bh - 4 - 14 * sc); ctx.scale(sc, sc); scene(ctx, obj, rl, A); ctx.restore();
          });
        });
        h.tip(ctx, TIP(d) + (d.age === 5 ? h.t(d, 'act it out with a toy and a cup: in, on, under, next to, behind, in front of.', 'jueguen con un juguete y un vaso: dentro, encima, debajo, al lado, detrás, delante.') : h.t(d, 'act it out with a toy and a cup: in, on, under, next to.', 'jueguen con un juguete y un vaso: dentro, encima, debajo, al lado.')));
      } },

      // 4 ---------------- Hidden in the sea
      { title: 'Hidden in the sea', titleEs: 'Escondidos en el mar', draw(ctx, d) {
        const r = d.rand, A = d.accent, age = d.age;
        h.header(ctx, d, h.t(d, 'Hidden in the sea', 'Escondidos en el mar'), h.t(d, 'Help {name} find each starfish, shell and fish.', 'Ayuda a {name} a encontrar cada estrella de mar, concha y pez.'));
        const X1 = 60, X2 = 790, Y1 = 186, Y2 = 790, sandY = 740;
        h.box(ctx, X1, Y1, X2 - X1, Y2 - Y1, 22, INK, 3);
        waveLine(ctx, X1 + 20, X2 - 20, Y1 + 26, 5, 60, LINE, 3);
        ctx.save(); ctx.beginPath(); ctx.moveTo(X1 + 2, sandY); for (let x = X1 + 2; x <= X2 - 2; x += 4) ctx.lineTo(x, sandY + 6 * Math.sin((x - X1) / 110 * Math.PI * 2)); h.pen(ctx, 3); ctx.stroke(); ctx.restore();
        const block = [];
        const ch = { x: 150, y: 672, s: 130 }; block.push([ch.x - 70, ch.y - 70, ch.x + 70, ch.y + 72]);
        drawOn(ctx, I.seaweed, 262, sandY + 6, 160, 98); block.push([238, sandY - 160, 286, sandY + 10]);
        drawOn(ctx, I.seaweed, 760, sandY + 6, 180, 98); block.push([734, sandY - 180, 786, sandY + 10]);
        drawOn(ctx, I.rock, 520, sandY + 14, 90, 90); block.push([470, sandY - 40, 570, sandY + 10]);
        draw(ctx, CHAR[d.character], ch.x, ch.y, ch.s, { a: A });
        const max = { 3: 3, 4: 5, 5: 7 }[age];
        const counts = h.shuffle(age === 3 ? [1, 2, 3] : age === 4 ? [3, 4, 5] : h.shuffle([4, 5, 6, 7], r).slice(0, 3), r);
        const kinds = ['starfish', 'shell', 'fish'];
        const cells = [];
        for (let gy = 0; gy < 6; gy++) for (let gx = 0; gx < 8; gx++) {
          const x = 110 + gx * 90, y = 250 + gy * 88;
          if (!block.some(b => x + 40 > b[0] && x - 40 < b[2] && y + 40 > b[1] && y - 40 < b[3])) cells.push([x, y]);
        }
        h.shuffle(cells, r); let ci = 0;
        kinds.forEach((kd, i) => { for (let j = 0; j < counts[i]; j++) {
          const [x, y] = cells[ci++]; const jx = (r() - 0.5) * 18, jy = (r() - 0.5) * 18;
          if (kd === 'fish') draw(ctx, I.fish, x + jx, y + jy, 72, { flip: r() < 0.5 });
          else if (kd === 'starfish') draw(ctx, I.starfish, x + jx, y + jy, 66, { rot: (r() - 0.5) * 0.8 });
          else draw(ctx, I.shell, x + jx, y + jy, 62, { rot: (r() - 0.5) * 0.7 });
        } });
        for (let b = 0; b < 3 && ci < cells.length; b++) { const [x, y] = cells[ci++]; h.circle(ctx, x - 10, y + 8, 9, { lw: 3 }); h.circle(ctx, x + 10, y - 14, 6, { lw: 3 }); }
        // tally
        [180, 425, 670].forEach((cx, i) => {
          h.box(ctx, cx - 112, 808, 224, 186, 18);
          const fn = I[kinds[i]]; draw(ctx, fn, cx, 862, kinds[i] === 'fish' ? 84 : 76);
          if (age === 3) [1, 2, 3].forEach((v, j) => h.numCircle(ctx, cx - 62 + j * 62, 950, v, A, 26));
          else h.answerBox(ctx, cx - 34, 912, 68, 66, A);
        });
        h.tip(ctx, TIP(d) + (age === 3 ? h.t(d, 'touch each one as you count, then circle the number. Up to ' + max + ' of each.', 'toquen cada uno al contar y luego encierren el número. Hay hasta ' + max + ' de cada uno.') : h.t(d, 'color each one as you find it, then write how many in the box.', 'colorea cada uno al encontrarlo y luego escribe cuántos hay en el cuadro.')));
      } },

      // 5 ---------------- Get to the ocean
      { title: 'To the ocean', titleEs: 'Al mar', draw(ctx, d) {
        const A = d.accent, age = d.age, label = CHARNAME[d.character];
        h.header(ctx, d, h.t(d, 'Help {name}' + h.possessive(d.name).slice(d.name.length) + ' ' + label + ' get to the ocean', 'Ayuda ' + CHARNAME_ES[d.character] + ' de {name} a llegar al mar'), age === 5 ? h.t(d, 'Which path goes to the water? Trace it with a crayon.', '¿Qué camino llega al agua? Trázalo con un crayón.') : h.t(d, 'Trace the path with your finger, then with a crayon.', 'Traza el camino con el dedo y luego con un crayón.'));
        // ocean band
        const sy = 300;
        ctx.save(); ctx.beginPath(); ctx.moveTo(60, sy); for (let x = 60; x <= 790; x += 4) ctx.lineTo(x, sy + 7 * Math.sin((x - 60) / 120 * Math.PI * 2)); h.pen(ctx, 4); ctx.stroke(); ctx.restore();
        waveLine(ctx, 80, 470, 222, 6, 60, A, 3); waveLine(ctx, 120, 500, 262, 6, 60, LINE, 3); 
        draw(ctx, I.fish, 750, 222, 62, { a: A }); draw(ctx, I.jellyfish, 680, 236, 60, { a: A });
        const main = catmull([[222, 652], [440, 656], [565, 640], [612, 588], [575, 534], [470, 518], [260, 516], [168, 490], [150, 448], [188, 404], [260, 394], [470, 392], [560, 350], [588, 282]]);
        const W = { 3: 86, 4: 74, 5: 52 }[age];
        const paths = [main];
        let branch = null;
        if (age === 5) { branch = catmull([[440, 656], [555, 708], [668, 716]]); paths.push(branch); drawOn(ctx, I.rock, 738, 748, 90, 90); }
        paths.forEach(p => polyStroke(ctx, p, W, INK)); paths.forEach(p => polyStroke(ctx, p, W - 7, '#fff'));
        if (branch) h.dashedPath(ctx, branch, { start: false });
        h.dashedPath(ctx, main);
        draw(ctx, CHAR[d.character], 116, 640, 124, { a: A });
        // waves to trace
        h.text(ctx, h.t(d, 'Now trace the waves.', 'Ahora traza las olas.'), 60, 772, 24, 700, INK);
        const mk = (type, y0) => { const pts = []; const x0 = 100, x1 = 750;
          if (type === 'sine') for (let x = x0; x <= x1; x += 4) pts.push([x, y0 - 26 * Math.sin((x - x0) / 162.5 * Math.PI * 2)]);
          else if (type === 'hump') for (let x = x0; x <= x1; x += 4) pts.push([x, y0 + 22 - 50 * Math.abs(Math.sin((x - x0) / 130 * Math.PI))]);
          else if (type === 'zig') { for (let i = 0; i <= 10; i++) pts.push([x0 + i * 65, y0 + (i % 2 ? -26 : 26)]); }
          else { const a = 15, b = 30; for (let t = 0; a * t - b * Math.sin(t) <= x1 - x0; t += 0.08) pts.push([x0 + a * t - b * Math.sin(t), y0 + 4 - b * Math.cos(t) + b * 0.0]); }
          return pts; };
        const types = { 3: ['sine', 'hump'], 4: ['hump', 'zig'], 5: ['hump', 'loop'] }[age];
        h.dashedPath(ctx, mk(types[0], 850)); h.dashedPath(ctx, mk(types[1], 950));
        h.tip(ctx, TIP(d) + (age === 5 ? h.t(d, 'one path ends at a rock. Find the way to the water first, then trace.', 'un camino termina en una roca. Primero busquen el que llega al agua y luego tracen.') : h.t(d, 'start at the blue dot and keep the crayon inside the path.', 'empiecen en el punto azul y mantengan el crayón dentro del camino.')));
      } },

      // 6 ---------------- Sea friends shadows
      { title: 'Sea friends shadows', titleEs: 'Sombras de amigos del mar', draw(ctx, d) {
        const r = d.rand, A = d.accent, n = { 3: 3, 4: 4, 5: 5 }[d.age];
        h.header(ctx, d, h.t(d, '{name}' + h.possessive(d.name).slice(d.name.length) + ' sea friends', 'Los amigos del mar de {name}'), h.t(d, 'Draw a line from each sea friend to its shadow.', 'Une con una línea cada amigo del mar con su sombra.'));
        const others = h.shuffle(['turtle', 'dolphin', 'octopus', 'crab', 'fish', 'whale', 'jellyfish', 'starfish'].filter(x => x !== d.character), r);
        const left = h.shuffle([d.character].concat(others.slice(0, n - 1)), r);
        let right = h.shuffle(left.slice(), r); let guard = 0; while (right.some((x, i) => x === left[i]) && guard++ < 50) right = h.shuffle(left.slice(), r);
        const top = 200, bot = 995, step = (bot - top) / n, s = Math.min(150, step - 26);
        left.forEach((it, i) => { const y = top + step * (i + 0.5); draw(ctx, I[it], 210, y, s, { a: A }); h.dot(ctx, 210 + s / 2 + 24, y, 8, BLUE); });
        right.forEach((it, i) => { const y = top + step * (i + 0.5); shadow(ctx, I[it], 640, y, s); h.dot(ctx, 640 - s / 2 - 24, y, 8, BLUE); });
        h.tip(ctx, TIP(d) + h.t(d, 'look at the outline together. Is it long? Does it have legs or a tail?', 'miren juntos la silueta. ¿Es larga? ¿Tiene patas o cola?'));
      } }
    ]
  });
(TCK.ART=TCK.ART||{}).ocean=(ctx,n,x,y,s,f)=>draw(ctx,I[n],x,y,s,{flip:f});TCK.ARTLIST=TCK.ARTLIST||{};TCK.ARTLIST.ocean=Object.keys(I);
})();
