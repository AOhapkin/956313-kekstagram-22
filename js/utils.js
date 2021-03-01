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

export {getRandomFromRange, getRandomArrayElement, isEscEvent};
