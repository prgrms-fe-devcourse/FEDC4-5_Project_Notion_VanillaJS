export default function Footer({$target, onClick}){
    const $button = document.createElement("button")
    $target.appendChild($button)
    $button.textContent = "페이지 추가"
    $button.className = "footer"

    document.querySelector(".footer").addEventListener("click", (e)=>{
        onClick()
    })
}