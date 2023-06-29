import Editor from "../components/Editor.js";
import Sidebar from "../components/Sidebar.js";
import { request } from "../utils/api.js";
import Queue from "../utils/queue.js";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/storage.js";

export default function MainPage({$target, initialState}){
  const $page = document.createElement("div");
  this.state = initialState;
  let postLocalSaveKey = `temp-post-${this.state.id}`;
  
  this.setState = (nextState) => {
    console.log(nextState);
    if(this.state.id !== nextState.id){
      postLocalSaveKey = `temp-post-${nextState.id}`;
      this.state = nextState;
      if(this.state.id === "new"){
        const post = getLocalStorageItem(postLocalSaveKey, {
          title : "",
          content : ""
        })
        editor.setState(post);
        this.render();
      }else{
        const post = getLocalStorageItem(postLocalSaveKey, {
          title : "",
          content : ""
        })
        editor.setState(post);
        this.render();
      }
      return;
    }
    this.state = nextState;
    sideBar.setState(this.state.documents);
    editor.setState(this.state.post || {
      title : "",
      content : ""
    });
    this.render();
  };

  this.render =  () => {
    $target.appendChild($page);
  }

  let timer = null;
  const sideBar = new Sidebar({
    $target : $page,
    initialState : this.state.documents,
    onClickAdd : (id) => {
      const nextState = sideBar.state;
      if(id === "root"){
        nextState.push({
          id : new Date().getTime(),
          title : "root Test",
          documents : [],
        })
        sideBar.setState(nextState);
        
        return;
      } 
      const {documents} = findDocument(+id, nextState);
      if(documents){
        documents.push({
          id : new Date().getTime(),
          title: "test",
          documents : [],
        })
      }else{
        return;
      }
      sideBar.setState(nextState);
    }  
  });
  const editor = new Editor({
    $target : $page, 
    initialState : {
      title : "",
      content : ""
    }, 
    onEditing : (post) => {
      if(timer !== null){
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setLocalStorageItem(`temp-post-${this.state.id}`, {
          ...post,
          tempSaveDate : new Date()
        })
      }, 2000)
    }});

  this.render();

  function findDocument(targetId, root){
    const queue = new Queue();
    root.forEach(document => queue.enqueue(document));
    
    while(queue.size()){
      const count = queue.size();

      for(let i = 0; i < count; i++){
        const rootDirectory = queue.dequeue();
        const {id} = rootDirectory;
        if(id === targetId) {
          return rootDirectory;
        }
        rootDirectory.documents.forEach(document => queue.enqueue(document));
      }
    }

    return null;
  }
}