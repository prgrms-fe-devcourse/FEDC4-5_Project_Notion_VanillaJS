export default function LeftNavHeader({ $target , userName}){
  const $LeftNavHeader = document.createElement('div')
  $LeftNavHeader.className = 'LeftNavHeader'
  $target.appendChild($LeftNavHeader)

  this.state = userName

  this.setState = newState =>{
    this.state = newState
    this.render()
  }

  this.render = () => {
    $LeftNavHeader.innerHTML = `
      <h2>${this.state}의 노션</h2>
      <div style="flex-grow: 1;"></div>
      <button data-option="navAddSubDomButton" class="navDom">+</button>
    `
  }

  this.render()
}
