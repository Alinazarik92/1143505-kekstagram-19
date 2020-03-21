'use strict';

(function () {
  var RANDOM_PHOTO_COUNT = 10;

  var filterBlock = document.querySelector('.img-filters');
  var filterDefault = filterBlock.querySelector('#filter-default');
  var filterRandom = filterBlock.querySelector('#filter-random');
  var filterDiscussed = filterBlock.querySelector('#filter-discussed');
  var filterButtons = filterBlock.querySelectorAll('.img-filters__button');
  var filtersForm = filterBlock.querySelector('.img-filters__form');

  var getRandomPhotos = function (photos) {
    var arrCopy = photos.slice();
    var resPhotos = [];

    for (var i = 0; i < RANDOM_PHOTO_COUNT; i++) {
      var rndIndx = Math.floor(Math.random() * (arrCopy.length - 1));
      resPhotos.push(arrCopy[rndIndx]);
      arrCopy.splice(rndIndx, 1);
    }

    return resPhotos;
  };

  var getDiscussedPhotos = function (photos) {
    var arrCopy = photos.slice();

    arrCopy.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });

    return arrCopy;
  };

  var onFilterChange = function (evt) {
    var activeFiter = evt.target;
    var pictures = document.querySelectorAll('.picture');

    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove('img-filters__button--active');
    });

    activeFiter.classList.add('img-filters__button--active');

    pictures.forEach(function (picture) {
      document.querySelector('.pictures').removeChild(picture);
    });

    switch (activeFiter) {
      case filterDefault:
        window.picture.drawPictures(window.message.getPhotos().slice());
        break;
      case filterRandom:
        window.picture.drawPictures(getRandomPhotos(window.message.getPhotos()));
        break;
      case filterDiscussed:
        window.picture.drawPictures(getDiscussedPhotos(window.message.getPhotos()));
        break;
      default:
        window.picture.drawPictures(window.message.getPhotos().slice());
        break;
    }
  };

  filtersForm.addEventListener('click', window.debounce(onFilterChange));

  var onFilterButtonEnterPress = function (evt) {
    window.util.isEscPress(evt, window.debounce(onFilterChange));
  };

  filterButtons.forEach(function (filterButton) {
    filterButton.addEventListener('keydown', onFilterButtonEnterPress);
  });

})();
