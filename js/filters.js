import { NUMBER_RANDOM_PHOTOS } from './constants.js';

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterContainer = document.querySelector('.img-filters');

const showFilters = () => {
  filterContainer.classList.remove('img-filters--inactive');
};

// Текущий выбранный тип фильтра.
let currentFilterType;

const sortByRandom = () => Math.random() - 0.5;

const sortByCommentsCount = (photoFirst, photoSecond) => photoSecond.comments.length - photoFirst.comments.length;

// Функция, которая возвращает отфильтрованные картинки в зависимости от текущего типа фильтра.
const getFilteredPictures = (loadedPicturesData) => {
  switch (currentFilterType) {
    case FilterType.RANDOM:
      return [...loadedPicturesData].sort(sortByRandom).slice(0, NUMBER_RANDOM_PHOTOS);
    case FilterType.DISCUSSED:
      return [...loadedPicturesData].sort(sortByCommentsCount);
    default:
      return [...loadedPicturesData];
  }
};

// Функция для установки обработчика клика на кнопки фильтров.
const setFilterButtonClickHandler = (loadedPicturesData, callback) => {
  filterContainer.addEventListener('click', (evt) => {
    const clickedButton = evt.target;
    if (!clickedButton.classList.contains('img-filters__button') || clickedButton.id === currentFilterType) {
      return;
    }

    const activeButton = filterContainer.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');

    currentFilterType = clickedButton.id;
    callback(getFilteredPictures(loadedPicturesData));
  });
};

// Инициализация модуля фильтрации.
const initFilterModule = (loadedPicturesData, callback) => {
  showFilters();
  setFilterButtonClickHandler(loadedPicturesData,callback);
};


export { initFilterModule, getFilteredPictures };


