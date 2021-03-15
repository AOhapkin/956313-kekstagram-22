const tagsInput = document.querySelector('.text__hashtags');



tagsInput.addEventListener('input', () => {
  const tags = tagsInput.value.split(' ');
  for (let i=0; i < tags.length; i++) {
    if (tags[i][0] !== '#') {
      tagsInput.setCustomValidity('Каждый тег должен начинаться с #')
    } else {
      tagsInput.setCustomValidity('');
    }
  }
})
