/* 블록 끼우기 실습 + 기초 단원 바로가기 (이 사이트 전용 추가 기능 — 공용 엔진 아님)
 * 원고의 ```blocks 코드 블록 → 빈칸(__A__ __B__ …)을 고르고 블록을 누르면 미리 계산한 실행 결과를 보여 줌
 *   형식: 코드 / '===' 한 줄 (--- 는 엔진이 구분선으로 지움) / JSON {"A": ["블록", ["블록", "설명"], …], "out": {"[\"블록\"]": "출력"}}
 *   out 은 tools/blocks.py 가 실제 파이썬으로 실행해 채움 ("!"로 시작 = 에러, 마지막 줄이 에러 메시지)
 * 본문의 #u14.s05 같은 단원 내부 링크를 누르면 원래 자리를 기억해 '돌아가기' 버튼을 띄움
 */
(function () {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const W = new WeakMap(); // 위젯 상자 → 상태

  function upgrade(root) {
    root.querySelectorAll("pre > code.language-blocks").forEach(code => {
      const pre = code.parentElement, raw = code.textContent;
      const cut = raw.search(/^===\s*$/m);
      let spec;
      try { spec = JSON.parse(raw.slice(cut).replace(/^===\s*/, "")); } catch (e) { return; }
      const src = raw.slice(0, cut).replace(/\s+$/, "");
      const names = [...new Set(src.match(/__[A-Z]__/g) || [])].map(s => s[2]);
      const opts = {};
      names.forEach(n => (opts[n] = (spec[n] || []).map(o => Array.isArray(o) ? { v: o[0], why: o[1] || "" } : { v: o, why: "" })));
      const box = document.createElement("div");
      box.className = "bk";
      W.set(box, { src, names, opts, out: spec.out || {}, pick: {}, cur: names[0] });
      pre.replaceWith(box);
      draw(box);
    });
  }

  function draw(box) {
    const S = W.get(box);
    const done = S.names.every(n => n in S.pick);
    const label = v => v === "" ? "(비움)" : v;
    const code = esc(S.src).replace(/__([A-Z])__/g, (_, n) => {
      const has = n in S.pick;
      return `<button type="button" class="bk-slot${has ? " full" : ""}${S.cur === n ? " on" : ""}" data-slot="${n}">${has ? esc(label(S.pick[n])) : n}</button>`;
    });
    const list = S.cur ? S.opts[S.cur] : [];
    let h = `<div class="bk-head"><b>블록 실습</b><small>${S.names.length > 1 ? "빈칸을 골라 블록을 넣으세요" : "블록을 눌러 빈칸에 넣으세요"}</small><button type="button" class="bk-reset">다시</button></div>
      <pre class="bk-code">${code}</pre>
      <div class="bk-pal">${S.cur ? `<span>빈칸 ${S.cur}</span>` : ""}${list.map((o, i) => `<button type="button" class="bk-blk${S.pick[S.cur] === o.v ? " on" : ""}" data-i="${i}">${esc(label(o.v))}</button>`).join("")}</div>`;
    if (done) {
      const key = JSON.stringify(S.names.map(n => S.pick[n]));
      let out = S.out[key], err = "";
      if (out == null) out = "(이 조합은 결과가 준비되지 않았습니다)";
      else if (out[0] === "!") { const ls = out.slice(1).split("\n"); err = ls.pop(); out = ls.join("\n"); }
      const whys = S.names.map(n => S.opts[n].find(o => o.v === S.pick[n])).filter(o => o && o.why).map(o => `<li><code>${esc(label(o.v))}</code> ${esc(o.why)}</li>`).join("");
      h += `<div class="bk-out${err ? " bad" : ""}"><b>${err ? "실행 결과 · 에러" : "실행 결과"}</b><pre>${esc(out)}${err ? `${out ? "\n" : ""}<span class="bk-err">${esc(err)}</span>` : ""}${!out && !err ? "<span class=\"bk-none\">(출력 없음)</span>" : ""}</pre>${whys ? `<ul>${whys}</ul>` : ""}</div>`;
    } else h += `<div class="bk-out wait">빈칸을 모두 채우면 실행 결과가 나옵니다.</div>`;
    box.innerHTML = h;
  }

  document.addEventListener("click", e => {
    const box = e.target.closest && e.target.closest(".bk");
    if (box && W.has(box)) {
      const S = W.get(box);
      const slot = e.target.closest(".bk-slot"), blk = e.target.closest(".bk-blk");
      if (slot) S.cur = slot.dataset.slot;
      else if (blk && S.cur) {
        S.pick[S.cur] = S.opts[S.cur][+blk.dataset.i].v;
        S.cur = S.names.find(n => !(n in S.pick)) || S.cur; // 빈 칸이 남았으면 다음 칸으로
      } else if (e.target.closest(".bk-reset")) { S.pick = {}; S.cur = S.names[0]; }
      else return;
      e.stopPropagation();
      draw(box);
      return;
    }
    // 본문 안의 단원 내부 링크(#u14.s05 등): 지금 섹션을 기록해 두고 이동 → '돌아가기'로 복귀
    const a = e.target.closest && e.target.closest(".notes a[href^='#u']");
    if (!a) return;
    const sec = a.closest("section.sec"), here = location.hash.replace(/^#/, "").split(".")[0];
    const back = here + (sec ? "." + sec.dataset.sec : "");
    const title = (document.querySelector("#crumb") || {}).firstChild;
    try { sessionStorage.setItem("bk-back", JSON.stringify({ to: a.getAttribute("href").slice(1).split(".")[0], back, t: (title && title.textContent || here) + (sec ? " · " + sec.querySelector("h3").textContent : "") })); } catch (_) {}
  }, true);

  // 돌아가기 버튼: 링크로 온 단원을 보는 동안만 표시
  const btn = document.createElement("button");
  btn.id = "bk-back"; btn.type = "button"; btn.hidden = true;
  document.body.append(btn);
  const backInfo = () => { try { return JSON.parse(sessionStorage.getItem("bk-back") || "null"); } catch (_) { return null; } };
  btn.addEventListener("click", () => { const b = backInfo(); try { sessionStorage.removeItem("bk-back"); } catch (_) {} btn.hidden = true; if (b) location.hash = "#" + b.back; });
  function syncBack() {
    const b = backInfo(), cur = location.hash.replace(/^#/, "").split(".")[0];
    btn.hidden = !(b && b.to === cur && b.back.split(".")[0] !== cur);
    if (!btn.hidden) btn.textContent = "‹ 돌아가기 — " + b.t;
  }
  window.addEventListener("hashchange", syncBack);

  const main = document.getElementById("main");
  new MutationObserver(() => { upgrade(main); syncBack(); }).observe(main, { childList: true, subtree: true });
})();
