import {showBigPicture} from './big-picture.js';
import {setFilterDefault, setFilterRandom, setFilterDiscussed} from './pictures-filter.js';

const picturesSection = document.querySelector('.pictures');
const pictureTemplate =document.querySelector('#picture')
  .content
  .querySelector('.picture');
const filter = document.querySelector('.img-filters');
const filterButtons = filter.querySelectorAll('.img-filters__button');
const FILTER_ACTIVE_CLASS = 'img-filters__button--active';
const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';

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

function renderFilteredPictures (pictures) {
  filter.classList.remove('img-filters--inactive');
  filter.addEventListener('click', (evt) => {
    const activeFilter = evt.target;

    if (!activeFilter.classList.contains('img-filters__button')) {
      return;
    }

    filterButtons.forEach((button) => {
      button.classList.remove(FILTER_ACTIVE_CLASS);
    });

    activeFilter.classList.add(FILTER_ACTIVE_CLASS);
    setFilter(activeFilter.id, pictures);

    createPictures(pictures);
  });
}

function setFilter (filter, pictures) {
  if (filter === FILTER_DEFAULT) {
    setFilterDefault(pictures);
  } else if (filter === FILTER_RANDOM) {
    setFilterRandom(pictures);
  } else if (filter === FILTER_DISCUSSED) {
    setFilterDiscussed(pictures);
  }
}

function findElementById (id, array) {
  return array.find(elem => elem.id == id);
}

export {renderFilteredPictures};
