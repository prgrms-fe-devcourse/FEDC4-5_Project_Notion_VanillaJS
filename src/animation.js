export const navUpdateAnime = async ($target, title = null) => {
  if (title) $target.querySelector('span').innerHTML = title
  $target.classList.add('navItemUpdate')
  
  $target.addEventListener('animationend', () => $target.classList.remove('navItemUpdate'))
}