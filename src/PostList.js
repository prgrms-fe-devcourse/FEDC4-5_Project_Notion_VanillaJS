import { request } from "./api.js";
import { pushRouter } from "./router.js";

export default function PostList({ $target, initialState }) {
  const $postList = document.createElement("div");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $postList.innerHTML = `
            <ul>
                ${this.state
                  .map(
                    (post) =>
                      `
                      <li id="li_${post.id}">
                        <span id="${post.id}">${post.title}</span>
                        <button id="createButton_${post.id}">+</button>
                        <button id="deleteButton_${post.id}">-</button>
                      </li>
                      <ul>
                        ${post.documents
                          .map(
                            (subPost) =>
                              `
                          <li id="li_${subPost.id}">
                            <span id="${subPost.id}">${subPost.title}</span>
                            <button id="createButton_${subPost.id}">+</button>
                            <button id="deleteButton_${subPost.id}">-</button>
                          </li>
                          `
                          )
                          .join("")}
                      </ul>
                      `
                  )
                  .join("")}
            </ul>
        `;
  };

  this.render();

  $postList.addEventListener("click", async (e) => {
    const clickTag = e.target.localName;

    if (clickTag === "span") {
      const $span = e.target.closest("span");

      if ($span) {
        pushRouter(`/${$span.id}`);
        request(`/${$span.id}`);
      }
    } else if (clickTag === "button") {
      const $button = e.target.closest("button");
      const [commend, id] = $button.id.split("_");

      if (commend === "createButton") {
        pushRouter(`/${id}/new`);
        const createdPost = await request("", {
          method: "POST",
          body: JSON.stringify({
            title: "제목 없음",
            parent: id,
          }),
        });
        history.replaceState(null, null, `/${createdPost.id}`);
      } else {
        pushRouter(`/`);
        request(`/${id}`, {
          method: "DELETE",
        });
      }
      getDocuments();
    }
  });

  const getDocuments = async () => {
    const documents = await request();
    this.setState(documents);
  };
}
