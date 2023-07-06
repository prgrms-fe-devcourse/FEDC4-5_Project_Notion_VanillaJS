export default function NotionListHeader({ $target, initialState }) {
    const $header = document.createElement('div')
    $header.classList.add('notionList-header')

    $target.appendChild($header)

    this.state = initialState

    this.render = () => {
        $header.innerHTML = `
            <h3>${this.state.workspaceName}</h3>
        `
    }

    this.render()
}
