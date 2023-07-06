import {request} from './util/api.js'
import LinkButton from './button/LinkButton.js'
import PostList from './PostList.js'
import { push } from './util/router.js'

export default function PostsPage({
    $target,
}) {
    const $page = document.createElement('div')
    $target.appendChild($page)

    $page.style.flex = 2
    $page.style.order = 1
    
    const postList = new PostList({
        $target: $page,
        initialState:[],
    })

    new LinkButton({
        $target: $page,
        initialState: {
            text: 'New Document',
            link: '/posts/new'
        }

    })

    this.setState = async () => {
        const posts = await request('/documents',{
            method: 'GET'
        })
        console.log(posts, 'posts')
        postList.setState(posts)
        this.render()
    }

    this.render = async () => {
        $target.appendChild($page)
    }
}