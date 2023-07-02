import PostsPage from './components/PostsPage.js'

export default class App {
  constructor({ $target }) {
    this.$postsPage = new PostsPage({ $target })
  }
}