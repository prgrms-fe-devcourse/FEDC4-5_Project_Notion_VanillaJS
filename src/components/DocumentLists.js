import { push } from "../utils/router.js"
import { updateStorage } from "../utils/storage.js"
import {createList} from "./CreateLists.js"

export default function DocumentLists({$target, initialState, onRemove, onCreate}){

    const $documentLists = document.createElement("div")
    $target.appendChild($documentLists)
    $documentLists.className = "document__lists"

    this.state =initialState
    this.setState = nextState =>{
        this.state = nextState
        this.render()
    }

    this.render = () =>{ 
        $documentLists.innerHTML = `${createList(this.state)}`
    }

    $documentLists.addEventListener("click", (e)=>{
        const {target} = e
        const $ul = target.closest("ul")

        if($ul){
            const {id} = $ul.dataset
            if(target.className === "remove"){
                onRemove(id)
                updateStorage.delete(id)
            }else if(target.className === "create"){
                onCreate(id)
                updateStorage.add(id)
            }else if(target.className === "toggle__button"){
                updateStorage.toggle(id)
                this.render()
            }else{
                push(`/documents/${id}`)
            }
        }

    })


    this.render()
}