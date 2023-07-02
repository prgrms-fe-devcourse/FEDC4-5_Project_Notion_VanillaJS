import PostList from './components/PostList.js';
import { request } from './api/request.js';
import PostEditor from './components/PostEditor.js';
import { pushRoute, popRoute, initRouter } from './router.js';
export default function App({ target }) {
  // const postEditorContainer = document.createElement('div');
  // const postListContainer = document.createElement('div');

  // target.appendChild(postListContainer);
  // target.appendChild(postEditorContainer);

  const postList = new PostList({
    target,
    initialState: [],
    onClickPost: async id => {
      // const response = await fetchPost(id);
      // postEditor.setState(response);
    },
    onClickAddButton: async clickedId => {
      const { id } = await fetchNewPost(clickedId);

      fetchPostList();

      const response = await fetchPost(id);

      // postEditor로 바뀔 때 history api도 변경 필요
      // postEditor.setState(response);

      pushRoute(`/documents/${id}`);
    },
    onClickDeleteButton: async clickedId => {
      await moveSubTreesToRoot(clickedId);

      await deletePost(clickedId);

      fetchPostList();

      pushRoute(`/`);
    },
  });

  const postEditor = new PostEditor({
    target,
    initialState: {},
    onEdit: (id, postData) => {
      modifyPost(id, postData);
    },
  });

  this.route = async () => {
    target.innerHTML = '';
    const { pathname } = window.location;
    console.log(pathname);

    if (pathname === '/') {
      postList.render();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      postList.render();

      const response = await fetchPost(postId);
      postEditor.setState(response);
    }
  };
  // this.route();
  initRouter(() => this.route());
  popRoute(() => this.route());

  const fetchPostList = async () => {
    const response = await request('', {
      method: 'GET',
    });

    postList.setState(response);
  };

  const fetchNewPost = async id => {
    const response = await request('', {
      method: 'POST',
      body: JSON.stringify({
        title: '제목 없음',
        parent: id,
      }),
    });
    return response;
  };

  const changeParentId = async (parentId, document) => {
    const { id } = await fetchNewPost(parentId);

    await modifyPost(id, {
      title: document.title,
      content: document.content,
    });

    return id;
  };

  const moveSubTreesToRoot = async clickedId => {
    const response = await fetchPost(clickedId);

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

  const fetchPost = async id => {
    const response = await request(`/${id}`, {
      method: 'GET',
    });
    return response;
  };

  const modifyPost = async (id, postData) => {
    const response = await request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
    return response;
  };

  const deletePost = async id => {
    await request(`/${id}`, {
      method: 'DELETE',
    });
  };

  const init = async () => {
    await fetchPostList();

    const { pathname } = location;
    if (pathname.length > 1) {
      this.route();
    }
  };

  init();
}
