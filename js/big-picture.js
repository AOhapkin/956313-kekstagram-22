import {isEscEvent} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('img');
const imageDescription = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentCountSpan = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const likesCount = bigPicture.querySelector('.likes-count');
const body = document.querySelector('body');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

function clearComments (comments) {
  while (comments.firstChild) {
    comments.removeChild(comments.firstChild);
  }
}

function createCommentElement (commentData) {
  let comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = commentData.avatar;
  comment.querySelector('.social__picture').alt = commentData.name;
  comment.querySelector('.social__text').innerText = commentData.message;
  return comment;
}

function createComments (commentsData) {
  clearComments(commentsList);
  let fragment = document.createDocumentFragment();
  commentsData.forEach(element => {
    fragment.appendChild(createCommentElement(element))
  });
  commentsList.appendChild(fragment);
}

function renderBigPictureData (pictureData) {
  image.src = pictureData.url;
  likesCount.textContent = pictureData.likes;
  imageDescription.textContent = pictureData.description;
  commentCountSpan.textContent = pictureData.comments.length;
  createComments(pictureData.comments);
}

function showBigPicture (picture) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  renderBigPictureData(picture);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown (evt) {
  if (isEscEvent(evt)) {
    hideBigPicture();
  }
}

function hideBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
}

function onCloseButtonClick () {
  hideBigPicture();
}

export {showBigPicture, body};
