import { ROUTE_EVENT_NAME, ROUTE_REPLACE_EVENT_NAME } from "../constants/constants.js";

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
  window.dispatchEvent(new CustomEvent(ROUTE_EVENT_NAME, {
    detail : {
      nextUrl
    }   
  }));
}

export const replaceHistory = (newUrl) => {
  window.dispatchEvent(new CustomEvent(ROUTE_REPLACE_EVENT_NAME, {
    detail : {
      newUrl
    }
  }))
}