export default function NotionDefaultPage({ $target }) {
    const $post = document.createElement('div');
    $post.className = 'notion-default';

    this.render = () => {
        $target.appendChild($post);
        $post.textContent = '페이지를 선택해 주세요!';
    };

    this.remove = () => {
        $target.remove($post);
    };
}
