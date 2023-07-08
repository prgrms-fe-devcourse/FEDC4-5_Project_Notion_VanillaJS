import DocsListPage from "./DocsList/DocsListPage.js"
import EditPage from "./DocsEdit/EditPage.js"
import { initRouter } from "../utils/router.js"
import { request } from "../utils/api.js"

export default function App({ $target }) {
  let timer = null

  const onEdit = async ({ id, title, content }) => {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(async () => {
      await request(`/documents/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
      })
      await docsPage.render()
      // editPage.render()
    }, 1000)
  }

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
