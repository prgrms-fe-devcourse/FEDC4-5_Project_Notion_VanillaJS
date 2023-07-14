import { postDocument } from '../../api';
import Button from '../../components/ui/Button';
import DocumentTreeRoot from './DocumentTreeRoot';
import { proxiedDocuments } from '../../domain/proxiedDocuments';
import { RouteService } from '../../utils/RouteService';
import validateComponent from '../../utils/validateComponent';

export default function SideBar({ targetElement, documents }) {
  validateComponent(this, SideBar);
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.state = {
    documents,
  };

  this.setState = (nextState) => {
    this.state = { ...nextState };
    this.render();
  };

  this.render = () => {
    targetElement.innerHTML = `
      <div class="side-bar-header">📘 이진욱의 Notion</div>
      <div class="document-tree-root"></div>
      <button class="new-root-document-btn"></button>
    `;
    const [, documentTreeRootElement, newRootDocumentBtnElement] = targetElement.children;

    new DocumentTreeRoot({
      targetElement: documentTreeRootElement,
      documents: this.state.documents,
    });
    new Button({
      targetElement: newRootDocumentBtnElement,
      textContent: '새 문서',
      onClick: async () => {
        const router = new RouteService();
        const { id } = await postDocument({ title: '', parent: null });
        proxiedDocuments.staleTime = 0;
        router.push(`/documents/${id}`);
      },
    });
  };

  this.init();
}
