import { errorMessages } from '../constants';

export const validateComponent = (target) => {
  if (!target) {
    throw new Error(errorMessages.NEED_NEW_KEYWORD);
  }
};

export const validateArray = (array) => {
  if (!Array.isArray(array)) {
    throw new Error(errorMessages.NEED_ARRAY_TYPE);
  }
};

export const validateInputData = (data) => {
  const { title, content } = data;
  if (typeof title !== 'string' || typeof content !== 'string') {
    throw new Error(errorMessages.NEED_STRING_TYPE);
  }
};
