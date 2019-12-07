const dropArea = document.querySelector('#drop-area');
const button = document.querySelector('.submit-ctas button');
const input = document.querySelector('input');

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  dropArea.classList.add('highlight');
}

function unhighlight() {
  dropArea.classList.remove('highlight');
}

function checkButtonState() {
  if (button.hasAttribute('disabled')) {
    button.removeAttribute('disabled');
  }
}

function handleDrop(e) {
  const fileInput = document.querySelector('#fileElement');
  fileInput.files = e.dataTransfer.files;
  checkButtonState();
}


['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});


['dragenter', 'dragover'].forEach((eventName) => {
  dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach((eventName) => {
  dropArea.addEventListener(eventName, unhighlight, false);
});


dropArea.addEventListener('drop', handleDrop, false);
input.addEventListener('change', checkButtonState);
