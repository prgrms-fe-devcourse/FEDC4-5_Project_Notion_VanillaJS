import Editor from "../components/editor/Editor.js";
import Sidebar from "../components/sidebar/Sidebar.js";
import Toolbar from "../components/toolbar/Toolbar.js";
import { API_WAIT_TIME } from "../constants/constants.js";
import Component from "../core/Component.js";
import { deleteDocument, editDocument, fetchContent, fetchDocuments, postNewDocument, request } from "../utils/api.js";
import { pushHistory, replaceHistory } from "../utils/router.js";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "../utils/storage.js";

export default class MainPage extends Component{
  titleTimer = null;
  contentTimer = null;
  init = false;

  async setup(id){
    if(!this.init) {
      this.state = this.props;
    }
    await this.setState({id});
  }

  async setState(nextState){
    const {id} = nextState;
    const documents = await fetchDocuments();
    const documentContent = await fetchContent(id, this.getPostLocalSaveKey(id));
    this.state = {...this.state, ...nextState, documents, documentContent, id};
    this.render();
  }

  template(){
    return `
    <div class="sidebar"></div>
    <div class="contentSide">
      <div class="toolbar"></div>
      <div class="editor"></div>
    </div>
    `;
  }

  mounted(){
    const {onEdit, onClickAdd, onClickDocument, onClickDelete, onClickBreadcrumb} = this;
    const $sidebar = this.$target.querySelector(".sidebar");
    const $toolbar = this.$target.querySelector(".toolbar");
    const $editor = this.$target.querySelector(".editor");

    new Sidebar($sidebar, {
      id : this.state.id,
      documents : this.state.documents,
      onClickAdd : onClickAdd.bind(this),
      onClickDelete : onClickDelete.bind(this),
      onClickDocument : onClickDocument.bind(this),
      onClickBreadcrumb : onClickBreadcrumb.bind(this)
    });

    if(this.state.id){
      new Toolbar($toolbar, {
        onEdit : onEdit.bind(this)
      });
      new Editor($editor, {
        documentContent : this.state.documentContent,
        onEdit : onEdit.bind(this),
        onClickDocument : onClickDocument.bind(this),
        onClickAdd : onClickDocument.bind(this)
      })
    }
  }

  getPostLocalSaveKey (id){
    return `temp-post-${id}`;  
  }

  async onClickAdd (id){
    const {id : newId} = await postNewDocument(id);
    pushHistory(`/documents/${newId}`);
  }

  async onClickDelete (id){
    await deleteDocument(id);
    if(id === this.state.id){
      replaceHistory("/");
      return;
    }
    this.setState(this.state);
  }

  onClickDocument (id){
    pushHistory(`/documents/${id}`);
  }

  onClickBreadcrumb(id){
    const $targetContent = document.querySelector(`#children-${id}`);
    if($targetContent.style.display === "block" || $targetContent.style.display === ""){
      $targetContent.style.display = "none";
    }else{
      $targetContent.style.display = "block";
    }
  }

  onEdit(post){
    const {id} = this.state;
    if(this.titleTimer !== null){
      clearTimeout(this.titleTimer);
    }
    setLocalStorageItem(this.getPostLocalSaveKey(id), {
      ...post
    })
    this.titleTimer = setTimeout(async () => {
      await editDocument(id, post);
      removeLocalStorageItem(this.getPostLocalSaveKey(id));
    }, API_WAIT_TIME)
  }
}