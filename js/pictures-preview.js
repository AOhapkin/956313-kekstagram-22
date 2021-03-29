/* global _:readonly */
import {showBigPicture} from './big-picture.js';
import {setFilterDefault, setFilterRandom, setFilterDiscussed} from './pictures-filter.js';
import {findElementById} from './utils.js';

const picturesSection = document.querySelector('.pictures');
const pictureTemplate =document.querySelector('#picture')
  .content
  .querySelector('.picture');
const filtersBlock = document.querySelector('.img-filters');
const filterButtons = filtersBlock.querySelectorAll('.img-filters__button');

const RENDER_TIME_OUT = 500;
const FILTER_ACTIVE_CLASS = 'img-filters__button--active';

const FILTERS = {
  'filter-default': setFilterDefault,
  'filter-random': setFilterRandom,
  'filter-discussed': setFilterDiscussed,
}

function createPictureElement ({
  url,
  id,
  comments,
  likes,
}) {
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.dataset.id = id;

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

function deletePictures () {
  let pics = picturesSection.querySelectorAll('.picture');
  pics.forEach((pic) => {
    picturesSection.removeChild(pic);
  })
}

function showFilters() {
  filtersBlock.classList.remove('img-filters--inactive');
}

function onFilterFormClick(evt, pictures) {
  const activeFilter = evt.target;

  if (!activeFilter.classList.contains('img-filters__button') || activeFilter.classList.contains(FILTER_ACTIVE_CLASS)) {
    return;
  }

  filterButtons.forEach((button) => {
    button.classList.remove(FILTER_ACTIVE_CLASS);
  });

  activeFilter.classList.add(FILTER_ACTIVE_CLASS);

  deletePictures();
  createPictures(FILTERS[evt.target.id](pictures));
}

function renderFilteredPictures (pictures) {
  filtersBlock.addEventListener('click', _.debounce((evt) => onFilterFormClick(evt, pictures), RENDER_TIME_OUT));
}

export {createPictures, showFilters, renderFilteredPictures};
