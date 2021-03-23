import {showBigPicture} from './big-picture.js';

const picturesSection = document.querySelector('.pictures');
const pictureTemplate =document.querySelector('#picture')
  .content
  .querySelector('.picture');

function createPictureElement (element) {
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = element.url;
  picture.querySelector('.picture__comments').textContent = element.comments.length;
  picture.querySelector('.picture__likes').textContent = element.likes;
  picture.dataset.id = element.id;

  return picture;
}

function createPictures (pictures) {
  const picturesSectionFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    picturesSectionFragment.appendChild(createPictureElement(picture));
  });

  picturesSection.appendChild(picturesSectionFragment);

  picturesSection.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      const id = evt.target.closest('.picture').dataset.id;
      showBigPicture(findElementById(id, pictures));
    }
  });
}

function findElementById (id, array) {
  return array.find(elem => elem.id == id);
}

export {createPictures};
