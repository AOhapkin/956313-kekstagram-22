const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

function showSuccessMessage () {
  const message = successMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
}

function showErrorMessage () {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
}

export {showSuccessMessage, showErrorMessage}
