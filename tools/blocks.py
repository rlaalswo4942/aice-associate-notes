"""원고의 ```blocks 실습마다 모든 블록 조합을 실제 파이썬으로 실행해 결과(out)를 채운다.

사용: python tools/blocks.py          → content/textbook.md 의 out 갱신
      python tools/blocks.py --check  → out 이 지금 실행 결과와 같은지만 확인 (다르면 exit 1)
시험 환경과 같은 Python 3.10 · numpy 1.23.5 · pandas 1.5.3 으로 실행할 것 (출력 모양이 버전마다 다름).
형식은 js/blocks.js 머리말 참고. 에러는 "!" + (에러 전까지 출력) + 마지막 줄 "에러이름: 메시지".
"""
import contextlib, io, itertools, json, re, sys
from pathlib import Path

MD = Path(__file__).resolve().parent.parent / "content" / "textbook.md"
FENCE = re.compile(r"^```blocks\n(.*?)\n===\n(.*?)\n```$", re.S | re.M)  # 구분 줄 ===  (--- 는 엔진이 구분선으로 지움)


def run(code):
    buf = io.StringIO()
    try:
        with contextlib.redirect_stdout(buf):
            exec(compile(code, "<blocks>", "exec"), {"__name__": "__main__"})
        return buf.getvalue().rstrip("\n")
    except Exception as e:  # 에러도 학습 내용 → 결과로 보여 줌
        msg = e.msg if isinstance(e, SyntaxError) else str(e)
        before = buf.getvalue().rstrip("\n")
        return "!" + (before + "\n" if before else "") + f"{type(e).__name__}: {msg}"


def fill(m):
    src, spec = m.group(1), json.loads(m.group(2))
    names = list(dict.fromkeys(re.findall(r"__([A-Z])__", src)))
    vals = [[o[0] if isinstance(o, list) else o for o in spec[n]] for n in names]
    out = {}
    for combo in itertools.product(*vals):
        code = src
        for n, v in zip(names, combo):
            code = code.replace(f"__{n}__", v)
        out[json.dumps(list(combo), ensure_ascii=False, separators=(",", ":"))] = run(code)  # = JS JSON.stringify
    spec["out"] = out
    body = ",\n".join(f"{json.dumps(k, ensure_ascii=False)}: {json.dumps(v, ensure_ascii=False)}" for k, v in spec.items())
    return f"```blocks\n{src}\n===\n{{{body}}}\n```"


if __name__ == "__main__":
    text = MD.read_text(encoding="utf-8")
    new, n = FENCE.subn(fill, text)
    if "--check" in sys.argv:
        print(f"blocks {n}개", "OK" if new == text else "결과가 원고와 다름 → python tools/blocks.py")
        sys.exit(new != text)
    MD.write_text(new, encoding="utf-8", newline="\n")
    print(f"blocks {n}개 결과 갱신")
