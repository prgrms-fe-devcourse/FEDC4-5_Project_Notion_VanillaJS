import PostList from './components/PostList.js';
import { request } from './api/request.js';
import PostEditor from './components/PostEditor.js';
import { pushRoute, popRoute, initRouter } from './router.js';
const fetchPostDocument = async id => {
  const response = await request(`/${id}`, {
    method: 'GET',
  });
  return response;
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
const changeParentId = async (parentId, document) => {
  const { id } = await fetchNewPost(parentId);

  await modifyPost(id, {
    title: document.title,
    content: document.content,
  });

  return id;
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

export default function App({ target }) {
  const postEditorContainer = document.createElement('div');
  const postListContainer = document.createElement('div');

  const postList = new PostList({
    target: postListContainer,
    initialState: [],
    onClickPost: async id => {
      // const response = await fetchPostDocument(id);
      // postEditor.setState(response);
    },
    onClickAddButton: async clickedId => {
      const { id } = await fetchNewPost(clickedId);

      fetchPostList();

      const response = await fetchPostDocument(id);

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
    target: postEditorContainer,
    initialState: {},
    onEdit: async (id, postData) => {
      await modifyPost(id, postData);
      fetchPostList();
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

  this.route = async () => {
    target.innerHTML = '';
    const { pathname } = window.location;
    console.log(pathname);

    if (pathname === '/') {
      renderPostList();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');
      renderPostList();
      await renderPostEditor(postId);
    }
  };
  this.route();
  initRouter(() => this.route());
  popRoute(() => this.route());

  const fetchPostList = async () => {
    const response = await request('', {
      method: 'GET',
    });

    postList.setState(response);
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
