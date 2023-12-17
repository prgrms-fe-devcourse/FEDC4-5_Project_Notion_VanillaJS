## 📌 프로젝트 설명

Vanilla JS를 사용하여 노션 클로닝 프로젝트를 진행하였습니다.

[배포 링크](https://fedc-4-5-project-notion-vanilla-js-dudwns.vercel.app/)

![image](https://github.com/prgrms-fe-devcourse/FEDC4-5_Project_Notion_VanillaJS/assets/39931980/1b95f80b-6fb0-4ec7-bc34-5b5440bfb7be)

![image](https://github.com/prgrms-fe-devcourse/FEDC4-5_Project_Notion_VanillaJS/assets/39931980/ea5a3800-4e7a-4431-ae45-c49bc39e7d50)

## 👩‍💻 요구 사항과 구현 내용

- [x] 바닐라 JS만을 이용해 노션을 클로닝 합니다.

- [x] 기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러 값 등은 원하는 대로 커스텀 합니다.

- [x] 글 단위를 Document라고 합니다. Document는 Document 여러 개를 포함할 수 있습니다.

- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링 합니다.

- [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링 합니다.

- [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.

- [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.

- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.

- [x] History API를 이용해 SPA 형태로 만듭니다.

- [x] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.

- [x] /documents/{documentId} 로 접속 시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

- [x] 기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich 한 에디터를 만들어봅니다.

- [x] 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.

- [x] 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.
