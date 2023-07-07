# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 6월 27일(화) ~ 2023년 7월 6일(목)
  - 멘티 코드 리뷰 기간 : 2023년 7월 7일(금) ~ 2023년 7월 10일(월)
  - 멘토 코드 리뷰 기간 : 2023년 7월 7일(금) ~ 2023년 7월 13일(목)
  - 코드 리뷰 반영 기간 : 2023년 7월 14일(금) ~ 2023년 7월 17일(월)
- 내용
  - [[Day 19] 노션 클로닝 요구사항](https://school.programmers.co.kr/app/courses/17516/curriculum/lessons/196456#part-46365)을 확인해 주세요.

# 구현내용

## App 페이지

라우트로 SPA 동작을 담당한다.

Document List와 Document Content 의 연결을 담당한다.

- [x] Document List 클릭 시 Documnet Content 를 호출한다.

### history 로 SPA 만들기

- [x] 페이지를 바꾸면 각 url 을 url 창에 표시한다.
- [x] history API 로 뒤로가기, 앞으로 가기를 구현한다.

## Document List 페이지

Root Document 리스트를 호출하여 출력하고, 해당 도큐먼트들의 하위 리스트들을 관리한다.

### 기본 구현

- [x] List Page 를 생성한다.

- [x] List 컴포넌트를 생성한다.
  - [x] li 태그 안에 + 토글 버튼과 > 토글 버튼을 생성한다.
  - [x] li 태그 안에 Document 의 제목을 출력한다.
  - [x] 토글 버튼이 아닌 제목을 클릭하면 해당 페이지를 렌더링 한다. 

### 하위 list 불러오기

- [x] > 토글 버튼을 클릭하면 하위 document 를 가져온다.
  - [x] 토글 버튼에 이벤트를 추가한다.
  - [x] 클릭한 document 의 하위 document 를 가져온다.
  - [x] open document 목록에 해당 document 를 추가한다.
  - [x] open document 에 맞춰 컴포넌트를 새로 렌더링 한다.

### 글 삭제

- [x] List 컴포넌트에 삭제버튼을 추가한다.
  - [x] li 태그 안에 삭제 버튼을 생성한다.
  - [x] 삭제버튼을 클릭하면 삭제 API 를 호출한다.
  - [x] 삭제가 완료되면 list 를 새로 그린다.

### 글 추가

- [x] + 버튼을 누르면 도큐먼트에 하위 doucment 를 생성한다.
 - [x] + 토글 버튼에 이벤트를 추가한다.
 - [x] 클릭한 document 에 하위 document 를 가져온다.
 - [x] 하위 document 에 새 document 를 추가한다.
 - [x] 새로운 편집 페이지를 생성한다.
 - [x] 새로운 편집 페이지를 모달 형태로 만든다.

## Document Content 페이지

어떤 이벤트에 의해 해당 도큐먼트의 내용을 그린다.

### 기본 구현

- [x] Edit Page 를 생성한다.
- [x] Edit Component 를 생성한다.
  - [x] 제목을 출력한다.
  - [x] 본문을 출력한다.

### 글 편집

- [x] Edit 컴포넌트에서 수정 기능을 추가한다.
  - [x] 디바운스로 자동저장 API 를 호출하여 저장한다.

## 추가 기능

- [x] div 와 contentEditable 을 이용하여 편집기능을 업그레이드 한다.
- [x] 편집기 최하단에는 현재 편집 중인 document 의 하위 document 링크를 렌더링한다.
- [x] 편집 시 제목을 수정하면 따라서 List 에 있는 제목도 수정한다.
- [x] 낙관적 업데이트를 한다.
- [x] 리팩토링을 한다.
  - [x] 변수 명 수정하기
  - [x] 컴포넌트 분리하기
  - [x] todo 목록 완성하기
  - [x] 예외처리 하기
- [x] CSS 작업을 한다.