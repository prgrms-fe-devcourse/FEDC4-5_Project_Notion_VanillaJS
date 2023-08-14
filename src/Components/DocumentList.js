import { DocumentCreate } from "./DocumentCreate.js"
import { routerNav } from '../router.js';

export function DocumentList({$target, data =[], initialState, onSubmit}) {
    let init = false;
    this.state = initialState
    this.setState = (nextState) => {
        this.state = nextState
    }
    this.render = ($renderDOM = $target) => {
        const $parentNode = document.createElement('div')
        $parentNode.className = `doc-${this.state.selectedNode}`
        $parentNode.style.marginLeft = `${this.state.depth * 10}px`;
        const createBtn = new DocumentCreate({
            $target: $parentNode, 
            parentId: this.state.parent, 
            onSubmit: onSubmit
        })
        const doc = document.createElement('li');
        doc.setAttribute("data-id", `${data[0].id}`);
        doc.setAttribute("class", 'doc');
        doc.textContent =`${data[0].title}`
        $parentNode.append(doc)
        console.log(this.state.isOpen)
        if(data[0].documents.length === 0){
            const $haveNothing = document.createElement('div');
            $haveNothing.classList.add('nothing')
            $haveNothing.textContent = '하위 페이지 없음'
            doc.append($haveNothing)  
         }
        else {
            data[0].documents.forEach((data => {
                const documentList = new DocumentList({
                    $target: doc,
                    data: [data],
                    initialState: {parent: this.state.selectedNode, selectedNode: data.id, depth: this.state.depth + 1, isOpen: false},
                    onSubmit: onSubmit
                })
                documentList.render()
            }))
        }
        init= true
        $renderDOM.append($parentNode)
        
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
        console.log(e.target)
        console.log(this.state)
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
                        parent: this.state.depth === 0 ? parseInt(id, 10) : parseInt(this.state.parent, 10),
                        selectedNode: parseInt(id),
                        isOpen: !this.state.isOpen,
                        depth: this.state.depth
                    })
                } 
                else {
                    this.setState({
                        ...this.state,
                        isOpen: !this.state.isOpen,
                    })
                }
                routerNav(`/documents/${id}`);
            }
        }    
    })
}