import {isEscEvent} from './utils.js';
import {setScaleControls, setSlider, removeSlider} from './editor.js';
import {onTagsInput, onDescriptionInput} from './text-validation.js';
import {sendData} from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const editor = uploadForm.querySelector('.img-upload__overlay');
const closeButton = editor.querySelector('.img-upload__cancel');
const tagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

function showImageEditor () {
  editor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  descriptionInput.addEventListener('input', onDescriptionInput);
  tagsInput.addEventListener('input', onTagsInput);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  setScaleControls();
  setSlider();
}

function hideImageEditor () {
  editor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  uploadInput.value = '';
  removeSlider();
}

function onCloseButtonClick () {
  hideImageEditor();
}

function onUploadInputChange () {
  showImageEditor();
}

function onDocumentKeydown (evt) {
  if (isEscEvent(evt) && document.activeElement !== tagsInput && document.activeElement !== descriptionInput) {
    hideImageEditor();
  }
}

uploadInput.addEventListener('change', onUploadInputChange);

function onUploadFormSubmit (evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  
  sendData();
}
