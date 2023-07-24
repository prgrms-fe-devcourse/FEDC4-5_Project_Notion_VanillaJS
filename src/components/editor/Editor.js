export default function Editor({
    $target,
    initialState = {
        title: '',
        content: '',
    },
    onEditing,
}) {
    this.state = initialState;

    let isInitialize = false;

    this.setState = (nextState) => {
        this.state = nextState;
        console.log(this.state);

        $target.querySelector('[name=title]').value = this.state.title;
        $target.querySelector('[name=content]').value = this.state.content;
        this.render();
    };

    this.render = () => {
        if (!isInitialize) {
            $target.innerHTML = `
                <input type="text" name="title"  value="${this.state.title}" />
                <textarea name="content">${this.state.content}</textarea>
            `;
            isInitialize = true;
        }
    };

    $target.addEventListener('keyup', (e) => {
        const { target } = e;

        const name = target.getAttribute('name');

        if (this.state[name] !== undefined) {
            const nextStage = {
                ...this.state,
                [name]: target.value,
            };

            this.setState(nextStage);
            onEditing(this.state);
        }
    });

    this.render();
}
