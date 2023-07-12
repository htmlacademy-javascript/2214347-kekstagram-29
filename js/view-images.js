import {createPhotoDescriptions, NUMBER_COMMENTS_DISPLAYED} from './data.js';
import {isEscapeKey} from './util.js';
// Константы к миниатюрам
const pictures = document.querySelector('.pictures'); // контейнер миниатюр
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // шаблон миниатюр
const photoDescriptions = createPhotoDescriptions(); // данные
const listPicturesFragment = document.createDocumentFragment(); // коробочка
// Константы к полноразмерному фото
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

    fullPhoto.querySelector('img').src = url; // путь фотки
    fullPhoto.querySelector('.social__caption').textContent = description; // описание фотки
    fullPhoto.querySelector('.likes-count').textContent = likes; // лайки фотки
    fullPhoto.querySelector('.comments-count').textContent = comments.length; // кол-во комментариев фотки

    listComments.innerHTML = ''; // очищение списка комментариев

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

    commentsLoader.addEventListener('click', openeningComments);
    document.addEventListener('keydown', onDocumentKeydown);
  });

});

pictures.appendChild(listPicturesFragment);

function closeFullPhotoModal () {
  fullPhoto.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', openeningComments);
  document.removeEventListener('keydown', onDocumentKeydown);
}

buttonClose.addEventListener('click', () => {
  closeFullPhotoModal();
});

