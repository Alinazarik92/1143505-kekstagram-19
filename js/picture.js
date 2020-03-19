'use strict';

(function () {
  var pictureContainerElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var fragment = document.createDocumentFragment();

  var openErrorMessage = function (text) {
    var element = window.load.createErrorElement();
    window.load.openMessage(element, text);
    var message = document.querySelector('main').lastChild;
    message.querySelector('button').textContent = 'Закрыть';
  };

  var drawPictures = function (photos) {
    photos.forEach(function (photo) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = photo.url;
      pictureElement.querySelector('.picture__img').alt = photo.description;
      pictureElement.querySelector('.picture__likes').textContent = photo.likes;
      pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

      fragment.appendChild(pictureElement);
    });
    pictureContainerElement.appendChild(fragment);
  };

  window.load.getData(drawPictures, openErrorMessage);
  pictureContainerElement.addEventListener('click', window.preview.onBigPictureOpen);
  pictureContainerElement.addEventListener('keydown', window.preview.onBigPictureOpenEnterPress);

})();
