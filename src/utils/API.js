const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

export const getRootAPI = async() => {
  try {
    const response = await fetch(`${API_END_POINT}/documents`, {
      headers: {
        'x-username': 'suyeon'
      }
    });
    
    if (response.ok) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getContentAPI = async(pathname) => {
  try {
    const response = await fetch(`${API_END_POINT}${pathname}`, {
      headers: {
        'x-username': 'suyeon'
      }
    });

    if (response.ok) {
      const data = response.json();
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const createAPI = async(document) => {
  try {
    const response = await fetch(`${API_END_POINT}/documents`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-username': 'suyeon'
      }, 
      body: JSON.stringify(document)
    })

    if (response.ok) { 
      const data = response.json();

      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const editAPI = async(pathname, document) => {
  try {
    const response = await fetch(`${API_END_POINT}${pathname}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'x-username': 'suyeon'
      }, 
      body: JSON.stringify(document)
    })

    if (response.ok) { 
      const data = response.json();

      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const removeAPI = async(pathname) => {
  try {
    const response = await fetch(`${API_END_POINT}${pathname}`, {
      headers: {
        'x-username': 'suyeon'
      },
      method: 'DELETE'
    })

    if (response.ok) {
      alert('삭제되었습니다.');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}