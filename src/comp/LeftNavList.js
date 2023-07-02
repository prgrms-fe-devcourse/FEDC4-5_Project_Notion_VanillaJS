import LeftNavListBoxMaker from "./LeftNavListBoxMaker.js" // 네브 글칸 하나 만드는 함수

export default function LeftNavList({ $target , initState}){
  const $LeftNavList = document.createElement('div')
  $LeftNavList.className = 'LeftNavList'
  $target.appendChild($LeftNavList)

  this.state = initState

  this.setState = newState =>{
    this.state = newState
    this.render()
  }
  const defaultPadding = 0 
  const addPadding = 25    
  
  this.makeLeftNav = ( $target , paddingLeft, doms )=>{

    doms.forEach( ({ title, documents, id }) => {
      const { $navbox, $subDomsBox } = LeftNavListBoxMaker(paddingLeft,title,id) 
      const Q_haveSubDocuments = documents.length > 0 

      $target.appendChild( $navbox )

      if ( Q_haveSubDocuments ){
        this.makeLeftNav( $subDomsBox, paddingLeft + addPadding , documents )
      } 
    })
  }

  this.render = () => {
    $LeftNavList.innerHTML =  ''
    this.makeLeftNav( $LeftNavList, defaultPadding , this.state )
  }
  this.render()
}


