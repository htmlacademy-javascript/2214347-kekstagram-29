import {createPhotoDescriptions} from './data.js';
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

    const arrayComments = listComments.querySelectorAll('.social__comment'); // массив комментариев

    // показ первых 5ти комментариев
    for (let i = 0; i < 5; i++) {
      if (arrayComments.length <= 5) {
        for (let k = 0; k < arrayComments.length; k++) {
          arrayComments[k].classList.remove('hidden');
        }
        commentsShow.textContent = arrayComments.length;
        commentsLoader.classList.add('hidden');
        break;
      }
      arrayComments[i].classList.remove('hidden');
      commentsShow.textContent = i + 1;
    }
  });

});

pictures.appendChild(listPicturesFragment);

const openeningComments = () => {
  const commentsHidden = fullPhoto.querySelectorAll('.social__comment.hidden');
  for (let i = 0; i < 5; i++) {
    if (commentsHidden.length <= 5) {
      for (let k = 0; k < commentsHidden.length; k++) {
        commentsHidden[k].classList.remove('hidden');
        commentsShow.textContent = parseInt(commentsShow.textContent, 10) + 1; // показ открытых комментариев
      }
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', openeningComments);
      break;
    }
    commentsHidden[i].classList.remove('hidden');
    commentsShow.textContent = parseInt(commentsShow.textContent, 10) + 1; // показ открытых комментариев
  }
};

commentsLoader.addEventListener('click', openeningComments);

buttonClose.addEventListener('click', () => {
  fullPhoto.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', openeningComments);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    fullPhoto.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', openeningComments);
  }
});


