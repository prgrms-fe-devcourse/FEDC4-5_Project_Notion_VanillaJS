import LeftNavListBoxMaker from "./LeftNavListBoxMaker.js"; // 네브 글칸 하나 만드는 함수

class LeftSectionList {
  constructor({ $target, initialState }) {
    this.$target = $target;
    this.state = initialState;

    this.defaultPadding = 0;
    this.addPadding = 25;

    this.$leftSectionList = document.createElement("div");
    this.$leftSectionList.className = "left-section-list";
    this.$target.appendChild(this.$leftSectionList);

    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  createList = ($target, paddingLeft, docs) => {
    docs.forEach(({ id, title, documents }) => {
      const { $navbox, $subDomsBox } = LeftNavListBoxMaker(
        paddingLeft,
        title,
        id
      );
      $target.appendChild($navbox);

      const isSubDocuments = documents.length > 0;
      if (isSubDocuments) {
        this.createList(
          $subDomsBox,
          this.paddingLeft + this.addPadding,
          documents
        );
      }
    });
  };

  render = () => {
    this.$leftSectionList.innerHTML = "";
    this.createList(this.$leftSectionList, this.defaultPadding, this.state);
  };
}
export default LeftSectionList;
