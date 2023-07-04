import { applyRichContent, applyEnter, applyBackspace } from './richLogics.js';

export const onPreventNewLine = (e) => {
  if (e.key === 'Enter') e.preventDefault();
};

export const onEnterInTitle = (e, { $content }) => {
  if (e.key !== 'Enter') return;
  $content.focus();
};

export const onInputRichContent = (e, { $content }) => {
  if (e.isComposing) return;
  applyRichContent({ $editor: $content, key: e.key });
};

export const onKeyDown = (e, { $content }) => {
  if (e.key === 'Enter') applyEnter(e, { $editor: $content });
  else if (e.key === 'Backspace') applyBackspace(e, { $editor: $content });
};

export const onInput = (e, { onChange }) => {
  const role = e.target.dataset.role;
  if (!role || !['title', 'content'].includes(role)) return;

  setTimeout(() => {
    onChange({ name: role, value: e.target.innerHTML });
  }, 100);
};
