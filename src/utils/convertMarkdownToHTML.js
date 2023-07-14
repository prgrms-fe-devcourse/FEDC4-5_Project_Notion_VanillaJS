export function convertMarkdownToHTML(markdownText) {
  if (!markdownText) return '';

  const replacements = [
    { pattern: /(\*\*|__)(.*?)\1/g, replacement: '<strong>$2</strong>' },
    { pattern: /(\*|_)(.*?)\1/g, replacement: '<em>$2</em>' },
    { pattern: /`(.*?)`/g, replacement: '<code>$1</code>' },
    { pattern: /\[(.*?)\]\((.*?)\)/g, replacement: '<a href="$2">$1</a>' },
    { pattern: /(### )(.*)/g, replacement: '<h3>$2</h3>' },
    { pattern: /(## )(.*)/g, replacement: '<h2>$2</h2>' },
    { pattern: /(# )(.*)/g, replacement: '<h1>$2</h1>' },
    { pattern: /\n\n/g, replacement: '<br/>' },
  ];

  let html = markdownText;
  replacements.forEach((replacement) => {
    html = html.replace(replacement.pattern, replacement.replacement);
  });

  return html;
}
