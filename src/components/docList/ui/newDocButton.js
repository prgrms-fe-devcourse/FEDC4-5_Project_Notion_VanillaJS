import Button from "../../ui/button"
import documentAdapter from "../../../api/index"

export default function newDocButton({ $target, parentId, renderSideBar, routeApp }) {
  const onClickNewDoc = async () => {
    const res = await documentAdapter.createDocument({ title: "새 문서", parentId: parentId })
    await renderSideBar()
    await routeApp()
    history.pushState(null, null, `/documents/${res.id}`)
  }

  this.render = () =>
    new Button({
      $target: $target,
      text: "+",
      className: "make-document-button",
      onClick: onClickNewDoc,
    })

  this.render()
}
