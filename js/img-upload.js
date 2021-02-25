import {hideModal, body} from './big-picture.js'
import {isEscEvent} from './utils.js'

const uploadInput = document.querySelector('#upload-file');
const editor = document.querySelector('.img-upload__overlay');
const closeButton = editor.querySelector('.img-upload__cancel');
const imagePreview = editor.querySelector('.img-upload__preview');
const scalelUpButton = editor.querySelector('.scale__control--bigger');
const scaleDownButton = editor.querySelector('.scale__control--smaller');
const scaleInput = editor.querySelector('.scale__control--value');
const scaleDefault = 100;
const scaleStep = 25;
let scale = scaleDefault;

// Временно
editor.classList.remove('hidden');
body.classList.add('modal-open');

uploadInput.addEventListener('change', function(evt) {
  evt.preventDefault();
  editor.classList.remove('hidden');
  body.classList.add('modal-open');
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

scaleInput.value = scale + '%';

scalelUpButton.addEventListener('click', function() {
  if (scale < 100) {
    scale += scaleStep;
    scaleInput.value = scale + '%';
    imagePreview.style.transform = 'scale(' + scale/100 + ')';
  }
});

scaleDownButton.addEventListener('click', function() {
  if (scale > 25) {
    scale -= scaleStep;
    scaleInput.value = scale + '%';
    imagePreview.style.transform = 'scale(' + scale/100 + ')';
  }
});