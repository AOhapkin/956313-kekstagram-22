import {isEscEvent} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('img');
const imageDescription = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentCountSpan = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsAddButton =  bigPicture.querySelector('.social__comments-loader');
const likesCount = bigPicture.querySelector('.likes-count');
const body = document.querySelector('body');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const COMMENTS_MIN_NUMBER = 5;
let maxCommentsToDisplay = COMMENTS_MIN_NUMBER;
let comments = [];

function clearComments () {
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
}

function createComment ({
  avatar,
  name,
  message,
}) {
  let template = commentTemplate.cloneNode(true);
  template.querySelector('.social__picture').src = avatar;
  template.querySelector('.social__picture').alt = name;
  template.querySelector('.social__text').innerText = message;
  return template;
}

function onCommentsAddButtonClick() {
  maxCommentsToDisplay += COMMENTS_MIN_NUMBER;
  clearComments();
  createComments();
  setCommentCountBlock()
}

function createComments () {
  clearComments();
  let fragment = document.createDocumentFragment();
  comments.slice(0, maxCommentsToDisplay).forEach(element => {
    fragment.appendChild(createComment(element))
  });
  commentsList.appendChild(fragment);

  if (comments.length <= COMMENTS_MIN_NUMBER) {
    commentsAddButton.classList.add('hidden');
  } else {
    commentsAddButton.classList.remove('hidden');
    commentsAddButton.addEventListener('click', onCommentsAddButtonClick);
  }

  if (commentsList.querySelectorAll('.social__comment').length === comments.length) {
    commentsAddButton.classList.add('hidden');
  }
}

function renderBigPicture (data) {
  image.src = data.url;
  likesCount.textContent = data.likes;
  imageDescription.textContent = data.description;
  commentCountSpan.textContent = data.comments.length;
  comments = data.comments;
  if (comments.length > 0) {
    createComments();
  }

  if (comments.length > COMMENTS_MIN_NUMBER) {
    setCommentCountBlock();
  } else {
    commentCountBlock.classList.add('hidden');
  }
}

function setCommentCountBlock() {
  commentCountBlock.innerHTML = `${commentsList.children.length} из <span class="comments-count">${comments.length}</span> комментариев`;
}

function showBigPicture (data) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');


  maxCommentsToDisplay = COMMENTS_MIN_NUMBER;
  renderBigPicture(data);
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
