import { initRouter } from "../utils/router.js"
import { request } from "../utils/api.js"
import debounce from "../utils/debounce.js"
import DocsListPage from "./DocsList/DocsListPage.js"
import EditPage from "./DocsEdit/EditPage.js"

export default function App({ $target }) {
  const onEdit = debounce(async ({ id, title, content }, loadingIcon) => {
    await request(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
    })

    await docsPage.render()
    if (loadingIcon.state) loadingIcon.setState(false)
  }, 1500)

  const docsPage = new DocsListPage({
    $target,
    initialState: {},
  })

  const editPage = new EditPage({
    $target,
    initialState: {},
    onEdit,
  })

  this.route = async () => {
    const { pathname } = window.location

    if (pathname === "/") {
      docsPage.render()
      return
    } else if (pathname.startsWith("/documents/")) {
      const [, , documentId] = pathname.split("/")
      await editPage.setState({
        id: documentId,
      })
    }
  }

  this.route()

  initRouter(() => this.route())
}
