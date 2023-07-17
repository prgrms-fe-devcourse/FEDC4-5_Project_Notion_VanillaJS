import Sidebar from "./Sidebar.js";
import Content from "./Content.js";
import { request } from "./api.js";

export default function App({ $sidebarTarget, $contentTarget }) {
  const { pathname } = window.location;
  const [, check, contentId] = pathname.split("/");
  const $notionContent = document.getElementsByClassName("notion-content")[0];

  async function onChange(id) {
    const documents = await request(`/documents/${id}`, {
      method: "GET",
    });
    content.setState(documents);
    $notionContent.style.display = "flex";
  }

  if (check === "content") {
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
      const { pathname } = window.location;
      const [, , requestId] = pathname.split("/");
      await request(`/documents/${requestId}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
      });
    },
  });
}
