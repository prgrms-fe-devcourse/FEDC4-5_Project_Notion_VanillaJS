import NotionListPage from './Sidebar/NotionListPage.js'
import EditPage from './Editors/EditPage.js'
import { validateNew } from '../utils/validation.js'

export default function App({ $target }) {
    validateNew(new.target)

    const notionListPage = new NotionListPage({
        $target,
        editDocument: (id) => {
            history.pushState(null, null, `/documents/${id}`)
            this.route()
        },
        reset: () => this.route(),
    })

    const editPage = new EditPage({
        $target,
        initialState: {
            postId: 'new',
            post: {
                title: '',
                content: '',
            },
        },
        update: () => notionListPage.render(),
    })

    this.route = async () => {
        const { pathname } = window.location

        if (pathname.indexOf('/documents/') === 0) {
            const [, , id] = pathname.split('/')

            await notionListPage.render()
            await editPage.setState({ id })
        } else {
            $target.innerHTML = ''
            notionListPage.render()
        }
    }

    window.addEventListener('popstate', (e) => {
        this.route()
    })

    this.route()
}
