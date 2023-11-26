class Storage {
  #storage;
  #key;
  #defaultValue;

  constructor({
    key,
    defaultValue,
    storage = window.localStorage,
  }) {
    this.#storage = storage;
    this.#key = key;
    this.#defaultValue = defaultValue;
  }

  setItem(value) {
    this.#storage.setItem(this.#key, JSON.stringify(value));
  }

  getItem() {
    return (
      JSON.parse(this.#storage.getItem(this.#key)) ||
      this.#defaultValue
    );
  }

  removeItem() {
    this.#storage.removeItem(this.#key);
  }
}

export const toggleDataStorage = new Storage({
  key: "TOGGLE_DATA",
  defaultValue: null,
});

export const getDocumentStorageById = id => {
  return new Storage({
    key: `EDITING_DOCUMENT_${id}`,
    defaultValue: {
      title: "",
      content: "",
    },
  });
};
