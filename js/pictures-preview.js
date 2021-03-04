import {showBigPicture} from './big-picture.js';
import {data} from './main.js';

const picturesSection = document.querySelector('.pictures');
const pictureTemplate =document.querySelector('#picture')
  .content
  .querySelector('.picture');

function createPictureElement (element) {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = element.url;
  picture.querySelector('.picture__comments').textContent = element.comments.length;
  picture.querySelector('.picture__likes').textContent = element.likes;
  return picture;
}

function onPictureElementClick (event) {
  if (event.target.className != 'picture__img') {
    return;
  }

  const child = event.target.parentNode;
  const childs = picturesSection.querySelectorAll('.picture');
  let childId;

  for (let i = 0; i < childs.length; i++) {
    if (child === childs[i]) {
      childId = i;
      break;
    }
  }

  showBigPicture(data[childId]);
}

function createPictures (pictures) {
  const picturesSectionFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    picturesSectionFragment.appendChild(createPictureElement(picture));
  });
  picturesSection.appendChild(picturesSectionFragment);
  picturesSection.addEventListener('click', onPictureElementClick);
}

export {createPictures};
