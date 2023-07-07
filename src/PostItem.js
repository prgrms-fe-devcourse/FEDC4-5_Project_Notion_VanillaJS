import { request } from "./api.js";
import { pushRouter } from "./router.js";

export default function PostItem(title, id) {
  const $postItemBox = document.createElement("div");
  $postItemBox.id = `box_${id}`;

  const $li = document.createElement("li");
  $li.id = `li_${id}`;

  const $title = document.createElement("span");
  $title.id = id;
  $title.textContent = title;
  $li.appendChild($title);

  const $addButton = document.createElement("button");
  $addButton.textContent = "+";
  $addButton.id = `createButton_${id}`;
  $li.appendChild($addButton);

  const $removeButton = document.createElement("button");
  $removeButton.textContent = "-";
  $removeButton.id = `deleteButton_${id}`;
  $li.appendChild($removeButton);

  const $postSubItemBox = document.createElement("ul");

  $postItemBox.appendChild($li);
  $postItemBox.append($postSubItemBox);

  $title.addEventListener("click", async () => {
    request(`/documents/${$title.id}`);
    pushRouter(`/${$title.id}`);
  });

  $addButton.addEventListener("click", async () => {
    const [, id] = $addButton.id.split("_");
    const createdPost = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음",
        parent: id,
      }),
    });
    pushRouter(`/${createdPost.id}`);
  });

  $removeButton.addEventListener("click", async () => {
    const [, id] = $removeButton.id.split("_");
    await request(`/documents/${id}`, {
      method: "DELETE",
    });
    pushRouter(`/`);
  });

  return { $postItemBox, $postSubItemBox };
}
