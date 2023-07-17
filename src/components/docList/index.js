import newDocButton from "./ui/newDocButton"

import { makeChild, makeContainer, makeText } from "./ui/template"

export default function DocList({ $target, initialState = [], renderSideBar, routeApp }) {
  const onClickDocList = async (doc, routeApp) => {
    history.pushState(null, "", `/documents/${doc.id}`)
    await routeApp()
  }

  const createDocElement = (doc) => {
    const $child = makeChild(doc.id)
    const $container = makeContainer()
    const $text = makeText(doc.title)

    $text.addEventListener("click", async () => await onClickDocList(doc, routeApp))

    $container.appendChild($text)
    $child.appendChild($container)

    new newDocButton({ $target: $container, parentId: doc.id, renderSideBar, routeApp })

    if (doc.documents.length) {
      new DocList({ $target: $child, initialState: doc.documents, renderSideBar, routeApp })
    }

    return $child
  }

  this.render = async () => {
    for (const doc of initialState) {
      const $child = createDocElement(doc)
      await $target.appendChild($child)
    }
  }

  this.render()
}
