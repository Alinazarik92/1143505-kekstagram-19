'use strict';

(function () {
  var pictureContainerElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var fragment = document.createDocumentFragment();

  var openErrorMessage = function () {
    var element = window.message.createElement('#error', '.error');
    var text = 'Не удалось загрузить фотографии других пользователей. Проверьте подключение к Интернету и перезагрузите страницу.';
    window.message.open(element, text);
    document.querySelector('.error__button').textContent = 'Закрыть';
  };

  var drawPictures = function (photos) {
    photos.forEach(function (photo) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = photo.url;
      pictureElement.querySelector('.picture__img').alt = photo.description;
      pictureElement.querySelector('.picture__likes').textContent = photo.likes;
      pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
      pictureElement.setAttribute('original-url', photo.url);

      fragment.appendChild(pictureElement);
    });
    pictureContainerElement.appendChild(fragment);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  window.load.getData(drawPictures, openErrorMessage);
  pictureContainerElement.addEventListener('click', window.preview.onBigPictureOpen);
  pictureContainerElement.addEventListener('keydown', window.preview.onBigPictureOpenEnterPress);

  window.picture = {
    draw: drawPictures
  };
})();
