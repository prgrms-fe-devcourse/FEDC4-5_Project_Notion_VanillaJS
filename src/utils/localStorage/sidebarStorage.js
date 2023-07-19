import { getItem, removeItem, setItem } from './localStorage';

const SIDEBAR_KEY = 'side-bar-state';

const setSidebarDataItem = (state) => {
  setItem(SIDEBAR_KEY, state);
};

const getSidebarDataItem = () =>
  getItem(SIDEBAR_KEY, {
    expandedState: {},
  });

const removeSidebarDataItem = () => removeItem(SIDEBAR_KEY);

const sidebarStorage = {
  setSidebarDataItem,
  getSidebarDataItem,
  removeSidebarDataItem,
};

export default sidebarStorage;
