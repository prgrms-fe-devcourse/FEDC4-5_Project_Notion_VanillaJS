# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 6월 27일(화) ~ 2023년 7월 6일(목)
  - 멘티 코드 리뷰 기간 : 2023년 7월 7일(금) ~ 2023년 7월 10일(월)
  - 멘토 코드 리뷰 기간 : 2023년 7월 7일(금) ~ 2023년 7월 13일(목)
  - 코드 리뷰 반영 기간 : 2023년 7월 14일(금) ~ 2023년 7월 17일(월)
- 내용
  - [[Day 19] 노션 클로닝 요구사항](https://school.programmers.co.kr/app/courses/17516/curriculum/lessons/196456#part-46365)을 확인해 주세요.

### 프로젝트 구조

### 기본 요구사항

- 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.

- Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.

- 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.

- Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.

- 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.

- History API를 이용해 SPA 형태로 만듭니다.

- 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.

- /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.
