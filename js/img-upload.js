const uploadInput = document.querySelector('#upload-file');
const editor = document.querySelector('.img-upload__overlay');

uploadInput.addEventListener('change', function(evt) {
  evt.preventDefault();
  editor.classList.remove('hidden');
});
