import {hideModal, body} from './big-picture.js';
import {isEscEvent} from './utils.js';
import {setSlider, removeSlider} from './image-effects.js';

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

function openImageEditor () {
  editor.classList.remove('hidden');
  body.classList.add('modal-open');
  setSlider();
}

uploadInput.addEventListener('change', onUploadInputChange);

function onUploadInputChange (evt) {
  evt.preventDefault();
  openImageEditor();
}

closeButton.addEventListener('click', onCloseButtonClick);

function onCloseButtonClick () {
  hideModal(editor);
  removeSlider();
}

document.addEventListener('keydown', onDocumentKeydown);

function onDocumentKeydown (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideModal(editor);
  }
}

scaleInput.value = scale + '%';

scalelUpButton.addEventListener('click', onScaleUpClick);

function onScaleUpClick () {
  if (scale < 100) {
    scale += scaleStep;
    scaleInput.value = scale + '%';
    imagePreview.style.transform = 'scale(' + scale/100 + ')';
  }
}

scaleDownButton.addEventListener('click', onScaleDownClick);

function onScaleDownClick () {
  if (scale > 25) {
    scale -= scaleStep;
    scaleInput.value = scale + '%';
    imagePreview.style.transform = 'scale(' + scale/100 + ')';
  }
}
