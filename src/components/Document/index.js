import { putDocument } from '../../api';
import { convertMarkdownToHTML } from '../../utils/convertMarkdownToHTML';
import debounce from '../../utils/debounce';
import validateComponent from '../../utils/validateComponent';
import Button from '../ui/Button';
import SubDocumentLinks from './SubDocumentLinks';

export default function Document({ targetElement, documentData, handleEditTitle, handleAsyncEditTitle }) {
  validateComponent(this, Document);
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
  };

  this.state = {
    documentData,
    preview: true,
  };

  this.setState = (nextState) => {
    this.state = { ...nextState };
    this.render();
  };

  this.setEvent = () => {
    const debouncedInputHandler = debounce(async (e) => {
      const { title, content } = this.state.documentData;

      await putDocument(documentData.id, {
        title,
        content,
      });

      if (e.target.classList.contains('document-title')) {
        handleAsyncEditTitle();
      }
    }, 500);

    targetElement.addEventListener('input', (e) => {
      const [documentHeaderElement, contentElement] = targetElement.children;
      const [titleElement] = documentHeaderElement.children;

      this.state.documentData.title = titleElement.value;
      this.state.documentData.content = contentElement.value;

      if (e.target.classList.contains('document-title')) {
        handleEditTitle(documentData.id, titleElement.value);
      }
      debouncedInputHandler(e);
    });
  };

  this.render = () => {
    const { documentData, preview } = this.state;
    const { title, content, documents } = documentData;
    targetElement.innerHTML = `
      <div class="document-header">
        <input class="document-title" type="text" placeholder="제목 없음"/>
        <button class="preview-btn"></button>
      </div>
      <textarea class="document-content"></textarea>
      <div class="document-preview"></div>
      <div class="sub-document-links"></div>
    `;
    const [documentHeaderElement, documentContentElement, documentPreviewElement, subDocumentLinksElement] =
      targetElement.children;
    const [documentTitleElement, previewBtnElement] = documentHeaderElement.children;

    documentTitleElement.value = title;
    documentContentElement.value = content;
    documentPreviewElement.innerHTML = convertMarkdownToHTML(content);

    new Button({
      targetElement: previewBtnElement,
      textContent: preview ? '편집하기' : '미리보기',
      onClick: () => this.setState({ ...this.state, preview: !this.state.preview }),
    });

    new SubDocumentLinks({ targetElement: subDocumentLinksElement, subDocuments: documents });

    if (this.state.preview) {
      documentContentElement.style.display = 'none';
    } else {
      documentPreviewElement.style.display = 'none';
    }

    documentContentElement.focus();
  };

  this.init();
}
