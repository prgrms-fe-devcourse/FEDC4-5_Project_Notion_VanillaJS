import { validateNew, validateString, vaildateArray } from '../../utils/validation.js'

export default function Editor({ $target, initialState = { title: '', content: '' }, onEditing, onClick }) {
    validateNew(new.target)

    const $editor = document.createElement('div')
    $editor.className = 'editor'

    const $subdocumentList = document.createElement('div')

    $target.appendChild($editor)
    $target.appendChild($subdocumentList)

    this.state = initialState
    validateString(this.state)

    $editor.innerHTML = `
            <input type="text" name="title" class="editor-title" placeholder="제목 없음">
            <textarea name="content" class="editor-content" placeholder="내용을 입력해 주세요">
                ${this.state.content}
            </textarea>
        `

    this.setState = (nextState) => {
        this.state = nextState
        this.render([nextState])
    }

    this.render = (nextState) => {
        const { title, content } = this.state

        $editor.querySelector('[name=title]').value = title
        $editor.querySelector('[name=content]').value = content

        if (nextState) {
            const documentList = renderDocuments(nextState, '')
            $subdocumentList.innerHTML = `<div class="subDocument"><h2>현재 Document 하위 문서들</h2> ${documentList}</div>`
        }
    }

    const renderDocuments = (list, text) => {
        vaildateArray(list)
        text += `
                        <ul>
                            ${list
                                .map(
                                    ({ id, title, documents }) =>
                                        `<li data-id="${id}" class="document-item">${
                                            title === '' ? `${(title = '제목 없음')}` : `${title}`
                                        }</li>

                            ${documents.map((document) => renderDocuments([document], text)).join('')}
                            `,
                                )
                                .join('')}
                        </ul>
                    `
        return text
    }

    this.render()

    $editor.addEventListener('keyup', (e) => {
        const { target } = e
        const name = target.getAttribute('name')

        if (this.state[name] !== undefined) {
            const nextState = { ...this.state, [name]: target.value }

            this.setState(nextState)
            onEditing(this.state)
        }
    })

    $subdocumentList.addEventListener('click', (e) => {
        const $li = e.target.closest('.document-item')

        if ($li) {
            const { id } = $li.dataset
            onClick(id)
        }
    })
}
