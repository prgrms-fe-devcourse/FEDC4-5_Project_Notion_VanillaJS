import PostsPage from './components/PostsPage.js'
import { initRouter } from './utils/router.js'

export default class App {
  constructor({ $target }) {
    this.$target= $target;
    this.$postsPage = new PostsPage({ $target })
    this.route();
    initRouter(() => this.route())
    window.addEventListener('popstate', () => this.route())
  }

  route = async () => {
    this.$target.innerHTML = '';

    const { pathname } = window.location;

    if(pathname === '/') {
      this.$postsPage.setState();
    }else if(pathname.indexOf('/documents') === 0) {
      const [, , id] = pathname.split('/');
      console.log(pathname);

      await this.$postsPage.setState();
    }else {
      this.$target.innerHTML = `<h1>404</h1>`;
    }
  }
}