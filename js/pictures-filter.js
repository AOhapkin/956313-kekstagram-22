const filter = document.querySelector('.img-filters');
const filterButtons = filter.querySelectorAll('.img-filters__button');

function updateFilter (evt) {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  })
  evt.target.classList.add('img-filters__button--active');
}

export {updateFilter}
