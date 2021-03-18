import {hasDuplicates} from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const tags = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');
const pattern = /^[0-9a-zA-Zа-яА-Я]+$/;
const MAX_TAGS_NUMBER = 5;
const MAX_TAGS_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;

function onTagsInput () {
  const tagsString = tags.value;
  const tagsArray = tagsString.split(' ').map(tag => tag.toLowerCase());

  const message = validateTags(tagsArray);

  if (message) {
    tags.setCustomValidity(message);
  } else {
    tags.setCustomValidity('');
  }

  tags.reportValidity();
}

function validateTag (tag) {
  if (tag[0] !== '#') {
    return 'Теги должны начинаться с #';
  } else if (tag.length === 1) {
    return 'Тег не может быть пустым';
  } else if (!tag.slice(1).match(pattern)) {
    return 'Теги должны состоять только из букв и числел';
  } else if (tag.length > MAX_TAGS_LENGTH) {
    return 'Слишком длинный тег. Максимум символов: ' + MAX_TAGS_LENGTH;
  }
}

function validateTags (tags) {
  if (hasDuplicates(tags)) {
    return 'Удалите повторяющиеся теги';
  }

  if (tags.length > MAX_TAGS_NUMBER) {
    return 'Максимальное число тегов: ' + MAX_TAGS_NUMBER;
  }

  for (let i = 0; i < tags.length; i++) {
    const validityMessage = validateTag(tags[i]);
    if (validityMessage) {
      return validityMessage;
    }
  }
}

function onDescriptionInput () {
  if (description.value.length > MAX_DESCRIPTION_LENGTH) {
    description.setCustomValidity('Максимум ' + MAX_DESCRIPTION_LENGTH + ' знаков. Сделайте короче на ' + (description.value.length - MAX_DESCRIPTION_LENGTH) + '.');
  } else {
    description.setCustomValidity('');
  }
}

export {onTagsInput, onDescriptionInput}
