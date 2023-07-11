const NEED_NEW_KEYWORD = 'new 키워드를 붙여주세요!';
const NEED_ARRAY_TYPE = '배열로 입력해야 합니다!';
const NEED_STRING_TYPE = '제목과 내용은 문자열이어야 합니다!';

export const validateComponent = (target) => {
  if (!target) {
    throw new Error(NEED_NEW_KEYWORD);
  }
};

export const validateArray = (array) => {
  if (!Array.isArray(array)) {
    throw new Error(NEED_ARRAY_TYPE);
  }
};

export const validateInputData = (data) => {
  const { title, content } = data;
  if (typeof title !== 'string' || typeof content !== 'string') {
    throw new Error(NEED_STRING_TYPE);
  }
};
