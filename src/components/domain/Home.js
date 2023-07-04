export default function Home({ parentElement }) {
  if (!new.target) return new Home(...arguments);

  const containerElement = document.createElement("div");

  this.render = () => {
    parentElement.append(containerElement);
    containerElement.innerHTML = `
      <h1>Home 입니다.</h1>
    `;
  };

  this.reset = () => {
    containerElement.innerHTML = ``;
  };
}
