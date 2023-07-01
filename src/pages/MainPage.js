import Editor from "../components/Editor.js";
import Sidebar from "../components/Sidebar.js";
import Component from "../core/Component.js";
import { request } from "../utils/api.js";
import { push, replace } from "../utils/router.js";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "../utils/storage.js";

export default class MainPage extends Component{
  timer = null;
  async setup(id){
    this.state = this.props;
    const documents = await this.fetchDocuments();
    const documentContent = await this.fetchContent(id);
    this.setState({id, documents, documentContent});
  }

  template(){
    return `
    <div class="sidebar"></div>
    <div class="editor"></div>
    `;
  }

  mounted(){
    const {onEditTitle,onEditContent, onClickAdd, onClickDocument, onClickDelete} = this;
    const $sidebar = this.$target.querySelector(".sidebar");
    const $editor = this.$target.querySelector(".editor");

    if(!this.state.id) $editor.style.visibility = "hidden"; 

    new Sidebar($sidebar, {
      id : this.state.id,
      documents : this.state.documents,
      onClickAdd : onClickAdd.bind(this),
      onClickDelete : onClickDelete.bind(this),
      onClickDocument : onClickDocument.bind(this)  
    });

    new Editor($editor, {
      title : this.state.documentContent?.title,
      content : this.state.documentContent?.content,
      onEditTitle : onEditTitle.bind(this),
      onEditContent : onEditContent.bind(this)
    })
  }

  get postLocalSaveKey () {
    return `temp-post-${this.state.id}`;
  }

  async onClickAdd (id){
    const newDocument = {
      title : "빈 제목",
      parent : id,
    }

    const {id : newId} = await request("/documents", {
      method : "POST",
      body : JSON.stringify(newDocument)
    })
    push(`/documents/${newId}`);
    await this.fetchDocuments();
    await this.fetchContent();
  }

  async onClickDelete (id){
    await request(`/documents/${id}`, {
      method : "DELETE"
    })
    const documents = await this.fetchDocuments();
    if(id === this.state.id){
      replace("/");
      this.setState({documents, id : null, documentContent : null});
      return;
    }
    this.setState({documents});
  }

  async onClickDocument (id){
    push(`/documents/${id}`);
    await this.fetchContent(id);
  }

  onEditTitle(post, $input){
    const {id} = this.state;
    if(this.timer !== null){
      clearTimeout(this.timer);
    }
    document.querySelector(".selected-document-span").textContent = post.title;
    this.timer = setTimeout(async () => {
      setLocalStorageItem(this.postLocalSaveKey, {
        ...post,
        tempSaveDate : new Date()
      })
      await request(`/documents/${id}`, {
        method : "PUT",
        body : JSON.stringify(post)
      })
      await this.fetchDocuments();
      removeLocalStorageItem(this.documentLocalSaveKey);
      $input.focus();
    }, 500)
  }

  onEditContent(post, $input){
    const {id} = this.state;
    if(this.timer !== null){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(async () => {
      setLocalStorageItem(this.postLocalSaveKey, {
        ...post,
        tempSaveDate : new Date()
      })
      await request(`/documents/${id}`, {
        method : "PUT",
        body : JSON.stringify(post)
      })
      removeLocalStorageItem(this.postLocalSaveKey);
      $input.focus();
    }, 500)
  }

  async fetchDocuments(){
    return await request("/documents");
  }

  async fetchContent(id){
    if(!id) return null;
    const documentContent = await request(`/documents/${id}`);
    const tempContent = getLocalStorageItem(this.postLocalSaveKey, null);
    if(tempContent && tempContent.tempSaveDate > documentContent.updatedAt){
      if(confirm("저장된 작성글이 있습니다. 불러올까요?")){
        return tempContent;
      }
    }
    return documentContent;
  }
}