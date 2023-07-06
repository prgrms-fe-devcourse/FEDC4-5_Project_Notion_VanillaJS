import {getItem, OPENED_DOCUMENTS} from "../utils/storage.js"

export const createList = (currentList) => {
    const openedDocuments = getItem(OPENED_DOCUMENTS,[])
    return currentList.map(({title,documents,id})=>{
        const isOpen = openedDocuments.includes(String(id));
        return`<ul data-id="${id}">
        <div class="document__title">
            <span>
                <button class="toggle__button">></button>
                ${title === "" ? "제목없음" : title}
            </span>
            <div>
            <button class="create">+</button>
            <button class="remove">x</button>
            </div>
        </div>
        <div class="${isOpen ? "" : "hide"}">
        <li>${documents.length > 0 ? createList(documents) : ""}</li>
        </div>
    </ul>`
    }
    ).join("")
}