import { request } from "./util/api.js"
import Editor from "./Editor.js"
import { getItem, removeItem, setItem } from "./util/storage.js"
import { push } from "./util/router.js"
import LinkButton from "./button/LinkButton.js"

export default function PostEditPage({$target, initialState}) {
    const $page = document.createElement('div')
    $target.appendChild($page)

    $page.style.flex = 8
    $page.style.order = 2


    this.state = initialState

    let postLocalSaveKey = `temp-post-${this.state.postId}`
    
    let timer = null

    const editor = new Editor ({ 
    $target: $page,
    initialState: this.state.post,
    onEditing: (post) => {
        if(timer!== null) {
            clearTimeout(timer)
        }
        timer = setTimeout( async()=> {
            setItem(postLocalSaveKey, {
                ...post,
                tempSaveDate: new Date()
            })
            
            const isNew = this.state.postId === 'new'
            if(isNew) {
                const createdPost = await request('/documents',{
                    method: 'POST',
                    body: JSON.stringify(post)
                })
                history.replaceState(null,null, `/posts/${createdPost.id}`)
                removeItem(postLocalSaveKey)

                this.setState({
                    postId: createdPost.id,
                })
            }else {
                await request(`/documents/${post.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(post)
                })
                removeItem(postLocalSaveKey)

            }
            

        },2000)
    }
    })

    // 여기서 async await를 붙이는 이유는 뭘까?
    // 아래 setState 부분 이해가 어렵다
    this.setState = async nextState => {
        if(this.state.postId !== nextState.postId){
            postLocalSaveKey = `temp-post-${nextState.postId}`
            this.state =nextState
            if(nextState.postId === 'new') {
                
            } else {
                await fetchPost()
            }
            return
        }
        this.state = nextState
        this.render()

        editor.setState(this.state.post || {
            title: '',
            content: ''
        })
    }

    this.render = () => {
        $target.appendChild($page)
    }

    const fetchPost = async () => {
        const {postId} = this.state

        if(postId !== 'new') {
            const post = await request(`/documents/${postId}`,{
                method: 'PUT'
            })

            const tempPost = getItem(postLocalSaveKey, {
                title: '',
                content: ''
                })

            if( tempPost.tempSaveDate && tempPost.tempSaveDate >post.updated_at) {
                if(confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
                    this.setState({
                        ...this.state,
                        post: tempPost
                    })
                    return
                }
            }

            this.setState({
                ...this.state,
                post
            })
        }
    }

    // new LinkButton({
    //     $target: $page,
    //     initialState: {
    //         text: '목록으로 이동',
    //         link: '/'
    //     }
    // })

}