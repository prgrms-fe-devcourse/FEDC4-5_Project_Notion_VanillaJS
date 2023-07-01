import Component from "../core/Component.js";

export default class Editor extends Component{
  template(){
    return `
      <input type="text" name="title" style="width:600px;" autofocus>
      <textarea name="content" style="width:600px; height:400px;"></textarea>
    `
  }

  render(){
    this.$target.innerHTML = this.template();
    this.$target.querySelector("[name=title]").value = this.props.title;
    this.$target.querySelector("[name=content]").value = this.props.content;
  }

  setEvent(){
    const {title, content, onEditTitle, onEditContent} = this.props;
    this.addEvent("input", "[name=title]", ({target}) => {
      onEditTitle({
        title : target.value,
        content
      }, target);
    });

    this.addEvent("input", "[name=content]", ({target}) => {
      onEditContent({
        title,
        content : target.value
      }, target);
    })
  }
}