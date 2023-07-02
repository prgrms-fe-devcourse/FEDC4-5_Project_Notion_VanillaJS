import LeftNavHeader from "./LeftNavHeader.js"
import LeftNavList from "./LeftNavList.js"

export default function LeftNav({ $target , initState, userName, pageLoadToId, addNavSubDom, deleteNavDom }){

  const $LeftNav = document.createElement('div')
  $LeftNav.className = 'LeftNav'
  $target.appendChild($LeftNav)
  
  this.state = initState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = ()=> {
    $LeftNav.innerHTML = ''
    new LeftNavHeader({$target : $LeftNav, userName})
    new LeftNavList({$target : $LeftNav, initState : this.state })
  }

  this.render()

  // 네브 포커스요소
  this.NavFocusBox = undefined

  this.setNavFocusBox = $nextNavFocusBox => {
    if (this.NavFocusBox !== undefined) this.NavFocusBox.classList.remove('focusNav')
    this.NavFocusBox  = $nextNavFocusBox
    this.NavFocusBox.classList.add('focusNav')
  }

  this.FindNavDomToId = id => {
    const domList = document.querySelectorAll('.navDom')
    for (const dom of domList) if (dom.dataset.id == id) return dom
  }

  // 폴더여닫기, 하위요소추가, 글삭제, 글클릭(로드) 이벤트
  $LeftNav.addEventListener('click', ({ target }) => {

    const { dataset } = target
    const $navDocument = target.closest('.navDom')
    const clickNavDocument = $navDocument !== null

    if ( clickNavDocument ){
      const buttonOption = dataset.option
      const targetId = $navDocument.dataset.id

      if ( !!buttonOption ){ 

        switch( buttonOption ) {
          case 'hideNavTabButton': 
            target.classList.toggle('hideSubNav')
            target.parentNode.nextElementSibling.classList.toggle('hide')
            break
        
          case 'navAddSubDomButton': addNavSubDom($navDocument)
            break

          case 'navDeleteDomButton': deleteNavDom(targetId)
            break
        }

      } else { // 글 클릭하면
        pageLoadToId(targetId)
      }
    }
  })
}