const makeChild = (id) => {
  const $child = document.createElement("ul")
  $child.className = "doc-list"
  $child.dataset.id = id

  return $child
}

const makeContainer = () => {
  const $container = document.createElement("div")
  $container.className = "doc-node-container"

  return $container
}

const makeText = (title) => {
  const $text = document.createElement("span")
  $text.className = "doc-text"
  $text.innerText = title

  return $text
}

export { makeChild, makeContainer, makeText }
