import { push } from "./util/router.js"
import DeleteButton from "./button/DeleteButton.js"

export default function PostList ({ $target, initialState}) {
    const $postList = document.createElement('div')
    $target.appendChild($postList)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }



    this.render = () => {
        $postList.innerHTML =`
        <ul style ='
        list-style: none; border: 1px solid black; border-radius: 2px;
        margin: 0px 0px; padding: 0px 0px 0px 0px;
                  ;
        '>
            ${this.state.map(post => `
                <li style =' 
                display: flex;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 7px; cursor : pointer; user-select: none;
                '
                onmouseover="this.style.backgroundColor='#D8D8D8'"
                onmouseout="this.style.backgroundColor='white'"
                
                data-id ="${post.id}">&#127817${post.title}&nbsp&nbsp
                <div style ='display: 'inline-block';' class="delete-button-container-${post.id}"></div>

                </li>
            `).join('')}
        </ul>
        `
    }
    this.render()
    // this.render innerHTML에 넣었던 것.

    $postList.addEventListener('click', (e)=> {
        const $li = e.target.closest('li')

        if($li) {
            const { id } = $li.dataset
            console.log(id)
            push(`/posts/${id}`)
        }
    })

    setTimeout(() => {
        this.state.forEach((post) => {
            const container = document.querySelector(`.delete-button-container-${post.id}`);
            new DeleteButton({
              $target: container,
              initialState: {
                text: "Delete",
                link: "/documents",
                documentId: post.id,
              },
            });
          });
    }, 150);



}