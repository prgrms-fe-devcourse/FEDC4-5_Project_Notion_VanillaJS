import Sidebar from "./Sidebar.js";
import Content from "./Content.js";
import { request } from "./api.js";

export default function App({ $sidebarTarget, $contentTarget }) {
  let $notionContent = document.querySelector(".notion-content");
  let timer = null;
  const { pathname } = window.location;
  const [, check, contentId] = pathname.split("/");

  async function onChange(id) {
    const documents = await request(`/documents/${id}`, {
      method: "GET",
    });
    content.setState(documents);
    $notionContent.style.display = "flex";
  }

  if (check) {
    onChange(contentId);
  }

  new Sidebar({
    $target: $sidebarTarget,
    initialState: "",
    onChange,
  });
  const content = new Content({
    $target: $contentTarget,
    initialState: "",
    onEditing: async (title, content) => {
      await request(`/documents/${contentId}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
      });
    },
  });
}
