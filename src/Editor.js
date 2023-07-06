export default function Editor ({$target, initialState ={
    title: '',
    content: '',
}, onEditing}) {
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
        if(!isinitialize) {
            $editor.innerHTML =`
            <input style='width:600px' type='text' name='title' value='${this.state.title}'>
            <textarea style ='width: 600px; height: 400px;' name='content'>${this.state.content}</textarea>`


            isinitialize = true
        }
    }

    this.render()

    $editor.addEventListener('keyup', e => {
        const {target} = e
        const name = target.getAttribute('name')

        if(this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                [name]: target.value
            }
        this.setState(nextState)   
        onEditing(nextState)
        }
    })


}