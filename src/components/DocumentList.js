import { request } from '../util/api.js';
import { push } from '../router.js';

export default function DocumentList({ $target, initialState, onClick }) {
  const $docList = document.createElement('div');
  $docList.className = 'listWrapper';
  $target.appendChild($docList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.template();
  };

  this.fetchDoc = async () => {
    let documents = await request('/');
    let template = `${documents
      .map(
        ({ id, title }) =>
          `<div id="${id}" class="listItem isNotSelected" style="margin-bottom : 10px;"><button class="arrow">▶️</button><span>${title}</span><button class="addDoc">➕</button></div>`
      )
      .join('')}`;
    this.setState({ template, documents });
  };

  this.template = (text, id) => {
    $docList.innerHTML = this.state.template;
    const currentTarget = $docList.querySelector('[id="-1"]');

    if (text) {
      currentTarget.querySelector('span').innerHTML = text;
    }

    if (id) {
      currentTarget.id = id;
    }
  };

  this.render = () => {
    $docList.addEventListener('click', async (e) => {
      let $target = e.target;
      let [className] = $target.className.split(' ');

      let listItem = $target.closest('[class~="listItem"]');
      let [, isSelected] = listItem.className.split(' ');

      // 경로 이동
      if ($target.nodeName === 'SPAN') {
        const { id } = listItem;
        push(`/posts/${id}`);
      }

      // 화살표 눌렀을 때 하위 트리 보여주기
      if (className === 'arrow' && isSelected === 'isNotSelected') {
        listItem.className = 'listItem isSelected';

        const targetId = listItem.id;
        let targetDoc = await request(`/${targetId}`);

        let listWrapper = document.createElement('div');
        listWrapper.className = 'listWrapper';

        let childTemplate = `
      ${targetDoc.documents
        .map(
          ({ id, title }) =>
            `<div id="${id}" class="listItem isNotSelected" style="padding-left : 30px; margin-bottom : 10px;">
              <button class="arrow">▶️</button><span>${title}</span><button class="addDoc">➕</button>
            </div>`
        )
        .join('')}`;

        listWrapper.innerHTML = childTemplate;
        listItem.appendChild(listWrapper);

        // 화살표 눌렀을 때 하위 트리 감추기
      } else if (className === 'arrow' && isSelected === 'isSelected') {
        listItem.className = 'listItem isNotSelected';
        let listWrapper = listItem.querySelector('[class="listWrapper"]');
        listWrapper.remove();
      }

      // Document 추가 버튼 눌렀을 때
      if (className === 'addDoc') {
        let parentId = $target.closest('[class~="listItem"]').id;
        onClick(parentId); // 순서 중요함...

        push(`/posts/new`);
        let listWrapper = listItem.querySelector('[class="listWrapper"]');

        // UI적인 코드
        if (listWrapper) {
          // 하위 Document가 펼쳐져 있을 때
          const prevHTML = listWrapper.innerHTML;
          const targetHTML = `<div id="-1" class="listItem isNotSelected" style="padding-left : 30px; margin-bottom : 10px;"><button class="arrow">▶️</button><span>제목없음</span><button class="addDoc">➕</button></div>`;
          listWrapper.innerHTML = `${prevHTML}${targetHTML}`;
        } else {
          // 하위 Document가 닫혀 있을 때
          listItem.className = 'listItem isSelected';
          const targetId = listItem.id;
          let targetDoc = await request(`/${targetId}`);

          const prevHTML = listItem.innerHTML;
          listItem.innerHTML = `${prevHTML}<div class="listWrapper">
            ${targetDoc.documents
              .map(
                ({ id, title }) =>
                  `<div id="${id}" class="listItem isNotSelected" style="padding-left : 30px; margin-bottom : 10px;">
                    <button class="arrow">▶️</button><span>${title}</span><button class="addDoc">➕</button>
                    
                  </div>`
              )
              .join('')}
              <div id="-1" class="listItem isNotSelected" style="padding-left : 30px; margin-bottom : 10px;"><button class="arrow">▶️</button><span>제목없음</span><button class="addDoc">➕</button></div>
            </div>`;
        }
      }

      this.setState({ ...this.state, template: $docList.innerHTML });
    });
  };

  this.template();
  this.render();
  this.fetchDoc();
}
