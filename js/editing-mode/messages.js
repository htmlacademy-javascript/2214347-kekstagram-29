import { modalSuccessTemplate, modalErrorTemplate } from './dom-elements.js';
import { isEscapeKey } from '../util.js';

const CLASSES_SUCCESS_CLOSING = ['success__button', 'success'];
const CLASSES_ERROR_CLOSING = ['error__button', 'error'];

const modalSuccess = modalSuccessTemplate.cloneNode(true);
const modalError = modalErrorTemplate.cloneNode(true);

const addModalSuccessToBody = () => document.body.appendChild(modalSuccess).classList.add('hidden');
const addModalErrorToBody = () => document.body.appendChild(modalError).classList.add('hidden');

const onEscapePress = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const onModalSuccessClick = (evt) => {
  if (CLASSES_SUCCESS_CLOSING.some((CLASS_FOR_CLOSING) => evt.target.classList.contains(CLASS_FOR_CLOSING))) {
    hideMessage();
  }
};

const onModalErrorClick = (evt) => {
  if (CLASSES_ERROR_CLOSING.some((CLASS_FOR_CLOSING) => evt.target.classList.contains(CLASS_FOR_CLOSING))) {
    hideMessage();
  }
};

function hideMessage () {
  modalSuccess.remove();
  modalError.remove();
  document.removeEventListener('keydown', onEscapePress);
  modalSuccess.removeEventListener('click', onModalSuccessClick);
  modalError.removeEventListener('click', onModalErrorClick);
}

const showMessage = (message) => {
  if (message === 'success') {
    addModalSuccessToBody();
    modalSuccess.classList.remove('hidden');
    modalSuccess.addEventListener('click', onModalSuccessClick);
    document.addEventListener('keydown', onEscapePress);

    return;
  }
  addModalErrorToBody();
  modalError.classList.remove('hidden');
  modalError.addEventListener('click', onModalErrorClick);
  document.addEventListener('keydown', onEscapePress);
};

export {showMessage};
