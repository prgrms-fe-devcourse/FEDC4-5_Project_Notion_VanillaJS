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
  $documentList.style = `
    overflow: hidden;
    white-space: nowrap;
    height: 98vh;
    backgroundColor: #EDECE9;
  `;

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
          }" style="list-style:none;background-color:initial;position:relative;">
            <div class="title" style="margin:0;display:inline-block;position:relative;"onmouseover="this.style.background='#dcdcdc';"
            onmouseout="this.style.background='';">
              <button class="displayChild">
              ${this.displayedChild(doc.id) === "none" ? ">" : "v"}
              </button>    
              ${doc.title}
              
            </div>
            <span class="buttons" style="display: inline-block;position:absolute;right:1px">
              <button class="add" style="position:sticky;">+</button>
              <button class="delete" style="position:sticky;">x</button>
            </span>
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
          <div class="rootAdd">+ Add a document</div>
        </ul>
        `;
    $target.appendChild($documentList);
  };

  $documentList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if (e.target.className === "rootAdd") {
      console.log("click root");
      onCreateDocument(null);
      fetchDocument();
    }

    const { id } = $li.dataset;
    const name = e.target.className;
    console.log(e.target.className);

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
