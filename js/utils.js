const MESSAGE_TIME = 4000;

function getRandomFromRange (min, max) {
  if (Number.isInteger(min) && Number.isInteger(max)) {
    if (min >= 0 && max >= 0 && min <= max) {
      return (Math.floor(Math.random() * (max - min + 1) + min));
    }
  }
}

function getRandomArrayElement (array) {
  return array[getRandomFromRange(0, array.length - 1)];
}

function isEscEvent (evt) {
  return evt.key === ('Escape' || 'Esc');
}

function hasDuplicates (array) {
  let valuesSoFar = {};
  for (let i = 0; i < array.length; ++i) {
    let value = array[i].toLowerCase();
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar[value] = true;
  }
  return false;
}

function showError (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, MESSAGE_TIME);
}

export {getRandomFromRange, getRandomArrayElement, isEscEvent, hasDuplicates, showError};
