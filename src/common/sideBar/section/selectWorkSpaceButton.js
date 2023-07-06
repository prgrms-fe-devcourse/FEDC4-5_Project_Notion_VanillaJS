import Button from "../../../components/ui/button"
import Modal from "../../modal"
import WorkSpaceModal from "../../modal/workspaceModal"

export default function SelectWorkSpaceButton({ $target, renderApp, routeApp }) {
  const onClick = () => {
    new Modal({
      props: { renderApp, routeApp },
      ConstructorComponent: WorkSpaceModal,
    })
  }

  this.render = () => {
    new Button({
      $target,
      text: "Select Workspace",
      className: "select-workspace-button",
      onClick,
    })
  }

  this.render()
}
