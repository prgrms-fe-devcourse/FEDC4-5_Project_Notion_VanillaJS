export const CONSTRUCTOR_NAME = {
  DOCUMENT: "Document",
  DASHBOARD: "Dashboard",
  SIDEBAR: "Sidebar",
  HEADER: "Header",
};

export const STORAGE = {
  RECORD: "hotion-record",
};

export const ERROR = {
  NEW_MISSED: "Current component is declared without 'new' keyword.",
  NONE_OBJECT_STATE: "Tried to set state using none object value.",
  INVALID_DOCUMENT_STATE: "Tried to set document's state using invalid data.",
  INVALID_DRAWER_STATE: "Tried to set drawer's state using invalid data.",
  INVALID_DRAWERITEM_STATE:
    "Tried to set drawer item's state using invalid data.",
  INVALID_HEADER_STATE: "Tried to set header's state using invalid data.",
  INVALID_DASHBOARD_STATE: "Tried to set dashboard's state using invalid data.",
  NONE_ARRAY_STATE: "Tried to set state using none array value.",
  INVALID_REQUEST: "서버에 문제가 발생했습니다.\n 잠시 후 다시 시도해주세요.",
  UNREGISTERED_SETTER: "Tried to use unregistered state setter.",
};

export const EVENT = {
  ROUTE: "route",
  ROUTE_DRAWER: "route-drawer",
  TITLE_UPDATED: "title-updated",
};
