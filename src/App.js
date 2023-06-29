import Sidebar from "./components/Sidebar.js";
import { request } from "./utils/api.js";

export default function App({$target, initialState}){
  this.state = [];

  this.setState = (nextState) => {
    sideBar.setState(nextState);
  }

  const sideBar = new Sidebar({$target, initialState : this.state});

  const fetchDocuments = async () => {
    const documents = await request("/documents");
    this.setState(documents);
  }

  fetchDocuments();
}