// *******************완료 목록*******************
// postspage와 posteditpage 나누어 container로 묶기
// postspage 데이터 출력
// 클릭시 편집창에 title content 띄우기 (content 추가가 안되서,아직은 확인 불가)
//history API 수정
//편집 시, 자동저장
// 새로운 Document 생성 기능
// -    버튼과 기능 구현
// postpage, posteditpage /루트접속시, 뒤바뀌지 않게 하기


// *******************할일 목록**********************
// Editor 수정시, PostList 실시간 수정 (title)
// Delete 버튼 클릭시 PostList 실시간 수정
// 새로고침 시 정상렌더링 구현
// 트리구조 렌더링
// +    버튼과 기능 구현
// <    버튼과 기능 구현

import PostsPage from "./PostsPage.js";
import PostEditPage from "./PostEditPage.js";
import { initRouter } from "./util/router.js";

//  url 규칙
//  루트: postsPage 그리기

//  /posts/{id} - id에 해당하는 post 생성
//  /posts/new - 새 post 생성

export default function App ({$target}) {
    const $container = document.createElement('div')
    $target.appendChild($container)

    $container.style.display = 'flex'

    const postsPage = new PostsPage({
        $target: $container,
    }) 
    const postsEditPage = new PostEditPage({
        $target: $container,
        initialState: {
        postId: 'new',
        post: {
            title: '',
            content: ''
        }
    }})

    this.route = () => {
        // $target.innerHTML = '' 
        // PostList와 Editor를 같이 보여주기 위해 주석처리.
        const {pathname} = window.location

        if(pathname === '/') {
            postsPage.setState()
        }else if (pathname.indexOf('/posts/') === 0) {
            const [, , postId] = pathname.split('/')
            postsEditPage.setState({postId})
        }
    }

    this.route()

    // const deleteDocument = async (documentId, $documentList) => {
    //     try {
    //         const res = await fetch(`https://kdt-frontend.programmers.co.kr/documents/${documentId}`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-username' : 'hosoo_working'
    //             },
    //             method: 'DELETE',
    //             // mode: 'no-cors'
    //         })
    
    //         if(res.ok) {
    //             loadDocumentListAndRendering($documentList)
    //         }
    //     }catch(e) {
    //         alert(e.message)
    //     }
    // }
    // deleteDocument(81970)
    

    initRouter(() => this.route())
}