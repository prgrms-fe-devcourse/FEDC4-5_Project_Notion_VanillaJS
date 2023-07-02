import { push } from '../../utils/router.js';

export default function DocumentList({ $parent, initialState }) {
  const $documentsList = document.createElement('div');
  $parent.appendChild($documentsList);

  // this.state = [
  //   {
  //     id: 1, // Document id
  //     title: '노션을 만들자', // Document title
  //     documents: [
  //       {
  //         id: 2,
  //         title: '블라블라',
  //         documents: [
  //           {
  //             id: 3,
  //             title: '함냐함냐',
  //             documents: [],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: 'hello!',
  //     documents: [],
  //   },
  //   {
  //     id: 5,
  //     title: '문서5',
  //     documents: [],
  //   },
  // ];

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  // 문서List 만들기(Tree구조 형태로)
  const createDocumentTree = document => {
    const { id, title, documents } = document;

    let tree = `<li data-id=${id}>${id}${title}<button>+</button></li>`;
    if (documents.length > 0) {
      tree += '<ul>';
      documents.forEach(subDoc => {
        tree += `${createDocumentTree(subDoc)}`;
      });

      tree += '</ul>';
    }
    return tree;
  };

  this.render = () => {
    const innerHTMLString = `
    <div>개인페이지 <button>+</button></div>
    <ul>
    ${this.state.map(doc => `${createDocumentTree(doc)}`).join('')}
    </ul>`;

    $documentsList.innerHTML = innerHTMLString;
  };

  this.render();

  // 링크
  $documentsList.addEventListener('click', e => {
    const $li = e.target.closest('li');
    console.log($li);

    if ($li) {
      const { id } = $li.dataset;
      push(`/document/${id}`);
    }
  });
}
