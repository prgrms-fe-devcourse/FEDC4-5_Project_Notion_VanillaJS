import { validateComponent } from './validation';
import { errorMessages } from '../constants';

test('컴포넌트 생성시 new 키워드 붙였는지 여부 테스트', () => {
  function Component() {
    validateComponent(new.target);
    this.state = 0;
  }

  expect(() => {
    Component();
  }).toThrowError(errorMessages.NEED_NEW_KEYWORD);
});
