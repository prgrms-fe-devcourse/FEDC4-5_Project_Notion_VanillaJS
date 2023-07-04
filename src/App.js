export default function App({ $target }) {
  this.state = {
    docId: null,
    docs: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  //sidebar-container
  new DocumentPage({
    $target,
    initialState: {
      docId: null,
      docs: [],
    },
  });

  //editor-container
  new DocumentEditPage({
    $target,
    initialState: {
      docId: "new",
      doc: {
        title: "",
        content: "",
      },
    },
  });
}
