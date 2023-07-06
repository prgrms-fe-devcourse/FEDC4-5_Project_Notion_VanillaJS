export default function SideBarItem({ $target, text }) {
    const $SideBarItem = document.createElement('div');
    $target.appendChild($SideBarItem);

    $target.innerHTML = `
    <div>
        <span>${text}</span>    
        <button>+</button>
        <button>-</button>        
    </div>
    `;

    this.render = () => {};
}
