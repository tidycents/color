/* TidyCents · Pre-K Learning Adventures · Book 5 · Amazing Animals (id 'animals')
   Original line-art animals drawn with canvas paths. All art is defined in a 100x100 box. */
(function () {
  const K = TCK, h = K.h, INK = K.INK, GREY = K.GREY, LINE = K.LINE, SOFT = K.SOFT;
  const W = '#fff';

  // ---------------- tiny drawing kit (works in the 100x100 art box) ----------------
  let c = null, LW = 3, ACC = K.BLUE, PAL = null, LINEART = false;
  const pc = (k, def = W) => (PAL && PAL[k]) || def; // cover palette (null on interior pages => white, unchanged)
  function sty(lw) { c.lineWidth = lw || LW; c.strokeStyle = INK; c.lineJoin = 'round'; c.lineCap = 'round'; c.setLineDash([]); }
  function P(d, fill = W, lw) { const p = new Path2D(d); if (fill) { c.fillStyle = fill; c.fill(p); } sty(lw); c.stroke(p); }
  function S(d, lw) { P(d, null, lw); }
  function F(d, fill) { c.fillStyle = fill; c.fill(new Path2D(d)); }
  function O(x, y, rx, ry, fill = W, rot = 0, lw) { const p = new Path2D(); p.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); if (fill) { c.fillStyle = fill; c.fill(p); } sty(lw); c.stroke(p); }
  function Of(x, y, rx, ry, fill, rot = 0) { const p = new Path2D(); p.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); c.fillStyle = fill; c.fill(p); }
  function D(x, y, r, col = INK) { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = col; c.fill(); }
  function tube(d, w) { const p = new Path2D(d); c.setLineDash([]); c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = w + 2 * LW; c.stroke(p); c.strokeStyle = pc('body'); c.lineWidth = w; c.stroke(p); }
  function soft(fn) { c.save(); c.globalAlpha = 0.45; fn(); c.restore(); }
  function scal(cx, cy, rx, ry, n, b, a0 = -Math.PI / 2) {
    let s = ''; for (let i = 0; i <= n; i++) {
      const a = a0 + i * 2 * Math.PI / n, x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
      if (!i) s += `M${x},${y}`; else { const m = a - Math.PI / n; s += ` Q${cx + rx * (1 + b) * Math.cos(m)},${cy + ry * (1 + b) * Math.sin(m)} ${x},${y}`; }
    } return s + 'Z';
  }
  function leg(x, top, w, bot = 94, hoof) {
    P(`M${x - w / 2},${top} L${x - w / 2},${bot - w / 2} Q${x - w / 2},${bot} ${x},${bot} Q${x + w / 2},${bot} ${x + w / 2},${bot - w / 2} L${x + w / 2},${top}`, pc('body'));
    if (hoof) S(`M${x - w / 2},${bot - 4.5} L${x + w / 2},${bot - 4.5}`, LW * 0.8);
  }
  function legs(xs, top, w, hoof) { xs.forEach(x => leg(x, top, w, 94, hoof)); }
  function eyes(hx, hy, r, dy = -0.1, sep = 0.36) {
    const e = Math.max(r * 0.11, 1.9);
    [-1, 1].forEach(s => { const x = hx + s * sep * r, y = hy + dy * r; D(x, y, e); D(x + e * 0.35, y - e * 0.38, e * 0.34, W); });
  }
  function cheeks(hx, hy, r, dy = 0.28, sep = 0.6) { soft(() => { Of(hx - sep * r, hy + dy * r, 0.15 * r, 0.1 * r, ACC); Of(hx + sep * r, hy + dy * r, 0.15 * r, 0.1 * r, ACC); }); }
  function wMouth(hx, y, r, w = 0.18) { S(`M${hx},${y - 0.08 * r} L${hx},${y} M${hx - w * r},${y} Q${hx - w * r / 2},${y + 0.11 * r} ${hx},${y} Q${hx + w * r / 2},${y + 0.11 * r} ${hx + w * r},${y}`, LW * 0.85); }
  function smile(hx, y, r, w = 0.2) { S(`M${hx - w * r},${y} Q${hx},${y + 0.13 * r} ${hx + w * r},${y}`, LW * 0.85); }
  function whiskers(hx, hy, r) { const l = LW * 0.6; [-1, 1].forEach(s => { S(`M${hx + s * 0.4 * r},${hy + 0.28 * r} L${hx + s * 0.95 * r},${hy + 0.16 * r}`, l); S(`M${hx + s * 0.4 * r},${hy + 0.38 * r} L${hx + s * 0.95 * r},${hy + 0.46 * r}`, l); }); }
  function catNose(hx, hy, r) { P(`M${hx - 0.1 * r},${hy + 0.12 * r} L${hx + 0.1 * r},${hy + 0.12 * r} L${hx},${hy + 0.23 * r} Z`, ACC, LW * 0.7); }
  function toes(x, y, s = 1) { S(`M${x},${y - 10} L${x},${y} M${x - 5 * s},${y + 2.5} L${x},${y} L${x + 5 * s},${y + 2.5} M${x},${y} L${x + 1},${y + 3.5}`); }

  // ---------------- animals ----------------
  function dogFace(hx, hy, r) {
    O(hx, hy, r, r, pc('body'));
    [-1, 1].forEach(s => P(`M${hx + s * 0.7 * r},${hy - 0.78 * r} C${hx + s * 1.4 * r},${hy - 0.7 * r} ${hx + s * 1.35 * r},${hy + 0.5 * r} ${hx + s * 0.95 * r},${hy + 0.48 * r} C${hx + s * 0.7 * r},${hy + 0.3 * r} ${hx + s * 0.6 * r},${hy - 0.3 * r} ${hx + s * 0.7 * r},${hy - 0.78 * r} Z`, pc('ear')));
    eyes(hx, hy, r, -0.14, 0.34);
    O(hx, hy + 0.4 * r, 0.42 * r, 0.3 * r, pc('muzzle'));
    O(hx, hy + 0.27 * r, 0.16 * r, 0.11 * r, INK);
    wMouth(hx, hy + 0.5 * r, r, 0.16);
  }
  function dog(b) {
    const q = b ? { bx: 40, by: 68, rx: 22, ry: 12, L: [24, 33, 47, 56], w: 8, hx: 64, hy: 44, r: 22 } : { bx: 42, by: 60, rx: 28, ry: 15, L: [20, 31, 53, 64], w: 8, hx: 73, hy: 36, r: 19 };
    tube(`M${q.bx - q.rx + 3},${q.by - 3} Q${q.bx - q.rx - 8},${q.by - 8} ${q.bx - q.rx - 6},${q.by - 22}`, 5);
    legs(q.L, q.by, q.w); O(q.bx, q.by, q.rx, q.ry, pc('body'));
    S(`M${q.hx - 0.55 * q.r},${q.hy + 0.98 * q.r} Q${q.hx},${q.hy + 1.25 * q.r} ${q.hx + 0.55 * q.r},${q.hy + 0.98 * q.r}`, LW * (LINEART ? 3.4 : 1.6));
    c.save(); c.strokeStyle = ACC; c.lineWidth = LW * (LINEART ? 1.6 : 0.9); c.stroke(new Path2D(`M${q.hx - 0.55 * q.r},${q.hy + 0.98 * q.r} Q${q.hx},${q.hy + 1.25 * q.r} ${q.hx + 0.55 * q.r},${q.hy + 0.98 * q.r}`)); c.restore();
    dogFace(q.hx, q.hy, q.r); if (LINEART) O(q.hx, q.hy + 1.22 * q.r, 0.13 * q.r, 0.13 * q.r, W, 0, LW * 0.7); else D(q.hx, q.hy + 1.22 * q.r, 0.11 * q.r, ACC);
  }
  function catFace(hx, hy, r) {
    [-1, 1].forEach(s => { P(`M${hx + s * 0.92 * r},${hy - 0.25 * r} L${hx + s * 0.82 * r},${hy - 1.28 * r} L${hx + s * 0.22 * r},${hy - 0.9 * r} Z`, pc('body')); if (LINEART) S(`M${hx + s * 0.78 * r},${hy - 0.55 * r} L${hx + s * 0.76 * r},${hy - 1.05 * r} L${hx + s * 0.45 * r},${hy - 0.86 * r} Z`, LW * 0.7); else soft(() => F(`M${hx + s * 0.78 * r},${hy - 0.55 * r} L${hx + s * 0.76 * r},${hy - 1.05 * r} L${hx + s * 0.45 * r},${hy - 0.86 * r} Z`, ACC)); });
    O(hx, hy, r, r * 0.92, pc('body'));
    eyes(hx, hy, r, -0.08, 0.36); catNose(hx, hy, r); wMouth(hx, hy + 0.34 * r, r, 0.16); whiskers(hx, hy, r);
  }
  function cat(b) {
    const q = b ? { bx: 40, by: 68, rx: 21, ry: 11, L: [24, 33, 47, 56], w: 7, hx: 64, hy: 46, r: 21 } : { bx: 42, by: 62, rx: 27, ry: 13, L: [21, 31, 53, 63], w: 7, hx: 72, hy: 40, r: 17 };
    tube(`M${q.bx - q.rx + 3},${q.by - 2} C${q.bx - q.rx - 12},${q.by - 4} ${q.bx - q.rx - 12},${q.by - 22} ${q.bx - q.rx - 4},${q.by - 30}`, 5);
    legs(q.L, q.by, q.w); O(q.bx, q.by, q.rx, q.ry, pc('body')); catFace(q.hx, q.hy, q.r);
  }
  function lionFace(hx, hy, r, cub) {
    P(scal(hx, hy, r * (cub ? 1.28 : 1.5), r * (cub ? 1.28 : 1.5), cub ? 11 : 12, cub ? 0.32 : 0.36), pc('mane'));
    [-1, 1].forEach(s => O(hx + s * 0.72 * r, hy - 0.72 * r, 0.28 * r, 0.28 * r, pc('body')));
    O(hx, hy, r, r, pc('body'));
    eyes(hx, hy, r, -0.12, 0.36);
    O(hx - 0.18 * r, hy + 0.4 * r, 0.22 * r, 0.17 * r, pc('muzzle')); O(hx + 0.18 * r, hy + 0.4 * r, 0.22 * r, 0.17 * r, pc('muzzle'));
    P(`M${hx - 0.14 * r},${hy + 0.14 * r} L${hx + 0.14 * r},${hy + 0.14 * r} L${hx},${hy + 0.3 * r} Z`, INK, LW * 0.7);
    if (cub) cheeks(hx, hy, r, 0.3, 0.66);
  }
  function lion(b) {
    const q = b ? { bx: 40, by: 68, rx: 22, ry: 12, L: [24, 33, 47, 56], w: 8, hx: 64, hy: 44, r: 19 } : { bx: 40, by: 62, rx: 28, ry: 14, L: [18, 29, 51, 62], w: 9, hx: 72, hy: 40, r: 16 };
    S(`M${q.bx - q.rx + 2},${q.by - 4} Q${q.bx - q.rx - 10},${q.by} ${q.bx - q.rx - 8},${q.by + 14}`);
    O(q.bx - q.rx - 8, q.by + 17, 3.5, 4.5, pc('mane', ACC));
    legs(q.L, q.by, q.w); O(q.bx, q.by, q.rx, q.ry, pc('body')); lionFace(q.hx, q.hy, q.r, b);
  }
  function bear() {
    O(12, 50, 4, 4); legs([20, 32, 52, 64], 58, 11); O(42, 58, 30, 19);
    const hx = 74, hy = 38, r = 19;
    [-1, 1].forEach(s => { O(hx + s * 0.72 * r, hy - 0.72 * r, 0.32 * r, 0.32 * r); O(hx + s * 0.72 * r, hy - 0.72 * r, 0.14 * r, 0.14 * r); });
    O(hx, hy, r, r); eyes(hx, hy, r, -0.14, 0.36);
    O(hx, hy + 0.38 * r, 0.44 * r, 0.32 * r); O(hx, hy + 0.25 * r, 0.17 * r, 0.12 * r, INK); wMouth(hx, hy + 0.5 * r, r, 0.15);
  }
  function cowFace(hx, hy, r, calf) {
    [-1, 1].forEach(s => O(hx + s * 1.08 * r, hy - 0.42 * r, 0.38 * r, 0.16 * r, W, s * 0.35));
    if (!calf) [-1, 1].forEach(s => P(`M${hx + s * 0.4 * r},${hy - 0.85 * r} Q${hx + s * 0.5 * r},${hy - 1.35 * r} ${hx + s * 0.78 * r},${hy - 1.38 * r} Q${hx + s * 0.7 * r},${hy - 1.05 * r} ${hx + s * 0.72 * r},${hy - 0.7 * r} Z`));
    O(hx, hy, r, r * 1.05);
    P(`M${hx - 0.75 * r},${hy - 0.55 * r} Q${hx - 0.5 * r},${hy - 0.85 * r} ${hx - 0.22 * r},${hy - 0.7 * r} Q${hx - 0.2 * r},${hy - 0.35 * r} ${hx - 0.5 * r},${hy - 0.25 * r} Q${hx - 0.8 * r},${hy - 0.25 * r} ${hx - 0.75 * r},${hy - 0.55 * r} Z`, null, LW * 0.8);
    eyes(hx, hy, r, -0.12, 0.36);
    O(hx, hy + 0.58 * r, 0.7 * r, 0.42 * r, W);
    soft(() => Of(hx, hy + 0.58 * r, 0.62 * r, 0.34 * r, ACC));
    D(hx - 0.27 * r, hy + 0.56 * r, 0.09 * r); D(hx + 0.27 * r, hy + 0.56 * r, 0.09 * r);
  }
  function cow(b) {
    const q = b ? { bx: 40, by: 66, rx: 23, ry: 13, L: [23, 33, 48, 58], w: 7, hx: 64, hy: 42, r: 18 } : { bx: 42, by: 56, rx: 30, ry: 17, L: [18, 30, 54, 66], w: 8, hx: 76, hy: 34, r: 15 };
    S(`M${q.bx - q.rx + 2},${q.by - 6} Q${q.bx - q.rx - 6},${q.by + 2} ${q.bx - q.rx - 5},${q.by + 14}`);
    O(q.bx - q.rx - 5, q.by + 17, 3, 4.5);
    legs(q.L, q.by, q.w, true); O(q.bx, q.by, q.rx, q.ry);
    const X = q.bx, Y = q.by, k = q.rx / 30;
    P(`M${X - 18 * k},${Y - 10 * k} Q${X - 8 * k},${Y - 14 * k} ${X - 6 * k},${Y - 6 * k} Q${X - 5 * k},${Y + 3 * k} ${X - 13 * k},${Y + 2 * k} Q${X - 21 * k},${Y} ${X - 18 * k},${Y - 10 * k} Z`, null, LW * 0.8);
    if (!b) P(`M${X + 6},${Y + 4} Q${X + 13},${Y + 1} ${X + 15},${Y + 7} Q${X + 15},${Y + 13} ${X + 9},${Y + 13} Q${X + 3},${Y + 11} ${X + 6},${Y + 4} Z`, null, LW * 0.8);
    cowFace(q.hx, q.hy, q.r, b);
  }
  function pig() {
    S('M15,58 C4,58 3,46 10,45 C17,44 16,54 9,53', LW);
    legs([23, 33, 51, 61], 62, 9, true); O(42, 62, 28, 18);
    const hx = 72, hy = 44, r = 20;
    O(hx, hy, r, r);
    [-1, 1].forEach(s => { const d = `M${hx + s * 0.15 * r},${hy - 0.98 * r} Q${hx + s * 0.95 * r},${hy - 1.35 * r} ${hx + s * 1.08 * r},${hy - 0.38 * r} Q${hx + s * 0.6 * r},${hy - 0.5 * r} ${hx + s * 0.15 * r},${hy - 0.98 * r} Z`; P(d); soft(() => F(`M${hx + s * 0.4 * r},${hy - 0.95 * r} Q${hx + s * 0.85 * r},${hy - 1.1 * r} ${hx + s * 0.95 * r},${hy - 0.55 * r} Q${hx + s * 0.6 * r},${hy - 0.65 * r} ${hx + s * 0.4 * r},${hy - 0.95 * r} Z`, ACC)); });
    eyes(hx, hy, r, -0.12, 0.42); cheeks(hx, hy, r, 0.35, 0.72);
    O(hx, hy + 0.32 * r, 0.5 * r, 0.34 * r); soft(() => Of(hx, hy + 0.32 * r, 0.44 * r, 0.28 * r, ACC));
    O(hx - 0.17 * r, hy + 0.32 * r, 0.07 * r, 0.13 * r, INK); O(hx + 0.17 * r, hy + 0.32 * r, 0.07 * r, 0.13 * r, INK);
    smile(hx, hy + 0.76 * r, r, 0.18);
  }
  function sheep(b) {
    const q = b ? { bx: 40, by: 64, rx: 21, ry: 14, L: [26, 35, 46, 55], top: 70, hx: 64, hy: 46, rx2: 11, ry2: 13 } : { bx: 42, by: 56, rx: 28, ry: 18, L: [22, 32, 52, 62], top: 64, hx: 75, hy: 40, rx2: 10, ry2: 13 };
    legs(q.L, q.top, 6, true);
    P(scal(q.bx, q.by, q.rx, q.ry, b ? 10 : 12, 0.32));
    const { hx, hy } = q, r = q.ry2;
    [-1, 1].forEach(s => O(hx + s * (q.rx2 + 5), hy - 3, 7, 3.2, W, s * 0.35));
    O(hx, hy, q.rx2, q.ry2);
    P(scal(hx, hy - q.ry2 + 1, q.rx2 * 0.85, 5, 7, 0.45));
    eyes(hx, hy + 2, r, -0.1, 0.42); if (b) cheeks(hx, hy + 2, r, 0.35, 0.55);
    D(hx, hy + 0.42 * r, 0.08 * r); smile(hx, hy + 0.58 * r, r, 0.2);
  }
  function horse() {
    P('M16,44 C4,50 4,66 8,78 C11,70 13,60 20,52 Z');
    legs([19, 29, 51, 61], 54, 7, true);
    const hx = 76, hy = 28;
    P('M54,46 L66,24 L84,28 L64,57 Z');
    P('M67,15 Q58,21 62,25 Q53,29 58,33 Q50,37 55,41 Q48,45 54,48 L60,44 L71,22 Z', ACC);
    O(40, 54, 27, 14);
    [-1, 1].forEach(s => P(`M${hx + s * 4},${hy - 13} L${hx + s * 9},${hy - 26} L${hx + s * 10},${hy - 10} Z`));
    O(hx, hy, 11, 16);
    P(`M${hx - 6},${hy - 14} Q${hx - 3},${hy - 21} ${hx},${hy - 16} Q${hx + 3},${hy - 21} ${hx + 6},${hy - 14} Q${hx},${hy - 8} ${hx - 6},${hy - 14} Z`);
    D(hx - 5, hy - 3, 2); D(hx + 5, hy - 3, 2); D(hx - 4.3, hy - 3.7, 0.7, W); D(hx + 5.7, hy - 3.7, 0.7, W);
    O(hx, hy + 11, 9, 6.5); D(hx - 3.5, hy + 10, 1.4); D(hx + 3.5, hy + 10, 1.4);
  }
  function rabbit() {
    [-1, 1].forEach(s => { O(50 + s * 10, 22, 7, 18, pc('body'), s * 0.18); if (LINEART) O(50 + s * 10, 24, 3, 11, null, s * 0.18, LW * 0.7); else soft(() => Of(50 + s * 10, 24, 3, 11, pc('inner', ACC), s * 0.18)); });
    O(50, 74, 22, 18, pc('body')); O(50, 77, 11, 10, pc('muzzle'));
    O(37, 91, 10, 4.5, pc('body')); O(63, 91, 10, 4.5, pc('body'));
    S('M38,68 Q41,76 46,72'); S('M62,68 Q59,76 54,72');
    const hx = 50, hy = 46, r = 18;
    O(hx, hy, r, r * 0.95, pc('body')); eyes(hx, hy, r, -0.1, 0.36); cheeks(hx, hy, r, 0.3, 0.62); catNose(hx, hy, r); wMouth(hx, hy + 0.34 * r, r, 0.14); whiskers(hx, hy, r);
  }
  function monkey() {
    tube('M64,84 C84,88 92,72 86,62 C82,56 76,58 79,63', 5);
    O(50, 72, 17, 17); soft(() => Of(50, 75, 10, 11, ACC)); O(50, 75, 10, 11, null);
    O(39, 90, 8, 4.5); O(61, 90, 8, 4.5);
    O(35, 68, 5, 11, W, 0.4); O(65, 68, 5, 11, W, -0.4);
    [-1, 1].forEach(s => { O(50 + s * 21, 40, 8, 8); O(50 + s * 21, 40, 4, 4, null); });
    O(50, 38, 21, 20);
    P('M50,30 C44,23 31,27 32,38 C32,44 35,47 37,49 C39,58 61,58 63,49 C65,47 68,44 68,38 C69,27 56,23 50,30 Z');
    D(43, 37, 2.3); D(57, 37, 2.3); D(43.8, 36.2, 0.8, W); D(57.8, 36.2, 0.8, W);
    D(47.5, 45, 1.2); D(52.5, 45, 1.2); smile(50, 49, 20, 0.25);
    S('M48,18 Q50,12 54,15');
  }
  function hen() {
    O(22, 40, 6, 13, W, -0.5); O(28, 34, 6, 14, W, -0.15); O(36, 34, 5.5, 12, W, 0.2);
    toes(40, 92); toes(55, 92);
    O(46, 62, 27, 20);
    [[62, 20], [68, 17], [74, 20]].forEach(([x, y]) => O(x, y, 4.2, 4.2, ACC));
    O(68, 34, 13, 13);
    P('M80,31 L90,35 L80,39 Z'); O(79, 44, 2.6, 4.5, ACC);
    D(72, 31, 2); D(72.6, 30.3, 0.7, W);
    P('M34,62 Q46,54 58,61 Q50,74 38,70 Z');
  }
  function chick() {
    toes(42, 92); toes(58, 92);
    O(50, 58, 25, 24, pc('body'));
    S('M47,35 Q46,26 52,28 Q53,22 58,27');
    P('M74,52 L84,56 L74,60 Z', ACC);
    D(62, 48, 2.2); D(62.7, 47.3, 0.8, W); soft(() => Of(64, 58, 4, 2.6, ACC));
    P('M30,58 Q38,52 46,60 Q40,70 32,66 Z', pc('wing'));
  }
  function webFoot(x, y) { S(`M${x},${y - 12} L${x},${y - 1}`); P(`M${x},${y - 2} L${x - 7},${y + 2} L${x + 6},${y + 2} Z`, ACC, LW * 0.8); }
  function duck() {
    webFoot(42, 92); webFoot(56, 92);
    P('M22,60 L10,48 L28,52 Z');
    O(46, 64, 28, 16);
    F('M62,40 L61,58 L77,58 L78,40 Z', W); S('M62,40 L60,55'); S('M78,40 L77,54');
    O(70, 34, 13, 13);
    P('M80,34 Q96,32 96,38 Q96,44 81,42 Z', ACC);
    D(73, 30, 2); D(73.6, 29.3, 0.7, W);
    P('M32,62 Q46,55 60,63 Q48,74 34,68 Z');
  }
  function duckling() {
    webFoot(42, 93); webFoot(56, 93);
    P('M24,66 L14,56 L30,58 Z');
    O(46, 68, 23, 14);
    O(62, 42, 17, 17);
    P('M76,42 Q92,40 92,46 Q92,51 77,50 Z', ACC);
    D(65, 38, 2.3); D(65.7, 37.3, 0.8, W); soft(() => Of(62, 48, 3.5, 2.4, ACC));
    S('M58,25 Q60,19 64,23');
    P('M34,66 Q44,60 54,67 Q46,76 36,72 Z');
  }
  function bird() {
    S('M44,72 L44,90 M38,92 L44,90 L50,92'); S('M54,72 L54,90 M48,92 L54,90 L60,92');
    P('M30,54 L8,42 L12,58 Z');
    O(46, 56, 22, 17);
    O(64, 40, 13, 13);
    P('M76,37 L88,41 L76,45 Z', ACC);
    D(67, 37, 2.1); D(67.6, 36.3, 0.7, W);
    P('M32,54 Q44,46 56,56 Q44,66 34,62 Z');
    soft(() => Of(58, 60, 6, 5, ACC));
  }
  function fish(food) {
    P('M24,50 L6,34 Q11,50 6,66 Z');
    P('M44,32 Q52,18 64,30 Z');
    P('M20,50 C30,28 66,26 84,50 C66,74 30,72 20,50 Z');
    S('M62,36 Q56,50 62,64', LW * 0.9);
    S('M34,45 Q38,49 34,53 M44,41 Q48,45 44,49 M44,52 Q48,56 44,60', LW * 0.7);
    O(72, 45, 4.2, 4.2); D(73, 45, 2.1);
    if (!food) S('M80,53 Q77,56 74,54', LW * 0.8);
    P('M46,68 Q52,76 58,68 Z', ACC, LW * 0.8);
  }
  function whale() {
    P('M30,62 Q20,60 16,50 Q8,52 4,46 Q12,40 20,44 Q22,36 30,32 Q30,42 26,48 Q30,56 38,60 Z');
    P('M26,62 C26,40 54,30 74,36 C90,41 96,58 90,68 C84,78 62,80 44,77 C33,75 26,70 26,62 Z');
    S('M44,70 Q66,76 86,68', LW * 0.8);
    D(80, 52, 2.3); D(80.6, 51.3, 0.8, W); smile(86, 58, 10, 0.3);
    c.save(); c.strokeStyle = ACC; c.lineWidth = LW; c.lineCap = 'round';
    c.stroke(new Path2D('M66,30 L66,22 M66,22 Q60,12 54,16 M66,22 Q72,12 78,16')); c.restore();
  }
  function snake() {
    tube('M10,74 C18,52 32,52 40,68 C48,84 62,84 68,64 C71,54 74,48 80,46', 12);
    c.save(); c.strokeStyle = ACC; c.lineWidth = LW * 0.9; c.lineCap = 'round';
    c.stroke(new Path2D('M92,46 L98,46 M98,46 L100,43 M98,46 L100,49')); c.restore();
    O(84, 45, 10, 8);
    D(83, 41, 1.9); D(89, 41, 1.9); smile(87, 48, 8, 0.35);
    [[24, 58], [36, 60], [50, 76], [62, 72]].forEach(([x, y], i) => S(`M${x - 4},${y - 4} L${x + 4},${y + 4}`, LW * 0.7));
  }
  function worm() {
    tube('M12,76 C22,58 34,58 42,72 C50,86 62,84 68,70', 15);
    [[22, 64], [33, 62], [44, 76], [55, 80]].forEach(([x, y], i) => S(`M${x - 3},${y - 5} L${x + 3},${y + 5}`, LW * 0.7));
    O(74, 60, 12, 12); D(70, 57, 1.9); D(78, 57, 1.9); smile(74, 63, 12, 0.3); cheeks(74, 60, 12, 0.3, 0.6);
  }

  // ---------------- food & places ----------------
  function carrot() {
    P('M66,30 Q60,10 64,6 Q70,14 70,28 Z'); P('M68,30 Q76,12 84,12 Q82,24 72,32 Z'); P('M70,34 Q86,26 94,30 Q86,38 72,38 Z');
    P('M52,32 Q66,22 74,34 Q78,44 70,50 L28,88 Q20,92 20,84 Z', W);
    soft(() => F('M52,32 Q66,22 74,34 Q78,44 70,50 L28,88 Q20,92 20,84 Z', ACC));
    P('M52,32 Q66,22 74,34 Q78,44 70,50 L28,88 Q20,92 20,84 Z', null);
    S('M46,48 L52,52 M38,62 L44,66 M56,54 L60,58', LW * 0.8);
  }
  function bone() {
    c.save(); c.translate(50, 52); c.rotate(-0.45); c.translate(-50, -52);
    [[24, 44], [24, 60], [76, 44], [76, 60]].forEach(([x, y]) => O(x, y, 9.5, 9.5));
    F('M24,45 L76,45 L76,59 L24,59 Z', W); S('M28,45.5 L72,45.5'); S('M28,58.5 L72,58.5');
    c.restore();
  }
  function banana() {
    P('M18,30 L15,20 L20,19 L23,29 Z');
    P('M18,28 Q20,74 70,78 Q84,78 88,70 Q84,66 76,68 Q36,66 26,28 Z', W);
    soft(() => F('M18,28 Q20,74 70,78 Q84,78 88,70 Q84,66 76,68 Q36,66 26,28 Z', ACC));
    P('M18,28 Q20,74 70,78 Q84,78 88,70 Q84,66 76,68 Q36,66 26,28 Z', null);
    S('M26,40 Q32,64 62,72', LW * 0.7);
  }
  function grass() {
    const blades = [[20, 92, 16, 46], [32, 92, 30, 24], [44, 92, 48, 34], [56, 92, 58, 18], [68, 92, 72, 36], [80, 92, 86, 48]];
    blades.forEach(([x, y, tx, ty]) => P(`M${x - 6},${y} Q${x - 4},${(y + ty) / 2} ${tx},${ty} Q${x + 4},${(y + ty) / 2} ${x + 6},${y} Z`));
    O(46, 22, 5, 5, ACC); [0, 1, 2, 3, 4].forEach(i => { const a = i * 1.2566 - 1.57; O(46 + 9 * Math.cos(a), 22 + 9 * Math.sin(a), 4.5, 4.5); });
    O(46, 22, 4.5, 4.5, ACC);
    S('M8,93 L92,93');
  }
  function seeds() {
    const S0 = [[30, 54], [40, 50], [50, 47], [60, 50], [70, 54], [36, 44], [46, 40], [56, 41], [64, 45], [42, 32], [52, 32], [48, 24]];
    S0.forEach(([x, y], i) => O(x, y, 4, 2.8, i % 3 === 0 ? ACC : W, (i % 2 ? 0.5 : -0.5), LW * 0.8));
    P('M14,56 L86,56 Q84,88 50,88 Q16,88 14,56 Z');
    S('M24,66 L76,66', LW * 0.7);
  }
  function barn() {
    P('M12,50 L28,26 L50,14 L72,26 L88,50 L88,92 L12,92 Z', pc('wall'));
    S('M12,50 L88,50', LW * 0.8);
    P('M34,62 L66,62 L66,92 L34,92 Z', pc('door')); S('M34,62 L66,92 M66,62 L34,92', LW * 0.8);
    P('M43,28 L57,28 L57,42 L43,42 Z', pc('win', null)); soft(() => F('M43,28 L57,28 L57,42 L43,42 Z', ACC));
  }
  function waves() {
    [36, 54, 72].forEach((y, i) => S(`M${8 + (i % 2) * 6},${y} q10,-10 20,0 t20,0 t20,0 t20,0`, LW));
    c.save(); c.strokeStyle = ACC; c.lineWidth = LW; c.lineCap = 'round'; c.stroke(new Path2D('M10,88 q10,-8 20,0 t20,0 t20,0 t20,0')); c.restore();
  }
  function trees() {
    P('M30,56 L38,56 L39,92 L29,92 Z'); P(scal(34, 38, 18, 18, 9, 0.3));
    P('M64,60 L72,60 L73,92 L63,92 Z'); P(scal(68, 44, 20, 18, 9, 0.3));
    soft(() => { Of(30, 36, 3, 3, ACC); Of(72, 40, 3, 3, ACC); Of(62, 50, 3, 3, ACC); });
    S('M8,93 L92,93');
  }
  function house() {
    P('M66,22 L76,22 L76,40 L66,34 Z');
    P('M22,46 L78,46 L78,92 L22,92 Z');
    P('M12,50 L50,16 L88,50 Z');
    P('M44,66 L58,66 L58,92 L44,92 Z'); D(55, 80, 1.6);
    P('M27,58 L39,58 L39,70 L27,70 Z'); S('M33,58 L33,70 M27,64 L39,64', LW * 0.7);
    P('M63,58 L75,58 L75,70 L63,70 Z'); S('M69,58 L69,70 M63,64 L75,64', LW * 0.7);
    P('M50,40 C46,36 42,40 50,46 C58,40 54,36 50,40 Z', ACC, LW * 0.7);
  }
  function tree() {
    P('M44,56 L56,56 L58,94 L42,94 Z', pc('trunk')); P(scal(50, 36, 30, 26, 11, 0.28), pc('crown'));
    (PAL ? (f => f()) : soft)(() => { Of(40, 30, 4, 4, ACC); Of(60, 40, 4, 4, ACC); Of(52, 22, 4, 4, ACC); });
  }

  const ART = {
    dog: () => dog(false), puppy: () => dog(true), cat: () => cat(false), kitten: () => cat(true),
    lion: () => lion(false), cub: () => lion(true), cow: () => cow(false), calf: () => cow(true),
    sheep: () => sheep(false), lamb: () => sheep(true), pig, horse, bear, rabbit, monkey, hen, chick, duck, duckling, bird,
    fish: () => fish(false), fishfood: () => fish(true), whale, snake, worm,
    carrot, bone, banana, grass, seeds, barn, waves, trees, house, tree
  };
  function art(ctx, kind, x, y, s, acc, flip, pal) {
    const prev = [c, LW, ACC, PAL]; c = ctx; ACC = acc || K.BLUE; PAL = pal || null;
    const k = s / 100; LW = Math.max(2.6, Math.min(5, s / 34)) / k;
    ctx.save(); ctx.translate(flip ? x + s / 2 : x - s / 2, y - s / 2); ctx.scale(flip ? -k : k, k);
    ART[kind](); ctx.restore(); [c, LW, ACC, PAL] = prev;
  }
  const CHAR = { puppy: 'puppy', kitten: 'kitten', bunny: 'rabbit', lioncub: 'cub' };
  const chr = d => CHAR[d.character] || 'puppy';
  function guide(ctx, d) { art(ctx, chr(d), 738, 104, 104, d.accent); }
  const pick = (a, n, r) => h.shuffle(a.slice(), r).slice(0, n);
  const dotA = (ctx, x, y, d, r = 8) => h.dot(ctx, x, y, r, d.accent);

  // ---------------- pages ----------------
  const pages = [];

  // 1 · Who lives here? (habitats)
  pages.push({ title: 'Who lives here?', titleEs: '¿Quién vive aquí?', draw(ctx, d) {
    h.header(ctx, d, h.t(d, 'Who lives here, {name}?', '¿Quién vive aquí, {name}?'), h.t(d, 'Draw a line from each animal to its home.', 'Une con una línea cada animal con su casa.'));
    const R = d.rand;
    const HAB = h.shuffle([['barn', h.t(d, 'Farm', 'Granja'), ['cow', 'pig', 'sheep', 'hen', 'horse']], ['waves', h.t(d, 'Ocean', 'Mar'), ['fish', 'whale']],
      ['trees', h.t(d, 'Jungle', 'Selva'), ['lion', 'monkey']], ['house', h.t(d, 'Home', 'Casa'), ['dog', 'cat']]], R);
    const n = { 3: 4, 4: 6, 5: 8 }[d.age];
    const pools = HAB.map(x => h.shuffle(x[2].slice(), R));
    const animals = pools.map(p => p[0]);
    const extra = h.shuffle([0, 1, 2, 3], R).slice(0, n - 4); extra.forEach(i => animals.push(pools[i][1]));
    h.shuffle(animals, R);
    const m = n / 2, top = 195, span = 790;
    // homes in the middle column
    const ch = 172, gap = (span - 4 * ch) / 3;
    HAB.forEach(([kind, label], i) => {
      const y0 = top + i * (ch + gap), cy = y0 + ch / 2;
      h.box(ctx, 322, y0, 206, ch, 20, d.accent, 2.5);
      art(ctx, kind, 425, y0 + 72, 122, d.accent);
      h.text(ctx, label, 425, y0 + ch - 14, 20, 500, SOFT, 'center');
      dotA(ctx, 310, cy, d, 7); dotA(ctx, 540, cy, d, 7);
    });
    const H = span / m, sz = Math.min(172, H - 20);
    animals.forEach((a, i) => {
      const left = i < m, j = left ? i : i - m, cy = top + (j + 0.5) * H;
      if (left) { art(ctx, a, 148, cy, sz, d.accent); dotA(ctx, 256, cy, d); }
      else { art(ctx, a, 702, cy, sz, d.accent, true); dotA(ctx, 594, cy, d); }
    });
    h.tip(ctx, h.t(d, 'Grown-up tip: name each home together: farm, ocean, jungle, house.', 'Consejo para el adulto: nombren juntos cada lugar: granja, mar, selva, casa.'));
  } });

  // 2 · What does it say? (sounds)
  pages.push({ title: 'What does it say?', titleEs: '¿Qué dice?', draw(ctx, d) {
    h.header(ctx, d, h.t(d, 'What does it say?', '¿Qué animal dice esto?'), h.t(d, 'Listen to the sound. Circle the animal that says it.', 'Escucha el sonido. Encierra el animal que lo hace.'));
    guide(ctx, d);
    const R = d.rand, SND = [['cow', 'MOO'], ['dog', 'WOOF'], ['cat', 'MEOW'], ['duck', 'QUACK'], ['sheep', 'BAA'], ['pig', 'OINK'], ['lion', 'ROAR'], ['horse', 'NEIGH']];
    const SND_ES = { cow: 'MUU', dog: 'GUAU', cat: 'MIAU', duck: 'CUAC', sheep: 'BEEE', pig: 'OINC', lion: 'GRRR', horse: 'IIIH' };
    const n = { 3: 3, 4: 4, 5: 5 }[d.age], rows = pick(SND, n, R);
    const top = 200, span = 785, H = Math.min(215, span / n), y0 = top + (span - H * n) / 2;
    rows.forEach(([a, word], i) => {
      const yt = y0 + i * H + 7, rh = H - 14, cy = yt + rh / 2;
      h.box(ctx, 55, yt, 740, rh, 20, LINE, 2);
      // speech bubble
      const bh = Math.min(96, rh - 40), bx = 78, bw = 196, by = cy - bh / 2 - 6;
      ctx.save(); h.pen(ctx, 3, INK); h.roundRect(ctx, bx, by, bw, bh, bh / 2.4); ctx.fillStyle = W; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + bw - 62, by + bh - 1.5); ctx.lineTo(bx + bw - 30, by + bh + 22); ctx.lineTo(bx + bw - 36, by + bh - 1.5); ctx.fillStyle = W; ctx.fill(); ctx.stroke();
      ctx.fillRect(bx + bw - 61, by + bh - 4, 24, 5); ctx.restore();
      const say = h.t(d, word + '!', '¡' + SND_ES[a] + '!'); const px = h.fitText(ctx, say, bw - 36, 40, 700); h.text(ctx, say, bx + bw / 2, by + bh / 2 + px * 0.36, px, 700, d.accent, 'center');
      const others = pick(SND.filter(s => s[0] !== a).map(s => s[0]), 2, R);
      const opts = h.shuffle([a, ...others], R), sz = Math.min(138, rh - 20);
      opts.forEach((o, j) => art(ctx, o, 400 + j * 150, cy, sz, d.accent));
    });
    h.tip(ctx, h.t(d, 'Grown-up tip: make each sound together, then let your child find the animal.', 'Consejo para el adulto: hagan cada sonido juntos y luego dejen que el niño busque el animal.'));
  } });

  // 3 · Mommy and baby
  pages.push({ title: 'Mommy and baby', titleEs: 'Mamá y bebé', draw(ctx, d) {
    h.header(ctx, d, h.t(d, 'Mommy and baby', 'Mamá y bebé'), h.t(d, 'Draw a line from each mommy to her baby.', 'Une con una línea cada mamá con su bebé.'));
    const R = d.rand, PAIRS = [['cow', 'calf'], ['hen', 'chick'], ['dog', 'puppy'], ['cat', 'kitten'], ['duck', 'duckling'], ['sheep', 'lamb']];
    const n = { 3: 3, 4: 4, 5: 5 }[d.age], P2 = pick(PAIRS, n, R);
    let perm; do { perm = h.shuffle([...Array(n).keys()], R); } while (perm.every((v, i) => v === i) || perm.filter((v, i) => v === i).length > 1);
    const top = 195, span = 790, H = span / n, sz = Math.min(170, H - 24);
    h.text(ctx, h.t(d, 'Mommy', 'Mamá'), 165, 190, 18, 500, GREY, 'center'); h.text(ctx, h.t(d, 'Baby', 'Bebé'), 670, 190, 18, 500, GREY, 'center');
    P2.forEach(([a], i) => { const cy = top + 12 + (i + 0.5) * H; art(ctx, a, 165, cy, sz, d.accent); dotA(ctx, 285, cy, d); });
    perm.forEach((pi, i) => { const cy = top + 12 + (i + 0.5) * H; art(ctx, P2[pi][1], 670, cy + sz * 0.1, sz * 0.8, d.accent, true); dotA(ctx, 555, cy, d); });
    const BABY_ES = { calf: 'ternero', chick: 'pollito', puppy: 'cachorro', kitten: 'gatito', duckling: 'patito', lamb: 'corderito' };
    h.tip(ctx, h.t(d, 'Grown-up tip: say the baby names together: ' + P2.map(p => p[1]).join(', ') + '.', 'Consejo para el adulto: digan juntos el nombre de cada bebé: ' + P2.map(p => BABY_ES[p[1]]).join(', ') + '.'));
  } });

  // 4 · Count the legs
  pages.push({ title: 'Count the legs', titleEs: 'Cuenta las patas', draw(ctx, d) {
    h.header(ctx, d, h.t(d, 'Count the legs', 'Cuenta las patas'), h.t(d, 'How many legs? Draw a line to the right box.', '¿Cuántas patas? Une con una línea a la caja correcta.'));
    guide(ctx, d);
    const R = d.rand;
    const G = d.age === 3 ? { 2: ['hen', 'duck', 'bird'], 4: ['dog', 'cow', 'horse'] }
      : d.age === 4 ? { 2: ['hen', 'duck', 'bird'], 4: ['dog', 'cow', 'horse'], 0: ['fish', 'snake'] }
        : { 2: ['hen', 'duck', 'bird'], 4: ['dog', 'cow', 'horse'], 0: ['fish', 'snake', 'worm'] };
    const keys = [2, 4, 0].filter(k => G[k]);
    const all = h.shuffle(keys.flatMap(k => G[k]), R), n = all.length, mt = Math.ceil(n / 2);
    const rowA = all.slice(0, mt), rowB = all.slice(mt);
    const sz = Math.min(150, 750 / mt - 14);
    rowA.forEach((a, i) => { const x = 50 + (i + 0.5) * 750 / rowA.length; art(ctx, a, x, 300, sz, d.accent); dotA(ctx, x, 398, d); });
    rowB.forEach((a, i) => { const x = 50 + (i + 0.5) * 750 / rowB.length; dotA(ctx, x, 742, d); art(ctx, a, x, 845, sz, d.accent); });
    const bw = 196, bh = 196, gap = keys.length === 2 ? 120 : 52, tot = keys.length * bw + (keys.length - 1) * gap, x0 = 425 - tot / 2;
    keys.forEach((k, i) => {
      const x = x0 + i * (bw + gap), y = 472;
      h.box(ctx, x, y, bw, bh, 24, d.accent, 3.5);
      h.text(ctx, String(k), x + bw / 2, y + 116, 104, 700, INK, 'center');
      // dots under the number so it is easy to "see" how many
      const dx0 = x + bw / 2 - (k - 1) * 15;
      for (let j = 0; j < k; j++) h.dot(ctx, dx0 + j * 30, y + 160, 9, d.accent);
    });
    h.tip(ctx, d.age === 3 ? h.t(d, 'Grown-up tip: touch and count each leg together: 1, 2... 1, 2, 3, 4!', 'Consejo para el adulto: toquen y cuenten juntos cada pata: 1, 2... ¡1, 2, 3, 4!') : h.t(d, 'Grown-up tip: touch and count each leg together. Some animals have no legs!', 'Consejo para el adulto: toquen y cuenten juntos cada pata. ¡Algunos animales no tienen patas!'));
  } });

  // 5 · First sounds
  pages.push({ title: 'First sounds', titleEs: 'Primeros sonidos', draw(ctx, d) {
    h.header(ctx, d, h.t(d, 'First sounds', 'Primeros sonidos'), d.age === 5 ? h.t(d, 'Say the name. Trace the big and the small letter.', 'Di el nombre. Traza la letra grande y la pequeña.') : h.t(d, 'Say the animal name. Trace its first letter.', 'Di el nombre del animal. Traza su primera letra.'));
    guide(ctx, d);
    const LET = d.lang === 'es' ? [['G', 'g', 'cat', 'Gato'], ['P', 'p', 'dog', 'Perro'], ['O', 'o', 'bear', 'Oso'], ['V', 'v', 'cow', 'Vaca'], ['M', 'm', 'monkey', 'Mono']]
      : [['C', 'c', 'cat', 'Cat'], ['D', 'd', 'dog', 'Dog'], ['P', 'p', 'pig', 'Pig'], ['B', 'b', 'bear', 'Bear'], ['F', 'f', 'fish', 'Fish']];
    const n = { 3: 3, 4: 4, 5: 5 }[d.age], top = 196, span = 790, H = span / n;
    const GL = window.TC_GLYPHS;
    LET.slice(0, n).forEach(([U, l, a, word], i) => {
      const yt = top + i * H, sz = Math.min(150, H - 52), acy = yt + 8 + sz / 2;
      art(ctx, a, 140, acy, sz, d.accent);
      const wy = acy + sz / 2 + 30; h.font(ctx, 700, 28); const ww = ctx.measureText(word).width, w1 = ctx.measureText(word[0]).width;
      h.text(ctx, word[0], 140 - ww / 2, wy, 28, 700, d.accent); h.text(ctx, word.slice(1), 140 - ww / 2 + w1, wy, 28, 700, INK);
      const cap = Math.min(118, H * 0.5), base = yt + H * (d.age === 5 ? 0.62 : 0.66), x1 = 275, x2 = 790;
      h.guide(ctx, x1 - 10, x2, base, cap);
      const seq = []; let x = x1 + 6, gap = cap * 0.34;
      const add = (ch, model) => { const w = GL[ch][0] * cap / 100; if (x + w > x2 - 6) return false; seq.push([ch, x, model]); x += w + gap; return true; };
      add(U, true);
      if (d.age === 5) { add(U, false); add(l, true); for (let q = 0; q < 3 && add(l, false); q++); }
      else while (add(U, false));
      const extra = x2 - 6 - (x - gap), sp = seq.length > 1 ? Math.min(extra / (seq.length - 1), cap * 0.45) : 0;
      seq.forEach((q, j) => { q[1] += sp * j; });
      seq.forEach(([ch, xx, model]) => h.drawStroke(ctx, ch, xx, base, cap, model ? { lw: 6, color: INK } : { lw: 5, color: GREY, dash: [2, 10], startDot: d.accent }));
      if (i < n - 1) h.line(ctx, 60, yt + H, 790, yt + H, { lw: 1.5, color: LINE });
    });
    h.tip(ctx, h.t(d, 'Grown-up tip: stretch the first sound: "C-c-cat!" Start each letter at the dot.', 'Consejo para el adulto: alarguen el primer sonido: "¡G-g-gato!" Empiecen cada letra en el punto.'));
  } });

  // 6 · Help {name} feed the animals (tangled lines)
  function bez(p, t) { const u = 1 - t; return [u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0], u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1]]; }
  function segX(a, b, c2, d2) {
    const r = [b[0] - a[0], b[1] - a[1]], s = [d2[0] - c2[0], d2[1] - c2[1]], den = r[0] * s[1] - r[1] * s[0]; if (Math.abs(den) < 1e-9) return null;
    const t = ((c2[0] - a[0]) * s[1] - (c2[1] - a[1]) * s[0]) / den, u = ((c2[0] - a[0]) * r[1] - (c2[1] - a[1]) * r[0]) / den;
    return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? [a[0] + t * r[0], a[1] + t * r[1], Math.abs(den) / Math.hypot(...r) / Math.hypot(...s)] : null;
  }
  function tangle(n, age, ys, x1, x2, R) {
    const inv = p => { let k = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (p[i] > p[j]) k++; return k; };
    let best = null;
    for (let tries = 0; tries < 400 && !best; tries++) {
      let perm;
      if (age === 3) { const s = Math.floor(R() * (n - 1)); perm = [...Array(n).keys()]; [perm[s], perm[s + 1]] = [perm[s + 1], perm[s]]; }
      else { perm = h.shuffle([...Array(n).keys()], R); if (perm.some((v, i) => v === i)) continue; if (inv(perm) < (age === 4 ? 3 : 5)) continue; }
      const curves = perm.map((t, i) => { const a = 0.25 + R() * 0.45, b = 0.25 + R() * 0.45, w = x2 - x1; return [[x1, ys[i]], [x1 + a * w, ys[i]], [x2 - b * w, ys[t]], [x2, ys[t]]]; });
      const pts = curves.map(cv => Array.from({ length: 121 }, (_, k) => bez(cv, k / 120)));
      const X = []; let ok = true;
      for (let i = 0; i < n && ok; i++) for (let j = i + 1; j < n && ok; j++) {
        let cnt = 0;
        for (let a = 0; a < 120; a++) for (let b = 0; b < 120; b++) { const q = segX(pts[i][a], pts[i][a + 1], pts[j][b], pts[j][b + 1]); if (q) { cnt++; X.push(q); if (q[2] < 0.35) ok = false; } }
        if (cnt !== ((perm[i] > perm[j]) ? 1 : 0)) ok = false;
      }
      for (let i = 0; i < X.length && ok; i++) { if (X[i][0] < x1 + 60 || X[i][0] > x2 - 60) ok = false; for (let j = i + 1; j < X.length; j++) if (Math.hypot(X[i][0] - X[j][0], X[i][1] - X[j][1]) < 46) ok = false; }
      // keep different lines apart (no long near-parallel runs)
      for (let i = 0; i < n && ok; i++) for (let j = i + 1; j < n && ok; j++) { let close = 0; for (let k = 0; k <= 120; k += 2) { let m = 1e9; for (let l = 0; l <= 120; l += 2) m = Math.min(m, Math.hypot(pts[i][k][0] - pts[j][l][0], pts[i][k][1] - pts[j][l][1])); if (m < 16) close++; } if (close > 6) ok = false; }
      if (ok) best = { perm, curves };
    }
    return best;
  }
  pages.push({ title: 'Feed the animals', titleEs: 'Dar de comer', draw(ctx, d) {
    h.header(ctx, d, h.t(d, 'Help {name} feed the animals', 'Ayuda a {name} a alimentar a los animales'), h.t(d, 'Follow each line with your finger, then with a crayon.', 'Sigue cada línea con el dedo y luego con un crayón.'));
    const R = d.rand, FOOD = [['rabbit', 'carrot'], ['dog', 'bone'], ['monkey', 'banana'], ['cow', 'grass'], ['cat', 'fishfood'], ['bird', 'seeds']];
    const n = { 3: 3, 4: 4, 5: 5 }[d.age], prs = pick(FOOD, n, R);
    const top = 205, span = 780, H = span / n, ys = prs.map((_, i) => top + (i + 0.5) * H), x1 = 222, x2 = 628;
    let T = null; for (let k = 0; k < 6 && !T; k++) T = tangle(n, d.age, ys, x1, x2, R);
    const sz = Math.min(140, H - 22);
    T.curves.forEach(cv => { ctx.save(); h.pen(ctx, 4.5, INK); ctx.beginPath(); ctx.moveTo(...cv[0]); ctx.bezierCurveTo(...cv[1], ...cv[2], ...cv[3]); ctx.stroke(); ctx.restore(); });
    prs.forEach(([a], i) => { art(ctx, a, 122, ys[i], sz, d.accent); dotA(ctx, x1, ys[i], d, 9); });
    T.perm.forEach((t, i) => { art(ctx, prs[i][1], 728, ys[t], sz * 0.9, d.accent); h.circle(ctx, x2, ys[t], 8, { fill: W, lw: 3.5 }); });
    // expose the answer for QA (not drawn)
    d._feedAnswer = prs.map((p, i) => p[0] + '->' + prs[i][1] + '@row' + T.perm[i]);
    const FOOD_ES = { carrot: 'la zanahoria', bone: 'el hueso', banana: 'el plátano', grass: 'el pasto', fishfood: 'el pescado', seeds: 'las semillas' };
    h.tip(ctx, h.t(d, 'Grown-up tip: ask "Who eats the ' + (prs[0][1] === 'fishfood' ? 'fish' : prs[0][1]) + '?" and follow the line together, slowly.', 'Consejo para el adulto: pregunten "¿Quién come ' + FOOD_ES[prs[0][1]] + '?" y sigan la línea juntos, despacio.'));
  } });

  K.register({
    id: 'animals', title: 'Amazing Animals', titleEs: 'Animales asombrosos',
    characters: [{ id: 'puppy', label: 'Puppy', labelEs: 'Perrito' }, { id: 'kitten', label: 'Kitten', labelEs: 'Gatito' }, { id: 'bunny', label: 'Bunny', labelEs: 'Conejito' }, { id: 'lioncub', label: 'Lion cub', labelEs: 'Leoncito' }],
    certText: 'You met so many amazing animals!',
    certTextEs: '¡Conociste muchos animales asombrosos!',
    charArticleEs(d) { return 'el'; }, // perrito, gatito, conejito, leoncito
    // big line art for the coloring page / reward badges: white fills, ink outlines, no color
    drawCharacter(ctx, d, id, cx, cy, size) {
      const kind = CHAR[id] || 'puppy', prev = [c, LW, ACC, PAL, LINEART], k = size / 100;
      c = ctx; ACC = W; PAL = null; LINEART = true; LW = Math.max(2.5, size / 90) / k;
      ctx.save(); ctx.translate(cx - size / 2, cy - size / 2 - 4 * k); ctx.scale(k, k); ART[kind](); ctx.restore();
      [c, LW, ACC, PAL, LINEART] = prev;
    },
    coverSky: '#BFE4F8',
    coverBg(ctx, d) {
      const g = ctx.createLinearGradient(0, 30, 0, 760); g.addColorStop(0, '#8FD0F2'); g.addColorStop(1, '#E3F5FD');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 850, 1100);
      // sun
      ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = '#FFFBE6'; ctx.beginPath(); ctx.arc(690, 425, 80, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + Math.PI / 8; h.line(ctx, 690 + 54 * Math.cos(a), 425 + 54 * Math.sin(a), 690 + 70 * Math.cos(a), 425 + 70 * Math.sin(a), { lw: 7, color: '#F4B63A' }); }
      h.circle(ctx, 690, 425, 42, { fill: '#FFD34E', color: '#F4B63A', lw: 4 });
      // clouds
      const cloud = (x, y, s) => { ctx.fillStyle = '#fff'; [[-34, 6, 22], [-10, -8, 30], [20, -2, 26], [42, 8, 18]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, Math.PI * 2); ctx.fill(); }); ctx.fillRect(x - 34 * s, y + 6 * s, 76 * s, 18 * s); };
      cloud(150, 420, 1.15); cloud(470, 450, 0.85);
      // hills
      ctx.fillStyle = '#B5DF97'; ctx.beginPath(); ctx.moveTo(0, 690); ctx.bezierCurveTo(140, 560, 330, 560, 470, 660); ctx.bezierCurveTo(560, 610, 700, 560, 850, 640); ctx.lineTo(850, 1100); ctx.lineTo(0, 1100); ctx.fill();
      ctx.fillStyle = '#97D17A'; ctx.beginPath(); ctx.moveTo(0, 735); ctx.bezierCurveTo(200, 670, 380, 700, 560, 720); ctx.bezierCurveTo(680, 690, 780, 680, 850, 700); ctx.lineTo(850, 1100); ctx.lineTo(0, 1100); ctx.fill();
      // front meadow (same curve as the ground line of coverArt)
      ctx.fillStyle = '#7CC463'; ctx.fill(new Path2D('M0,772 L70,770 Q250,740 425,770 T780,770 L850,768 L850,1100 L0,1100 Z'));
      // little flowers in the grass
      [[78, 1000], [125, 1032], [728, 1004], [775, 1040], [92, 870], [760, 880], [140, 815], [720, 822]].forEach(([x, y], i) => {
        h.line(ctx, x, y, x, y + 16, { lw: 3, color: '#4E9A43' });
        for (let k = 0; k < 5; k++) { const a = k * 1.2566 - 1.57; ctx.beginPath(); ctx.arc(x + 8 * Math.cos(a), y + 8 * Math.sin(a), 6, 0, Math.PI * 2); ctx.fillStyle = i % 2 ? '#fff' : d.accent; ctx.fill(); }
        ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fillStyle = '#FFD34E'; ctx.fill();
      });
    },
    coverArt(ctx, d) {
      const A = d.accent, G = 770, kind = chr(d);
      const CP = {
        puppy: { body: '#EDBE84', ear: '#A8703F', muzzle: '#FFF3E3' },
        kitten: { body: '#F5A65C', muzzle: '#FFF3E3' },
        rabbit: { body: '#D9B79A', muzzle: '#FFF6EE', inner: '#F4A9BC' },
        cub: { body: '#F4C35A', mane: '#D9822B', muzzle: '#FFF4DA' }
      };
      const CHICK = { body: '#FFD84D', wing: '#F7C531' }, BEAK = '#F0922E';
      h.path(ctx, `M70,${G} Q250,${G - 30} 425,${G} T780,${G}`, { lw: 4 });
      art(ctx, 'barn', 175, G - 0.42 * 230, 230, A, false, { wall: '#D4483E', door: '#FFF8EF', win: '#FFF8EF' });
      art(ctx, 'tree', 690, G - 0.44 * 220 + 2, 220, '#E5483F', false, { trunk: '#9B6B45', crown: '#5DAE4B' });
      const s = 330; art(ctx, kind, 440, G + 12 - 0.44 * s, s, A, false, CP[kind]);
      art(ctx, 'chick', 298, G - 0.42 * 90 + 2, 90, BEAK, false, CHICK);
      art(ctx, 'chick', 592, G - 0.42 * 84 + 4, 84, BEAK, true, CHICK);
      art(ctx, 'chick', 646, G - 0.42 * 64 + 6, 64, BEAK, true, CHICK);
      [[110, 800], [520, 808], [770, 798]].forEach(([x, y]) => h.path(ctx, `M${x - 12},${y} Q${x - 8},${y - 18} ${x - 4},${y - 22} M${x},${y} L${x},${y - 26} M${x + 12},${y} Q${x + 8},${y - 18} ${x + 4},${y - 22}`, { lw: 3.5, color: '#3F8A3A' }));
    },
    certArt(ctx, d) {
      art(ctx, chr(d), 425, 775, 210, d.accent);
      art(ctx, 'chick', 255, 840, 90, d.accent); art(ctx, 'duckling', 600, 840, 90, d.accent, true);
    },
    pages
  });
(TCK.ART=TCK.ART||{}).animals=(ctx,n,x,y,s,f)=>art(ctx,n,x,y,s,'#fff',f);TCK.ARTLIST=TCK.ARTLIST||{};TCK.ARTLIST.animals=Object.keys(ART);
})();
