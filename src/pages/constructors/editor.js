import { Editor } from '../../components/index.js';

const selection = window.getSelection();

export default function createEditor() {
  const { $target, documentStore, editorStore } = this;

  return new Editor({
    $target: $target.querySelector('.main__editor'),
    initialState: editorStore.state.document,
    onChange: ({ name, value }) => {
      const newDocument = {
        ...editorStore.state.document,
        [name]: value,
        updateAt: new Date(),
      };

      editorStore.setState({ ...editorStore.state, document: newDocument });
      editorStore.saveDocument();
      documentStore.updateDocument(editorStore.state.documentId, newDocument);

      this.renderSidebar();
      this.renderBreadcrumb();
    },
    onOpenStyleMenu: (e) => {
      setTimeout(() => {
        if (selection.toString().trim().length > 0) {
          this.styleMenu.setState({
            ...this.styleMenu.state,
            pageX: e.pageX,
            pageY: e.pageY,
            isShowMenu: true,
            isShowTextMenu: false,
          });
        }
      }, 0);
    },
    onCloseStyleMenu: (e) => {
      this.styleMenu.setState({
        ...this.styleMenu.state,
        isShowMenu: false,
        isShowTextMenu: false,
      });
    },
  });
}
