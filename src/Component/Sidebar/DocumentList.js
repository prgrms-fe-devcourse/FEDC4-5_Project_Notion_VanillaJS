import { validateNew, vaildateArray } from '../../utils/validation.js'

export default function DocumentList({ $target, initialState, onAdd, onDelete }) {
    validateNew(new.target)

    const $docList = document.createElement('div')
    $docList.className = 'document-list'
    $target.appendChild($docList)

    this.state = initialState
    vaildateArray(this.state)

    this.setState = (nextState) => {
        vaildateArray(nextState)
        this.state = nextState
        this.render()
    }

    this.render = () => {
        const documentList = renderDocuments(this.state, '')
        const newRootButton = `<div class='new-rootDocument'>
				<button class='btn-add document-item'>
					<i class="fa-solid fa-plus btn-add" style="color: #c2c2c2;"></i>페이지 추가
				</button>
			</div>`
        $docList.innerHTML = `${documentList}${newRootButton}`
    }

    const renderDocuments = (list, text) => {
        text += `
			<ul>
				${list
                    .map(
                        ({ id, title, documents }) =>
                            `<li data-id="${id}" class="document-item">
								<span class="list-title">${title === '' ? `${(title = '제목 없음')}` : `${title}`}</span>
					<div class="buttons">
						<button class="btn-delete" type="button">
							<i class="fa-regular fa-trash-can btn-delete"></i>		
						</button>
						<button class="btn-add">
							<i class="fa-solid fa-plus btn-add" style="color: #c2c2c2;"></i>
						</button>
					</div>
				</li>

				${documents.map((document) => renderDocuments([document], text)).join('')}
				`,
                    )
                    .join('')}
			</ul>
		`
        return text
    }

    this.render()

    $docList.addEventListener('click', (e) => {
        const { className } = e.target
        const $li = e.target.closest('li')
        const id = $li?.dataset.id ?? null
        if (className) {
            if (className.includes('btn-delete')) {
                onDelete(id)
            } else {
                onAdd(id, className)
            }
        }
    })
}
