export const addDocuments = (posts, id, newData) => {
  if (id === "new") {
    posts.push(newData);
    return;
  }
  for (const post of posts) {
    if (post.id === id) {
      post.documents.push(newData);
      return;
    }
    addDocuments(post.documents, id, newData);
  }
  return;
};

export const filterNewDocument = (posts, id) => {
  for (const post of posts) {
    if (post.id === "new") {
      post.id = id;
      return;
    }
    filterNewDocument(post.documents, id);
  }
};

export const filterRemoveDocument = (posts, id) => {
  const filterData = [];
  for (const post of posts) {
    const { id: postId, title, documents } = post;
    if (postId !== id) {
      const filterItem = {
        id: postId,
        title,
        documents: filterRemoveDocument(documents, id),
      };
      filterData.push(filterItem);
    }
  }
  return filterData;
};

export const filterDocument = (posts, updatePost) => {
  let filterArr = [];
  for (const post of posts) {
    if (post.id === updatePost.id) {
      filterArr.push(updatePost);
    }
    if (post.documents.length > 0) {
      const updatedDocuments = filterDocument(post.documents, updatePost);
      post.documents = updatedDocuments;
    }
    filterArr.push(post);
  }
  return filterArr;
};
