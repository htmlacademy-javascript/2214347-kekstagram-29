import {renderPhotos} from'./view-images.js';
import {showAlert, debounce} from './util.js';
import { ALERT_SHOW_TIME, RERENDER_DELAY } from './constants.js';
import {getData} from './api.js';
import './editing-mode/base.js';
import { initFilterModule, getFilteredPictures } from './filters.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    initFilterModule(photos, debounce(renderPhotos, RERENDER_DELAY));
    renderPhotos(getFilteredPictures(photos));
  })
  .catch(
    (err) => {
      showAlert(err.message, ALERT_SHOW_TIME);
    }
  );
