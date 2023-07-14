import validateComponent from './validateComponent';

test('컴포넌트 생성 시 new 키워드 붙이는지 테스트', () => {
  function Component() {
    validateComponent(this, Component);
    this.state = 0;
  }

  expect(() => {
    Component();
  }).toThrow('Component 컴포넌트는 new 키워드를 사용해 생성해야 합니다.');
});
