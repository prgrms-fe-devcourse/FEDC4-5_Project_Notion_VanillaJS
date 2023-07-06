export default function CommonButton({ $target, className, text, onclick }) {
    const $button = document.createElement('button');
    $button.className = className;

    $target.appendChild($button);

    this.render = () => {
        $button.textContent = text;
    };

    this.render();

    $button.addEventListener('click', () => {
        onclick();
    });
}
