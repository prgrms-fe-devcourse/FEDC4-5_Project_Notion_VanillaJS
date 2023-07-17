export default function validateComponent(instance, Component) {
  if (!(instance instanceof Component)) {
    throw new Error(`${Component.name} 컴포넌트는 new 키워드를 사용해 생성해야 합니다.`);
  }
}
