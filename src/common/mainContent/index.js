import Editor from "../../components/editor"

import documentAdapter from "../../api/index"

import debounce from "../../utils/debounce"
import { changeNotSaved, changeSaved } from "../../components/editor/handlers"

export default function MainContent({ $target, initialState = {}, renderApp, routeApp }) {
  this.state = initialState
  let timer = null

  this.render = () => {
    new Editor({
      $target,
      initialState: this.state,
      renderApp,
      routeApp,
      onEditing: async (content) => {
        changeNotSaved($target)

        const callbackEditing = async () => {
          clearTimeout(timer)
          const { id } = this.state
          await documentAdapter.updateDocument(id, content)
          changeSaved($target)
          renderApp()
        }

        timer = debounce(timer, callbackEditing, 3000)
      },
    })
  }

  this.setState = async (nextState) => {
    this.state = await documentAdapter.getDocumentsContent(nextState.id)
    this.render()
  }

  this.render()
}
