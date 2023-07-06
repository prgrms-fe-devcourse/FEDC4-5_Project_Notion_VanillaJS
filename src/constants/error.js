const ERROR_MSG = {
  INVALID_STRING_TYPE: '문자열이 아닙니다.',
  API_ERROR: {
    ERROR_404: '잘못된 요청입니다!',
    ERROR_401: '인증되지 않은 요청입니다!',
    ERROR_403: '승인되지 않은 요청입니다!',
    ERROR_400: '잘못된 요청입니다!',
    ERROR_DEFAULT: '네트워크 요청 중 에러가 발생했습니다!',
  },
};

Object.freeze(ERROR_MSG);
export { ERROR_MSG };
