export default function matchDocument(docList, findName) {
  for (const doc of docList) {
    if (doc.title === findName) {
      return doc;
    }
    if (doc.documents.length > 0) {
      const match = matchDocument(doc.documents, findName);
      if (match) {
        return match;
      }
    }
  }
}
