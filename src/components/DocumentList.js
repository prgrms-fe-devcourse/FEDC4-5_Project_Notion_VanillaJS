import { push } from "../routes/router.js";
import { request } from "../api/api.js";
import { setItem, getItem } from "../utils/storage.js";

export default function DocumentList({
  $target,
  initialState,
  onCreateDocument,
  onDeleteDocument,
}) {
  const $documentList = document.createElement("div");

  $documentList.className = "documentList";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.displayedChild = (id) => {
    let isChild = getItem(id, {
      id: id,
      displayed: null,
    });

    if (isChild.displayed === null) {
      setItem(id, {
        id: id,
        displayed: "none",
      });
    }

    isChild = getItem(id);

    return isChild.displayed;
  };

  this.displayDocumentList = (docList) => {
    return docList
      .map(
        (doc) =>
          `<li class="title" data-id="${doc.id}" title="${
            doc.title
          }" style="list-style:none;">
            <button class="displayChild">
            ${this.displayedChild(doc.id) === "none" ? ">" : "v"}
            </button>    
            ${doc.title}
            <button class="add">+</button>
            <button class="delete">x</button>
            ${
              doc.documents.length > 0
                ? `<ul style="display: ${this.displayedChild(doc.id)};">
                  ${this.displayDocumentList(doc.documents)}
                  </ul>`
                : ""
            }          
          </li>`
      )
      .join("");
  };

  this.render = () => {
    $documentList.innerHTML = `
        <ul>
        ${this.displayDocumentList(this.state.docs)}
        <div role="button">+ Add a document</div>
        </ul>
        `;
    $target.appendChild($documentList);
  };

  $documentList.addEventListener("click", (e) => {
    if (e.target === e.target.closest("div")) {
      onCreateDocument("new");
      fetchDocument();
      return;
    }

    const $li = e.target.closest("li");
    if (!$li) return;

    const { id } = $li.dataset;
    const name = e.target.className;

    if (name === "displayChild") {
      const $ul = $li.childNodes[7];

      if (!$ul) {
        setItem(id, {
          id: id,
          displayed: "none",
        });
        push(`/documents/${id}`);
        return;
      }

      if ($ul.style.display === "") {
        $ul.style.display = "none";
        setItem(id, {
          id: id,
          displayed: "none",
        });
      } else {
        $ul.style.display = "";
        setItem(id, {
          id: id,
          displayed: "",
        });
      }
      push(`/documents/${id}`);
    } else if (name === "title") {
      push(`/documents/${id}`);
    } else if (name === "add") {
      onCreateDocument(id);
      fetchDocument();
    } else if (name === "delete") {
      onDeleteDocument(id);
    }
  });

  const fetchDocument = async () => {
    const docs = await request("/documents", {
      method: "GET",
    });
    this.setState({
      ...this.state,
      docs,
    });
  };
}
