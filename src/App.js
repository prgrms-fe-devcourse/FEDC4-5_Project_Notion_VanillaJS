import PostList from './components/PostList.js';
import PostEditor from './components/PostEditor.js';
import { pushRoute, popRoute, initRouter } from './router.js';
import {
  fetchPostList,
  fetchPostDocument,
  fetchNewPost,
  modifyPost,
  deletePost,
  changeParentId,
} from './api/api.js';

export default function App({ target }) {
  const postEditorContainer = document.createElement('div');
  const postListContainer = document.createElement('div');

  const postList = new PostList({
    target: postListContainer,
    initialState: [],
    onClickAddButton: async clickedId => {
      const { id } = await fetchNewPost(clickedId);

      updatePostList();

      fetchPostDocument(id);

      pushRoute(`/documents/${id}`);
    },
    onClickDeleteButton: async clickedId => {
      await moveSubTreesToRoot(clickedId);

      await deletePost(clickedId);
      updatePostList();

      // pushRoute(`/`);
      history.replaceState(null, null, `/`);
      this.route();
    },
  });

  const postEditor = new PostEditor({
    target: postEditorContainer,
    initialState: {},
    onEdit: (id, postData) => {
      modifyPost(id, postData);
      updatePostList();
    },
  });

  const renderPostList = () => {
    target.appendChild(postListContainer);
    postList.render();
  };

  const renderPostEditor = async postId => {
    target.appendChild(postListContainer);
    target.appendChild(postEditorContainer);
    postList.render();

    if (postId) {
      const response = await fetchPostDocument(postId);
      postEditor.setState(response);
    }
  };

  this.route = () => {
    target.innerHTML = '';
    const { pathname } = window.location;

    if (pathname === '/') {
      renderPostList();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      renderPostList();
      renderPostEditor(postId);
    }
  };

  const updatePostList = async () => {
    const newPostList = await fetchPostList();
    postList.setState(newPostList);
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
