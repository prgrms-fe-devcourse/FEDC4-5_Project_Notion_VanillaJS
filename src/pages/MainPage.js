import Editor from "../components/Editor.js";
import Sidebar from "../components/Sidebar.js";
import { request } from "../utils/api.js";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "../utils/storage.js";

export default function MainPage({$target, initialState}){
  const $page = document.createElement("div");
  this.state = initialState;
  let postLocalSaveKey = `temp-post-${this.state.id}`;
  
  const fetchDocuments = async () => {
    const documents = await request("/documents");
    this.setState({
      ...this.state,
      documents      
    })
  }

  const fetchContent = async (id) => {
    const document = await request(`/documents/${id}`);
    this.setState({
      ...this.state,
      id,
      document
    })
  }

  this.setState = (nextState) => {
    if(this.state.id !== nextState.id)
      editor.setState(nextState.document);
    this.state = nextState;
    sideBar.setState(this.state.documents);
    this.render();
  };

  this.render =  () => {
    $target.appendChild($page);
  }

  let timer = null;
  const sideBar = new Sidebar({
    $target : $page,
    initialState : this.state.documents,
    onClickAdd : async (id) => {
      const newDocument = {
        title : "",
        parent : "",
      }
      newDocument.title = "빈 제목";
      newDocument.parent = id;
      
      await request("/documents", {
        method : "POST",
        body : JSON.stringify(newDocument)
      })
      await fetchDocuments();
    },
    onClickDelete : async (id) => {
      await request(`/documents/${id}`, {
        method : "DELETE"
      })
      fetchDocuments();
    },
    onClickDocument : async (id) => {
      await fetchContent(id);
    }
  });

  const editor = new Editor({
    $target : $page, 
    initialState : {
      title : "",
      content : ""
    }, 
    onEditing : (post, $input) => {
      if(timer !== null){
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setLocalStorageItem(`temp-post-${this.state.id}`, {
          ...post,
          tempSaveDate : new Date()
        })
        await request(`/documents/${this.state.id}`, {
          method : "PUT",
          body : JSON.stringify(post)
        })
        await fetchDocuments();
        removeLocalStorageItem(postLocalSaveKey);
        $input.focus();
      }, 500)
    }});
  this.init = async () => {
    await fetchDocuments();
    this.render();
  }
}