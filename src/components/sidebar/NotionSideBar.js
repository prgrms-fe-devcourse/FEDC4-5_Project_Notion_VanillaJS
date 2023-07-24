import SideBarHeader from './SideBarHeader.js';
import {
    deleteDocument,
    getDocumentLists,
    postDocument,
} from '../../api/documentApi.js';
import { getItem } from '../../utils/storage.js';
import SideBarNav from './SideBarNav.js';
import CommonButton from '../button/CommonButton.js';
import { push } from '../../routes/index.js';
import { defaultDocument } from '../../constants/defaultValue.js';

export default function NotionSideBar({ $target, initialState }) {
    const $sideBar = document.createElement('div');
    $sideBar.className = 'sidebar';
    this.name = initialState;
    this.state = [];

    const sideBarHeader = new SideBarHeader({
        $target: $sideBar,
        initialState: this.name,
        onNameChange: (newName) => {
            this.name = newName;
            sideBarNav.setState(this.state);
        },
    });

    const sideBarNav = new SideBarNav({
        $target: $sideBar,
        initialState: this.state,
        onDelete: async (index) => {
            await deleteDocument(index, this.name);
            push('/');
        },
        onMove: async (index) => {
            push(`/documents/${index}`);
        },
        onAddItem: async (index) => {
            const document = { ...defaultDocument };
            document.parent = index;
            const result = await postDocument(document, this.name);
            push(`/documents/${result.id}`);
        },
    });

    const commonButton = new CommonButton({
        $target: $sideBar,
        className: 'add-document',
        text: '+ 추가하기',
        onclick: async () => {
            const result = await postDocument(defaultDocument, this.name);
            push(`/documents/${result.id}`);
        },
    });

    const fetchGetDocumentLists = async () => {
        const state = await getDocumentLists(this.name);
        const newName = getItem('x-username');

        if (this.name !== newName) this.name = newName;

        sideBarHeader.setState(newName);
        sideBarNav.setState(state);
    };

    this.render = async () => {
        $target.appendChild($sideBar);
        await fetchGetDocumentLists();
    };
}
