import {isEscEvent} from './utils.js';

const main = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

function showUploadSuccessMessage () {
  const successMessage = successMessageTemplate.cloneNode(true);
  main.appendChild(successMessage);
  const successButton = successMessage.querySelector('.success__button');

  function onDocumentKeydown (evt) {
    if (isEscEvent(evt)) {
      main.removeChild(successMessage);
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  }

  function onButtonClick () {
    main.removeChild(successMessage);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  successButton.addEventListener('click', onButtonClick);
  main.addEventListener('keydown', onDocumentKeydown);
}

function showUploadErrorMessage () {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  main.appendChild(errorMessage);
  const errorButton = errorMessage.querySelector('.error__button');

  function onDocumentKeydown (evt) {
    if (isEscEvent(evt)) {
      main.removeChild(errorMessage);
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  }

  function onButtonClick () {
    main.removeChild(errorMessage);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  errorButton.addEventListener('click', onButtonClick);
  main.addEventListener('keydown', onDocumentKeydown);
}

export {showUploadSuccessMessage, showUploadErrorMessage}
