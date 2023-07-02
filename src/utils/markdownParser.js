const DUMMY_CHARACTER = " ";
const SPACEBAR_KEY_CODE = 32;

export function permuteCursor($element){
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNode(selection.anchorNode);
    range.deleteContents();
    range.insertNode($element);
    range.setStart($element, 0);
    range.setEnd($element, 1);
    selection.removeAllRanges();
    selection.addRange(range);
}

export function parseMarkdown(key){
  const selection = window.getSelection();
  const line = selection.anchorNode.textContent;
  if(key === SPACEBAR_KEY_CODE){
    if(line.match(/^\#{6}/g)){
      const $h6 = document.createElement("h6"); // 
      $h6.textContent = DUMMY_CHARACTER;
      permuteCursor($h6);
      $h6.textContent = line.substring(6) || DUMMY_CHARACTER;
    }
    else if(line.match(/^\#{5}/g)){
      const $h5 = document.createElement("h5"); // 
      $h5.textContent = DUMMY_CHARACTER;
      permuteCursor($h5);
      $h5.textContent = line.substring(5) || DUMMY_CHARACTER;
    }
    else if(line.match(/^\#{4}/g)){
      const $h4 = document.createElement("h4"); // 
      $h4.textContent = DUMMY_CHARACTER;
      permuteCursor($h4);
      $h4.textContent = line.substring(4) || DUMMY_CHARACTER;
    }
    else if(line.match(/^\#{3}/g)){
      const $h3 = document.createElement("h3"); // 
      $h3.textContent = DUMMY_CHARACTER;
      permuteCursor($h3);
      $h3.textContent = line.substring(3) || DUMMY_CHARACTER;
    }
    else if(line.match(/^\#{2}/g)){
      const $h2 = document.createElement("h2"); // 
      $h2.textContent = DUMMY_CHARACTER;
      permuteCursor($h2);
      $h2.textContent = line.substring(2) || DUMMY_CHARACTER;
    }
    else if(line.match(/^\#{1}/g)){
      const $h1 = document.createElement("h1"); // 
      $h1.textContent = DUMMY_CHARACTER;
      permuteCursor($h1);
      $h1.textContent = line.substring(1) || DUMMY_CHARACTER;
    }
  }
}

