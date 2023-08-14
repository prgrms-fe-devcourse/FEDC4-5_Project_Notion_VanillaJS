import { DocumentCreate } from "./DocumentCreate.js"
import { routerNav } from '../router.js';

export function DocumentList({$target, data =[], initialState, onSubmit}) {
    this.state = initialState
    this.setState = (nextState) => {
        this.state = nextState
    }
    this.render = ($renderDOM = $target) => {
        console.log(this.state.depth)
        data.map((data) => {
            const doc = document.createElement('li');
            doc.setAttribute("data-id", `${data.id}`);
            doc.setAttribute("class", 'doc');
            doc.textContent =`${data.title}`
            $renderDOM.insertAdjacentElement("beforeend", doc);
        })
    }
          
    this.onSelect = (data, $li) => {
        if(data.length === 0){
            const $haveNothing = document.createElement('div');
            $haveNothing.classList.add('nothing')
            $haveNothing.textContent = '하위 페이지 없음'
            $li.append($haveNothing)
        }
        data.forEach((data => {
            const $parentNode = document.createElement('div')
            $parentNode.className = `doc-${this.state.selectedNode}`
            $parentNode.style.marginLeft = `${this.state.depth * 10}px`;
            const createBtn = new DocumentCreate({
                $target: $parentNode, 
                parentId: this.state.parent, 
                onSubmit: onSubmit
            })
            createBtn.render();
            $li.append($parentNode);
            const documentList = new DocumentList({
                $target: $parentNode,
                data: [data],
                initialState: {...this.state},
                onSubmit: onSubmit
            })
            documentList.render();
        }))
    }
    $target.addEventListener('click', (e) => {
        e.stopPropagation();
        if($target.classList.contains('documentPage') && !e.target.classList.contains('doc'))
            return
        else if (e.target.classList.contains('createDoc')){
            return
        }
        else if (e.target.classList.contains('nothing')){
            return
        }
        if(this.state.isOpen){
            while(e.target.querySelector('div')){
                e.target.classList.remove("open");
                const $removeTarget = e.target.querySelector('div')
                e.target.removeChild($removeTarget);
            }
            this.setState({
                ...this.state,
                isOpen: !this.state.isOpen,
            })
            return
        }
        const $li = e.target
        if($li){
            const { id } = $li.dataset;
            if(data){
                const childrenData = data.map(data => data.documents)
                $li.classList.add('open')
                if(childrenData[0].length > 0){
                    this.setState({
                        parent: this.state.depth === 0 ? parseInt(id) : parseInt(this.state.parent),
                        selectedNode: parseInt(id),
                        isOpen: !this.state.isOpen,
                        depth: this.state.depth + 1
                    })
                    this.onSelect(childrenData[0], $li)
                } 
                else {
                    this.setState({
                        ...this.state,
                        isOpen: !this.state.isOpen,
                    })
                    this.onSelect([], $li)
                }
                routerNav(`/documents/${id}`);
            }
        }    
    })
}