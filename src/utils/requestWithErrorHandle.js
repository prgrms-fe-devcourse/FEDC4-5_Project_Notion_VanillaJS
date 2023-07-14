export async function requestWithErrorHandle(url, option, handler) {
  try {
    const res = await fetch(url, option);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status} Error`);
    }
  } catch (error) {
    handler(error);
  }
}
