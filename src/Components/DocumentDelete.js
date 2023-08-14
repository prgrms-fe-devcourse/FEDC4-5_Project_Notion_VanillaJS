import { deleteDocuments } from "../api.js";
import { routerNav } from "../router.js";

export default function DocumentDelete ({$target, id}){
    const $deleteBtn = document.createElement('button');
    $deleteBtn.className= 'delete-btn'
    $target.appendChild($deleteBtn)
    $deleteBtn.textContent = '삭제하기'

    this.state = { id }
    this.setState = nextState => {
        this.state = nextState
    }
    $deleteBtn.addEventListener('click', async (e) => {
        await deleteDocuments(this.state.id)
        alert("삭제 완료");
        routerNav('/');
        location.reload();
    })
}