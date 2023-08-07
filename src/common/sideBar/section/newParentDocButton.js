import Button from "../../../components/ui/button"

import documentAdapter from "../../../api/index"

export default function NewParentDocButton({ $target, renderSideBar, routeApp }) {
  const onClickNewDoc = async () => {
    const res = await documentAdapter.createDocument({ title: "새 문서", parentId: null })
    history.replaceState(null, null, `/documents/${res.id}`)
    await renderSideBar()
    await routeApp()
  }

  this.render = () =>
    new Button({
      $target: $target,
      text: "새로운 문서 만들기",
      className: "new-parent-doc-button",
      onClick: onClickNewDoc,
    })

  this.render()
}
