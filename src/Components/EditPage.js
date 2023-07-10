import { createDomElementWithId } from "../utils/dom.js";
import { getDocumentAPI, modifyDocumentAPI } from "../utils/api.js";
import {
  removeTempDocumentFromStorage,
  setTempDocumentToStorage,
  getTempDocumentFromStorage,
} from "../utils/storage.js";
import {
  CONFIRM_MESSAGE,
  MAIN_PAGE_CONTENT,
  MAIN_PAGE_TITLE,
} from "../utils/strings.js";

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
    this.state = nextState;
    this.render();
  };

  let timerForTitle = null;
  let timerForContent = null;

  titleElement.addEventListener("keyup", (e) => {
    if (this.state.selectedDocumentId) {
      setTempDocumentToStorage(this.state.selectedDocumentId, {
        title: e.target.value,
        content: contentElement.value,
        tempSaveDate: new Date(),
      });

      if (timerForTitle != null) {
        clearTimeout(timerForTitle);
      }
      timerForTitle = setTimeout(async () => {
        await modifyDocumentAPI(
          this.state.selectedDocumentId,
          e.target.value,
          contentElement.value
        );
        removeTempDocumentFromStorage(this.state.selectedDocumentId);
        updateSideBar();
      }, 2000);
    }
  });

  contentElement.addEventListener("keyup", (e) => {
    if (this.state.selectedDocumentId) {
      setTempDocumentToStorage(this.state.selectedDocumentId, {
        title: titleElement.value,
        content: e.target.value,
        tempSaveDate: new Date(),
      });

      if (timerForContent != null) {
        clearTimeout(timerForContent);
      }
      timerForContent = setTimeout(async () => {
        await modifyDocumentAPI(
          this.state.selectedDocumentId,
          titleElement.value,
          e.target.value
        );
        removeTempDocumentFromStorage(this.state.selectedDocumentId);
        updateSideBar();
      }, 2000);
    }
  });

  this.render = async () => {
    if (this.state.selectedDocumentId) {
      const { title, content, updatedAt } = await getDocumentAPI(
        this.state.selectedDocumentId
      );

      const tempDocument = getTempDocumentFromStorage(
        this.state.selectedDocumentId,
        null
      );

      if (tempDocument && tempDocument.tempSaveDate > updatedAt) {
        if (confirm(CONFIRM_MESSAGE(title))) {
          titleElement.value = tempDocument.title;
          contentElement.value = tempDocument.content;

          await modifyDocumentAPI(
            this.state.selectedDocumentId,
            tempDocument.title,
            tempDocument.content
          );

          removeTempDocumentFromStorage(this.state.selectedDocumentId);
          updateSideBar();
          return;
        }
      }

      titleElement.value = title;
      contentElement.value = content;
      titleElement.disabled = false;
      contentElement.disabled = false;
      removeTempDocumentFromStorage(this.state.selectedDocumentId);
    } else {
      titleElement.value = MAIN_PAGE_TITLE;
      contentElement.value = MAIN_PAGE_CONTENT;
      titleElement.disabled = true;
      contentElement.disabled = true;
    }
  };

  this.render();
}
