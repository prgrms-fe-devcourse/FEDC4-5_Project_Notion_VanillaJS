export default function Editer ({ $target, initState, timerdeley, onEditing }){
  const $Editer  = document.createElement('form')
  $Editer.className = 'Editer'
  $target.appendChild($Editer)

  this.state = initState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (!!this.state){
      const { title, content } = this.state
        $Editer.innerHTML = `
        <input name="title" type="text" value="${title}" placeholder="제목이 없으면 저장 안돼요.." class="editerElement">
        <textarea name="content" cols="30" rows="10" placeholder="${timerdeley/1000}초마다 자동저장 됩니다" class="editerElement">${content === null ? '' : content}</textarea>
      `
    }else{
      $Editer.innerHTML = '<h3>페이지를 선택해보세요 /(\'\ㄷ\'\)/</h3>'
    }
  }
  this.render()

  $Editer.addEventListener('keyup' , ()=> {
    const title = document.querySelector('.Editer>input').value
    const content = document.querySelector('.Editer>textarea').value

    onEditing(title, content, this.state.id)
  })
}