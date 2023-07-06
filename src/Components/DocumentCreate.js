import { DocumentModal } from "./DocumentModal.js";

export function DocumentCreate({$target, parentId, onSubmit}){
    this.state = {
        parentId :null,
    }
    this.setState = (nextState) => {
        this.state = nextState;
    }
    this.render = () => {
        const $createBtn = document.createElement('button');
        $createBtn.className = 'createDoc';
        if (parentId === null){
            $createBtn.className = 'rootCreate'
        }
        $createBtn.textContent = '+';
        $target.append($createBtn);
    }
    $target.addEventListener('click', (e) => {
        const $createBtn = e.target.closest('button');
        if($createBtn){
            if($createBtn.classList.contains('rootCreate')){
                e.stopImmediatePropagation();
                const modal = new DocumentModal(null , onSubmit)
                modal.modalOpen();
                return
            }
            const { id }  = $createBtn.nextElementSibling.dataset
            const modal = new DocumentModal(id , onSubmit)
            modal.modalOpen();
        }
    })
}