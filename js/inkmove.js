/* 일회성(2026-11-19): 원고 보강으로 높이가 바뀐 섹션의 필기를 '필기용 포스트잇(접힘)'으로 옮김 — 사용자가 직접 제자리로 옮기기 위함
 * content/ink-move.json = {단원: {기준요소id: [폭, 예전 높이, 지금 높이]}} — 보강 전(dac99f4)·후 화면에서 잰 값
 * 높이가 바뀐 섹션의 필기만 옮기고 나머지는 그대로. 원본은 inkBak1:<단원> 에 보관(동기화됨)
 * 동기화 연결 뒤 한 번만 실행: inkMoved1 표시가 동기화되어 다른 기기에선 다시 하지 않음. 모든 기기에 적용된 뒤 이 파일은 지워도 됨
 */
(function () {
  const FLAG = "inkMoved1", PAD = 16, BAR = 30, GAP = 60, ICON = 46;
  const ORDER = { hl: 0, hlr: 0, mask: 1, maskr: 1, pen: 2 };
  const R1 = v => Math.round(v * 10) / 10, R5 = v => Math.round(v * 100000) / 100000;

  // 저장된 필기 항목(섹션 기준 0~1 비율) → 예전 섹션 크기 기준 px 획들. 줄 단위 형광·가림 상자는 굵은 가로 획으로
  function strokes(it, w, h) {
    if (it.pts) return [{ c: it.c, w: it.w, pts: it.pts.map(p => [p[0] * w, p[1] * h]) }];
    return (it.rects || []).map(r => {
      const x = r[0] * w, rw = r[2] * w, rh = r[3] * h, cy = r[1] * h + rh / 2, cap = Math.min(rh, rw) / 2;
      return { c: it.c, w: rh, pts: [[x + cap, cy], [x + rw - cap, cy]] };
    });
  }
  function box(ss) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    ss.forEach(s => s.pts.forEach(([x, y]) => { const r = s.w / 2; x0 = Math.min(x0, x - r); y0 = Math.min(y0, y - r); x1 = Math.max(x1, x + r); y1 = Math.max(y1, y + r); }));
    return { x0, y0, x1, y1 };
  }

  // 한 단원: 옮길 필기 → 세로로 가까운 것끼리 묶어 포스트잇 하나씩
  function toNotes(items, geo, z0) {
    const notes = [];
    const byA = {};
    items.forEach(it => (byA[it.a] = byA[it.a] || []).push(it));
    Object.entries(byA).forEach(([a, list]) => {
      const [w, oldH, newH] = geo[a];
      const parts = list.map(it => { const ss = strokes(it, w, oldH); return { k: it.k, ss, b: box(ss) }; }).filter(p => p.ss.length);
      parts.sort((p, q) => p.b.y0 - q.b.y0);
      const groups = [];
      parts.forEach(p => { const g = groups[groups.length - 1]; if (g && p.b.y0 <= g.y1 + GAP) { g.list.push(p); g.y1 = Math.max(g.y1, p.b.y1); } else groups.push({ list: [p], y1: p.b.y1 }); });
      groups.forEach(g => {
        const ss = g.list.slice().sort((p, q) => ORDER[p.k] - ORDER[q.k]).flatMap(p => p.ss); // 형광 → 가림 → 펜 순으로 쌓기
        const b = box(ss), ox = b.x0 - PAD, oy = b.y0 - PAD;
        notes.push({
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          a, x: R5(Math.max(0, Math.min(ox, w - ICON)) / w), y: R5(Math.max(0, Math.min(oy, newH - ICON)) / newH),
          w: Math.round(Math.max(180, b.x1 - b.x0 + 2 * PAD)), h: Math.round(Math.max(80, b.y1 - b.y0 + 2 * PAD + BAR)),
          text: "", op: 1, c: "#ffffff", z: z0 + notes.length + 1, mode: "ink", min: true,
          ink: ss.map(s => ({ c: s.c, w: R1(s.w), pts: s.pts.map(([x, y]) => [R1(x - ox), R1(y - oy)]) }))
        });
      });
    });
    return notes;
  }

  async function run() {
    if (Store.get(FLAG)) return;
    let G;
    try { G = await fetch("content/ink-move.json", { cache: "no-cache" }).then(r => r.json()); } catch (e) { return; }
    if (Store.get(FLAG)) return;
    let made = 0;
    Object.entries(G).forEach(([u, geo]) => {
      const items = Store.get("ink:" + u, []) || [];
      const move = items.filter(it => it && it.a && geo[it.a]);
      if (!move.length) return;
      const notes = (Store.get("notes:" + u, []) || []).slice();
      const add = toNotes(move, geo, notes.reduce((m, n) => Math.max(m, n.z || 1), 1));
      Store.set("inkBak1:" + u, items);
      Store.set("notes:" + u, notes.concat(add));
      Store.set("ink:" + u, items.filter(it => !move.includes(it)));
      made += add.length;
    });
    Store.set(FLAG, { at: Date.now(), notes: made });
    if (made) {
      window.dispatchEvent(new HashChangeEvent("hashchange")); // 지금 보는 단원을 새 기록으로 다시 그림
      if (window.App) App.toast(`어긋난 필기를 접힌 포스트잇 ${made}개로 옮겼어요`);
    }
  }
  window.InkMove = { toNotes }; // 확인용

  // 동기화가 연결되어 서버 기록을 받은 뒤에만 실행 (이 기기의 오래된 기록으로 덮지 않게)
  let n = 0;
  const t = setInterval(() => {
    if (window.Store && Store.mode() === "sync") { clearInterval(t); setTimeout(run, 1500); }
    else if (++n > 120) clearInterval(t);
  }, 500);
})();
