export default function Header({$target}){
    const $header = document.createElement("h2")
    $header.innerHTML = "김다은의 Notion"
    $target.appendChild($header)
}