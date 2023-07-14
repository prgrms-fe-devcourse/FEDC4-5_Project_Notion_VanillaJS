export const TARGET = {
  ENTRY: 'app',
  PAGE: {
    NOTION: 'notion-page',
  },
};

export const SIDEBAR = {
  ROOT: 'notion-sidebar',
  CONTAINER: {
    BUTTON: 'sidebar-button-container',
    LIST: 'sidebar-document-list-container',
  },
  CREATE_BUTTON: 'document-create-button',
  DOCUMENT_LIST: 'document-list',
  DOCUMENT_LIST_ITEM: {
    ROOT: 'document-list-item',
    EMPTY: 'document-list-empty-item',
    TITLE: 'document-list-item-title',
    EXPAND_BUTTON: 'document-list-item-expand-button',
    BUTTON_CONTAINER: {
      ROOT: 'document-list-button-container',
      DELETE_BUTTON: 'document-delete-button',
      CREATE_INSIDE_BUTTON: 'document-create-inside-button',
    },
  },
};

export const DOCUMENT = {
  ROOT: 'notion-document',
};
