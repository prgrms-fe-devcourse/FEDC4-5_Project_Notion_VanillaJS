import ChildrenList from "./ChildrenList.js";
import DocumentEditor from "./DocumentEditor.js";
import { request } from "../../../services/api.js";
import DocumentList from "./DocumentList.js";

export default function DocumentDetailPage({ $target, reRenderDocList }) {
  const $detailPageWrapper = document.createElement('div');
  $target.appendChild($detailPageWrapper);

  this.state = {}

  this.setState = async (documentId = null) => {
    const res = await request(`/documents/${documentId}`);
    this.state = res;
    this.render();
  }

  let timer = null;

  const documentEditor = new DocumentEditor({
    $target: $detailPageWrapper,
    onEditing: (state) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const res = await request(`/documents/${state.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: state.title,
            content: state.content
          }),
        })
        reRenderDocList();
      }, 1000);
    }
  })

  const childrenList = new ChildrenList({ $target: $detailPageWrapper })

  this.render = () => {
    documentEditor.setState(this.state);
    childrenList.setState(this.state.documents);
  }
}