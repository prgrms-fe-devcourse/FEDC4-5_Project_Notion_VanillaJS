export default function Home({ appElement }) {
  if (!new.target) return new Home(...arguments);

  const containerElement = document.createElement("div");

  this.render = () => {
    appElement.append(containerElement);
    containerElement.innerHTML = `
      <h1>Home 입니다.</h1>
    `;
  };
}
