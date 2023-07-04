import Sidebar from "./Sidebar/Sidebar.js";

export default function App({ $target }) {
  const sidebar = new Sidebar({ $target });

  sidebar.setState();
}
