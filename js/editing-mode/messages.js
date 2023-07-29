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

function hideMessage (callback) {
  modalSuccess.remove();
  modalError.remove();
  document.removeEventListener('keydown', onEscapePress);
  document.addEventListener('keydown', callback);
}

const showMessage = (message, callback) => {
  if (message === 'success') {
    addSuccessModalToBody();
    modalSuccess.classList.remove('hidden');

    modalSuccess.addEventListener('click', (evt) => {
      if (!evt.target.classList.contains('success__inner')) {
        hideMessage(callback);
      }
    });

    buttonSuccess.addEventListener('click', () => {
      hideMessage(callback);
    });

    return;
  }
  addErrorModalToBody();
  modalError.classList.remove('hidden');

  modalError.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('error__inner')) {
      hideMessage(callback);
    }
  });

  buttonError.addEventListener('click', () => {
    hideMessage(callback);
  });

  document.removeEventListener('keydown', callback);

};

export {showMessage, onEscapePress};
