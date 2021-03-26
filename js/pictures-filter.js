const filter = document.querySelector('.img-filters');
const filterButtons = filter.querySelectorAll('.img-filters__button');
const FILTER_ACTIVE_CLASS = 'img-filters__button--active'

function updateFilter (evt) {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  filterButtons.forEach((button) => {
    button.classList.remove(FILTER_ACTIVE_CLASS);
  })
  evt.target.classList.add(FILTER_ACTIVE_CLASS);
}



export {updateFilter}
