import DocList from "../../components/docList"
import NewParentDocButton from "./section/newParentDocButton"
import SelectWorkSpaceButton from "./section/selectWorkSpaceButton"

import documentAdapter from "../../api/index"

export default function SideBar({ $target, routeApp, renderApp }) {
  this.render = async () => {
    const docs = await documentAdapter.getDocuments()
    $target.innerHTML = ""
    new SelectWorkSpaceButton({ $target: $target, renderApp, routeApp })
    new NewParentDocButton({
      $target: $target,
      renderSideBar: this.render,
      routeApp,
    })
    new DocList({
      $target: $target,
      initialState: docs,
      renderSideBar: this.render,
      routeApp,
    })
  }

  this.render()
}
