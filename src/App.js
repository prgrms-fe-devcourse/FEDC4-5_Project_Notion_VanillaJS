import DocumentPage from "./pages/DocumentPage.js";
import EditorPage from "./pages/EditorPage.js";
import { initRouter } from "./utils/router.js";

export default function App({$target}){
    const documentPage = new DocumentPage({
        $target,
    })

    const editorpage = new EditorPage({
        $target,
        initialState :{}
    })

    this.route = () =>{
        const {pathname} = window.location
        $target.innerHTML = ""
        if(pathname === "/"){
            documentPage.render()
        }else if(pathname.indexOf("/documents/") === 0){
            const [,,documentId] = pathname.split("/")
            documentPage.render()
            editorpage.setState({documentId})
        }else{
            $target.innerHTML = ""
            documentPage.render()
        }
    } 
    documentPage.render()
    this.route()

    initRouter(()=>{
        this.route()
    })

}