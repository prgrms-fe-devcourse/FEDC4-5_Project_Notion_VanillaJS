import Editor from "../components/Editor.js"
import {putDocument ,fetchEditor} from "../utils/requset.js"
import { push, update} from "../utils/router.js"

export default function EditorPage({$target, initialState}){
    const $page = document.createElement("div")
    $page.className = "editor__page"

    this.render = ()=>{
        $target.appendChild($page)
    }

    this.state = initialState
    this.setState = async nextState =>{
        this.state = nextState
        const document = await fetchEditor(this.state.documentId)
        editor.setState(document)
        this.render()
    }

    let timer = null;
    const editor = new Editor({
        $target : $page,
        initialState :{
            title : "",
            content :""},
        onEditing : (document,isTitle)=>{
            if(timer !== null){
                clearTimeout(timer)
            }
            timer = setTimeout(async ()=>{
                await putDocument(document)
                if(isTitle){
                    update()
                }
            }, 800)
        }
    })

}