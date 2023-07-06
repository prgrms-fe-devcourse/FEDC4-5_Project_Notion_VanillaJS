import { request } from "../util/api.js"

export default function DeleteButton ({
    $target, 
    initialState = { text, link, documentId }
}) {
    this.state = initialState
    const $linkButton = document.createElement('button')
    $linkButton.style.cursor = 'pointer'
    $target.appendChild($linkButton)

    this.render = () => {
        $linkButton.textContent = this.state.text
    }

    this.render()

    $linkButton.addEventListener('click', () => {
        request(`${this.state.link}/${this.state.documentId}`, {
            method: 'DELETE'
        })
    })
}

// text: 'New Document
// link: '/documents',
// documentId : ${documentId}
