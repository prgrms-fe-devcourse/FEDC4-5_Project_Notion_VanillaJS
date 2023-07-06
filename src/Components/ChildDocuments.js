import { push } from '../router.js';
export default function ChildDocument ({$target, $document}){
    const $childDocument = document.createElement('div');
    $childDocument.className = 'childLink';
    $target.append($childDocument);

    this.state = {
        data : $document
    }
    this.setState = nextState => {
        this.state = nextState 
        this.render();
    }
    this.render = () => {
        if(this.state.data){
            const { documents } = this.state.data
            if(documents){
                console.log(documents)
                $childDocument.innerHTML = `${
                documents.map(({id, title}) => 
                    `<li class="linkDoc" data-id=${id}>${title}</li>`
                ).join('')}`
            }
            }
        }

    this.render();
    
    $childDocument.addEventListener('click', (e) => {
        const $link = e.target.closest('li');
        const { id } = $link.dataset;
        push(`/documents/${id}`)
    })
}