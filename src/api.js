const startUrl = 'https://kdt-frontend.programmers.co.kr/documents'

const fetchApi = async (id, options) => {
  try {
    const data = await fetch(startUrl + `/${'' + id }`, options );
    if (data.ok) return await data.json();
  } catch (error) {
    console.log(error);
  }
}

export const fetchDoc = (USERNAME, id = '') => {
  const data = fetchApi(id, { headers: { 'x-username': USERNAME }})
  return data
};

export const createPost = (USERNAME , id = null) => {
  const data = fetchApi('', {
    headers : {
      'x-username': USERNAME,
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      title: 'new',
      parent: id 
    })
  })
  return data
}

export const updatePost = (USERNAME , id , title, content) => {
  const data = fetchApi(id, {
    headers : {
      'x-username': USERNAME,
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify({
      title,
      content
    })
  })
  return data
}

export const deletePost = async (USERNAME, id) => {
  await fetchApi( id, { headers : {'x-username': USERNAME }, method: "DELETE",})
  const data = fetchDoc(USERNAME, '')
  return data
}