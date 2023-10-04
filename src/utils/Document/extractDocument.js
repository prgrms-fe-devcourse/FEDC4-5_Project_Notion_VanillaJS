import DocumentItem from '../../Component/Template/DocumentItemTemplate.js'

const generateNestedDocumentsHTML = (documents) => {
  let html = ''
  if (documents.length > 0) {
    html += '<ul class = "documentItemWrapper">'
    for (const document of documents) {
      const { id, title, documents: nestedDocuments } = document
      html += DocumentItem({ documentId: id, documentTitle: title })
      html += generateNestedDocumentsHTML(nestedDocuments)
    }
    html += '</ul>'
  }
  return html
}

export { generateNestedDocumentsHTML }
