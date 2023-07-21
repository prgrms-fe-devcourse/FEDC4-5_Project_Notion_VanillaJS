export default function LeftNavListBoxMaker ( paddingLeft, title,id ){
  // (navbox)
  const $navbox = document.createElement('div')
  $navbox.classList.add('navbox')

  // (navDom)
  const $navDom = document.createElement('div')
  $navDom.classList.add('navDom')
  $navDom.style.paddingLeft = `${ paddingLeft }px`
  $navDom.setAttribute('data-id', id)

  // ( 여닫기 버튼  (>) )
  const $hideNavTabButton = document.createElement('img')
  $hideNavTabButton.setAttribute('data-option', 'hideNavTabButton')
  $hideNavTabButton.src = 'src/comp/hideNavTabButton.png'
  $hideNavTabButton.alt = ''
  $navDom.appendChild($hideNavTabButton)

  // (제목)
  const $title = document.createElement('span')
  $title.textContent = title
  $navDom.appendChild($title)

  // (flex-grow)
  const $flexgrowDiv = document.createElement('div')
  $flexgrowDiv.style.flexGrow = '1'
  $navDom.appendChild($flexgrowDiv)

  // (navBtnBox)
  const $navButtonBox = document.createElement('div')
  $navButtonBox.classList.add('navBtnBox')
  $navDom.appendChild($navButtonBox)   

  // +버튼 
  const $navAddSubDomButton = document.createElement('button')
  $navAddSubDomButton.textContent = '+'
  $navAddSubDomButton.setAttribute('data-option', 'navAddSubDomButton')
  $navButtonBox.appendChild($navAddSubDomButton)

  // -버튼 
  const $navDeleteDomButton = document.createElement('button')
  $navDeleteDomButton.textContent = '-'
  $navDeleteDomButton.setAttribute('data-option', 'navDeleteDomButton')
  $navButtonBox.appendChild($navDeleteDomButton)

  // 하위요소박스
  const $subDomsBox = document.createElement('div')

  // 박스 최종완성
  $navbox.appendChild($navDom)
  $navbox.appendChild($subDomsBox)

  return { $navbox, $subDomsBox }
}