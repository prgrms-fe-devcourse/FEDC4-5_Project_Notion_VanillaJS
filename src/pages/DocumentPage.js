import DocumentLists from "../components/DocumentLists.js"
import Footer from "../components/Footer.js"
import Header from "../components/Header.js"
import { deleteDocument, postDocument, fetchDocumentLists } from "../utils/requset.js"
import { updateDocumentTitle, push } from "../utils/router.js"


export default function DocumentPage({$target}){
    const $page = document.createElement("div")
    $target.appendChild($page)
    $page.className = "document__page"

    this.render = ()=>{    
        $target.appendChild($page)
    }

    new Header({
        $target : $page
    })

    const documentLists = new DocumentLists({
        $target : $page,
        initialState :[],
        onRemove: async(id)=>{
            await deleteDocument(id)
            push("/")
            updateDocumentList()
        },
        onCreate : async(id)=>{
            const newDocument = await postDocument(id)
            push(`/documents/${newDocument.id}`)
            updateDocumentList()
        },
    })

    new Footer({
        $target : $page,
        onClick : async()=>{
            const newDocument = await postDocument()
            push(`/documents/${newDocument.id}`)
            updateDocumentList()
        }
    })

    const updateDocumentList = async()=>{ 
        documentLists.setState(await fetchDocumentLists())
    }

    updateDocumentTitle(()=>{
        updateDocumentList() 
    })
    updateDocumentList()
}

