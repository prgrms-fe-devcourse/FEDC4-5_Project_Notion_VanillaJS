import PostList from './components/PostList.js';
import PostEditor from './components/PostEditor.js';
import { pushRoute, popRoute, initRouter } from './utils/router.js';
import {
  fetchPostList,
  fetchPostDocument,
  fetchNewPost,
  modifyPost,
  deletePost,
  changeParentId,
} from './api/api.js';

export default function App({ target }) {
  const postListContainer = document.createElement('div');
  const postEditorContainer = document.createElement('div');

  postListContainer.setAttribute('class', 'postListContainer');
  postEditorContainer.setAttribute('class', 'postEditorContainer');

  const postList = new PostList({
    target: postListContainer,
    initialState: { currentId: null, list: [] },
    onClickAddButton: async clickedId => {
      const { id } = await fetchNewPost(clickedId);

      updatePostList();

      fetchPostDocument(id);

      pushRoute(`/documents/${id}`);
    },
    onClickDeleteButton: async clickedId => {
      // await moveSubTreesToRoot(clickedId);

      await deletePost(clickedId);

      updatePostList();

      history.replaceState(null, null, `/`);
      this.route();
    },
  });

  const postEditor = new PostEditor({
    target: postEditorContainer,
    initialState: {},
    onEdit: async (id, postData) => {
      await modifyPost(id, postData);
      updatePostList();
    },
  });

  const renderPostList = () => {
    target.appendChild(postListContainer);
    postList.setState({ ...postList.state, currentId: null });
    // postList.render();
  };

  const renderPostPage = async postId => {
    renderPostList();

    target.appendChild(postEditorContainer);

    if (postId) {
      postList.setState({ ...postList.state, currentId: postId * 1 });

      const response = await fetchPostDocument(postId);
      postEditor.setState(response);
    }
  };

  this.route = () => {
    target.innerHTML = ''; // 초기화하지 않으면 home에 왔을 때 기존 컴포넌트들이 유지됨

    const { pathname } = window.location;

    if (pathname === '/') {
      renderPostList();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      renderPostPage(postId);
    }
  };

  const updatePostList = async () => {
    const newPostList = await fetchPostList();
    postList.setState({ ...postList.state, list: newPostList });
  };

  const moveSubTreesToRoot = async clickedId => {
    const response = await fetchPostDocument(clickedId);

    const subDocuments = response.documents;

    const queue = [];

    subDocuments.forEach(document => {
      queue.push([null, document]);
    });

    while (queue.length) {
      const [parentId, data] = queue.shift();
      const subData = data.documents;

      if (!data || !subData) continue;

      const currentId = await changeParentId(parentId, data);

      subData.forEach(document => {
        queue.push([currentId, document]);
      });
    }
  };

  const init = () => {
    this.route();
    initRouter(() => this.route());
    popRoute(() => this.route());

    updatePostList();
  };

  init();
}
