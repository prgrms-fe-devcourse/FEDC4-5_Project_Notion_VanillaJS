import { getPostById, postPost, putPost } from "../../../api/posts.js";
import { getItem, setItem } from "../../../storage/localStorage.js";
import Editor from "./Editor.js";
import { debounce } from "../../../utils/utils.js";

class RightSection {
  constructor({ $target, initialState }) {
    this.$target = $target;
    this.state = initialState;
    this.TEMP_POST_SAVE_KEY = `temp-post-${this.state ? this.state.id : "new"}`;
    this.DELAY_TIME = 500;

    this.$rightSection = document.createElement("div");
    this.$rightSection.className = "right-section";
    this.editor = new Editor({
      $target: this.$rightSection,
      initialState,
      onEditing: (post) => {},
    });
    this.$target.appendChild(this.$rightSection);

    this.addEvent();
    this.init();
  }

  init = async () => {
    const id = location.pathname.replace("/", "");

    if (id === "new") {
      // 새로운 게시글
      const localData = getItem(this.TEMP_POST_SAVE_KEY, { id: 0, title: "" });
      if (localData) this.setState(localData);
    } else {
      // 기존 게시글
      const data = await getPostById(id);
      const localData = getItem(this.TEMP_POST_SAVE_KEY, { id: 0, title: "" });
      const theLatestData = this.getTheLatestData({ data, localData });
      this.setState(theLatestData);
      this.editor.setState(theLatestData);
    }
  };

  getTheLatestData = ({ data, localData }) => {
    if (!localData.updated_at) return data;
    if (localData.updated_at && localData.updated_at > data.updated_at) {
      if (confirm("저장되지 않은 임시 데이터가 있습니다")) {
        return localData;
      }
    }
    return data;
  };

  setState = (nextState) => {
    this.state = nextState;
  };

  addEvent = () => {
    const debouncedUpdatePostOnServer = debounce(
      this.updatePostOnServer,
      this.DELAY_TIME
    );

    this.$rightSection.addEventListener("keyup", (e) => {
      const name = e.target.getAttribute("name");

      const nextState = {
        ...this.state,
        [name]: e.target.value,
      };

      this.setState(nextState);
      setItem(this.TEMP_POST_SAVE_KEY, {
        ...nextState,
        updated_at: new Date(),
      });
      debouncedUpdatePostOnServer(nextState);
    });
  };

  updatePostOnServer = (nextState) => {
    if (this.state.id !== "new") {
      putPost(this.state.id, nextState.title, nextState.content);
    } else {
      postPost(this.state.id);
    }
  };
}

export default RightSection;
