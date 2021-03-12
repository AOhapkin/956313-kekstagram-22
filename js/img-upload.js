import {body} from './big-picture.js';
import {isEscEvent} from './utils.js';
import {setScaleControls, setSlider, removeSlider} from './editor.js';

const uploadInput = document.querySelector('#upload-file');
const editor = document.querySelector('.img-upload__overlay');
const closeButton = editor.querySelector('.img-upload__cancel');

function showImageEditor () {
  editor.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  setScaleControls();
  setSlider();
}

function hideImageEditor () {
  editor.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = '';
  removeSlider();
}

function onCloseButtonClick () {
  hideImageEditor();
}

function onUploadInputChange (evt) {
  evt.preventDefault();
  showImageEditor();
}

function onDocumentKeydown (evt) {
  if (isEscEvent(evt)) {
    hideImageEditor();
  }
}

uploadInput.addEventListener('change', onUploadInputChange);
