# AICE Associate 학습노트

> 원자료: 「AICE Associate 자격증 취득을 위한 종합 학습사이트 구축 및 지속적 업데이트 파이프라인 설계 보고서」(기준일 2026-10-26). 보고서의 시험 기준·커리큘럼·예상문제·모의고사를 학습용 교재로 옮기고, 각 개념에 설명과 실행 가능한 예제 코드를 붙였습니다.

---

# 시작하기: 이 교재 사용법

## 이 교재의 목적

AICE Associate는 **Python으로 데이터를 읽고 → 전처리하고 → 모델을 만들고 → 평가하는 과정을 직접 코딩하는 90분 실습형 시험**입니다. 이론 암기보다 손이 먼저 움직여야 합니다.

이 교재는 다음 흐름 하나를 끝까지 반복하도록 짜여 있습니다.

```text
read_csv → head/shape/info/describe → isna().sum() → value_counts
→ 조건 필터링 → groupby → merge → 결측 처리 → 이상치 처리
→ 범주형 encoding → X/y 분리 → train/test split → scaling
→ 모델 생성 → fit → predict → 평가 → 모델 비교
```

[교육용 설명] 위 흐름이 **키보드를 보지 않아도 이어질 정도**가 되면 합격권입니다. 각 단원은 이 흐름의 한 구간을 맡습니다.

## 라벨 읽는 법

| 라벨 | 뜻 |
|---|---|
| [공식공지] | AICE·PQI 공식 자료로 확인된 시험 사실 |
| [기술근거] | NumPy·pandas·scikit-learn·TensorFlow 공식 문서 기준 |
| [교육용 설명] | 이해를 돕기 위해 풀어 쓴 설명 (시험 공식 내용 아님) |
| [가상자료] | 연습용으로 만든 합성 데이터·가상 사례 |

`[S01]` 같은 표시는 출처 링크입니다. 시험 정보는 바뀔 수 있으니 응시 전에 반드시 공식 사이트에서 다시 확인하세요.

## 공부 순서와 시간

| 수준 | 권장 학습량 | 방법 |
|---|---|---|
| 초보자 | 70~90시간 | U01부터 순서대로 |
| Python 경험자 | 35~50시간 | U02~U05는 연습문제로 진단 후 틀린 단원만 |

각 강의는 `개념 10분 → 최소 코드 예제 10분 → 따라 하기 실습 20분 → 혼자 실습 20분 → 채점 5분 → 오답 복습 5분` 순서를 권장합니다.

[교육용 설명] 이 사이트의 예제 코드는 브라우저에서 실행되지 않습니다. **Jupyter Notebook이나 Google Colab에 직접 옮겨 쳐서 실행**해 보세요. 복사·붙여넣기보다 직접 타이핑하는 쪽이 시험에 훨씬 도움이 됩니다.

## 전체 지도

| 순서 | 단원 | 첫 목표 | 난이도 |
|---|---|---|---|
| 1 | U01 시험·환경 오리엔테이션 | 시험 구조와 허용 문서 7개 외우기 | 시작 · 2h |
| 2 | U02 AI·ML 기초 | 회귀/분류와 학습 흐름 구분 | 기초 · 3h |
| 3 | U03 Python 핵심 | 데이터 처리용 문법을 막힘없이 | 기초 · 7h |
| 4 | U04 NumPy | 배열·axis·조건 선택 | 기초 · 5h |
| 5 | U05 pandas | DataFrame 읽기·선택·집계·결합 | 핵심 · 10h |
| 6 | U06 EDA·통계·시각화 | 데이터 품질과 분포 판단 | 핵심 · 7h |
| 7 | U07 데이터 전처리 | 결측·이상치·encoding·scaling | 최우선 · 10h |
| 8 | U08 머신러닝 모델링 | 회귀·분류 모델 fit/predict | 최우선 · 10h |
| 9 | U09 딥러닝 | Keras Sequential DNN 구축 | 응용 · 6h |
| 10 | U10 성능평가·개선 | 문제에 맞는 metric 선택 | 최우선 · 6h |
| 11 | U11 통합 Case Study | 처음부터 끝까지 한 번에 | 실전 · 6h |
| 12 | U12 시험 시뮬레이션·학습 계획 | 90분 시간관리와 준비도 판단 | 실전 · 9h+ |
| 13 | U13 AI 윤리·개인정보 (보조) | 책임 있는 데이터 사용 | 보조 · 2h |

---

# U01. 시험·환경 오리엔테이션

### 오늘의 목표

- AICE Associate가 어떤 시험인지(주관·형식·시간) 설명할 수 있다.
- 시험 중 참조할 수 있는 공식 문서 7개를 말할 수 있다.
- 시험 중 금지되는 것(검색·ChatGPT·개인 메모·듀얼 모니터)을 안다.
- 확정된 정보와 검증이 필요한 정보를 구분한다.
- 다음 응시 가능 회차 일정을 안다.

### AICE와 Associate 등급

[공식공지] AICE는 KT가 개발하고 한국경제신문과 함께 주관하는 AI 역량 평가 체계입니다. 민간자격정보서비스(PQI)상 등록번호는 **2022-004642**, 발급기관은 KT, 공동발급기관은 한국경제신문입니다. [S03]

[공식공지] Associate 등급은 PQI에서 **공인 민간자격**으로 표시되며, 직무 내용은 *프로그래밍 언어를 이용한 데이터 분석, AI 모델링·성능평가 및 실제 데이터를 분석·가공해 AI 모델을 개발하는 역량*으로 정의됩니다. 담당 부처는 과학기술정보통신부입니다. [S03]

[교육용 설명] "국가공인 민간자격"과 정부가 직접 만들고 관리하는 "국가자격"은 다릅니다. 이력서에 적을 때 헷갈리지 마세요.

[공식공지] Associate는 Basic을 먼저 따야 응시할 수 있는 단계형 시험이 아닙니다. **각 등급을 독립적으로 응시**할 수 있습니다. [S02]

### 시험 형식: 확정값과 검증 필요값

자격시험 정보에서 가장 위험한 실수는 예전 정보를 지금 사실처럼 믿는 것입니다. 그래서 정보를 증거 등급으로 나눠 봅니다.

| 정보 | 현재 판단 | 증거등급 |
|---|---|---:|
| 개발·주관 | KT 개발, 한국경제신문 공동 주관 | A |
| PQI 등록번호 | 2022-004642 | A |
| Associate 공인 상태 | PQI에 "공인" 표시 | A |
| 담당 부처 | 과학기술정보통신부 | A |
| 시험시간 | 90분 | A |
| 응시형태 | Python 기반 실습형 | A/B |
| 문제 수 | 14문항 (현행 자료 다수 일치) | B |
| 합격점 | 80점 이상 (현행 자료 다수 일치) | B |
| Open Book | 가능 | A |
| 허용 참조자료 | 지정 7개 공식 문서 | A |
| ChatGPT 사용 | 시험 중 금지 | A |
| 듀얼모니터 | 금지 | A |
| Jupyter 기반 환경 | 다수 준비자료가 안내 | B |
| 응시료·유효기간 | 8만원·3년으로 안내되는 경우가 많음 | B |
| Python/라이브러리 버전 | 일부 준비기관이 Python 3.10.13 등 안내 | C |

- **A**: 공식 1차 자료에서 직접 확인
- **B**: 여러 최신 자료가 일치하지만 공식 동적 페이지 원문을 직접 확보하지 못한 항목
- **C**: 교육업체 등의 현행 환경 보고

[공식공지] 시험시간 90분은 2026년 공식 시험 일정에서 직접 확인됩니다. 14문항·80점 기준은 B등급이므로 응시 전 공식 시험 안내에서 다시 확인하세요. [S01] [S02]

### Open Book이지만 허용 문서는 7개뿐

[공식공지] Associate는 Open Book이지만, 시험 화면에서 제공되는 **7개 공식 문서 사이트만** 참조할 수 있습니다. [S01]

| 분야 | 시험 중 참조 가능한 문서 |
|---|---|
| 배열·수치처리 | NumPy Reference [S04] |
| 표 데이터 | pandas Reference [S05] |
| 기본 시각화 | Matplotlib Gallery [S08] |
| 통계 시각화 | Seaborn API [S09] |
| 머신러닝 | scikit-learn API [S10] |
| 딥러닝 | TensorFlow Python API [S15] |
| 부스팅 | XGBoost scikit-learn wrapper [S18] |

**금지:** ChatGPT 등 생성형 AI, 검색엔진(구글 등), 개인 메모(노션 포함), 도서, SNS, 메신저, **듀얼 모니터**.

[교육용 설명] 이 목록은 단순한 참고자료 안내가 아니라 **시험 전략 그 자체**입니다. `train_test_split`의 인자 이름이 생각나지 않아도 scikit-learn 문서에서 10초 안에 찾아 쓸 수 있으면 됩니다. 공부할 때부터 블로그 대신 이 7개 문서만 보는 습관을 들이세요.

[기술근거] scikit-learn 문서에서 `train_test_split`은 `test_size`, `random_state`, `shuffle`, `stratify` 인자를 제공하고, `StandardScaler`는 학습 데이터의 평균과 분산을 학습(fit)한 뒤 그 값으로 변환(transform)합니다. [S11] [S12]

### 2026년 일정과 난이도

[공식공지] 2026년 공식 일정 기준 (기준일 2026-10-26) [S01]

| 회차 | 접수 | 시험 | 결과 발표 |
|---|---|---|---|
| 제5회 | 10월 23일 **마감** | 10월 30~31일 | — |
| **제6회** | **11월 23일 ~ 12월 11일** | **12월 18~19일** | 2027년 1월 2일 |

지금 새로 접수할 수 있는 다음 정기 회차는 **제6회**입니다. 약 7~8주를 준비할 수 있으므로 `Python/pandas 2주 → EDA/전처리 2주 → ML/DL 2주 → 실전 모의 1~2주`가 가장 현실적인 배분입니다.

[공식공지] PQI 실적 통계에서 Associate 취득률은 응시자 기준 2024년 약 **18.99%**, 2025년 약 **33.29%**입니다. [S03]

[교육용 설명] 응시자 구성이 해마다 달라 이 숫자를 개인 합격 확률로 읽으면 안 됩니다. 다만 강의만 듣고 붙기는 어렵고 **반복 코딩과 시간 제한 모의훈련이 필요한 시험**이라는 근거로는 충분합니다.

### 시험 환경과 라이브러리 버전

일부 2026년 준비자료는 시험 환경을 다음처럼 안내합니다. **공식 페이지에서 직접 확인된 값이 아니므로 참고용(provisional)** 으로만 보세요.

```yaml
exam_runtime:
  grade: associate
  verified_at: "2026-10-26"
  status: provisional
  python: "3.10.13"
  packages:
    numpy: "1.23.5"
    pandas: "1.5.3"
    scikit_learn: "1.3.2"
    tensorflow: "2.13.1"
  evidence_level: secondary
  require_reverification: true
```

[교육용 설명] 허용 NumPy 문서는 2.2 Reference를 가리키는데, 실제 실행 환경은 1.23일 수 있습니다. **"문서 버전"과 "실행 환경 버전"이 다를 수 있다**는 점을 기억하세요. 버전 차이로 인자 이름이 다르면 에러가 나므로, 에러 메시지를 읽고 문서의 signature를 확인하는 연습이 필요합니다.

[교육용 설명] 접수 후 제공되는 **사전 환경점검**과 공식 **샘플 문항**은 꼭 해 보세요. 실제 감독·시험 화면에 미리 익숙해질 수 있습니다. [S01]

### 이해 확인

**Q1. 시험 중 구글 검색을 할 수 있나요?**

<details><summary>정답 보기</summary>

불가능합니다. 지정된 7개 공식 문서만 볼 수 있습니다.

</details>

**Q2. 허용 문서 7개를 모두 말해 보세요.**

<details><summary>정답 보기</summary>

NumPy, pandas, Matplotlib, Seaborn, scikit-learn, TensorFlow, XGBoost(scikit-learn wrapper)

</details>

**Q3. Basic을 먼저 따야 Associate에 응시할 수 있나요?**

<details><summary>정답 보기</summary>

아닙니다. 등급마다 독립적으로 응시할 수 있습니다.

</details>

---

# U02. AI·ML 기초

### 오늘의 목표

- AI ⊃ 머신러닝 ⊃ 딥러닝 관계를 그림으로 설명할 수 있다.
- 지도학습과 비지도학습, 회귀와 분류를 구분한다.
- Feature(X)와 Target(y)을 데이터에서 골라낼 수 있다.
- 학습·검증·테스트 데이터의 역할을 안다.
- 과적합과 과소적합을 구분한다.

### AI, 머신러닝, 딥러닝

```text
AI (사람처럼 판단하는 시스템 전체)
 └─ Machine Learning (데이터에서 규칙을 스스로 학습)
     └─ Deep Learning (여러 층의 신경망으로 학습)
```

[교육용 설명] 전통적인 프로그램은 사람이 규칙을 직접 짭니다("요금이 8만원 넘고 통화가 적으면 이탈 위험"). 머신러닝은 **데이터와 정답을 주면 규칙을 스스로 찾습니다.** 딥러닝은 그 규칙을 여러 층의 신경망으로 찾는 머신러닝의 한 갈래입니다.

[공식공지] AICE 공식 학습과정도 AI 이해 과정에서 시작해 Python·pandas·전처리·AI 모델링으로 이어집니다. [S01]

### 지도학습과 비지도학습

| 구분 | 정답(label) | 대표 과제 | 예 |
|---|---|---|---|
| 지도학습 | 있음 | 회귀, 분류 | 집값 예측, 이탈 여부 예측 |
| 비지도학습 | 없음 | 군집, 차원축소 | 고객 세분화 |

[교육용 설명] AICE Associate 실습은 대부분 **지도학습**(회귀·분류)입니다. 데이터에 맞혀야 할 열(target)이 주어지고, 나머지 열로 그것을 예측합니다.

### 회귀와 분류

| | 회귀 (Regression) | 분류 (Classification) |
|---|---|---|
| 예측 대상 | 연속값 (숫자) | 클래스 (범주) |
| 예 | 집값, 미세먼지 농도, 에너지 사용량 | 이탈 여부(0/1), 질병 유무, 구매 여부 |
| 대표 모델 | LinearRegression, RandomForestRegressor | LogisticRegression, RandomForestClassifier |
| 평가 지표 | MAE, MSE, RMSE, R² | Accuracy, Precision, Recall, F1 |

[교육용 설명] 문제를 받으면 **target 열이 숫자인지 범주인지**부터 봅니다. 이 판단 하나로 모델·평가 지표·딥러닝 출력층이 모두 정해집니다. 0/1로 적혀 있어도 "이탈했다/안 했다"라면 분류입니다.

### Feature와 Target

```python
X = df.drop(columns="churn")  # Feature: 예측에 쓰는 열들
y = df["churn"]               # Target: 맞혀야 할 열
```

- **Feature(특성, X)**: 모델의 입력. 나이, 요금, 가입 기간 등
- **Target(타깃, y)**: 모델이 맞혀야 할 값. 이탈 여부, 가격 등

[교육용 설명] target은 반드시 X에서 빼야 합니다. X에 정답이 섞여 있으면 모델이 정답을 그대로 베껴 성능이 비정상적으로 높게 나옵니다(데이터 누수).

### 학습·검증·테스트와 일반화

| 데이터 | 역할 | 비유 |
|---|---|---|
| Train | 모델이 규칙을 학습 | 교과서·문제집 |
| Validation | 설정(하이퍼파라미터)을 고르고 학습을 점검 | 모의고사 |
| Test | 마지막에 딱 한 번 실력을 측정 | 실제 시험 |

[교육용 설명] 모델의 목표는 처음 보는 데이터에서도 잘 맞히는 것, 즉 **일반화**입니다. 테스트 데이터를 보고 계속 설정을 고치면 테스트에 맞춰진 모델이 되어 진짜 실력을 알 수 없게 됩니다.

### 과적합과 과소적합

| | 과소적합 (Underfitting) | 적절 | 과적합 (Overfitting) |
|---|---|---|---|
| Train 성능 | 낮음 | 높음 | 매우 높음 |
| Test 성능 | 낮음 | 높음 | 낮음 |
| 원인 | 모델이 너무 단순·학습 부족 | — | 모델이 너무 복잡·train을 외움 |
| 대응 | 더 복잡한 모델, feature 추가 | — | 규제, 데이터 추가, EarlyStopping, 트리 깊이 제한 |

[교육용 설명] 과적합은 문제집 답을 통째로 외워서 문제집 점수는 100점인데 실제 시험은 망치는 상태입니다.

**Feature Engineering**은 원래 열로 새 특성을 만드는 일입니다. 예를 들어 날짜에서 월을 꺼내거나, 총요금 ÷ 가입 기간으로 월평균 요금을 만듭니다.

### 이해 확인

**Q1. 다음 달 전력 사용량(kWh)을 예측하는 문제는 회귀인가 분류인가?**

<details><summary>정답 보기</summary>

회귀. 연속된 숫자를 예측합니다.

</details>

**Q2. train 정확도 99%, test 정확도 62%. 어떤 상태인가?**

<details><summary>정답 보기</summary>

과적합. train에만 지나치게 맞춰졌습니다.

</details>

---

# U03. Python 핵심

### 오늘의 목표

- list·dict에서 원하는 값을 꺼낼 수 있다.
- 조건문·반복문·리스트 컴프리헨션을 쓴다.
- 함수를 정의하고 lambda를 언제 쓰는지 안다.
- try/except로 에러를 처리한다.
- 시험 데이터 처리에 필요한 범위만 골라 익힌다.

### 시험에 필요한 Python만

[교육용 설명] Python 전체를 깊게 공부할 필요는 없습니다. **pandas를 쓰다가 막히지 않을 만큼**이면 됩니다. 클래스 상속이나 데코레이터보다 인덱싱·조건·반복·함수가 훨씬 중요합니다.

### 변수, list, dict

```python
scores = [10, 20, 30]
print(scores[0])     # 10  첫 원소
print(scores[-1])    # 30  마지막 원소
print(scores[0:2])   # [10, 20]  0 이상 2 미만
print(len(scores))   # 3

person = {"name": "kim", "age": 30}
print(person["age"])        # 30
person["city"] = "jeonju"   # 키 추가
print(person.keys())
print(person.get("phone", "없음"))  # 없는 키를 안전하게
```

| 표현 | 결과 | 핵심 |
|---|---|---|
| `x[-1]` | 마지막 원소 | 음수 인덱스는 뒤에서부터 |
| `x[1:3]` | 1, 2번 원소 | 끝 번호는 포함하지 않음 |
| `len(x)` | 길이 | 문자열·리스트·dict 모두 |
| `d["age"]` | 값 | 없는 키면 KeyError |
| `d.get("age")` | 값 또는 None | 없어도 에러 없음 |

### 조건과 반복

```python
age = 35
if age >= 30 and age < 40:
    print("30대")
elif age >= 40:
    print("40대 이상")
else:
    print("30 미만")

for i in range(5):        # 0, 1, 2, 3, 4
    print(i, end=" ")
print()

for k, v in {"a": 1, "b": 2}.items():
    print(k, v)
```

- 비교: `==` `!=` `>` `>=` `<` `<=`
- 논리: `and` `or` `not` (Python 기본 문법)
- `range(5)`는 **0부터 4까지** 5개

[교육용 설명] pandas 조건 필터링에서는 `and`/`or` 대신 `&`/`|`를 쓰고 각 조건을 괄호로 감쌉니다. U05에서 다시 나옵니다. 헷갈리기 쉬운 부분입니다.

### 리스트 컴프리헨션

```python
doubled = [x * 2 for x in range(3)]          # [0, 2, 4]
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
names = ["a", "b"]
upper = [n.upper() for n in names]            # ['A', 'B']
print(doubled, evens, upper)
```

[교육용 설명] `for` 반복문 세 줄을 한 줄로 줄인 표현입니다. 열 이름 목록을 만들 때 자주 씁니다.

```python
cols = ["age", "fee", "contract_month", "contract_year"]
contract_cols = [c for c in cols if c.startswith("contract")]
print(contract_cols)  # ['contract_month', 'contract_year']
```

### 함수와 lambda

```python
def bmi(weight, height_cm):
    h = height_cm / 100
    return weight / (h ** 2)

print(round(bmi(70, 175), 1))  # 22.9

square = lambda x: x ** 2      # 간단한 익명 함수
print(square(4))               # 16
```

[교육용 설명] `lambda`는 이름 없이 한 줄로 쓰는 간단한 함수입니다. pandas에서 `df["col"].apply(lambda x: ...)`처럼 다른 함수에 넘길 때 주로 씁니다.

### 예외 처리

```python
def safe_div(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None

print(safe_div(10, 2), safe_div(1, 0))  # 5.0 None
```

[교육용 설명] 시험에서는 예외 처리를 직접 쓰는 일보다 **에러 메시지를 읽는 능력**이 더 중요합니다. `KeyError: 'Age'`는 열 이름이 틀렸다는 뜻이고(대소문자 확인), `ValueError: could not convert string to float`는 문자열 열이 모델에 들어갔다는 뜻(encoding 필요)입니다.

### 이해 확인

**Q1. `[x*2 for x in range(3)]`의 결과는?**

<details><summary>정답 보기</summary>

`[0, 2, 4]`

</details>

**Q2. dict `d`에서 `age` 값을 꺼내는 표현은?**

<details><summary>정답 보기</summary>

`d["age"]` (없을 수도 있으면 `d.get("age")`)

</details>

---

# U04. NumPy

### 오늘의 목표

- ndarray를 만들고 shape·ndim·dtype을 확인한다.
- axis=0과 axis=1 집계의 차이를 설명할 수 있다.
- boolean indexing으로 조건에 맞는 값만 꺼낸다.
- 평균·표준편차·최댓값 등 집계 함수를 쓴다.
- NaN이 섞인 배열과 난수 재현성을 다룬다.

### ndarray와 shape

```python
import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6]])
print(a.shape)   # (2, 3)  2행 3열
print(a.ndim)    # 2  차원 수
print(a.dtype)   # int64 (환경에 따라 int32)
print(a.reshape(3, 2))
print(a.flatten())  # [1 2 3 4 5 6]  1차원으로
```

[기술근거] NumPy의 기본 자료형은 같은 타입의 값을 담는 다차원 배열 `ndarray`입니다. `np`라는 별칭으로 불러오는 것이 관례입니다. [S04]

[교육용 설명] `flatten()`은 복사본을, `ravel()`은 가능하면 원본을 공유하는 1차원 배열을 돌려줍니다. 시험에서는 둘 다 "1차원으로 펴기"로 기억하면 충분합니다.

### axis 이해하기

```python
a = np.array([[1, 2, 3],
              [4, 5, 6]])
print(a.sum())          # 21  전체
print(a.sum(axis=0))    # [5 7 9]  행 방향(위→아래)으로 접어서 → 열별 결과
print(a.sum(axis=1))    # [ 6 15]  열 방향(왼→오)으로 접어서 → 행별 결과
```

[교육용 설명] `axis=0`은 **행축을 따라 접는다**(세로로 눌러 납작하게) → 결과는 **열마다 하나**. `axis=1`은 가로로 눌러 → **행마다 하나**. pandas의 `df.mean(axis=0)`(열별 평균)과 `df.drop(columns=...)`/`axis=1`(열 삭제)도 같은 원리입니다.

### Boolean indexing

```python
a = np.array([5, 12, 8, 20, 15])
mask = a > 10
print(mask)           # [False  True False  True  True]
print(a[mask])        # [12 20 15]
print(a[(a > 6) & (a < 16)])  # [12  8 15]
print((a > 10).sum())          # 3  조건을 만족하는 개수
```

[교육용 설명] True/False 배열을 인덱스로 넣으면 True 자리만 남습니다. pandas 조건 필터링 `df[df["age"] >= 30]`도 똑같은 원리입니다. True는 1로 계산되므로 `.sum()`으로 개수를 셀 수 있습니다.

### 집계 함수

```python
x = np.array([3, 7, 1, 9, 5])
print(np.mean(x), np.median(x))   # 5.0 5.0
print(np.std(x))                  # 표준편차 (모집단 기준, ddof=0)
print(np.max(x), np.min(x))       # 9 1
print(np.argmax(x))               # 3  최댓값의 위치
print(np.percentile(x, [25, 75])) # 1사분위·3사분위
```

[기술근거] `np.std`의 기본값은 `ddof=0`(모집단 표준편차)이고, pandas의 `Series.std()` 기본값은 `ddof=1`(표본 표준편차)입니다. 같은 데이터라도 값이 조금 다르게 나올 수 있습니다. [S04] [S05]

### NaN과 난수 재현성

```python
x = np.array([1.0, np.nan, 3.0])
print(np.mean(x))      # nan  NaN이 하나라도 있으면 nan
print(np.nanmean(x))   # 2.0  NaN을 빼고 평균

rng = np.random.default_rng(42)   # seed 고정
print(rng.integers(0, 10, 5))     # 실행할 때마다 같은 값
```

[교육용 설명] seed(`42` 같은 숫자)를 고정하면 무작위 결과가 매번 같아져 **실험을 재현**할 수 있습니다. scikit-learn의 `random_state`, TensorFlow의 `tf.random.set_seed`도 같은 목적입니다.

### 이해 확인

**Q1. shape (2, 3) 배열에 `sum(axis=0)`을 하면 결과 길이는?**

<details><summary>정답 보기</summary>

3. 열마다 하나씩 나옵니다.

</details>

**Q2. NaN이 섞인 배열의 평균을 NaN 없이 구하는 함수는?**

<details><summary>정답 보기</summary>

`np.nanmean()`

</details>

---

# U05. pandas

### 오늘의 목표

- CSV를 읽고 head·shape·info·describe로 구조를 확인한다.
- 열 선택, loc/iloc, 조건 필터링을 정확히 쓴다.
- value_counts·groupby로 범주별 빈도와 통계를 구한다.
- merge와 concat의 차이를 알고 쓴다.
- sort_values·apply·중복 확인을 쓴다.

### 실습 데이터 만들기

[가상자료] 이 교재의 실습은 통신사 고객 이탈(churn) 합성 데이터를 씁니다. 아래 코드를 한 번 실행하면 `telecom_churn.csv`가 생깁니다. 파일로 바로 받으려면 [telecom_churn.csv](data/telecom_churn.csv).

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
n = 3000

df = pd.DataFrame({
    "age": rng.integers(18, 80, n),
    "monthly_fee": rng.normal(65000, 18000, n).clip(10000, 150000),
    "tenure_months": rng.integers(1, 120, n),
    "support_calls": rng.poisson(2.0, n),
    "contract": rng.choice(["month", "one_year", "two_year"], n),
    "payment": rng.choice(["card", "bank", "mobile"], n),
})

logit = (
    -0.8
    + 1.5 * (df["contract"] == "month").astype(int)
    + 0.45 * df["support_calls"]
    - 0.03 * df["tenure_months"]
)

prob = 1 / (1 + np.exp(-logit))
df["churn"] = rng.binomial(1, prob)

missing_idx = rng.choice(df.index, size=120, replace=False)  # 학습용 결측치 120개
df.loc[missing_idx, "monthly_fee"] = np.nan

df.to_csv("telecom_churn.csv", index=False)
```

[교육용 설명] 원자료 보고서의 생성 코드에서 계수만 키워(이탈률 약 29%) 모델이 패턴을 배울 수 있게 했습니다. 공식 교재·기출 데이터를 복제하지 않고, 공식 과정의 통신 이탈 사례와 **업무 구조만 비슷하게** 만든 연습용 데이터입니다.

### 읽고 구조 확인하기

```python
import pandas as pd

df = pd.read_csv("telecom_churn.csv")

print(df.shape)        # (3000, 7)  행, 열
print(df.head())       # 처음 5행 (tail()은 마지막 5행)
df.info()              # 열별 dtype, non-null 개수
print(df.describe())   # 수치형 기술통계
print(df.describe(include="all"))  # 범주형까지
print(df.columns.tolist())
print(df.dtypes)
```

| 코드 | 알 수 있는 것 |
|---|---|
| `df.shape` | 행·열 개수 (괄호 없음 — 속성) |
| `df.head()` | 처음 5행 미리보기 |
| `df.info()` | dtype, non-null 개수 → 결측 여부 |
| `df.describe()` | count·mean·std·min·사분위·max |
| `df.dtypes` | 열별 자료형 |

[교육용 설명] `info()`에서 `monthly_fee`의 non-null이 2880이면 3000 − 2880 = **120개가 결측**입니다. `object` dtype은 문자열(범주형)이라는 신호입니다(pandas 3.0부터는 `str`로 표시).

### 열 선택과 loc / iloc

```python
df["age"]                     # 열 하나 → Series
df[["age", "monthly_fee"]]    # 여러 열 → DataFrame (대괄호 두 겹)

df.loc[0, "age"]              # label 기반: 인덱스 0, 열 'age'
df.loc[0:4, ["age", "churn"]] # label 슬라이스는 끝(4) 포함
df.iloc[0, 0]                 # 위치 기반: 0행 0열
df.iloc[0:5, 0:2]             # 위치 슬라이스는 끝(5) 미포함
```

| | `loc` | `iloc` |
|---|---|---|
| 기준 | label (인덱스 이름·열 이름) | integer position (0부터 번호) |
| 슬라이스 끝 | **포함** | **미포함** |
| 조건 필터 | `df.loc[df["age"] >= 30, "fee"]` 가능 | boolean 배열만 |

### 조건 필터링

```python
df[df["age"] >= 30]
df.loc[df["age"] >= 30]                   # 같은 결과
df.query("age >= 30")                     # 같은 결과

df[(df["age"] >= 30) & (df["contract"] == "month")]   # AND
df[(df["support_calls"] >= 5) | (df["churn"] == 1)]   # OR
df[~(df["payment"] == "card")]                        # NOT
df[df["contract"].isin(["one_year", "two_year"])]
```

[교육용 설명] pandas 조건 결합은 **`&` `|` `~`** 를 쓰고 조건마다 **괄호**를 꼭 씁니다. `and`를 쓰면 `ValueError: The truth value of a Series is ambiguous` 에러가 납니다. `df.loc[df.age >= 30]`와 `df.query("age >= 30")`처럼 표현이 달라도 결과가 같으면 모두 정답입니다.

### value_counts와 groupby

```python
df["contract"].value_counts()                  # 범주별 개수
df["churn"].value_counts(normalize=True)       # 비율 (합이 1)

df.groupby("contract")["monthly_fee"].mean()   # 계약별 평균 요금
df.groupby("contract")["churn"].mean()         # 계약별 이탈률 (0/1 평균 = 비율)
df.groupby(["contract", "payment"])["churn"].agg(["mean", "count"])
df.groupby("contract").agg(fee=("monthly_fee", "mean"), n=("churn", "size"))
```

[기술근거] `groupby`는 데이터를 그룹으로 나누고(split) → 각 그룹에 함수를 적용하고(apply) → 결과를 합칩니다(combine). [S22]

[교육용 설명] 0/1로 된 열의 평균은 **1의 비율**입니다. "계약 형태별 이탈률"은 `groupby("contract")["churn"].mean()` 한 줄입니다.

### merge와 concat

```python
plans = pd.DataFrame({
    "contract": ["month", "one_year", "two_year"],
    "discount": [0, 5, 10],
})
merged = pd.merge(df, plans, on="contract", how="left")   # key 기반 결합
print(merged.shape)

a = df.head(3)
b = df.tail(3)
stacked = pd.concat([a, b], axis=0)            # 위아래로 이어 붙이기
side = pd.concat([a[["age"]], a[["churn"]]], axis=1)  # 옆으로 붙이기
```

| | `merge` | `concat` |
|---|---|---|
| 방식 | **key 열**을 기준으로 맞춰 결합 (SQL JOIN) | **축**을 따라 그대로 이어 붙임 |
| 주요 인자 | `on`, `how`(inner·left·right·outer) | `axis=0`(아래로), `axis=1`(옆으로) |

### 정렬, apply, 중복

```python
df.sort_values("monthly_fee")                    # 오름차순
df.sort_values("monthly_fee", ascending=False)   # 내림차순
df.sort_values(["contract", "age"])
df.nlargest(5, "monthly_fee")                    # 상위 5개

df["fee_10k"] = df["monthly_fee"] / 10000
df["senior"] = df["age"].apply(lambda x: 1 if x >= 65 else 0)
df = df.rename(columns={"fee_10k": "fee_man"})

print(df.duplicated().sum())    # 중복 행 개수
df = df.drop_duplicates()
df = df.drop(columns=["fee_man", "senior"])   # 열 삭제
```

### 이해 확인

**Q1. `df.loc[0:4]`와 `df.iloc[0:4]`는 각각 몇 행인가? (기본 정수 인덱스)**

<details><summary>정답 보기</summary>

`loc`는 끝을 포함해 5행(0~4), `iloc`는 끝을 빼고 4행(0~3).

</details>

**Q2. 계약 형태별 평균 요금을 구하는 한 줄은?**

<details><summary>정답 보기</summary>

`df.groupby("contract")["monthly_fee"].mean()`

</details>

---

# U06. EDA·통계·시각화

### 오늘의 목표

- 평균·중앙값·분산·표준편차·사분위수의 의미를 설명한다.
- 결측률과 클래스 비율로 데이터 품질을 판단한다.
- 상관계수 행렬을 구하고 해석한다.
- 히스토그램·박스플롯·산점도를 언제 쓰는지 안다.
- 왜도(치우침)와 IQR 이상치를 연결한다.

### 통계는 해석 도구로

[교육용 설명] 이 시험의 통계는 증명하는 수학이 아니라 **데이터를 읽는 도구**입니다. 다음 세 질문에 답할 수 있으면 됩니다.

1. 왜 평균 대신 **중앙값**으로 결측치를 채울 때가 있는가? → 극단값 영향을 덜 받기 때문
2. 불균형 데이터에서 **Accuracy**가 왜 착각을 일으키는가? → U10
3. StandardScaler를 test 데이터에 다시 fit하면 왜 안 되는가? → U07

### 기술통계 읽기

| 통계량 | 뜻 | pandas |
|---|---|---|
| 평균 | 합 ÷ 개수, 극단값에 민감 | `mean()` |
| 중앙값 | 정렬했을 때 가운데, 극단값에 둔감 | `median()` |
| 최빈값 | 가장 많이 나온 값 (범주형 결측 대체) | `mode()[0]` |
| 분산·표준편차 | 평균에서 퍼진 정도 | `var()`, `std()` |
| 사분위수 | 25%·50%·75% 지점 | `quantile([.25, .5, .75])` |
| 왜도 | 분포의 치우침 (0이면 대칭, 양수면 오른쪽 꼬리) | `skew()` |

```python
fee = df["monthly_fee"]
print(fee.mean(), fee.median(), fee.std())
print(fee.quantile([0.25, 0.5, 0.75]))
print(fee.skew())
```

[교육용 설명] 평균이 중앙값보다 훨씬 크면 오른쪽(큰 값) 꼬리가 긴 분포입니다. 소득·집값처럼 일부 아주 큰 값이 있는 데이터가 그렇습니다.

### 데이터 품질 점검

```python
print(df.isna().sum())                      # 열별 결측 개수
print(df.isna().mean().round(3))            # 열별 결측률
print(df.duplicated().sum())                # 중복 행
print(df["churn"].value_counts(normalize=True))  # 클래스 비율
print(df.nunique())                         # 열별 고유값 수
```

[교육용 설명] 클래스 비율이 0이 85%, 1이 15%처럼 한쪽으로 몰려 있으면 **불균형 데이터**입니다. 이때는 split할 때 `stratify=y`를 쓰고, 평가할 때 Accuracy 말고 Recall·F1도 봐야 합니다.

### 상관계수

```python
corr = df.corr(numeric_only=True)
print(corr["churn"].sort_values(ascending=False))
```

- 범위: −1 ~ +1
- +1에 가까움: 함께 증가 / −1에 가까움: 하나가 늘면 다른 하나는 줄어듦 / 0 근처: 선형 관계 약함

[기술근거] pandas 2.0부터 `corr()`는 문자열 열이 있으면 에러가 나므로 `numeric_only=True`를 씁니다. 시험 환경이 pandas 1.5라면 인자 없이도 수치열만 계산되지만 경고가 나올 수 있습니다. [S05]

[교육용 설명] 상관은 **인과가 아닙니다.** 또 선형 관계만 잡으므로 곡선 관계는 0에 가깝게 나올 수 있습니다.

### 시각화 세 가지

| 그래프 | 목적 | 코드 |
|---|---|---|
| 히스토그램 | **수치 변수 하나의 분포** 모양 | `plt.hist(df["age"])`, `sns.histplot(df, x="age")` |
| 박스플롯 | 중앙값·사분위·**이상치** | `sns.boxplot(data=df, x="contract", y="monthly_fee")` |
| 산점도 | **두 수치 변수의 관계** | `plt.scatter(df["tenure_months"], df["monthly_fee"])` |
| 막대그래프 | 범주별 개수·평균 | `sns.countplot(data=df, x="contract")` |
| 히트맵 | 상관계수 행렬 | `sns.heatmap(corr, annot=True)` |

```python
import matplotlib.pyplot as plt
import seaborn as sns

fig, axes = plt.subplots(1, 3, figsize=(14, 4))
sns.histplot(data=df, x="monthly_fee", ax=axes[0])
sns.boxplot(data=df, x="contract", y="monthly_fee", ax=axes[1])
axes[2].scatter(df["tenure_months"], df["monthly_fee"], s=5)
plt.tight_layout()
plt.show()
```

[기술근거] Matplotlib Gallery와 Seaborn API 문서는 시험 중 볼 수 있습니다. 함수 이름이 기억나지 않으면 그래프 모양(그림)으로 찾으면 빠릅니다. [S08] [S09]

### IQR과 이상치

```text
IQR = Q3 − Q1
하한 = Q1 − 1.5 × IQR
상한 = Q3 + 1.5 × IQR
→ 하한보다 작거나 상한보다 크면 이상치 후보
```

```python
q1 = df["monthly_fee"].quantile(0.25)
q3 = df["monthly_fee"].quantile(0.75)
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr
outliers = df[(df["monthly_fee"] < low) | (df["monthly_fee"] > high)]
print(len(outliers))
```

[교육용 설명] 박스플롯의 수염 끝이 바로 이 하한·상한이고, 수염 밖의 점이 이상치입니다. 처리 방법은 U07에서 다룹니다.

### 이해 확인

**Q1. Q1 = 40, Q3 = 60일 때 IQR 상한은?**

<details><summary>정답 보기</summary>

IQR = 20, 상한 = 60 + 1.5 × 20 = **90**

</details>

**Q2. 두 수치 변수의 관계를 볼 때 쓰는 그래프는?**

<details><summary>정답 보기</summary>

산점도(scatter plot)

</details>

---

# U07. 데이터 전처리

### 오늘의 목표

- dropna와 fillna를 상황에 맞게 고른다.
- 결측 대체값을 train 데이터로만 계산해야 하는 이유를 설명한다.
- IQR 이상치를 제거하거나 clip으로 처리한다.
- get_dummies와 Label Encoding의 차이를 안다.
- StandardScaler·MinMaxScaler를 split → train fit → transform 순서로 쓴다.
- 데이터 누수(Data Leakage)를 찾아낼 수 있다.

### 전처리의 핵심은 누수 방지

[교육용 설명] 전처리에서 가장 중요한 개념은 개별 API보다 **Data Leakage(데이터 누수) 방지**입니다. 누수란 모델이 학습할 때 **알아서는 안 될 정보(test 데이터나 정답)** 를 몰래 보는 것입니다. 누수가 있으면 점수는 높게 나오지만 실제로는 쓸 수 없는 모델이 됩니다.

```text
Raw Data
   ↓
X / y
   ↓
Train / Test Split
   ↓
Train으로 preprocessing FIT
   ↓
Train/Test TRANSFORM
   ↓
Model FIT
   ↓
Test Evaluation
```

[기술근거] scikit-learn 공식 문서도 "전처리는 train 데이터로만 fit하고, test 데이터에는 transform만 하라"고 안내합니다. [S14]

### 결측치 처리

```python
df = pd.read_csv("telecom_churn.csv")
print(df.isna().sum())

df.dropna()                          # 결측이 있는 행 삭제
df.dropna(subset=["monthly_fee"])    # 특정 열 기준
df.dropna(axis=1)                    # 결측이 있는 열 삭제

df["monthly_fee"].fillna(df["monthly_fee"].median())   # 중앙값으로
df["contract"].fillna(df["contract"].mode()[0])        # 최빈값으로
df["monthly_fee"].fillna(0)                            # 상수로
```

| 방법 | 언제 | 주의 |
|---|---|---|
| `dropna()` | 결측이 매우 적을 때 | 데이터가 줄어듦 |
| 평균 대체 | 분포가 대칭일 때 | 이상치에 끌려감 |
| **중앙값 대체** | 치우친 분포·이상치가 있을 때 | 수치형 기본 선택 |
| **최빈값 대체** | 범주형 | `mode()`는 Series를 돌려주므로 `[0]` |

[기술근거] `fillna`는 새 객체를 돌려줍니다. 원본에 반영하려면 `df["col"] = df["col"].fillna(...)`처럼 다시 대입합니다. [S06]

[교육용 설명] 시험형 정답 패턴은 다음과 같습니다. **median은 train에서 계산**해 train·test 모두에 씁니다.

```python
from sklearn.model_selection import train_test_split

X = df.drop(columns="churn")
y = df["churn"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

med = X_train["monthly_fee"].median()          # train으로만 계산
X_train = X_train.copy(); X_test = X_test.copy()
X_train["monthly_fee"] = X_train["monthly_fee"].fillna(med)
X_test["monthly_fee"] = X_test["monthly_fee"].fillna(med)  # 같은 값으로
```

### 이상치 처리

```python
q1, q3 = X_train["monthly_fee"].quantile([0.25, 0.75])
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr

kept = X_train[(X_train["monthly_fee"] >= low) & (X_train["monthly_fee"] <= high)]  # 제거
X_train["monthly_fee"] = X_train["monthly_fee"].clip(low, high)   # 경계값으로 자르기
X_test["monthly_fee"] = X_test["monthly_fee"].clip(low, high)
```

[교육용 설명] 행을 지울 때는 **y도 같은 행을 지워야** 합니다(`y_train.loc[kept.index]`). 또 test 데이터의 행은 지우지 않는 것이 원칙입니다. 실제 서비스에서는 이상한 고객도 예측해야 하니까요. 시험 문제가 "이상치를 제거하라"고 하면 지시대로 하면 됩니다.

### 범주형 Encoding

```python
pd.get_dummies(df, columns=["contract", "payment"])
pd.get_dummies(df, columns=["contract"], drop_first=True)   # 첫 범주 열 하나 빼기
pd.get_dummies(df, columns=["contract"], dtype=int)         # True/False 대신 0/1
```

| contract | → | contract_month | contract_one_year | contract_two_year |
|---|---|---:|---:|---:|
| month | | 1 | 0 | 0 |
| two_year | | 0 | 0 | 1 |

[기술근거] `get_dummies`는 범주형 변수를 dummy(indicator) 변수로 바꾸며 `drop_first`, `dummy_na` 옵션이 있습니다. pandas 2.0부터 기본 dtype이 bool입니다. [S07]

| | Label Encoding | One-hot Encoding |
|---|---|---|
| 방식 | 범주마다 정수(0, 1, 2) | 범주마다 0/1 열 |
| 도구 | `LabelEncoder`, `map` | `pd.get_dummies`, `OneHotEncoder` |
| 장점 | 열이 늘지 않음 | 순서가 없는 범주를 정확히 표현 |
| 주의 | 선형 모델이 크기 순서로 오해 | 범주가 많으면 열 폭증 |

[교육용 설명] train과 test에 `get_dummies`를 따로 하면 열이 달라질 수 있습니다(test에 없는 범주). 해결책은 ① split 전에 한 번에 `get_dummies` 하거나 ② `X_test = X_test.reindex(columns=X_train.columns, fill_value=0)` ③ `OneHotEncoder(handle_unknown="ignore")`를 쓰는 것입니다. **dummy 변환은 데이터 통계를 쓰지 않으므로** split 전에 해도 누수가 아닙니다.

```python
from sklearn.preprocessing import OneHotEncoder

enc = OneHotEncoder(handle_unknown="ignore")
enc.fit(X_train[["contract", "payment"]])
train_cat = enc.transform(X_train[["contract", "payment"]]).toarray()
test_cat = enc.transform(X_test[["contract", "payment"]]).toarray()
print(enc.get_feature_names_out())
```

### Scaling

| | StandardScaler | MinMaxScaler |
|---|---|---|
| 식 | z = (x − mean) / std | (x − min) / (max − min) |
| 결과 | 평균 0, 표준편차 1 | 0 ~ 1 범위 |
| 특징 | 이상치에 상대적으로 덜 민감 | 이상치 하나에 범위가 크게 변함 |

```python
from sklearn.preprocessing import StandardScaler

num_cols = ["age", "monthly_fee", "tenure_months", "support_calls"]
scaler = StandardScaler()
scaler.fit(X_train[num_cols])                         # train으로만 학습
X_train[num_cols] = scaler.transform(X_train[num_cols])
X_test[num_cols] = scaler.transform(X_test[num_cols])  # test는 transform만
```

[기술근거] `StandardScaler`는 fit에서 train의 평균·표준편차를 저장하고(`mean_`, `scale_`), transform에서 그 값으로 변환합니다. [S12]

**StandardScaler 핵심정리**

- 시험 핵심: ① train에 fit ② train/test에 transform ③ test에 다시 fit 금지
- `fit_transform(X_train)`은 fit + transform을 한 번에. **test에는 절대 `fit_transform` 금지**
- 자주 틀리는 점: split 이전 전체 데이터에 fit / 범주형(0/1 dummy) 열까지 무조건 scaling

[교육용 설명] **Decision Tree·Random Forest·XGBoost 같은 트리 모델은 scaling이 필요 없습니다.** 값의 크기가 아니라 "몇보다 큰가"로 나누기 때문입니다. Logistic/Linear Regression, KNN, SVM, 딥러닝은 scaling이 효과가 큽니다.

### Feature Engineering

```python
df = pd.DataFrame({
    "date": ["2026-01-15", "2026-07-03"],
    "total_fee": [600000, 130000],
    "tenure_months": [10, 2],
})
df["date"] = pd.to_datetime(df["date"])
df["month"] = df["date"].dt.month            # 날짜 → 월
df["weekday"] = df["date"].dt.dayofweek      # 0=월요일
df["avg_fee"] = df["total_fee"] / df["tenure_months"]
df["long_user"] = (df["tenure_months"] >= 12).astype(int)
print(df)
```

[교육용 설명] **Target 정보로 feature를 만들면 누수**입니다. 예: "이탈 여부별 평균 요금"을 feature로 넣으면 모델이 정답을 간접적으로 보게 됩니다.

### Pipeline으로 묶기 (실무형)

```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score
import pandas as pd

df = pd.read_csv("telecom_churn.csv")
X = df.drop(columns="churn")
y = df["churn"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

numeric_cols = ["age", "monthly_fee", "tenure_months", "support_calls"]
categorical_cols = ["contract", "payment"]

numeric_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])
categorical_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])
preprocessor = ColumnTransformer([
    ("num", numeric_pipe, numeric_cols),
    ("cat", categorical_pipe, categorical_cols)
])

model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", LogisticRegression(max_iter=1000))
])

model.fit(X_train, y_train)
pred = model.predict(X_test)
print("accuracy:", accuracy_score(y_test, pred))
print("f1:", f1_score(y_test, pred))
```

[교육용 설명] Pipeline은 `fit(X_train)` 한 번에 모든 전처리를 train으로만 학습하므로 **누수가 구조적으로 막힙니다.** 다만 시험은 "결측을 중앙값으로 채우시오", "get_dummies로 변환하시오"처럼 단계별로 묻는 경우가 많으니 `fillna`·`get_dummies`·`StandardScaler`를 따로 쓰는 시험형도 반드시 손에 익히세요.

### 이해 확인

**Q1. 다음 코드의 문제점은?**

```python
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_train, X_test = train_test_split(X_scaled, test_size=0.2)
```

<details><summary>정답 보기</summary>

split 전에 전체 데이터로 fit해서 **test 정보가 평균·표준편차에 섞였습니다(누수).** split → `scaler.fit(X_train)` → train/test에 `transform` 순서로 고칩니다.

</details>

**Q2. 범주형 결측을 채울 때 쓰는 대표값은?**

<details><summary>정답 보기</summary>

최빈값 `df["col"].mode()[0]`

</details>

---

# U08. 머신러닝 모델링

### 오늘의 목표

- train_test_split의 test_size·random_state·stratify를 설명한다.
- 모든 scikit-learn 모델이 같은 fit/predict 사용법을 따른다는 것을 안다.
- 회귀 모델(LinearRegression, RandomForestRegressor, XGBRegressor)을 학습한다.
- 분류 모델(LogisticRegression, DecisionTree, RandomForest, XGBClassifier)을 학습한다.
- predict와 predict_proba의 차이를 안다.

### train_test_split

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,      # 20%를 test로
    random_state=42,    # 매번 같은 분할 (재현성)
    stratify=y          # train/test의 클래스 비율을 y와 같게 (분류)
)
```

| 인자 | 뜻 |
|---|---|
| `test_size=0.2` | 전체의 20%를 test로 (8:2) |
| `random_state=42` | 분할 결과 고정 → 재현성 |
| `stratify=y` | 클래스 비율 유지 — **분류·불균형 데이터에서 필수** |
| `shuffle=True` | 섞은 뒤 분할 (기본값) |

[기술근거] 반환 순서는 **X_train, X_test, y_train, y_test** 입니다. 순서를 틀리면 에러 없이 엉뚱한 결과가 나오니 주의합니다. [S11]

[교육용 설명] 회귀 문제에는 `stratify`를 쓰지 않습니다(연속값이라 계층을 나눌 수 없음).

### 모든 모델의 공통 사용법

```text
model = 모델클래스(하이퍼파라미터)   # 1. 만들기
model.fit(X_train, y_train)          # 2. 학습
pred = model.predict(X_test)         # 3. 예측
score = 평가함수(y_test, pred)       # 4. 평가
```

[기술근거] scikit-learn의 모든 추정기(estimator)는 `fit`/`predict` 같은 일관된 인터페이스를 가집니다. XGBoost의 scikit-learn wrapper(`XGBClassifier`, `XGBRegressor`)도 같습니다. [S10] [S18]

[교육용 설명] 이 네 줄만 외우면 모델 이름만 바꿔 끼우면 됩니다. 시험에서 처음 보는 모델이 나와도 문서에서 클래스 이름과 import 경로만 찾으면 됩니다.

### 회귀 모델

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

rng = np.random.default_rng(0)
n = 1000
house = pd.DataFrame({
    "area": rng.normal(85, 25, n).clip(20, 200),
    "rooms": rng.integers(1, 6, n),
    "age": rng.integers(0, 40, n),
})
house["price"] = 300 * house["area"] + 2000 * house["rooms"] - 150 * house["age"] + rng.normal(0, 3000, n)

X = house.drop(columns="price")
y = house["price"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

for model in [LinearRegression(), RandomForestRegressor(n_estimators=200, random_state=42)]:
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, pred))
    print(type(model).__name__, "MAE", round(mean_absolute_error(y_test, pred)), "RMSE", round(rmse), "R2", round(r2_score(y_test, pred), 3))
```

[가상자료] 주택가격은 면적·방 수·연식으로 만든 합성 데이터입니다.

[교육용 설명] LinearRegression은 **baseline(기준선)** 으로 먼저 돌려 보고, 트리 앙상블과 비교하는 흐름이 시험에 자주 나옵니다. `model.coef_`(계수), `model.intercept_`(절편)로 선형회귀 식을 볼 수 있습니다.

### 분류 모델

```python
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score

df = pd.read_csv("telecom_churn.csv")
df["monthly_fee"] = df["monthly_fee"].fillna(df["monthly_fee"].median())  # 간단히 (시험형은 U07처럼 train 기준)
df = pd.get_dummies(df, columns=["contract", "payment"], drop_first=True, dtype=int)

X = df.drop(columns="churn")
y = df["churn"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

models = {
    "logistic": LogisticRegression(max_iter=1000),
    "tree": DecisionTreeClassifier(max_depth=5, random_state=42),
    "forest": RandomForestClassifier(n_estimators=200, random_state=42),
}
for name, m in models.items():
    m.fit(X_train, y_train)
    pred = m.predict(X_test)
    print(name, round(accuracy_score(y_test, pred), 3), round(f1_score(y_test, pred), 3))
```

| 모델 | 아이디어 | 주요 하이퍼파라미터 |
|---|---|---|
| LogisticRegression | 선형식 → sigmoid → 확률 | `C`, `max_iter` |
| DecisionTree | 질문(임계값)으로 계속 나누기 | `max_depth`, `min_samples_split` |
| RandomForest | 여러 트리를 따로 학습해 투표 (**bagging**) | `n_estimators`, `max_depth` |
| XGBoost | 앞 트리의 오류를 다음 트리가 순서대로 보완 (**boosting**) | `n_estimators`, `learning_rate`, `max_depth` |

[교육용 설명] LogisticRegression은 이름에 Regression이 붙지만 **분류 모델**입니다. 수렴 경고(ConvergenceWarning)가 나오면 `max_iter=1000`을 주거나 scaling을 합니다.

### XGBoost

```python
from xgboost import XGBClassifier

xgb = XGBClassifier(n_estimators=300, learning_rate=0.05, max_depth=4, random_state=42)
xgb.fit(X_train, y_train)
pred = xgb.predict(X_test)
print("xgb", round(accuracy_score(y_test, pred), 3), round(f1_score(y_test, pred), 3))
```

[기술근거] XGBoost scikit-learn wrapper는 시험 허용 문서입니다. 회귀는 `XGBRegressor`를 같은 방식으로 씁니다. [S18]

[교육용 설명] XGBoost는 **문자열 열을 바로 받지 못하므로** encoding 후 넣습니다. 분류 target은 0부터 시작하는 정수여야 합니다.

### predict와 predict_proba

```python
m = models["logistic"]
print(m.predict(X_test[:5]))          # [0 0 1 0 0]  결정된 클래스
proba = m.predict_proba(X_test[:5])   # [[0.8, 0.2], ...]  클래스별 확률
print(proba[:, 1])                    # 양성(1)일 확률

pred_03 = (m.predict_proba(X_test)[:, 1] >= 0.3).astype(int)   # threshold 0.3
```

[교육용 설명] `predict`는 기본 threshold 0.5로 자른 결과입니다. threshold를 **낮추면** 양성을 더 많이 예측해 **Recall은 오르고 FP도 늘어납니다.** U10에서 자세히 다룹니다.

### 하이퍼파라미터와 교차검증

| | 파라미터 | 하이퍼파라미터 |
|---|---|---|
| 정하는 주체 | 학습이 데이터로 추정 | 사람이 학습 **전에** 설정 |
| 예 | 회귀 계수, 신경망 가중치 | `max_depth`, `n_estimators`, `learning_rate`, `epochs` |

```python
from sklearn.model_selection import cross_val_score, GridSearchCV

scores = cross_val_score(RandomForestClassifier(random_state=42), X_train, y_train, cv=5, scoring="f1")
print(scores.mean())

grid = GridSearchCV(
    RandomForestClassifier(random_state=42),
    {"n_estimators": [100, 200], "max_depth": [3, 5, None]},
    cv=3, scoring="f1"
)
grid.fit(X_train, y_train)
print(grid.best_params_, round(grid.best_score_, 3))
```

[교육용 설명] 교차검증(Cross Validation)은 train을 여러 조각으로 나눠 돌아가며 검증해 **분할 운에 덜 흔들리는** 성능을 얻습니다. 하이퍼파라미터는 train(교차검증) 안에서 고르고, test는 마지막에 한 번만 씁니다. test로 계속 고르면 test에 과적합됩니다.

### 이해 확인

**Q1. `stratify=y`는 왜 쓰나요?**

<details><summary>정답 보기</summary>

train과 test의 클래스 비율을 원래 데이터와 같게 유지하려고. 불균형 분류에서 특히 중요합니다.

</details>

**Q2. Decision Tree에 scaling이 필수가 아닌 이유는?**

<details><summary>정답 보기</summary>

값의 크기가 아니라 임계값("몇보다 큰가")으로 분할하므로 단위가 결과를 바꾸지 않습니다.

</details>

---

# U09. 딥러닝

### 오늘의 목표

- Sequential 모델에 Dense 층을 쌓을 수 있다.
- 문제 유형별 출력층 activation과 loss를 짝지을 수 있다.
- compile의 optimizer·loss·metrics를 설정한다.
- epoch·batch_size·validation_split의 의미를 안다.
- 학습 곡선으로 과적합을 판단하고 EarlyStopping을 쓴다.

### 신경망 한 장 요약

```text
입력(feature 수) → Dense(32, relu) → Dense(16, relu) → 출력층
                    은닉층             은닉층          문제 유형에 맞게
```

[교육용 설명] Dense(완전연결층)는 앞 층의 모든 값에 가중치를 곱해 더한 뒤 activation 함수를 통과시킵니다. 은닉층 activation은 거의 **ReLU**(음수는 0, 양수는 그대로)를 씁니다.

[기술근거] TensorFlow 공식 튜토리얼은 Jupyter Notebook 형태이며 `Sequential` 모델과 `model.fit()`으로 시작합니다. [S16]

### 문제 유형별 출력층과 loss

| 문제 | 마지막 층 | loss | metrics 예 |
|---|---|---|---|
| 회귀 | `Dense(1)` (linear) | `"mse"` 또는 `"mae"` | `["mae"]` |
| 이진분류 | `Dense(1, activation="sigmoid")` | `"binary_crossentropy"` | `["accuracy"]` |
| 다중분류 (정수 라벨 0,1,2…) | `Dense(K, activation="softmax")` | `"sparse_categorical_crossentropy"` | `["accuracy"]` |
| 다중분류 (원-핫 라벨) | `Dense(K, activation="softmax")` | `"categorical_crossentropy"` | `["accuracy"]` |

[교육용 설명] 이 표는 **통째로 외웁니다.** 시험에서 가장 자주 틀리는 곳이 출력층과 loss의 짝입니다. 다중분류에서 y가 `0, 1, 2`처럼 정수면 sparse, `[1,0,0]`처럼 원-핫이면 그냥 categorical입니다.

### 이진분류 DNN

```python
import tensorflow as tf

tf.random.set_seed(42)

X_train_dense = X_train.astype("float32").values   # U08 분류 데이터 사용
X_test_dense = X_test.astype("float32").values
from sklearn.preprocessing import StandardScaler
sc = StandardScaler().fit(X_train_dense)
X_train_dense, X_test_dense = sc.transform(X_train_dense), sc.transform(X_test_dense)

model = tf.keras.Sequential([
    tf.keras.Input(shape=(X_train_dense.shape[1],)),
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dense(16, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

history = model.fit(
    X_train_dense, y_train,
    epochs=20,
    batch_size=32,
    validation_split=0.2,
    verbose=0
)

loss, acc = model.evaluate(X_test_dense, y_test, verbose=0)
print("test acc:", round(acc, 3))
proba = model.predict(X_test_dense, verbose=0).ravel()   # 양성 확률
pred = (proba >= 0.5).astype(int)
```

[교육용 설명] 딥러닝은 **scaling을 하면 학습이 훨씬 안정적**입니다. 또 Keras의 `predict`는 클래스가 아니라 **확률**을 돌려주므로 0.5로 잘라 클래스로 바꿉니다. `tf.keras.Input(shape=...)`은 입력 feature 수를 알려 주는 층입니다(생략하면 첫 fit 때 자동으로 정해짐).

### compile과 fit 인자

| 인자 | 뜻 |
|---|---|
| `optimizer="adam"` | 가중치를 고치는 방법. Adam이 기본 선택 |
| `loss` | 줄여야 할 오차 함수 (위 표) |
| `metrics` | 학습 중 보여 줄 지표 |
| `epochs=20` | **전체 train 데이터를 20번** 반복 학습 |
| `batch_size=32` | **한 번 가중치를 고칠 때 쓰는 샘플 수** |
| `validation_split=0.2` | train의 마지막 20%를 검증용으로 떼어 둠 |
| `verbose=0` | 진행 출력 끄기 |

[교육용 설명] 데이터 1,000개, batch_size 100이면 1 epoch에 가중치를 10번 고칩니다.

### 회귀 DNN과 다중분류 DNN

```python
reg = tf.keras.Sequential([
    tf.keras.Input(shape=(3,)),
    tf.keras.layers.Dense(64, activation="relu"),
    tf.keras.layers.Dense(1)                     # 회귀: activation 없음
])
reg.compile(optimizer="adam", loss="mse", metrics=["mae"])

clf3 = tf.keras.Sequential([
    tf.keras.Input(shape=(4,)),
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dropout(0.2),                # 과적합 완화
    tf.keras.layers.Dense(3, activation="softmax")   # 3개 클래스
])
clf3.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
reg.summary()
```

[교육용 설명] 다중분류 예측은 `model.predict(X).argmax(axis=1)`로 확률이 가장 큰 클래스를 고릅니다.

### 학습 곡선과 EarlyStopping

```python
import matplotlib.pyplot as plt

plt.plot(history.history["loss"], label="train loss")
plt.plot(history.history["val_loss"], label="val loss")
plt.legend(); plt.xlabel("epoch"); plt.show()

early = tf.keras.callbacks.EarlyStopping(
    monitor="val_loss", patience=5, restore_best_weights=True
)
history = model.fit(X_train_dense, y_train, epochs=200, batch_size=32,
                    validation_split=0.2, callbacks=[early], verbose=0)
print("멈춘 epoch:", len(history.history["loss"]))
```

[교육용 설명] **train loss는 계속 내려가는데 val loss가 올라가기 시작하면 과적합**입니다. EarlyStopping은 val loss가 `patience`번 연속 나아지지 않으면 학습을 멈추고, `restore_best_weights=True`면 가장 좋았던 시점의 가중치로 되돌립니다. [S17]

### 이해 확인

**Q1. 이진분류 출력층과 loss는?**

<details><summary>정답 보기</summary>

`Dense(1, activation="sigmoid")` + `"binary_crossentropy"`

</details>

**Q2. 회귀 DNN 출력층은?**

<details><summary>정답 보기</summary>

`Dense(1)` — activation 없이(linear), loss는 `"mse"`

</details>

---

# U10. 성능평가·개선

### 오늘의 목표

- 회귀 지표 MAE·MSE·RMSE·R²를 계산하고 해석한다.
- 혼동행렬의 TP·TN·FP·FN을 읽는다.
- Precision·Recall·F1을 식으로 계산한다.
- 업무 비용에 따라 Recall과 Precision 중 무엇을 우선할지 고른다.
- threshold 변화가 Recall·FP에 주는 영향을 안다.
- 같은 test set으로 공정하게 모델을 비교한다.

### 회귀 지표

| 지표 | 식 | 해석 |
|---|---|---|
| MAE | 평균(\|실제 − 예측\|) | 평균적으로 얼마나 틀렸나. target 단위 |
| MSE | 평균((실제 − 예측)²) | **큰 오차에 큰 벌점**. 단위가 제곱 |
| RMSE | √MSE | MSE를 target 단위로 되돌림 |
| R² | 1 − (오차 제곱합 / 분산 합) | 1에 가까울수록 분산을 잘 설명. 0이면 평균으로 찍은 수준 |

```python
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

y_true = np.array([3, 5, 7, 9])
y_pred = np.array([2, 5, 8, 12])
mae = mean_absolute_error(y_true, y_pred)        # (1+0+1+3)/4 = 1.25
mse = mean_squared_error(y_true, y_pred)         # (1+0+1+9)/4 = 2.75
rmse = np.sqrt(mse)                              # 약 1.658
r2 = r2_score(y_true, y_pred)
print(mae, mse, round(rmse, 3), round(r2, 3))
```

[기술근거] scikit-learn 평가 모듈은 회귀·분류 지표를 모두 제공합니다. 인자 순서는 **(y_true, y_pred)** 입니다. [S13]

[교육용 설명] MAE·MSE·RMSE는 **낮을수록**, R²는 **높을수록** 좋습니다. 회귀에 accuracy를 쓰면 안 됩니다(분류 지표).

### 혼동행렬

```text
                예측 0(음성)   예측 1(양성)
실제 0(음성)      TN            FP   ← 정상을 양성으로 잘못 (오탐)
실제 1(양성)      FN            TP
                  ↑ 양성을 놓침 (미탐)
```

```python
from sklearn.metrics import confusion_matrix, classification_report

y_true = [0, 0, 0, 0, 1, 1, 1, 0, 1, 0]
y_pred = [0, 0, 1, 0, 1, 0, 1, 0, 1, 0]
cm = confusion_matrix(y_true, y_pred)
print(cm)                 # [[5 1]
                          #  [1 3]]
tn, fp, fn, tp = cm.ravel()
print(classification_report(y_true, y_pred))
```

[기술근거] scikit-learn의 `confusion_matrix`는 **행 = 실제, 열 = 예측**이고, 이진분류에서 `ravel()`하면 `tn, fp, fn, tp` 순서입니다. [S19]

[교육용 설명] 사이드바의 **혼동행렬 계산기**에서 숫자를 바꿔 가며 지표가 어떻게 변하는지 직접 확인해 보세요.

### Accuracy, Precision, Recall, F1

| 지표 | 식 | 질문 |
|---|---|---|
| Accuracy | (TP + TN) / 전체 | 전체 중 맞힌 비율 |
| Precision | TP / (TP + FP) | **양성이라고 한 것 중** 진짜 양성 비율 |
| Recall | TP / (TP + FN) | **실제 양성 중** 찾아낸 비율 |
| F1 | 2 × P × R / (P + R) | Precision과 Recall의 **조화평균** |

위 예: TP=3, TN=5, FP=1, FN=1 → Accuracy 0.8, Precision 0.75, Recall 0.75, F1 0.75

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
print(accuracy_score(y_true, y_pred), precision_score(y_true, y_pred),
      recall_score(y_true, y_pred), f1_score(y_true, y_pred))
```

### 어떤 지표를 우선할까

| 상황 | 더 비싼 실수 | 우선 지표 |
|---|---|---|
| 질병 진단 | 환자를 놓침 (FN) | **Recall** |
| 이탈 고객 찾기 | 이탈할 고객을 놓침 (FN) | **Recall** (또는 F1) |
| 스팸 필터 | 정상 메일을 스팸으로 (FP) | **Precision** |
| 불균형 데이터 전반 | — | **F1** + 혼동행렬 |

[교육용 설명] 불균형 데이터에서 Accuracy만 보면 위험합니다. 환자가 5%뿐인 데이터에서 "모두 정상"이라고만 해도 **Accuracy 95%** 가 나오지만 Recall은 0입니다.

### Threshold 조정

```python
import numpy as np
from sklearn.metrics import precision_score, recall_score

proba = np.array([0.9, 0.7, 0.45, 0.35, 0.2, 0.6, 0.3, 0.1])
y_true = np.array([1, 1, 1, 0, 0, 0, 1, 0])
for th in [0.5, 0.3]:
    pred = (proba >= th).astype(int)
    print(th, "precision", round(precision_score(y_true, pred), 2), "recall", round(recall_score(y_true, pred), 2))
```

| threshold를 낮추면 | 양성 예측 ↑ → **Recall ↑, FP ↑, Precision ↓ 경향** |
|---|---|
| threshold를 높이면 | 양성 예측 ↓ → **Precision ↑, Recall ↓ 경향** |

### 공정한 모델 비교

[교육용 설명] 모델을 비교하는 규칙은 세 가지입니다.

1. **같은 split**(같은 `random_state`)의 **같은 test set**으로 비교한다.
2. 문제에 맞는 지표를 쓴다 (회귀 = RMSE·MAE·R², 분류 = F1·Recall·Accuracy).
3. 하이퍼파라미터는 train/검증으로 고르고 test는 마지막에 한 번만 본다.

```python
results = {}
for name, m in models.items():           # U08의 models
    pred = m.predict(X_test)
    results[name] = {"acc": accuracy_score(y_test, pred), "f1": f1_score(y_test, pred)}
print(pd.DataFrame(results).T.sort_values("f1", ascending=False))
```

**최종 모델 선택 근거 쓰는 법:** "불균형 데이터이므로 Accuracy보다 F1을 기준으로 했고, 동일 test set에서 LogisticRegression의 F1이 0.53으로 가장 높아 선택했다. 이탈 고객을 놓치는 비용이 크므로 Recall도 함께 확인했다."

### 이해 확인

**Q1. TP=40, FP=10, FN=20일 때 Precision과 Recall은?**

<details><summary>정답 보기</summary>

Precision = 40/50 = **0.8**, Recall = 40/60 ≈ **0.667**

</details>

**Q2. MSE = 16이면 RMSE는?**

<details><summary>정답 보기</summary>

**4**

</details>

---

# U11. 통합 Case Study

### 오늘의 목표

- 데이터를 받아 EDA → 전처리 → 모델링 → 평가까지 혼자 끝낸다.
- 시험형(단계별 API)과 실무형(Pipeline) 두 방식으로 모두 풀 수 있다.
- 결과를 숫자와 업무 언어로 설명한다.

### Case 1 문제 상황: 고객 이탈 예측

[가상자료] 통신사가 다음 달 이탈할 고객을 미리 찾아 할인 쿠폰을 보내려 합니다. `telecom_churn.csv`(U05에서 생성)로 이탈 예측 모델을 만드세요.

```text
[학습목표] 결측 → Encoding → Split → Scaling → Model → Evaluation
[Dataset] telecom_churn.csv
[Step 1] EDA
[Step 2] Preprocessing
[Step 3] Modeling
[Step 4] Evaluation
[Challenge] F1 개선
[Reflection] 어떤 전처리가 성능에 가장 큰 영향을 주었는가?
```

[교육용 설명] 아래 코드를 보기 전에 **먼저 직접 풀어 보세요.** 막히면 해당 단원으로 돌아갑니다.

### Case 1 풀이: 시험형

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, confusion_matrix

df = pd.read_csv("telecom_churn.csv")                       # Step 1. EDA
print(df.shape)
print(df.isna().sum())
print(df["churn"].value_counts(normalize=True))
print(df.groupby("contract")["churn"].mean())

df = pd.get_dummies(df, columns=["contract", "payment"], drop_first=True, dtype=int)  # Step 2
X = df.drop(columns="churn")
y = df["churn"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)

med = X_train["monthly_fee"].median()
X_train = X_train.copy(); X_test = X_test.copy()
X_train["monthly_fee"] = X_train["monthly_fee"].fillna(med)
X_test["monthly_fee"] = X_test["monthly_fee"].fillna(med)

num_cols = ["age", "monthly_fee", "tenure_months", "support_calls"]
scaler = StandardScaler().fit(X_train[num_cols])
X_train[num_cols] = scaler.transform(X_train[num_cols])
X_test[num_cols] = scaler.transform(X_test[num_cols])

lr = LogisticRegression(max_iter=1000).fit(X_train, y_train)                         # Step 3
rf = RandomForestClassifier(n_estimators=300, random_state=42).fit(X_train, y_train)

for name, m in [("logistic", lr), ("forest", rf)]:                                      # Step 4
    pred = m.predict(X_test)
    print(name, "acc", round(accuracy_score(y_test, pred), 3), "f1", round(f1_score(y_test, pred), 3))
print(confusion_matrix(y_test, lr.predict(X_test)))
```

### Case 1 Challenge: F1 올리기

[교육용 설명] 이탈 고객이 적은 불균형 데이터(이탈 약 29%)라 기본 threshold 0.5에서는 이탈 고객을 많이 놓쳐 Recall이 낮게 나옵니다. 시도할 수 있는 방법은 다음과 같습니다.

```python
lr_bal = LogisticRegression(max_iter=1000, class_weight="balanced").fit(X_train, y_train)
print("balanced f1", round(f1_score(y_test, lr_bal.predict(X_test)), 3))

proba = lr.predict_proba(X_test)[:, 1]
for th in [0.5, 0.4, 0.3, 0.25]:
    print(th, round(f1_score(y_test, (proba >= th).astype(int)), 3))
```

- `class_weight="balanced"`: 적은 클래스에 가중치를 더 줌
- threshold 낮추기: Recall ↑ (FP도 ↑)
- feature engineering: 가입 기간 구간, 상담 전화 많은 고객 표시 등

**주의:** threshold를 test 점수로 고르면 test에 맞춰진 것입니다. 원칙적으로는 train 안의 검증 데이터로 고릅니다.

### Case 2: 주택가격 회귀

[가상자료] U08의 `house` 데이터에 지역(범주형)과 결측을 더한 문제입니다.

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

rng = np.random.default_rng(7)
n = 1200
house = pd.DataFrame({
    "area": rng.normal(85, 25, n).clip(20, 200),
    "rooms": rng.integers(1, 6, n),
    "age": rng.integers(0, 40, n),
    "region": rng.choice(["A", "B", "C"], n),
})
bonus = house["region"].map({"A": 15000, "B": 5000, "C": 0})
house["price"] = 300 * house["area"] + 2000 * house["rooms"] - 150 * house["age"] + bonus + rng.normal(0, 3000, n)
house.loc[rng.choice(n, 60, replace=False), "area"] = np.nan

print(house.isna().mean())
print(house["price"].describe())

house = pd.get_dummies(house, columns=["region"], dtype=int)
X = house.drop(columns="price")
y = house["price"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
med = X_train["area"].median()
X_train = X_train.fillna({"area": med})
X_test = X_test.fillna({"area": med})

for m in [LinearRegression(), RandomForestRegressor(n_estimators=300, random_state=42)]:
    pred = m.fit(X_train, y_train).predict(X_test)
    print(type(m).__name__, "MAE", round(mean_absolute_error(y_test, pred)),
          "RMSE", round(np.sqrt(mean_squared_error(y_test, pred))), "R2", round(r2_score(y_test, pred), 3))
```

[교육용 설명] 이 데이터는 실제로 선형 관계로 만들었기 때문에 LinearRegression이 RandomForest보다 잘 나올 수 있습니다. **복잡한 모델이 항상 이기지 않는다**는 것을 직접 확인하세요.

### Case 3: 미세먼지 예측 (DNN 회귀)

[가상자료] 날짜·지역·기온·풍속으로 PM2.5를 예측합니다. 날짜에서 월을 뽑는 feature engineering과 DNN 회귀를 연습합니다.

```python
import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error

rng = np.random.default_rng(3)
n = 2000
air = pd.DataFrame({
    "date": pd.date_range("2024-01-01", periods=n, freq="6h"),
    "region": rng.choice(["north", "south"], n),
    "temp": rng.normal(14, 9, n),
    "wind": rng.gamma(2, 1.5, n),
})
month = air["date"].dt.month
air["pm25"] = (40 + 15 * month.isin([12, 1, 2, 3]) - 3 * air["wind"]
               + 8 * (air["region"] == "north") + rng.normal(0, 6, n)).clip(3)

air["month"] = air["date"].dt.month
air = pd.get_dummies(air.drop(columns="date"), columns=["region"], dtype=int)
X = air.drop(columns="pm25").astype("float32")
y = air["pm25"].astype("float32")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
sc = StandardScaler().fit(X_train)
X_train_s, X_test_s = sc.transform(X_train), sc.transform(X_test)

tf.random.set_seed(42)
dnn = tf.keras.Sequential([
    tf.keras.Input(shape=(X_train_s.shape[1],)),
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dense(16, activation="relu"),
    tf.keras.layers.Dense(1)
])
dnn.compile(optimizer="adam", loss="mse", metrics=["mae"])
early = tf.keras.callbacks.EarlyStopping(monitor="val_loss", patience=10, restore_best_weights=True)
dnn.fit(X_train_s, y_train, epochs=300, batch_size=32, validation_split=0.2, callbacks=[early], verbose=0)
pred = dnn.predict(X_test_s, verbose=0).ravel()
print("DNN RMSE:", round(float(np.sqrt(mean_squared_error(y_test, pred))), 2))
```

[교육용 설명] 공식 AICE 과정에도 통신 이탈 예측과 미세먼지 관련 사례가 있습니다. 데이터는 다르지만 **업무 구조(사례 → 전처리 → 모델 → 평가)** 가 같으니 세 Case를 각각 30분 안에 끝내는 것을 목표로 반복하세요. [S01]

### 이해 확인

**Q1. Case 1에서 median을 split 뒤에 계산한 이유는?**

<details><summary>정답 보기</summary>

전체 데이터로 계산하면 test 데이터 정보가 섞이는 누수가 되기 때문입니다.

</details>

---

# U12. 시험 시뮬레이션·학습 계획

### 오늘의 목표

- 90분 14문항의 시간 배분 전략을 세운다.
- 허용 문서만으로 API를 찾아 쓰는 연습 방법을 안다.
- 8주·4주 학습 계획 중 자기에게 맞는 것을 고른다.
- 준비도(Readiness)로 응시 준비 여부를 판단한다.
- 시험 직전 1~2주에 할 일을 안다.

### 90분 시간 운영

[교육용 설명] 14문항 · 90분이면 단순 평균 **약 6.4분/문항**입니다. 실제로는 앞쪽 EDA 문제를 빨리 끝내고 모델링에 시간을 더 씁니다. 아래는 공식 배분법이 아니라 **훈련용 권고 전략**입니다.

| 구간 | 할 일 |
|---|---|
| 0~5분 | 전체 문제·데이터 훑어보기 |
| 5~60분 | 확실한 문제부터 해결 |
| 60~80분 | 모델링·못 푼 문제 |
| 80~87분 | 결과·변수명·metric 검증 |
| 87~90분 | 제출 상태 최종 확인 |

**시험장 체크:** 문제에서 지정한 **변수명**(`X_train`, `model` 등)과 **인자값**(`test_size=0.2`, `random_state=42`)을 그대로 썼는지 확인합니다. 값 하나가 다르면 결과가 달라집니다.

### 공식 문서만으로 푸는 연습

[교육용 설명] 시험 2~3주 전부터는 **블로그·ChatGPT 없이** 7개 공식 문서만 열어 놓고 풉니다.

1. 문서 검색창에 함수·클래스 이름을 넣는다 (`StandardScaler`, `get_dummies`)
2. **signature와 Parameters**를 먼저 본다 — 인자 이름·기본값
3. 페이지 아래 **Examples** 코드를 그대로 응용한다
4. 버전에 따라 인자가 다를 수 있으니 에러가 나면 메시지를 읽는다

| 찾을 것 | 문서 | 검색어 |
|---|---|---|
| 분할 인자 | scikit-learn | train_test_split |
| dummy 변환 | pandas | get_dummies |
| 결측 대체 | pandas | fillna |
| 평가 지표 | scikit-learn | metrics (f1_score, mean_squared_error) |
| 조기 종료 | TensorFlow | EarlyStopping |
| 부스팅 | XGBoost | XGBClassifier |

### 모의고사 세 가지

이 사이트의 **모의고사** 메뉴에 14문항 실습형 세트 3개가 있습니다. 배점은 사이트 자체 연습용이며 공식 배점이 아닙니다.

| 세트 | 주제 | 문제 유형 | 핵심 함정 |
|---|---|---|---|
| A | 통신서비스 이탈 예측 | 분류 | median·scaler를 전체 데이터에 fit (누수) |
| B | 주택가격 | 회귀 | accuracy/F1 같은 분류 지표 사용 |
| C | 미세먼지 수준 | 회귀 + DNN | 회귀 DNN 출력층·loss, 과적합 판단 |

**실습 데이터 내려받기** [가상자료]: [telecom_churn.csv](data/telecom_churn.csv) · [house_price.csv](data/house_price.csv) · [air_quality.csv](data/air_quality.csv) — 받은 파일을 노트북과 같은 폴더에 두고 `pd.read_csv("파일명")`으로 읽습니다.

[교육용 설명] 각 문항은 **모범 답안을 보고 스스로 채점**합니다. 반드시 90분 타이머를 맞추고 Jupyter에서 실제로 실행해 본 뒤 채점하세요. 시험 전까지 5~10회 반복을 권장합니다.

### 8주·4주 학습 계획

**8주 표준학습안**

| 주 | 주요내용 | 주당시간 |
|---|---|---:|
| 1주 | AI 개념 + Python | 8~10h |
| 2주 | NumPy + pandas 기초 | 10h |
| 3주 | pandas 고급 + EDA | 10h |
| 4주 | 결측·이상·encoding·scaling | 10h |
| 5주 | Regression + Classification | 10h |
| 6주 | Ensemble + TensorFlow | 10h |
| 7주 | 통합 Case Study | 10h |
| 8주 | 모의고사·약점보완 | 12h |

**4주 압축형**

| 주 | 목표 |
|---|---|
| 1주 | Python/pandas 완성 |
| 2주 | EDA/전처리 완성 |
| 3주 | ML/DL/평가 |
| 4주 | 매일 실전 세트 |

**일일 90분 템플릿:** `개념 복습 15분 → 직접 코딩 40분 → 예상문제 20분 → 오답 재실행 10분 → 학습로그 5분`

### 준비도 판단

| 수준 | 통과조건 |
|---|---|
| 초급 | Python/pandas 문제 정확도 80% |
| 중급 | 전처리부터 ML까지 독립적으로 구현 |
| 고급 | 90분 모의고사 3회 연속 85점 이상 |

```text
Readiness =
  0.15 × Python
+ 0.20 × pandas/EDA
+ 0.25 × preprocessing
+ 0.20 × modeling
+ 0.10 × evaluation
+ 0.10 × timed_exam

Timed Mock < 80        → "응시 준비 완료" 아님
Preprocessing < 75     → 전처리 집중학습
최근 3회 평균 >= 85 AND 평균시간 <= 90분 → Ready
```

[교육용 설명] 이 점수식은 공식 AICE 평가식이 아니라 **자기 점검용 기준**입니다. 연습문제의 단원별 정답률을 넣어 계산해 보세요.

### 월간 계획 템플릿

```text
[월간 목표]
응시 예정일:
목표 점수:
현재 진단점수:

1주: Python / pandas
2주: EDA / 전처리
3주: ML / DL
4주: 모의고사 / 약점보완

누적 코딩시간:
문제풀이 수:
오답 수:
재시험 대상:
가장 약한 영역:
다음 달 보완계획:
```

[교육용 설명] 포스트잇을 이 섹션에 붙여 직접 채워 두면 기기 간에 동기화됩니다. 마지막 1~2주는 새 이론보다 **90분 모의고사와 오답 재실행** 비중을 높이세요.

### 추천 자료

| 순위 | 자료 | 용도 |
|---:|---|---|
| 1 | AICE 공식 시험안내 | 시험 사실 |
| 2 | AICE 공식 일정 | 접수·시험일 |
| 3 | AICE 공식 부정행위 기준 | 시험 중 허용범위 |
| 4 | AICE 공식 FAQ | 응시절차 |
| 5 | AICE 공식 샘플문항 | 형식 적응 |
| 6 | AICE Associate 공식 학습과정 | 커리큘럼 |
| 7 | PQI | 법적 자격정보 |
| 8 | 2027 시나공 AICE Associate 공식수험서 | 체계적 수험학습 |
| 9~12 | pandas · scikit-learn · TensorFlow · XGBoost 공식 문서 | 기술 사실 |

- **『2027 시나공 AI 능력시험 AICE ASSOCIATE』** (길벗, 2026-07-10, 480쪽): 출판사가 KT 현업 개발자 집필 공식수험서로 소개. 데이터 획득·NumPy/pandas·구조 확인·전처리·AI 모델링·평가와 회귀/분류 실전문제로 구성
- **『혼자 공부하는 머신러닝+딥러닝(개정판)』** (박해선, 2025): ML·DL 핵심 알고리즘 입문 보강
- **『코딩 자율학습 잔재미코딩의 파이썬 데이터 분석 입문』** (2025): pandas 기초가 약할 때
- **『파이썬 라이브러리를 활용한 머신러닝(번역개정2판)』**: scikit-learn 활용 심화, 필요한 장만

[교육용 설명] 공식 학습과정은 약 15시간이지만, 강의 시청은 입력 학습이고 시험은 직접 쓰는 출력 학습입니다. 강의만으로 15시간에 끝내려 하지 말고 이 교재의 실습과 모의고사를 함께 하세요. [S01]

---

# U13. AI 윤리·개인정보 (보조)

### 오늘의 목표

- 이 영역이 시험 직접 비중은 낮은 보조 모듈임을 안다.
- 개인정보를 AI 서비스에 함부로 보내면 안 되는 이유를 설명한다.
- 공개 데이터라도 라이선스를 확인해야 하는 이유를 안다.
- 모델 편향과 책임 있는 데이터 사용의 기본을 안다.

### 시험에서의 위치

[교육용 설명] 현재 확인되는 Associate 공식 학습축은 데이터 분석·전처리·모델링·평가에 집중되어 있고, 윤리·법규가 독립적인 핵심 실기영역이라는 근거는 없습니다. **합격 대비에서는 우선순위가 낮습니다.** 다만 실제 데이터를 다루는 사람이라면 꼭 알아야 할 내용이라 짧게 정리합니다.

### 개인정보와 안전조치

[공식공지] 한국 개인정보 보호 체계에서 개인정보처리자는 개인정보가 분실·도난·유출·위조·변조·훼손되지 않도록 **기술적·관리적·물리적 안전조치**를 해야 합니다. [S20] [S21]

| 원칙 | 실천 |
|---|---|
| 최소 처리 | 분석에 필요한 열만 쓰고, 이름·전화번호 같은 식별자는 지운다 |
| 가명처리 | 고객 ID를 해시나 일련번호로 바꾼다 |
| 외부 전송 주의 | 개인정보가 담긴 데이터를 ChatGPT 등 외부 AI API에 그대로 붙여 넣지 않는다 |
| 접근 통제 | 원본 데이터는 권한 있는 사람만 |

```python
import pandas as pd

raw = pd.DataFrame({"name": ["김OO", "이OO"], "phone": ["010-1", "010-2"], "age": [31, 45], "churn": [0, 1]})
safe = raw.drop(columns=["name", "phone"])   # 분석에 불필요한 식별자 제거
print(safe)
```

### 데이터 라이선스

[교육용 설명] 인터넷에 공개된 데이터라도 **재배포·변형·상업적 이용 권한**은 라이선스마다 다릅니다. 공식 교재나 기출 데이터를 복제해 공유하면 저작권 문제가 됩니다. 이 교재가 합성 데이터를 쓰는 이유입니다.

### 편향과 책임

[교육용 설명] 학습 데이터가 특정 집단에 치우치면 모델도 그 집단에 유리하거나 불리한 판단을 합니다. 예를 들어 과거 대출 승인 데이터에 차별이 있었다면 모델은 그 차별을 그대로 배웁니다.

- 성별·나이 같은 민감 속성이 결과에 부당하게 영향을 주는지 집단별 성능을 나눠 본다
- 모델의 한계(정확도, 데이터 기간)를 함께 기록한다
- 최종 결정에는 사람의 검토를 둔다

### 이해 확인

**Q1. 개인정보가 담긴 CSV를 외부 AI 서비스에 그대로 올리면 안 되는 이유는?**

<details><summary>정답 보기</summary>

개인정보 최소처리 원칙과 안전조치 의무에 어긋나고, 유출 위험이 생깁니다.

</details>

---

# 용어 사전

| 용어 | 뜻 | 처음 나오는 곳 |
|---|---|---|
| AICE | KT 개발·한국경제신문 공동 주관 AI 역량 평가 | U01 |
| Open Book | 시험 중 지정 7개 공식 문서만 참조 가능 | U01 |
| 지도학습 | 정답(label)이 있는 데이터로 학습 | U02 |
| 비지도학습 | 정답 없이 구조(군집 등)를 찾음 | U02 |
| 회귀 (Regression) | 연속값 예측 | U02 |
| 분류 (Classification) | 클래스(범주) 예측 | U02 |
| Feature (X) | 모델 입력 변수 | U02 |
| Target (y) | 모델이 예측할 값 | U02 |
| 일반화 | 처음 보는 데이터에서도 잘 맞히는 능력 | U02 |
| 과적합 (Overfitting) | train에는 좋지만 새 데이터 성능이 낮음 | U02 |
| 과소적합 (Underfitting) | train조차 충분히 학습하지 못함 | U02 |
| Feature Engineering | 기존 열로 새 특성을 만드는 일 | U02 |
| list comprehension | `[식 for x in 반복 if 조건]` 한 줄 리스트 생성 | U03 |
| lambda | 한 줄 익명 함수 | U03 |
| ndarray | NumPy 다차원 배열 | U04 |
| shape | 배열·DataFrame의 크기 (행, 열) | U04 |
| axis | 집계 방향. 0 = 행축을 따라(열별 결과), 1 = 열축을 따라(행별 결과) | U04 |
| Boolean indexing | True/False 배열로 조건에 맞는 값 선택 | U04 |
| seed / random_state | 무작위 결과 고정 → 재현성 | U04 |
| DataFrame | pandas의 2차원 표 | U05 |
| Series | DataFrame의 열 하나 (1차원) | U05 |
| loc | label 기반 선택 (슬라이스 끝 포함) | U05 |
| iloc | 정수 위치 기반 선택 (슬라이스 끝 미포함) | U05 |
| groupby | 그룹별로 나눠 집계 | U05 |
| merge | key 열 기준 결합 | U05 |
| concat | 축을 따라 이어 붙이기 | U05 |
| value_counts | 값별 빈도 (`normalize=True`면 비율) | U05 |
| EDA | 탐색적 데이터 분석 | U06 |
| 중앙값 | 정렬 시 가운데 값, 극단값에 둔감 | U06 |
| 사분위수 | 25%(Q1)·50%·75%(Q3) 지점 | U06 |
| IQR | Q3 − Q1 | U06 |
| 왜도 | 분포의 치우침 정도 | U06 |
| 상관계수 | 두 변수의 선형 관계 (−1 ~ 1) | U06 |
| 불균형 데이터 | 클래스 비율이 한쪽으로 크게 치우친 데이터 | U06 |
| 결측치 | 비어 있는 값 (NaN) | U07 |
| dropna / fillna | 결측 행 제거 / 결측값 대체 | U07 |
| 이상치 | 다른 값들과 크게 동떨어진 값 | U07 |
| One-hot Encoding | 범주마다 0/1 indicator 열 생성 | U07 |
| Label Encoding | 범주마다 정수 부여 | U07 |
| get_dummies | pandas의 one-hot 변환 함수 | U07 |
| StandardScaler | 평균 0·표준편차 1로 표준화 | U07 |
| MinMaxScaler | 최솟값 0·최댓값 1 범위로 변환 | U07 |
| fit / transform | 변환 규칙 학습 / 규칙 적용 | U07 |
| Data Leakage | 학습 때 test·정답 정보가 새어 들어감 | U07 |
| Pipeline | 전처리와 모델을 한 객체로 묶음 | U07 |
| train_test_split | train/test 분할 함수 | U08 |
| stratify | 분할 시 클래스 비율 유지 | U08 |
| LinearRegression | 선형회귀 모델 | U08 |
| LogisticRegression | 이진분류 대표 선형 모델 | U08 |
| Decision Tree | 임계값 질문으로 나누는 모델 | U08 |
| Random Forest | 여러 트리의 투표 (bagging 앙상블) | U08 |
| Boosting | 이전 모델의 오류를 순차적으로 보완하는 앙상블 | U08 |
| XGBoost | 대표적인 gradient boosting 라이브러리 | U08 |
| predict_proba | 클래스별 확률 예측 | U08 |
| 하이퍼파라미터 | 학습 전에 사람이 정하는 설정값 | U08 |
| 교차검증 | 데이터를 돌아가며 나눠 검증 | U08 |
| Sequential | Keras의 층을 순서대로 쌓는 모델 | U09 |
| Dense | 완전연결층 | U09 |
| ReLU | 음수는 0, 양수는 그대로 내보내는 activation | U09 |
| sigmoid | 0~1 확률을 내는 activation (이진분류 출력) | U09 |
| softmax | 클래스별 확률(합 1)을 내는 activation (다중분류 출력) | U09 |
| binary_crossentropy | 이진분류 loss | U09 |
| epoch | 전체 train 데이터를 한 번 학습하는 주기 | U09 |
| batch_size | 한 번 가중치를 갱신할 때 쓰는 샘플 수 | U09 |
| EarlyStopping | 검증 성능이 나아지지 않으면 학습 중단 | U09 |
| MAE | 절대오차 평균 | U10 |
| MSE | 제곱오차 평균, 큰 오차에 큰 벌점 | U10 |
| RMSE | MSE의 제곱근, target과 같은 단위 | U10 |
| R² | 결정계수, 분산 설명력 | U10 |
| 혼동행렬 | TP·TN·FP·FN 표 | U10 |
| Accuracy | 전체 중 맞힌 비율 | U10 |
| Precision | 양성 예측 중 진짜 양성 비율 | U10 |
| Recall | 실제 양성 중 찾아낸 비율 | U10 |
| F1 | Precision과 Recall의 조화평균 | U10 |
| threshold | 확률을 클래스로 자르는 기준값 (기본 0.5) | U10 |
| class_weight | 적은 클래스에 가중치를 더 주는 옵션 | U11 |
| Readiness | 응시 준비도 자기 점검 점수 | U12 |
| 가명처리 | 식별자를 다른 값으로 바꿔 개인을 알아보기 어렵게 함 | U13 |

---

# 반드시 구분해야 할 개념

| 혼동하기 쉬운 것 | 정확한 구분 |
|---|---|
| `loc` / `iloc` | label 기반 / integer position 기반 |
| `dropna` / `fillna` | 결측행 제거 / 결측값 대체 |
| `merge` / `concat` | key 기반 결합 / 축 기반 연결 |
| Label Encoding / One-hot | 정수 label 부여 / 범주별 indicator 생성 |
| StandardScaler / MinMaxScaler | 평균 0·표준편차 기반 / 지정 범위로 선형변환 |
| `fit` / `transform` | 변환 규칙 학습 / 규칙 적용 |
| Regression / Classification | 연속값 예측 / 클래스 예측 |
| `predict` / `predict_proba` | 결정된 예측 / 클래스 확률 |
| Accuracy / Recall | 전체 정답률 / 실제 양성 중 탐지율 |
| MSE / RMSE | 제곱오차 평균 / MSE 제곱근 |
| epoch / batch | 전체 데이터 학습 주기 / 한 번에 처리할 일부 데이터 |
| parameter / hyperparameter | 학습으로 추정 / 학습 전 설정 |
| Bagging / Boosting | 병렬로 여러 모델 투표 / 순차적으로 오류 보완 |
| `&` / `and` | pandas 조건 결합 / Python 기본 논리 |

# 문제 유형별 지표와 출력층

| 문제 | 주요 지표 | DL 마지막 층 | loss |
|---|---|---|---|
| 회귀 | MAE/MSE/RMSE/R² | Dense(1) | mse |
| Binary Classification | Accuracy/F1/Recall 등 | Dense(1, sigmoid) | binary_crossentropy |
| Multi-class | Accuracy/F1 등 | Dense(K, softmax) | (sparse_)categorical_crossentropy |

# 시험 직전 체크리스트

`read_csv()` → `head()` → `shape` → `info()` → `describe()` → `isna().sum()` → `value_counts()` → 조건 필터링 → groupby → merge → 결측값 처리 → 이상치 처리 → 범주형 encoding → Feature/Target 분리 → train/test split → scaling → 모델 생성 → `fit()` → `predict()` → 평가 → 모델 비교

- [ ] 허용 문서 7개 이름과 위치를 안다
- [ ] split 전에 fit하는 코드가 없다 (median, scaler)
- [ ] test에 `fit_transform`을 쓰지 않았다
- [ ] 분류 split에 `stratify=y`를 넣었다
- [ ] 회귀에는 회귀 지표, 분류에는 분류 지표를 썼다
- [ ] 문제에서 지정한 변수명·`random_state`·`test_size`를 그대로 썼다
- [ ] DNN 출력층과 loss가 문제 유형에 맞다

# 핵심 압축 요약

AICE Associate 합격을 위해 가장 먼저 익혀야 할 것은 **Python 문법 자체보다 Python을 이용한 데이터 분석 과정 전체**다. `pandas로 데이터 불러오기 → 데이터 구조·결측·분포 확인 → 전처리 → train/test 분리 → scaling/encoding → 머신러닝 또는 딥러닝 학습 → metric 평가`를 하나의 흐름으로 반복해야 한다.

시험은 Open Book이지만 자유 검색이 아니라 NumPy·pandas·Matplotlib·Seaborn·scikit-learn·TensorFlow·XGBoost 공식문서만 허용되므로, **공식 API 문서를 검색하는 훈련도 시험공부의 일부**다. ChatGPT·Google 검색·개인노트·교재·듀얼모니터는 시험 중 사용할 수 없다. [S01]

준비도는 강의 진도율이 아니라 **실제 문제 정확도와 시간 제한 모의고사 성적**으로 판단한다. 마지막 1~2주는 90분 모의고사와 오답 재실행에 집중한다.
