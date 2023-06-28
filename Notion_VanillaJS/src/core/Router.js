import { routes } from '@/constants/path';
import { NotFound } from '@/components';
import { ROUTE_CHNAGE_EVENT } from '@/constants/eventName';
import { Component } from '@/core';

export default class Router {
  constructor() {
    this.setupRouter();
    this.route();
  }

  findMatchedRoute() {
    return routes.find((route) => route.path.test(location.pathname));
  }

  route() {
    const targetPage = this.findMatchedRoute()?.element || NotFound;

    const $pageContainer = document.querySelector('.page-Container');

    Component.attach({
      constructor: targetPage,
      $target: $pageContainer,
    });

    // this.pageContainer.attach({
    //   constructor: targetPage,
    //   $target: this.$target,
    // });
    console.log($pageContainer);
  }

  setupRouter() {
    window.addEventListener(ROUTE_CHNAGE_EVENT, (event) => {
      const { nextUrl, isReplace } = event.detail;

      if (isReplace || nextUrl === location.pathname)
        history.replaceState(null, '', nextUrl);
      else history.pushState(null, '', nextUrl);

      this.route();
    });

    window.addEventListener('popstate', () => {
      this.route();
    });
  }
}
