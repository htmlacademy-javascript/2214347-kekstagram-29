import {NUMBER_COMMENTS_DISPLAYED} from './constants.js';
import {isEscapeKey} from './util.js';
// DOM-элементы к миниатюрам
const pictures = document.querySelector('.pictures'); // контейнер миниатюр
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // шаблон миниатюр
const listPicturesFragment = document.createDocumentFragment(); // коробочка
// DOM-элементы к полноразмерным фото
const fullPhoto = document.querySelector('.big-picture'); // контейнер фулл фото
const commentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment'); // шаблон комментария
const listCommentsFragment = document.createDocumentFragment(); // коробочка
const buttonClose = document.querySelector('.big-picture__cancel'); // кнопка закрытия окна
const listComments = fullPhoto.querySelector('.social__comments'); // список комментариев

const commentsLoader = fullPhoto.querySelector('.comments-loader'); // кнопка загрузки комментариев
const commentsShow = fullPhoto.querySelector('.comments-show'); // открыто коммов

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhotoModal();
  }
};

const openeningComments = (multipleUse = true) => {
  const commentsHidden = fullPhoto.querySelectorAll('.social__comment.hidden'); // массив скрытых комментариев

  if (commentsHidden.length === 0) {
    commentsShow.textContent = commentsHidden.length;
    commentsLoader.classList.add('hidden');
  }
  if (commentsHidden.length > 0 && commentsHidden.length <= NUMBER_COMMENTS_DISPLAYED) {
    for (let i = 0; i < commentsHidden.length; i++) {
      commentsHidden[i].classList.remove('hidden');
      // изменение счётчика открытых комментариев
      if (multipleUse) {
        commentsShow.textContent = parseInt(commentsShow.textContent, 10) + 1;
      } else {
        commentsShow.textContent = i + 1;
      }
    }
    commentsLoader.classList.add('hidden');
  }
  if (commentsHidden.length > NUMBER_COMMENTS_DISPLAYED) {
    for (let i = 0; i < NUMBER_COMMENTS_DISPLAYED; i++) {
      commentsHidden[i].classList.remove('hidden');
      if (multipleUse) {
        commentsShow.textContent = parseInt(commentsShow.textContent, 10) + 1;
      } else {
        commentsShow.textContent = i + 1;
      }
    }
  }
};

function closeFullPhotoModal () {
  fullPhoto.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');
  buttonClose.removeEventListener('click', closeFullPhotoModal);
  commentsLoader.removeEventListener('click', openeningComments);
  document.removeEventListener('keydown', onDocumentKeydown);
}

// функция очищения фото
const removePictures = () => {
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

const renderPhotos = (photoDescriptions) => {
  removePictures();
  photoDescriptions.forEach(({url, description, likes, comments}) => {
    const photoDescriptionElement = pictureTemplate.cloneNode(true);
    photoDescriptionElement.querySelector('.picture__img').src = url;
    photoDescriptionElement.querySelector('.picture__img').alt = description;
    photoDescriptionElement.querySelector('.picture__likes').textContent = likes;
    photoDescriptionElement.querySelector('.picture__comments').textContent = comments.length;
    listPicturesFragment.appendChild(photoDescriptionElement);

    photoDescriptionElement.addEventListener('click', () => {
      fullPhoto.classList.remove('hidden');

      document.querySelector('body').classList.add('modal-open');

      fullPhoto.querySelector('img').src = url;
      fullPhoto.querySelector('.social__caption').textContent = description;
      fullPhoto.querySelector('.likes-count').textContent = likes;
      fullPhoto.querySelector('.comments-count').textContent = comments.length;

      listComments.innerHTML = '';

      comments.forEach(({avatar, message, name}) => {
        const socialComment = commentTemplate.cloneNode(true);
        socialComment.classList.add('hidden');
        socialComment.querySelector('.social__picture').src = avatar;
        socialComment.querySelector('.social__picture').alt = name;
        socialComment.querySelector('.social__text').textContent = message;
        listCommentsFragment.appendChild(socialComment);
      });

      listComments.appendChild(listCommentsFragment);

      openeningComments(false);

      buttonClose.addEventListener('click', closeFullPhotoModal);
      commentsLoader.addEventListener('click', openeningComments);
      document.addEventListener('keydown', onDocumentKeydown);
    });

  });

  pictures.appendChild(listPicturesFragment);
};

export {renderPhotos};

