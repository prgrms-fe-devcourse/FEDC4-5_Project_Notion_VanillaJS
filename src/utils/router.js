const ROUTE_EVENT_NAME  = "route-change";
const ROUTE_REPLACE_EVENT_NAME = "route-replace";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_EVENT_NAME, (e) => {
    const {nextUrl} = e.detail;

    if(nextUrl){
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  })

  window.addEventListener(ROUTE_REPLACE_EVENT_NAME, (e)=> {
    const {newUrl} = e.detail;

    if(newUrl){
      history.replaceState(null, null, newUrl);
      onRoute();
    }
  })
}

export const pushHistory = (nextUrl) => {
  window.dispatchEvent(new CustomEvent("route-change", {
    detail : {
      nextUrl
    }   
  }));
}

export const replaceHistory = (newUrl) => {
  window.dispatchEvent(new CustomEvent("route-replace", {
    detail : {
      newUrl
    }
  }))
}