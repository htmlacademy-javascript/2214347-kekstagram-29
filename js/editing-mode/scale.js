import {STEP_SCALE, SCALE_VALUE_MAXIMUM, SCALE_VALUE_MINIMUM} from '../constants.js';
import {inputScale, imagePreview, buttonZoomIn, buttonZoomOut} from './dom-elements.js';

const arrayInputScale = inputScale.value.split('%');
arrayInputScale[1] = '%';

const zoomIn = () => {
  if (inputScale.value !== SCALE_VALUE_MAXIMUM) {
    arrayInputScale[0] += STEP_SCALE;
    imagePreview.style.transform = `scale(${arrayInputScale[0] / 100})`;
    inputScale.value = arrayInputScale.join('');
  }
};

const onButtonZoomInClick = () => zoomIn();

const zoomOut = () => {
  if (inputScale.value !== SCALE_VALUE_MINIMUM) {
    arrayInputScale[0] -= STEP_SCALE;
    imagePreview.style.transform = `scale(${arrayInputScale[0] / 100})`;
    inputScale.value = arrayInputScale.join('');
  }
};

const onButtonZoomOutClick = () => zoomOut();

const addEventsButtonsZoom = () => {
  buttonZoomIn.addEventListener('click', onButtonZoomInClick);
  buttonZoomOut.addEventListener('click', onButtonZoomOutClick);
};

const removeEventsButtonsZoom = () => {
  buttonZoomIn.removeEventListener('click', onButtonZoomInClick);
  buttonZoomOut.removeEventListener('click', onButtonZoomOutClick);
};

export {addEventsButtonsZoom, removeEventsButtonsZoom};
