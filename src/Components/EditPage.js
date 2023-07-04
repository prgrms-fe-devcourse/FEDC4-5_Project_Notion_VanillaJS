import { createDomElementWithId } from "../utils/dom.js";
import { getDocumentAPI, modifyDocumentAPI } from "../utils/api.js";
import {
  removeItemFromStorage,
  setItemToStorage,
  getItemFromStorage,
} from "../utils/storage.js";

export default function EditPage({ target, initialState, updateSideBar }) {
  const divElement = document.createElement("div");
  divElement.id = "editPage";
  target.appendChild(divElement);

  const titleElement = createDomElementWithId("input", "title");
  titleElement.type = "text";
  divElement.appendChild(titleElement);

  const contentElement = createDomElementWithId("textArea", "content");
  divElement.appendChild(contentElement);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState; // state에서 selectedDocumentId 변경해주고
    this.render(); // 이에 따라 title과 content 내용은 render에서 업데이트
  };

  let timerForTitle = null;
  let timerForContent = null;

  titleElement.addEventListener("keyup", (e) => {
    // title이 바뀔때마다 바로바로 local Storage에 저장
    setItemToStorage(this.state.selectedDocumentId, {
      title: e.target.value,
      content: contentElement.value,
      tempSaveDate: new Date(),
    });

    // 2초가 지나면, 서버에 저장, local에서는 삭제, sideBar document List업데이트
    if (timerForTitle != null) {
      clearTimeout(timerForTitle);
    }
    timerForTitle = setTimeout(async () => {
      await modifyDocumentAPI(
        this.state.selectedDocumentId,
        e.target.value,
        contentElement.value
      );
      removeItemFromStorage(this.state.selectedDocumentId);
      updateSideBar();
    }, 2000);
  });

  contentElement.addEventListener("keyup", (e) => {
    // content가 바뀔때마다 바로바로 local Storage에 저장
    setItemToStorage(this.state.selectedDocumentId, {
      title: titleElement.value,
      content: e.target.value,
      tempSaveDate: new Date(),
    });

    // 2초가 지나면, 서버에 저장, local에서는 삭제, sideBar document List업데이트
    if (timerForContent != null) {
      clearTimeout(timerForContent);
    }
    timerForContent = setTimeout(async () => {
      await modifyDocumentAPI(
        this.state.selectedDocumentId,
        titleElement.value,
        e.target.value
      );
      removeItemFromStorage(this.state.selectedDocumentId);
      updateSideBar();
    }, 2000);
  });

  this.render = async () => {
    if (this.state.selectedDocumentId) {
      // 현재 선택된 documentId가 있을 때

      // 서버의 documenet data
      const { title, content, documents, updatedAt } = await getDocumentAPI(
        this.state.selectedDocumentId
      );

      // 로컬의 document data
      const tempDocument = getItemFromStorage(
        this.state.selectedDocumentId,
        null
      );

      if (tempDocument && tempDocument.tempSaveDate > updatedAt) {
        // 현재 selectedDocumentId에 대한 temp document가 있고, 로컬 스토리지의 data가 서버보다 최신이라면
        if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
          // 불러온다고 하면, 로컬 스토리지 값을
          // 1. content, title value로 설정
          titleElement.value = tempDocument.title;
          contentElement.value = tempDocument.content;

          // 2. 서버에 저장
          await modifyDocumentAPI(
            this.state.selectedDocumentId,
            tempDocument.title,
            tempDocument.content
          );
          // 3.로컬 스토리지 삭제
          removeItemFromStorage(this.state.selectedDocumentId);

          // 4. sidebar 렌더링 ?
          updateSideBar();
          return;
        }
      }

      // 로컬 스토리지 값이 없거나 최신이 아니거나, 안 불러온다면 => 서버의 값을 value로 설정, 로컬 스토리지 삭제
      titleElement.value = title;
      contentElement.value = content;
      removeItemFromStorage(this.state.selectedDocumentId);
      console.log(`documents: ${documents}`);
    } else {
      // null일 때는 mainPage 렌더링
      titleElement.value = "노션 메인 페이지입니다 ! "
      contentElement.value = "노션 페이지 입니다 ! ";
      console.log(`not selected`);
    }
  };

  this.render();
}
