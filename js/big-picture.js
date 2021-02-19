import {isEscEvent} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('img');
const imageDescription = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentCountElement = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const likesCount = bigPicture.querySelector('.likes-count');
const body = document.querySelector('body');
let commentsList = bigPicture.querySelector('.social__comments');
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
  commentCountElement.textContent = pictureData.comments.length;
  createComments(pictureData.comments);
}

function showBigPicture (pictureData) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  renderBigPictureData(pictureData);
}

function hideModal (modal) {
  modal.classList.add('hidden');
  body.classList.remove('modal-open');
}

closeButton.addEventListener('click', function() {
  hideModal(bigPicture);
});

document.addEventListener('keydown', function(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideModal(bigPicture);
  }
});

export {showBigPicture, hideModal};
