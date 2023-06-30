import Editor from "../components/Editor.js";
import Sidebar from "../components/Sidebar.js";
import { request } from "../utils/api.js";
import { push, replace } from "../utils/router.js";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "../utils/storage.js";

export default function MainPage({$target, initialState}){
  const $page = document.createElement("div");
  this.state = initialState;
  const getPostLocalSaveKey = (id) =>{
    return `temp-post-${id}`;
  } 
  
  const fetchDocuments = async () => {
    const documents = await request("/documents");
    this.setState({
      ...this.state,
      documents      
    })
  }

  const fetchContent = async (id) => {
    const documentContent = await request(`/documents/${id}`);
    const tempContent = getLocalStorageItem(getPostLocalSaveKey(id), null);
    if(tempContent && tempContent.tempSaveDate > documentContent.updatedAt){
      if(confirm("저장된 작성글이 있습니다. 불러올까요?")){    
        this.setState({
          ...this.state,
          id,
          tempContent
        })
        return;
      }
    }
    this.setState({
      ...this.state,
      id,
      documentContent
    })
  }

  this.setState = (nextState) => {
    const currentId = this.state.id;
    this.state = nextState;
    sideBar.setState({
      documents : this.state.documents, 
      selectedId : this.state.id
    });
    if(currentId !== nextState.id){
      editor.setState(this.state.documentContent);
    }
    this.render();
  };
  
  this.render =  () => {
    $target.appendChild($page);
  }
  this.render();

  let timer = null;
  const sideBar = new Sidebar({
    $target : $page,
    initialState : {
      selectedId : this.state.id,
      documents : this.state.documents
    },
    onClickAdd : async (id) => {
      const newDocument = {
        title : "",
        parent : "",
      }
      newDocument.title = "빈 제목";
      newDocument.parent = id;
      
      const {id : newId} = await request("/documents", {
        method : "POST",
        body : JSON.stringify(newDocument)
      })
      push(`/documents/${newId}`);
      await fetchDocuments();
      await fetchContent(newId);
    },
    onClickDelete : async (id) => {
      if(confirm("정말로 삭제하시겠습니까?")){
        await request(`/documents/${id}`, {
          method : "DELETE"
        })
        replace("/");
        fetchDocuments();
        this.setState({
          ...this.state,
          documentContent : null
        })
      }
    },
    onClickDocument : async (id) => {
      push(`/documents/${id}`);
      await fetchContent(id);
    }
  });

  const editor = new Editor({
    $target : $page, 
    initialState : this.state.documentContent, 
    onEditing : (post, id, $input) => {
      if(timer !== null){
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setLocalStorageItem(getPostLocalSaveKey(id), {
          ...post,
          tempSaveDate : new Date()
        })
        await request(`/documents/${id}`, {
          method : "PUT",
          body : JSON.stringify(post)
        })
        await fetchDocuments();
        removeLocalStorageItem(getPostLocalSaveKey(id));
        $input.focus();
      }, 500)
    }});

  this.init = async (id) => {
    this.render();
    await fetchDocuments();
    if(id){
      await fetchContent(id);
    }else{
      this.setState({
        ...this.state,
        id : null,
        documentContent : null
      })
    }
  }

}