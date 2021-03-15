const tagsInput = document.querySelector('.text__hashtags');
const MAX_TAGS_NUMBER = 5;
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
    } else {
      tagsInput.setCustomValidity('');
    }
  }
})
