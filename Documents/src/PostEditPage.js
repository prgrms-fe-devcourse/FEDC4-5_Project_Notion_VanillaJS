import { request } from './reqest.js'
import Editor from './Editor.js'
import { getItem, removeItem, setItem } from "./storage.js"

export default function PostEditPage({$target,initialState}){
    
    const $page = document.createElement('div')
    
    this.state = initialState

    let postLocalSaveKey = `temp-post-${this.state.postId}`
    
    const post = getItem(postLocalSaveKey,{
        title:'',
        content:''
    })
    
    let timer = null
    
    const editor = new  Editor({ 
        $target: $page,
        initialState:this.state.post,
        onEditing: (post) => {

            if(timer !== null){
                clearTimeout(timer)   
            }
            
            timer = setTimeout(async () => {
                
                postLocalSaveKey = `temp-post-${this.state.postId}`

                setItem(postLocalSaveKey,{
                    ...post,
                    tempSaveDate :new Date()
                })
                
                const isNew = this.state.postId 

                if(isNew){
                    const createdPost = await request('posts',{
                        method:'POST',
                        body:JSON.stringify(post)
                    }) 
                    console.log(createdPost)
                    history.replaceState(null,null,`/posts/${createdPost.id}`)
                    removeItem(postLocalSaveKey)

                }else{

                    await request(`/posts/${post.id}`,{
                        method:'PUT',
                        body:JSON.stringify(post)
                    })
                    removeItem(postLocalSaveKey)
                }
            }, 1000)
        }
    })

    this.setState = async nextState => {

        if(this.state.postId !== nextState.postId){
            this.state = nextState
            await fetchPosts()
            return
        }

        this.state = nextState
        
        this.render()
        
        editor.setState(this.state.post ?? {
            title:'',
            content:''
        })
    }

    this.render = () => {
        $target.appendChild($page)
    }

    const fetchPosts = async () => { 
        const {postId} = this.state
        postLocalSaveKey = `temp-post-${this.state.postId}`
        if(postId !=='new'){
            
            const post = await request(`posts/${postId}`) 
            
            const tempPost = getItem(postLocalSaveKey,{
                title:'',
                content:''
            })

            if(tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at){
                if(confirm('저장되지않은 임시 데이터가 있습니다, 불러올까요?')){
                    this.setState({
                        ...this.state,
                        post:tempPost
                    })
                    return
                }
            }
            else{
                this.setState({
                    ...this.state,
                    post:post
                })
                return
            }
        }
        else{   
            console.log(getItem(postLocalSaveKey,{
            title:'',
            content:''
            }))  
        } 
    }

}