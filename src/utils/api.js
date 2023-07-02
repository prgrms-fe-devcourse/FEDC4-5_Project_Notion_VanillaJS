export const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "MinwooP" 
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리 중 뭔가 이상합니다 !");
  } catch (e) {
    alert(e.message);
  }
};



// 사용법
// const createdPost = await request("/posts", {
//   // 새로 post를 생성하는 API => postId 값을 return 해줌.
//   method: "POST",
//   body: JSON.stringify(post),
// });


// const posts = await request("/posts"); // 서버로부터 posts 불러오고