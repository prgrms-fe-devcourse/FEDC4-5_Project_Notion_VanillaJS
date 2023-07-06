import Editor from './Editor.js'
import { request } from '../../Domain/api.js'
import { validateNew } from '../../utils/validation.js'

export default function EditPage({ $target, initialState, update }) {
    validateNew(new.target)

    const $page = document.createElement('div')
    $page.className = 'edit-page'

    this.state = initialState

    let timer = null

    const editor = new Editor({
        $target: $page,
        initialState: {
            title: '',
            content: '',
        },
        onEditing: (post) => {
            if (timer !== null) clearTimeout(timer)
            timer = setTimeout(() => {
                fetchDocument(post)
            }, 2000)
        },
        onClick: (id) => {
            this.state = { id }
            selectedDocument()
        },
    })

    this.setState = async (nextState) => {
        this.state = nextState
        await selectedDocument()
        this.render()
    }

    const selectedDocument = async () => {
        const post = await request(`/documents/${this.state.id}`)
        editor.setState(post)
    }

    const fetchDocument = async (post) => {
        await request(`/documents/${this.state.id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
        })
        await update()
        this.render()
    }

    this.render = () => {
        $target.appendChild($page)
    }
}
