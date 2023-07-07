export default function Editor ({$target,initialState={
    title:'1',
    content:'123'
},onEditing}){
    
    const $editor = document.createElement('div')
    
    let isinitialize = false

    this.state = initialState

    $target.appendChild($editor)

    this.setState = (nextState) => {
        this.state = nextState
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').value = this.state.content
        this.render()
    }

    this.render = () => {
        if(!isinitialize){
            $editor.innerHTML = `
            <input type = "text" name = "title"  style ="width:600px" value = ${this.state.title}>
            <textarea name = "content" style ="width:600px;height :600px;">${this.state.content}</textarea>
            `
            isinitialize = true;
            console.log('editor initialize')
        }
    }
    
    this.render()
    
    $editor.addEventListener('keyup',e => {
      
        const {target} = e
        const name = target.getAttribute('name')
        
        if(this.state[name] !== undefined){
            const nextState = {
                ...this.state,
                [name]:target.value
            }
        this.state = nextState

        onEditing(nextState)
    }
    })
    
}