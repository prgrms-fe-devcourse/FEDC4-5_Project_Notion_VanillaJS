import { CONSTRUCTOR_NAME, STORAGE } from "@Utils/constants";
import once from "@Utils/once";
import { getItem, removeItem, setItem } from "@Utils/storage";
import { isConstructor, validateDashboardState } from "@Utils/validation";
import "./Dashboard.css";
import { routeToDocument } from "@Utils/router";
import { setStateOf } from "@Utils/stateSetters";

export default function Dashboard({ $target }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $dashboard = document.createElement("section");
  const $recent = document.createElement("section");
  const $most = document.createElement("section");

  this.state = (() => {
    const localRecord = getItem(STORAGE.RECORD, {});
    if (validateDashboardState(localRecord)) {
      return localRecord;
    }

    removeItem(STORAGE.RECORD);
    return {};
  })();

  this.setState = (nextState) => {
    if (nextState === null) {
      this.render();
      return;
    }

    const { id, title, toRemove = false } = nextState;

    if (toRemove) {
      delete this.state[id];
    } else {
      this.state[id] = {
        title,
        numUsed: (this.state[id]?.numUsed ?? 0) + 1,
        lastUsedTime: new Date().getTime(),
      };
    }

    setItem(STORAGE.RECORD, JSON.stringify(this.state));
  };

  this.init = once(() => {
    $dashboard.className = "dashboard-container";
    $recent.className = "dashboard-recent-container";
    $most.className = "dashboard-most-container";

    $dashboard.appendChild($recent);
    $dashboard.appendChild($most);

    $dashboard.addEventListener("click", (e) => {
      const $docLink = e.target.closest("[data-id]");
      if (!$docLink) return;

      const { id } = $docLink.dataset;
      routeToDocument(id);
    });
  });

  this.render = () => {
    this.init();
    $target.appendChild($dashboard);

    $recent.innerHTML = `
      <p class="dashboard-recent-title">⏰ 최근 사용한 문서</p>
      ${Object.entries(this.state)
        .sort(
          ([aid, aval], [bid, bval]) => bval.lastUsedTime - aval.lastUsedTime
        )
        .slice(0, 10)
        .map(([id, { title }]) => `<p data-id=${id}>${title}</p>`)
        .join("")}
    `;

    $most.innerHTML = `
      <p class="dashboard-most-title">🗂️ 자주 사용한 문서</p>
      ${Object.entries(this.state)
        .sort(([aid, aval], [bid, bval]) => bval.numUsed - aval.numUsed)
        .slice(0, 10)
        .map(([id, { title }]) => `<p data-id=${id}>${title}</p>`)
        .join("")}
    `;

    setStateOf(CONSTRUCTOR_NAME.HEADER, []);
  };
}
