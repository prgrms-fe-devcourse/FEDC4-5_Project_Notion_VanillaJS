import { createPicker } from "https://unpkg.com/picmo@latest/dist/index.js";

function EmojiPicker({
  $editor,
  initialState,
  trigger,
  onSelectEmoji,
}) {
  const $emojiPicker = document.createElement("div");
  $editor.appendChild($emojiPicker);

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.popup) {
      $emojiPicker.innerHTML =
        '<div id="pickerContainer"></div>';
      const $pickerContainer = $emojiPicker.querySelector(
        "#pickerContainer"
      );
      const $picker = createPicker({
        rootElement: $pickerContainer,
      });
      $picker.addEventListener("emoji:select", e => {
        onSelectEmoji(e.emoji);
        this.setState({ popup: false });
      });
    } else {
      $emojiPicker.innerHTML = "";
    }
  };

  trigger.addEventListener("click", () => {
    this.setState({ popup: !this.state.popup });
  });

  this.render();
}

export default EmojiPicker;
