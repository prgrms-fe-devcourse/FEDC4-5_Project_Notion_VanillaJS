export function DocumentModal(id , onSubmit){
    const $app = document.querySelector('.app');
    const $modalContainer = document.createElement('div')
    $modalContainer.className = 'modal';
    $app.appendChild($modalContainer);
    this.render = () => {
        $modalContainer.innerHTML = `
            <div class="modal-content">
                <form>
                    <input class ="modalText" type="text" placeholder='문서의 제목을 작성해주세요'/>
                </form>
                <button class="closeBtn" id="close-modal">❌</button>
            </div>
        `
    }
    
    $modalContainer.addEventListener('submit', async (e) => {
        e.preventDefault();
        const $input = $modalContainer.querySelector('.modalText');
        const content = $input.value;
        await onSubmit(content, id);
        $input.value =''
        alert('문서 생성이 완료되었습니다')
        const modal = document.querySelector('.modal');
        modal.remove()
    })

    $modalContainer.addEventListener('click', (e) => {
        const $closeBtn = e.target.closest('button')
        if(!$closeBtn) return
        if ($closeBtn.classList.contains('closeBtn')){
            const modal = document.querySelector('.modal');
            modal.remove()
        }
    })

    this.modalOpen = () => {
        const modal = document.querySelector('.modal');
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; 
    }
    this.render()
}