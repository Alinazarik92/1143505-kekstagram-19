'use strict';

(function () {
  var RANDOM_PHOTO_COUNT = 10;
  var filterBlock = document.querySelector('.img-filters');
  var filterDefault = filterBlock.querySelector('#filter-default');
  var filterRandom = filterBlock.querySelector('#filter-random');
  var filterDiscussed = filterBlock.querySelector('#filter-discussed');
  var filterButtons = filterBlock.querySelectorAll('.img-filters__button');
  var photos = window.load.getPhotos();
  var defaultPhotos = photos.slice();
  var randomPhotos = [];
  var discussedPhotos = [];

  var getRandomPhotos = function () {
    var arrCopy = photos.slice();

    for (var k = 0; k < RANDOM_PHOTO_COUNT; k++) {
      var j;
      var temp;
      for (var i = arrCopy.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arrCopy[j];
        arrCopy[j] = arrCopy[i];
        arrCopy[i] = temp;
      }
      randomPhotos[k] = arrCopy[k];
    }

    return randomPhotos;
  };

  var getDiscussedPhotos = function () {
    var arrCopy = photos.slice();

    discussedPhotos = arrCopy.sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });

    return discussedPhotos;
  };

  var onFilterChange = function (evt) {
    var activeFiter = evt.target;

    filterButtons.forEach(function (filterButton) {
      if (filterButton.classList.contains('img-filters__button--active')) {
        filterButton.classList.remove('img-filters__button--active');
      }
    });
    activeFiter.classList.add('img-filters__button--active');
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (picture) {
      document.querySelector('.pictures').removeChild(picture);
    });
    if (activeFiter === filterDefault) {
      window.picture.drawPictures(defaultPhotos);
    }
    if (activeFiter === filterRandom) {
      randomPhotos = getRandomPhotos(photos);
      window.picture.drawPictures(randomPhotos);
    }
    if (activeFiter === filterDiscussed) {
      discussedPhotos = getDiscussedPhotos(photos);
      window.picture.drawPictures(discussedPhotos);
    }
  };

  var onFilterButtonEnterPress = function (evt) {
    window.preview.isEscPress(evt, onFilterChange);
  };

  filterButtons.forEach(function (filterButton) {
    filterButton.addEventListener('click', onFilterChange);
    filterButton.addEventListener('keydown', onFilterButtonEnterPress);
  });

})();
