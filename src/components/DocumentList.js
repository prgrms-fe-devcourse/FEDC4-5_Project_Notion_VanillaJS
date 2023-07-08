import { request } from '../util/api.js';
import { push } from '../router.js';

export default function DocumentList({ $target, initialState, onClick }) {
  const $docListContainer = document.createElement('div');
  $docListContainer.className = 'listContainer';
  $target.appendChild($docListContainer);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.template();
  };

  this.template = () => {
    $docListContainer.innerHTML = this.state.template;
  };

  this.editDocItemTitle = (title) => {
    const { pathname } = window.location;
    [, , id] = pathname.split('/');

    const uncreatedDocListItem = $docListContainer.querySelector('[id="-1"]');

    if (id === 'new') {
      // 생성전 docItem title
      uncreatedDocListItem.querySelector('span').innerHTML = title;
      return;
    }

    if (uncreatedDocListItem) {
      // 생성된 즉시  docItem title
      uncreatedDocListItem.querySelector('span').innerHTML = title;
      uncreatedDocListItem.id = id;
    } else {
      // 이미 생성된 docItem title
      const createdDocListItem = $docListContainer.querySelector(
        `[id='${id}']`
      );
      createdDocListItem.querySelector('span').innerHTML = title;
    }
  };

  this.deleteUndecidedDocItem = () => {
    const undecidedDocListItem = $docListContainer.querySelector('[id="-1"]');
    undecidedDocListItem.remove();
  };

  this.fetchDoc = async () => {
    let docList = await request('/');
    let template = `${docList
      .map(
        ({ id, title }) =>
          `<div id="${id}" class="docListItem isNotSelected" style="margin-bottom : 10px;"><button class="arrow">▶️</button><span>${title}</span><button class="addDocListItem">➕</button></div>`
      )
      .join('')}`;
    this.setState({ template, docList });
  };

  this.render = () => {
    $docListContainer.addEventListener('click', async (e) => {
      let $target = e.target;
      let [targetClassName] = $target.className.split(' ');

      let docListItem = $target.closest('[class~="docListItem"]');
      let docListItemClassName = docListItem.className;
      let [, isSelected] = docListItemClassName.split(' ');

      // 경로 이동
      if ($target.nodeName === 'SPAN') {
        const postId = docListItem.id;
        if (postId > -1) {
          push(`/posts/${postId}`);
        }
      }

      if (docListItem.id > -1) {
        // 화살표 눌렀을 때 하위 트리 보여주기
        if (targetClassName === 'arrow' && isSelected === 'isNotSelected') {
          docListItemClassName = 'docListItem isSelected';

          const targetId = docListItem.id;
          let subDocList = await request(`/${targetId}`);

          let docListWrapper = document.createElement('div');
          docListWrapper.className = 'docListWrapper';

          let subDocListTemplate = `${subDocList.documents
            .map(
              ({ id, title }) =>
                `<div id="${id}" class="docListItem isNotSelected" style="padding-left : 30px; margin-bottom : 10px;">
              <button class="arrow">▶️</button><span>${title}</span><button class="addDocListItem">➕</button>
            </div>`
            )
            .join('')}`;

          docListWrapper.innerHTML = subDocListTemplate;
          docListItem.appendChild(docListWrapper);

          // 화살표 눌렀을 때 하위 트리 감추기
        } else if (targetClassName === 'arrow' && isSelected === 'isSelected') {
          docListItem.className = 'docListItem isNotSelected';
          let docListWrapper = listItem.querySelector(
            '[class="docListWrapper"]'
          );
          docListWrapper.remove();
        }

        // Document 추가 버튼 눌렀을 때
        if (targetClassName === 'addDocListItem') {
          let parentId = $target.closest('[class~="docListItem"]').id;
          onClick(parentId); // PostEditPage의 parentId 상태 바뀜

          push(`/posts/new`);

          let docListWrapper = docListItem.querySelector(
            '[class="docListWrapper"]'
          );

          // UI적인 코드
          if (docListWrapper) {
            // 하위 Document가 펼쳐져 있을 때
            const prevHTML = docListWrapper.innerHTML;
            const newDocListItemHTML = `<div id="-1" class="docListItem isNotSelected" style="padding-left : 30px; margin-bottom : 10px;"><button class="arrow">▶️</button><span>제목없음</span><button class="addDocListItem">➕</button></div>`;
            docListWrapper.innerHTML = `${prevHTML}${newDocListItemHTML}`;
          } else {
            // 하위 Document가 닫혀 있을 때
            docListItem.className = 'docListItem isSelected';
            const targetId = docListItem.id;
            let subDocList = await request(`/${targetId}`);

            const prevHTML = docListItem.innerHTML;
            docListItem.innerHTML = `${prevHTML}<div class="docListWrapper">
            ${subDocList.documents
              .map(
                ({ id, title }) =>
                  `<div id="${id}" class="docListItem isNotSelected" style="padding-left : 30px; margin-bottom : 10px;">
                    <button class="arrow">▶️</button><span>${title}</span><button class="addDocListItem">➕</button>
                    
                  </div>`
              )
              .join('')}
              <div id="-1" class="docListItem isNotSelected" style="padding-left : 30px; margin-bottom : 10px;"><button class="arrow">▶️</button><span>제목없음</span><button class="addDocListItem">➕</button></div>
            </div>`;
          }
        }
      }

      this.setState({ ...this.state, template: $docListContainer.innerHTML });
    });
  };

  this.init = () => {
    this.fetchDoc();
    this.render();
  };

  this.init();
}
