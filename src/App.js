import Editer from "./comp/Editer.js"
import LeftNav from "./comp/LeftNav.js"
import { fetchDoc, createPost, updatePost , deletePost } from "./api.js"
import { navUpdateAnime } from "./animation.js"


export default function App({ $target , initState, USERNAME }){

  const leftNav = new LeftNav({
    $target,
    initState,
    USERNAME,
    pageLoadToId: id => {
      history.pushState(null, null, id)
      router(id)
    },
    addNavSubDom : async $target => {
      const { id } = await createPost(USERNAME , $target.dataset.id)
      const newData = await fetchDoc(USERNAME)

      leftNav.setState(newData)
      leftNav.setNavFocusBox(leftNav.FindNavDomToId( id ))
      history.pushState(null, null, id)
      router(id)
    },
    deleteNavDom : async id => {
      const data = await deletePost(USERNAME , id)
      leftNav.setState(data)
      const nowPageIsDelete = location.pathname.substr(1) === id
      if (nowPageIsDelete) editer.setState(null)
    }
  })

  this.timer = null
  const timerdeley = 1500
  const editer = new Editer({
    $target,
    initState : null,
    timerdeley,
    onEditing : (title,content,id) => {
      clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        if (title.length !== 0){
          updatePost( USERNAME, id, title, content )
          navUpdateAnime( leftNav.FindNavDomToId(id), title)
        }
      }, timerdeley )
    }
  })

  window.addEventListener('popstate', () => router(location.pathname.substr(1)))

  const router = async targetId => {
    const { title, content, id } = await fetchDoc( USERNAME , targetId )
    leftNav.setNavFocusBox(leftNav.FindNavDomToId( targetId ))
    editer.setState({ title, content, id })
  }
} 

