export default function Editor({$target, initialState = {
    title: '',
    content: '',
}, onEditing}){
    const $editor = document.createElement('div');
    $editor.className = 'editor'
    $target.appendChild($editor);
    this.state = initialState;
    let isinitialize = false

    this.setState = (nextState) => {
        this.state = nextState
        $editor.querySelector('[name=content]').value = this.state.content;
        $editor.querySelector('[name=title]').value = this.state.title;
        this.render();
    }
    this.render = () => {
        if(!isinitialize){
            $editor.innerHTML = `
                <input type="text" class="titleInput" name="title"/>
                <textarea name="content" class="contentInput"/>
            `
            isinitialize = true
        }
    }

    this.render();
    $editor.addEventListener('keyup', e => {
        const { target } = e
        const name = target.getAttribute('name')
        if(this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                [name]: target.value
            }
            this.setState(nextState)
            onEditing(this.state)
        }
    })
}