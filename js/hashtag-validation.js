const tagsInput = document.querySelector('.text__hashtags');
const MAX_TAGS_NUMBER = 5;
const MAX_TAGS_LENGTH = 20;
const pattern = /[^a-zA-Z0-9]/;

tagsInput.addEventListener('input', () => {
  const tags = tagsInput.value.split(' ');
  for (let i=0; i < tags.length; i++) {
    if (tags[i][0] !== '#') {
      tagsInput.setCustomValidity('Теги должны начинаться с #')
    } else if (tags.length > MAX_TAGS_NUMBER) {
      tagsInput.setCustomValidity('Максимальное число тегов: ' + MAX_TAGS_NUMBER);
    } else if (pattern.test(tags[i].slice(1))) {
      tagsInput.setCustomValidity('Теги должны состоять только из букв и числел');
    } else if (tags[i].length > MAX_TAGS_LENGTH) {
      tagsInput.setCustomValidity('Слишком длинный тег. Максимум символов: ' + MAX_TAGS_LENGTH);
    } else if (tags[i].length === 1) {
      tagsInput.setCustomValidity('Тег не может быть пустым');
    } else if (hasDuplicates(tags)) {
      tagsInput.setCustomValidity('Удалите повторяющиеся теги');
    } else {
      tagsInput.setCustomValidity('');
    }
  }
});

function hasDuplicates (array) {
  let valuesSoFar = Object.create(null);
  for (let i = 0; i < array.length; ++i) {
    let value = array[i].toLowerCase();
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar[value] = true;
  }
  return false;
}




