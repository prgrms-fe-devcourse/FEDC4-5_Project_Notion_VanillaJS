import HomeContainer from "../components/HomeContainer.js";
import Sidebar from "../components/Sidebar.js";

export default function MainPage({ $target }) {
  const sidebar = new Sidebar({ $target });

  const homeContainer = new HomeContainer({ $target });
}
