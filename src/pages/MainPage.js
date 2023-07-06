import Editor from "../components/Editor.js";
import Sidebar from "../components/Sidebar.js";
import Toolbar from "../components/Toolbar.js";
import { API_WAIT_TIME } from "../constants/constants.js";
import Component from "../core/Component.js";
import { request } from "../utils/api.js";
import { pushHistory, replaceHistory } from "../utils/router.js";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "../utils/storage.js";

export default class MainPage extends Component{
  titleTimer = null;
  contentTimer = null;
  init = false;
  documents = null;

  async setup(id){
    if(!this.init) {
      this.state = this.props;
    }
    await this.setState({id});
  }

  async setState(nextState){
    const {id} = nextState;
    const documents = await this.fetchDocuments();
    const documentContent = await this.fetchContent(id);
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
    const {onEditTitle,onEditContent, onClickAdd, onClickDocument, onClickDelete} = this;
    const $sidebar = this.$target.querySelector(".sidebar");
    const $toolbar = this.$target.querySelector(".toolbar");
    const $editor = this.$target.querySelector(".editor");

    new Sidebar($sidebar, {
      id : this.state.id,
      documents : this.state.documents,
      onClickAdd : onClickAdd.bind(this),
      onClickDelete : onClickDelete.bind(this),
      onClickDocument : onClickDocument.bind(this)  
    });

    if(this.state.id){
      new Toolbar($toolbar, {
        onEditContent : onEditContent.bind(this)
      });
      new Editor($editor, {
        documentContent : this.state.documentContent,
        onEditTitle : onEditTitle.bind(this),
        onEditContent : onEditContent.bind(this),
        onClickDocument : onClickDocument.bind(this),
        onClickAdd : onClickDocument.bind(this)
      })
    }
  }

  getPostLocalSaveKey (id){
    return `temp-post-${id}`;  
  }

  async onClickAdd (id){
    const newDocument = {
      title : "제목 없음",
      parent : id,
    }
    const {id : newId} = await request("/documents", {
      method : "POST",
      body : JSON.stringify(newDocument)
    })
    pushHistory(`/documents/${newId}`);
  }

  async onClickDelete (id){
    await request(`/documents/${id}`, {
      method : "DELETE"
    })
    if(id === this.state.id){
      replaceHistory("/");
      return;
    }
    this.setState(this.state);
  }

  onClickDocument (id){
    pushHistory(`/documents/${id}`);
  }

  onEditTitle(post){
    const {id} = this.state;
    if(this.titleTimer !== null){
      clearTimeout(this.titleTimer);
    }
    document.querySelector(".selected-document-title").textContent = post.title;
    setLocalStorageItem(this.getPostLocalSaveKey(id), {
      ...post,
      tempSaveDate : new Date()
    })
    this.titleTimer = setTimeout(async () => {
      await request(`/documents/${id}`, {
        method : "PUT",
        body : JSON.stringify(post)
      })
      removeLocalStorageItem(this.getPostLocalSaveKey(id));
    }, API_WAIT_TIME)
  }

  onEditContent(post){
    const {id} = this.state;
    if(this.contentTimer !== null){
      clearTimeout(this.contentTimer);
    }
    setLocalStorageItem(this.getPostLocalSaveKey(id), {
      ...post,
      tempSaveDate : new Date()
    })
    this.contentTimer = setTimeout(async () => {
      await request(`/documents/${id}`, {
        method : "PUT",
        body : JSON.stringify(post)
      })
      removeLocalStorageItem(this.getPostLocalSaveKey(id));
    }, API_WAIT_TIME)
  }

  async fetchDocuments(){
    return await request("/documents");
  }

  async fetchContent(id){
    if(!id) return null;
    const tempContent = getLocalStorageItem(this.getPostLocalSaveKey(id), null);
    if(tempContent){
      if(confirm("저장된 작성글이 있습니다. 불러올까요?")){
        return tempContent;
      }else{
        return await request(`/documents/${id}`);
      }
    }
    return await request(`/documents/${id}`);
  }
}