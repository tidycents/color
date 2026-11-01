/* TidyCents · Personalized Coloring Storybooks. Original line art (TidyCents Pre-K library). Everything renders in the browser. */
(function () {
  const K = TCK, h = K.h, INK = K.INK, GREY = K.GREY, LINE = K.LINE, SOFT = K.SOFT;
  const A = (set, ctx, n, x, y, s, f) => K.ART[set](ctx, n, x, y, s, !!f);
  const BOX = { x: 60, y: 300, w: 730, h: 700 };
  function friendOf(B, d) { return B.characters.find(c => c.id === d.character) || B.characters[0]; }
  function fill(B, d, s) { const F = friendOf(B, d); const lab = F.label.toLowerCase(); return s.replace(/\{friend\}/g, h.t(d, lab, F.es)).replace(/\{Friend\}/g, h.t(d, lab, F.es).replace(/^./, m => m.toUpperCase())).replace(/\{unFriend\}/g, h.t(d, 'a ' + F.label, F.un || F.es)); }
  // story text with the child's name in the accent color, centered, wrapped
  function storyText(ctx, d, s) {
    let px = 34; let lines;
    const words = s.split(' ');
    const lay = () => { h.font(ctx, 600, px); lines = []; let cur = []; let w = 0; const sp = ctx.measureText(' ').width;
      for (const wd of words) { const ww = ctx.measureText(wd.replace('{name}', d.name)).width; if (cur.length && w + sp + ww > 700) { lines.push(cur); cur = [wd]; w = ww; } else { cur.push(wd); w += (cur.length > 1 ? sp : 0) + ww; } } if (cur.length) lines.push(cur); };
    lay(); while (lines.length > 4 && px > 22) { px -= 2; lay(); }
    const lh = Math.round(px * 1.42); const y0 = 170 - (lines.length - 1) * lh / 2 + px * 0.35;
    lines.forEach((ln, i) => { h.font(ctx, 600, px); const sp = ctx.measureText(' ').width; const tot = ln.reduce((a, wd, j) => a + ctx.measureText(wd.replace('{name}', d.name)).width + (j ? sp : 0), 0); let x = 425 - tot / 2;
      ln.forEach(wd => { const has = wd.includes('{name}'); const pieces = wd.split('{name}'); pieces.forEach((pc, k) => { if (pc) { h.text(ctx, pc, x, y0 + i * lh, px, 600, INK); h.font(ctx, 600, px); x += ctx.measureText(pc).width; } if (k < pieces.length - 1) { h.text(ctx, d.name, x, y0 + i * lh, px, 700, d.accent); h.font(ctx, 700, px); x += ctx.measureText(d.name).width; h.font(ctx, 600, px); } }); x += sp; });
    });
  }
  function ground(ctx, kind, y) {
    const X1 = BOX.x + 4, X2 = BOX.x + BOX.w - 4; h.pen(ctx, 3.5);
    if (kind === 'none' || !kind) return;
    if (kind === 'sand') { ctx.beginPath(); for (let x = X1; x <= X2; x += 6) { const yy = y + 8 * Math.sin(x / 70); x === X1 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); const r = h.rng('sand' + y); for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.arc(X1 + 20 + r() * (X2 - X1 - 40), y + 30 + r() * (BOX.y + BOX.h - y - 45), 2.4, 0, 7); ctx.fillStyle = GREY; ctx.fill(); } }
    if (kind === 'grass') { h.line(ctx, X1, y, X2, y, { lw: 3.5 }); const r = h.rng('g' + y); for (let i = 0; i < 16; i++) { const x = X1 + 30 + r() * (X2 - X1 - 60); h.path(ctx, `M${x - 8},${y} L${x - 4},${y - 16} L${x},${y} L${x + 4},${y - 20} L${x + 8},${y}`, { lw: 2.6 }); } }
    if (kind === 'water') { for (let j = 0; j < 3; j++) { ctx.beginPath(); for (let x = X1; x <= X2; x += 6) { const yy = y + j * 70 + 9 * Math.sin((x + j * 40) / 45); x === X1 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } h.pen(ctx, 3); ctx.stroke(); } }
    if (kind === 'road') { h.line(ctx, X1, y, X2, y, { lw: 3.5 }); h.line(ctx, X1, y + 90, X2, y + 90, { lw: 3.5 }); h.line(ctx, X1 + 20, y + 45, X2 - 20, y + 45, { lw: 3, dash: [34, 26] }); }
    if (kind === 'floor') h.line(ctx, X1, y, X2, y, { lw: 3.5 });
  }
  function scene(B, ctx, d, items, gr, gy) {
    h.box(ctx, BOX.x, BOX.y, BOX.w, BOX.h, 28, LINE, 3);
    ctx.save(); h.roundRect(ctx, BOX.x, BOX.y, BOX.w, BOX.h, 28); ctx.clip();
    ground(ctx, gr, gy || 860);
    const F = friendOf(B, d);
    items.forEach(([set, n, x, y, s, fl]) => { const z = s * 1.15; if (n === 'F') A(F.set, ctx, F.art, x, y, z, fl); else A(set, ctx, n, x, y, z, fl); });
    ctx.restore();
  }
  K.story = function (def) {
    const B = {
      id: def.id, title: def.title, titleEs: def.titleEs, characters: def.friends, storyMode: true,
      kicker: d => h.t(d, 'PERSONALIZED COLORING STORYBOOK', 'CUENTO PERSONALIZADO PARA COLOREAR'), brand: 'TidyCents · Coloring Storybooks',
      certText: def.cert, certTextEs: def.certEs,
      coverArt(ctx, d) { const F = friendOf(B, d); def.cover.forEach(([set, n, x, y, s, fl]) => { if (n === 'F') A(F.set, ctx, F.art, x, y, s, fl); else A(set, ctx, n, x, y, s, fl); }); },
      certArt(ctx, d) { const F = friendOf(B, d); A(F.set, ctx, F.art, 425, 770, 210); },
      drawCharacter(ctx, d, id, cx, cy, size) { const F = B.characters.find(c => c.id === id) || B.characters[0]; A(F.set, ctx, F.art, cx, cy, size); },
      pages: def.pages.map(p => ({ title: p.t || 'Story', titleEs: p.tEs || 'Cuento', draw(ctx, d) { storyText(ctx, d, fill(B, d, h.t(d, p.en, p.es))); scene(B, ctx, d, p.s, p.g, p.gy); } })),
      endPages: [{ title: 'Draw your favorite part', titleEs: 'Dibuja tu parte favorita', draw(ctx, d) {
        storyText(ctx, d, fill(B, d, h.t(d, 'The End! Draw {name} with the {friend} on their next adventure.', '¡Fin! Dibuja a {name} con ' + '{friend} en su próxima aventura.')));
        h.box(ctx, BOX.x, BOX.y, BOX.w, BOX.h, 28, LINE, 3, [14, 10]); } }]
    };
    K.register(B);
  };
})();
