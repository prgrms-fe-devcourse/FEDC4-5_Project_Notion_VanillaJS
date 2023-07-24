import { getDocumentDetail, updateDocument } from '../api/documentApi.js';
import { getItem } from '../utils/storage.js';
import { baseEncode } from '../utils/baseEncode.js';
import Editor from '../components/editor/Editor.js';

export default function NotionEditPage({ $target, initialState }) {
    const $page = document.createElement('div');
    $page.className = 'notion-editor';
    // $page.textContent = 't';
    this.state = initialState;
    let timer = null;

    const editor = new Editor({
        $target: $page,
        initialState: this.state.document,
        onEditing: (post) => {
            const { id, title, content } = post;
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                const $titleElement = document.querySelector(
                    `[data-id="${id}"]`
                );
                const $spanElements = $titleElement.querySelector('span.item');
                const $textNode = Array.from($spanElements.childNodes).find(
                    (node, index, array) => {
                        // 이전 노드가 button 요소이고, 현재 노드가 텍스트 노드인지 확인
                        return (
                            array[index - 1] &&
                            array[index - 1].nodeName === 'BUTTON' &&
                            node.nodeType === Node.TEXT_NODE
                        );
                    }
                );

                if ($textNode && $textNode.textContent !== title) {
                    if (title.length === 0) title = '제목 없는 문서';
                    else $textNode.textContent = title;
                }

                await updateDocument(id, getItem('x-username'), {
                    title,
                    content,
                });
            }, 2000);
        },
    });

    this.setState = async (nextState) => {
        this.state.documentId = nextState;
        await fetchGetDocumentDetail();
        this.render();

        editor.setState(this.state.document);
    };

    this.render = () => {
        $target.appendChild($page);
    };

    const fetchGetDocumentDetail = async () => {
        if (this.state.documentId) {
            this.state.document = await getDocumentDetail(
                this.state.documentId,
                getItem('x-username')
            );
        }
    };
}
