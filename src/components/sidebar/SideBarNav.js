import CommonButton from '../button/CommonButton.js';

export default function SideBarNav({
    $target,
    initialState,
    onDelete,
    onMove,
    onAddItem,
}) {
    const $sideBarNav = document.createElement('div');
    $sideBarNav.className = 'sidebar-nav';
    $target.appendChild($sideBarNav);
    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        if (!!this.state) {
            $sideBarNav.innerHTML = `
                <div class="item-group">
                    ${this.state
                        .map((document, index) =>
                            this.renderItem(document, index)
                        )
                        .join('')}
                <div>
            `;
        }
    };

    this.renderItem = (document, index) => {
        let count = 0;
        const documentHTML = `
            <div class="item-container" data-id="${document.id}" data-index="${index}">
                <span class="item">
                    <button> V </button>
                    ${document.title}
                </span>
                <button class="add-btn"> + </button>
                <button class="delete-btn"> - </button>
                <child-documents/>
            </div>
        `;

        if (document.documents && document.documents.length > 0) {
            const childDocumentsHTML = document.documents
                .map((childDocument, childIndex) =>
                    this.renderItem(childDocument, childIndex)
                )
                .join('');
            count += 1;

            return documentHTML.replace(
                '<child-documents/>',
                `<div class="child-documents" style="padding-left: ${
                    10 * count
                }px">${childDocumentsHTML}</div>`
            );
        } else {
            return documentHTML;
        }
    };

    $sideBarNav.addEventListener('click', (e) => {
        const { target } = e;
        const id = target.parentNode.getAttribute('data-id');
        const index = target.parentNode.getAttribute('data-index');

        if (target.className === 'delete-btn') {
            onDelete(id);
        }

        if (target.className === 'item') {
            onMove(id);
        }

        if (target.className === 'add-btn') {
            onAddItem(id);
        }
    });

    // const button = CommonButton();
    // $target.appendChild(button);
}
