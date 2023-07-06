import NotionSideBar from './components/sidebar/NotionSideBar.js';
import NotionDefaultPage from './pages/NotionDefaultPage.js';
import { initRouter } from './routes/index.js';
import { getItem } from './utils/storage.js';
import { baseDecode } from './utils/baseEncode.js';
import NotionEditPage from './pages/NotionEditPage.js';

export default function App({ $target }) {
    const $mainContainer = document.createElement('div');
    $mainContainer.className = 'main-container';

    const notionSideBar = new NotionSideBar({
        $target: $mainContainer,
        initialState: getItem('x-username'),
    });
    const notionDefaultPage = new NotionDefaultPage({
        $target: $mainContainer,
    });
    const notionEditPage = new NotionEditPage({
        $target: $mainContainer,
        initialState: {
            documentId: null,
            document: [],
        },
    });

    this.render = () => {
        $target.appendChild($mainContainer);
    };
    this.render();

    this.route = () => {
        const { pathname } = window.location;
        const notionEdit = $mainContainer.querySelector('.notion-editor');
        const notionDefault = $mainContainer.querySelector('.notion-default');

        this.render();
        notionSideBar.render();

        if (pathname === '/') {
            notionDefaultPage.render();
            if (notionEdit) {
                notionEdit.style.display = 'none';
                if (notionDefault) notionDefault.style.display = '';
            }
        } else if (pathname.includes('/documents')) {
            const [, , documentId] = pathname.split('/');
            notionEditPage.setState(documentId);
            if (notionDefault) {
                notionDefault.style.display = 'none';
                if (notionEdit) notionEdit.style.display = '';
            }
        }
    };

    this.route();
    initRouter(() => this.route());
}
