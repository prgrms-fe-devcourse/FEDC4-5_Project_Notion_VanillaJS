const startUrl = 'https://kdt-frontend.programmers.co.kr/documents'

export const getApi = async (username, id = '') => {
  const data = await fetch(startUrl + `/${'' + id }`,{
    headers : {'x-username': username }
  })
  .then((res) => { if (res.ok) return res.json() })
  .catch((e) => console.log(e))

  return data
}

export const postApi = async (username , id = null) => {
  const data = await fetch(startUrl,{
    headers : {
      'x-username': username,
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      title: 'new',
      parent: id
    })
  })
  .then((res) => { if (res.ok) return res.json() })
  .catch((e) => console.log(e))

  return data
}

export const putApi = async (username , id , title, content) => {
  const data = await fetch(startUrl + `/${'' + id }`,{
    headers : {
      'x-username': username,
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify({
      title,
      content
    })
  })
  .then((res) => { if (res.ok) return res.json() })
  .catch((e) => console.log(e))

  return data
}

export const deleteApi = async (username, id) => {
  await fetch(startUrl + `/${'' + id }`,{
    headers : {
      'x-username': username
    },
    method: "DELETE",
  })
  .then((res) => { if (res.ok) return res.json() })
  .catch((e) => console.log(e))
}

