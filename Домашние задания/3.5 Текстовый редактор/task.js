const editor = document.getElementById('editor');
const clearButton = document.getElementById('clearButton');

// загрузка текста из локального хранилища
function loadText() {
  const savedText = localStorage.getItem('editorContent');
  if (savedText) {
    editor.value = savedText; 
  }
}

// запомнить введенный текст
function saveText() {
  localStorage.setItem('editorContent', editor.value);
}

function clearContent() {
  editor.value = ''; 
  localStorage.removeItem('editorContent');
}

editor.addEventListener('input', saveText);
clearButton.addEventListener('click', clearContent);

window.onload = loadText;