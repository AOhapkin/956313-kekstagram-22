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

function deletePictures () {
  let pics = picturesSection.querySelectorAll('.picture');
  pics.forEach((pic) => {
    picturesSection.removeChild(pic);
  })
}

function renderFilteredPictures (pictures) {
  createPictures(pictures);
  filtersBlock.classList.remove('img-filters--inactive');

  filtersBlock.addEventListener('click', (evt) => {
    const onFilterChange = _.debounce((id) => {
      deletePictures();
      createPictures(FILTERS[id](pictures));
    }, RENDER_TIME_OUT);

    const activeFilter = evt.target;

    if (!activeFilter.classList.contains('img-filters__button')) {
      return;
    }

    filterButtons.forEach((button) => {
      button.classList.remove(FILTER_ACTIVE_CLASS);
    });

    activeFilter.classList.add(FILTER_ACTIVE_CLASS);
    onFilterChange(evt.target.id);
  });
}

export {renderFilteredPictures};
