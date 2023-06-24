import {createPhotoDescriptions} from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotoDescriptions = createPhotoDescriptions();

const similarListFragment = document.createDocumentFragment();

similarPhotoDescriptions.forEach(({url, description, likes, comments}) => {
  const photoDescriptionElement = pictureTemplate.cloneNode(true);
  photoDescriptionElement.querySelector('.picture__img').src = url;
  photoDescriptionElement.querySelector('.picture__img').alt = description;
  photoDescriptionElement.querySelector('.picture__likes').textContent = likes;
  photoDescriptionElement.querySelector('.picture__comments').textContent = comments.length;
  similarListFragment.appendChild(photoDescriptionElement);
});

pictures.appendChild(similarListFragment);
