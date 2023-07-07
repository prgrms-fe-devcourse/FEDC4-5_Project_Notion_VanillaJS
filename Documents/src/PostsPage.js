import PostList from "./PostList.js"
import { request } from "./reqest.js" 

export default function PostsPage({
    $target
}){
    const $page = document.createElement('div')

    const postList = new PostList({
        $target,
        initialState:[]
    })
    
    const $newPostButton  = document.createElement('button')
    $newPostButton.textContent = 'New Post'
    $page.appendChild($newPostButton)
    
    const fetchPosts = async () => {
        const posts = await request('posts')
        console.log("posts",posts)
        postList.setState(posts)
    }

    this.render = async () => {
        await fetchPosts()
        $target.appendChild($page)
    }   
}