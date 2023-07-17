export default class PathFinder {
  searchPath(postList, targetPost) {
    let path;
    postList.forEach((post) => {
      const tmpPath = this.findPath(post, targetPost.id);
      if (tmpPath) path = tmpPath;
    });
    return path;
  }

  findPath(currentDocument, targetId, path = []) {
    const { id, title, documents } = currentDocument;

    if (id === targetId) return [...path, { title, id }];

    for (const document of documents) {
      const childPath = this.findPath(document, targetId, [
        ...path,
        { title, id },
      ]);
      if (childPath) return childPath;
    }
    return null;
  }
}
