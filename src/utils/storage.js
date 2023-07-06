export const OPENED_DOCUMENTS = "openedDocuments"
const storage = window.localStorage

export const getItem = (key,defaultValue)=>{
    try{
        const storedValue = storage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : defaultValue

    }catch(e){
        return defaultValue
    }
}

export const setItem = (key,value)=>{
    storage.setItem(key, JSON.stringify(value))
}

export const updateStorage = {
    add : id =>{
        const getOpenedDocuments = getItem(OPENED_DOCUMENTS,[])
        if (!getOpenedDocuments.includes(id)) {
            setItem(OPENED_DOCUMENTS, [...getOpenedDocuments, id]);
          }
    },
    toggle: id => {
        const getOpenedDocuments = getItem(OPENED_DOCUMENTS, []);
        if (getOpenedDocuments.includes(id)) {
          const removeOpenedDocuments = getOpenedDocuments.findIndex(
            documentId => documentId === id,
          );
          if (removeOpenedDocuments !== -1)
          getOpenedDocuments.splice(removeOpenedDocuments, 1);
          setItem(OPENED_DOCUMENTS, [...getOpenedDocuments]);
        } else {
          setItem(OPENED_DOCUMENTS, [...getOpenedDocuments, id]);
        }
      },
      delete: id => {
        const getOpenedDocuments = getItem(OPENED_DOCUMENTS, []);
        const removeOpenedDocuments = getOpenedDocuments.findIndex(
            documentId => documentId === id,
        );
        if (removeOpenedDocuments !== -1) {
            getOpenedDocuments.splice(removeOpenedDocuments, 1);
        }
        setItem(OPENED_DOCUMENTS, [...getOpenedDocuments]);
      },
}