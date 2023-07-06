export default function Editor({$target, initialState, onEditing}){
    const $editor = document.createElement("div")
    $target.appendChild($editor)

    this.state = initialState;
    this.setState = nextState =>{
        this.state = nextState
        $editor.querySelector(".title").value =  this.state.title 
        $editor.querySelector(".content").value =  this.state.content
        this.render()
    }

    let init = false
    this.render = () =>{
        if(!init){ 
            $editor.innerHTML=`
            <input class="title" style="width:800px;height:70px;" value="${this.state.title}">
            <textarea class="content" style="width:800px;height:500px;">${this.state.content}</textarea>
            `
        }
        init =true

    }

    $editor.addEventListener("keyup", (e)=>{ 
        const {target} = e
        const name = target.getAttribute("class")
        const isTitle = name === "title"

        if(this.state[name] !== undefined){
            const nextState = {
                ...this.state,
                [name] : target.value 
            }
            this.setState(nextState)
            onEditing(this.state,isTitle)
        }
    })

    this.render()
}