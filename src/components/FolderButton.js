export default function FolderButton() {
  const $folderBtn = document.createElement('div');
  $folderBtn.textContent = 'ff';
  $folderBtn.className = 'folderBtn';

  $folderBtn.addEventListener('click', event => {
    console.log(event.target.closest('ul'));
  })

  return $folderBtn;
}