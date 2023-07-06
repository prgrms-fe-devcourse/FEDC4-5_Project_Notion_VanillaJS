const ROUTE_CHANGE_EVENT_NAME = "route-change"
const TITLE_UPDATE_EVENT_NAME = 'title-update'

export const initRouter = (onRoute)=>{
    window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e)=>{ 
        const {nextUrl} = e.detail

        if(nextUrl){
        history.pushState(null,null,nextUrl)
        onRoute()
        }
    })

    window.addEventListener("popstate", ()=>{
        onRoute()
    })
}
export const push = (nextUrl)=>{ 
    window.dispatchEvent(new CustomEvent('route-change',{
        detail :{
            nextUrl
        }
    }))
}

export const updateDocumentTitle= (onUpdate)=>{
    window.addEventListener(TITLE_UPDATE_EVENT_NAME, ()=>{
        onUpdate()
    })
}

export const update = ()=>{
    window.dispatchEvent(new CustomEvent('title-update',{
    }))
}
