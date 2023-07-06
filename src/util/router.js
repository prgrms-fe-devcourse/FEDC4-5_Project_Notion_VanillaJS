const ROUTE_CHANGE_EVENT_NAME ='route-change'

export const initRouter = (onRoute) => {
    window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e)=> {
        const  { nextUrl } = e.detail

        if(nextUrl) {
            history.pushState(null, null, nextUrl)
            //여기서 this.route()실행은 import안하고도 사용이 가능한가?
            onRoute()
        }
    })
}

export const push = (nextUrl) => {
    window.dispatchEvent(new CustomEvent('route-change', {
        detail: {
            nextUrl
        }
    })
)
}