import PostList from './components/PostList';
import { request } from './api/request';
import PostEditor from './components/PostEditor';

const DUMMY_DATA = {
  id: 1,
  title: '노션을 만들자',
  content: '즐거운 자바스크립트의 세계!',
  documents: [
    {
      id: 2,
      title: '',
      createdAt: '',
      updatedAt: '',
    },
  ],
  createdAt: '',
  updatedAt: '',
};
export default function App({ target }) {
  const postList = new PostList({
    target,
    initialState: [],
    onClickPost: async id => {
      const response = await fetchPost(id);

      postEditor.setState(response);
    },
    onClickAddButton: async clickedId => {
      const { id } = await fetchNewPost(clickedId);

      fetchPostList();

      const response = await fetchPost(id);
      postEditor.setState(response);
    },
    onClickDeleteButton: async clickedId => {
      await moveSubTreesToRoot(clickedId);

      await deletePost(clickedId);

      fetchPostList();
    },
  });

  const postEditor = new PostEditor({
    target,
    initialState: DUMMY_DATA,
    onEdit: (id, postData) => {
      modifyPost(id, postData);
    },
  });

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

  const init = () => {
    fetchPostList();
  };

  init();
}
