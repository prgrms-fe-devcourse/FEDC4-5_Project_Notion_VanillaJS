import { EditorPage } from "./EditorPage.js";
import { DocumentPage } from "./DocumentPage.js";
import { initRouter } from "./router.js";

export default function App ($target) {
    const $app = document.createElement('div');
    $app.className = 'mainApp'
    const editorPage = new EditorPage($app);
    const documentPage = new DocumentPage($app);

    $target.appendChild($app);

    this.route = () => {
        const { pathname } = window.location;
        if (pathname.indexOf('/documents/') === 0){
            const [, , documentId] = pathname.split('/');
            editorPage.setState({...editorPage.state, id : documentId});
        }
    }
    this.render = () => {
        documentPage.render();
        const { pathname } = window.location;
        const [, , documentId] = pathname.split('/');
        if(documentId){
            editorPage.setState({...editorPage.state, id: documentId})
        }
    }
    this.render()
    initRouter({onRoute : () => this.route()});
}