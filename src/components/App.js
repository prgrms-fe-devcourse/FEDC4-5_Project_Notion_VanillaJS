import MainPage from '../pages/MainPage'
import NotFoundPage from '../pages/NotFoundPage'
import { DATA } from '../utils/constants'
import { eventHandler } from '../utils/domUtils'
import { fetchMainData } from '../utils/fetchData'

export default function App({ $target }) {
  let main, notFound

  this.init = () => {
    eventHandler(window, 'popstate', this.route)
    this.route()
  }

  this.route = () => {
    const { pathname } = location
    const isMain = pathname === '/'
    const isEditor = pathname.indexOf('/documents/') === 0
    const id = isEditor && pathname.split('/')[2]
    $target.innerHTML = ''

    if (isMain || isEditor) {
      main = new MainPage({ $target, updateState })
      isMain && updateState(DATA.DOCUMENT)
      isEditor && updateState(DATA.ALL, id)
    } else {
      notFound = new NotFoundPage({ $target, updateState })
    }
  }

  this.init()

  function updateState(targetState, id) {
    fetchMainData(main, targetState, id)
  }
}
