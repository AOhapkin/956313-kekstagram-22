import {showBigPicture} from './big-picture.js';

const picturesSection = document.querySelector('.pictures');
const pictureTemplate =document.querySelector('#picture')
  .content
  .querySelector('.picture');

function createPictureElement (element) {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = element.url;
  pictureElement.querySelector('.picture__comments').textContent = element.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = element.likes;
  pictureElement.addEventListener('click', onPictureElementClick);
  return pictureElement;
}

function onPictureElementClick () {
  showBigPicture(this.elementData);
}

function createPictures (pictures) {
  const picturesSectionFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    picturesSectionFragment.appendChild(createPictureElement(picture));
  });
  picturesSection.appendChild(picturesSectionFragment);
}

export {createPictures};
