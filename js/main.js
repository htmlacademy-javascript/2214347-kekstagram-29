import {renderPhotos} from'./view-images.js';
import {showAlert} from './util.js';
import {getData} from './api.js';
import './editing-mode/base.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
