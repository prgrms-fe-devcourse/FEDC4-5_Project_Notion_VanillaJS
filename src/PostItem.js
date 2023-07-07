import { request } from "./api.js";
import { pushRouter } from "./router.js";

export default function PostItem(title, id) {
  const $postItemBox = document.createElement("div");
  $postItemBox.className = id;

  const $li = document.createElement("li");
  $li.className = id;

  const $title = document.createElement("span");
  $title.className = id;
  $title.textContent = title;
  $li.appendChild($title);

  const $addButton = document.createElement("button");
  $addButton.textContent = "+";
  $addButton.className = id;
  $li.appendChild($addButton);

  const $removeButton = document.createElement("button");
  $removeButton.textContent = "-";
  $removeButton.className = id;
  $li.appendChild($removeButton);

  const $postSubItemBox = document.createElement("ul");

  $postItemBox.appendChild($li);
  $postItemBox.append($postSubItemBox);

  $title.addEventListener("click", async () => {
    request(`/documents/${$title.className}`);
    pushRouter(`/${$title.className}`);
  });

  $addButton.addEventListener("click", async () => {
    const createdPost = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음",
        parent: $addButton.className,
      }),
    });
    pushRouter(`/${createdPost.id}`);
  });

  $removeButton.addEventListener("click", async () => {
    await request(`/documents/${$removeButton.className}`, {
      method: "DELETE",
    });
    pushRouter(`/`);
  });

  return { $postItemBox, $postSubItemBox };
}
