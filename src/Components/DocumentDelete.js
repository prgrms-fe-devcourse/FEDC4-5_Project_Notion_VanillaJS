import { deleteDocuments } from "../api.js";
import { push } from "../router.js";

export default function DocumentDelete ({$target, id}){
    const $deleteBtn = document.createElement('button');
    $deleteBtn.className= 'delete-btn'
    $target.appendChild($deleteBtn)
    $deleteBtn.textContent = '삭제하기'

    this.state = {
        id : id,
    }
    this.setState = nextState => {
        this.state = nextState
    }
    $deleteBtn.addEventListener('click', async (e) => {
        await deleteDocuments(this.state.id)
        alert("삭제 완료");
        push('/');
        location.reload();
    })
}