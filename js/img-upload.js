import {hideModal} from './big-picture.js'
import {isEscEvent} from './utils.js'

const uploadInput = document.querySelector('#upload-file');
const editor = document.querySelector('.img-upload__overlay');
const closeButton = editor.querySelector('.img-upload__cancel');

uploadInput.addEventListener('change', function(evt) {
  evt.preventDefault();
  editor.classList.remove('hidden');
});

closeButton.addEventListener('click', function() {
  hideModal(editor);
});

document.addEventListener('keydown', function(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideModal(editor);
  }
});
