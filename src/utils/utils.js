export function findArrayById(arr, targetId) {
  // 주어진 배열에서 원하는 id를 가진 배열을 찾는 재귀 함수
  function find(arr, targetId) {
    for (let item of arr) {
      if (item.id == targetId) {
        return item; // 원하는 id를 가진 배열을 찾았을 때 반환
      }

      if (item.documents && item.documents.length > 0) {
        const found = find(item.documents, targetId); // 하위 documents 배열에서 재귀적으로 찾기
        if (found) {
          return found; // 하위에서 원하는 id를 가진 배열을 찾았을 때 반환
        }
      }
    }

    return null; // 찾지 못했을 경우 null 반환
  }

  return find(arr, targetId);
}

export const debounce = (callback, delay) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};
