import { modalSuccessTemplate, modalErrorTemplate } from './dom-elements.js';
import { isEscapeKey } from '../util.js';

const modalSuccess = modalSuccessTemplate.cloneNode(true);
const buttonSuccess = modalSuccess.querySelector('.success__button');

const modalError = modalErrorTemplate.cloneNode(true);
const buttonError = modalError.querySelector('.error__button');

const addSuccessModalToBody = () => document.body.appendChild(modalSuccess).classList.add('hidden');

const addErrorModalToBody = () => document.body.appendChild(modalError).classList.add('hidden');

const onEscapePress = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

function hideMessage () {
  modalSuccess.remove();
  modalError.remove();
  document.removeEventListener('keydown', onEscapePress);
}

const showMessage = (message) => {
  if (message === 'success') {
    addSuccessModalToBody();
    modalSuccess.classList.remove('hidden');
    document.addEventListener('keydown', onEscapePress);

    return;
  }
  addErrorModalToBody();
  modalError.classList.remove('hidden');
  document.addEventListener('keydown', onEscapePress);
};

modalSuccess.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('success__inner')) {
    hideMessage();
  }
});

buttonSuccess.addEventListener('click', () => {
  hideMessage();
});


modalError.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('error__inner')) {
    hideMessage();
  }
});

buttonError.addEventListener('click', () => {
  hideMessage();
});

export {showMessage, onEscapePress};
