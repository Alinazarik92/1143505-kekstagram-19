'use strict';

(function () {
  var photos = [];

  var setPhotos = function (arr) {
    photos = arr.slice();
  };

  var getPhotos = function () {
    return photos;
  };

  var createSuccessElement = function () {
    var successTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    return successElement;
  };

  var createErrorElement = function () {
    var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    return errorElement;
  };

  var onMessageCloseEnterPress = function (evt) {
    window.util.isEnterPress(evt, onMessageClose);
  };

  var onMessageEscPress = function (evt) {
    window.util.isEscPress(evt, onMessageClose);
  };

  var onMessageClose = function () {
    var message = document.querySelector('main').lastChild;
    document.querySelector('main').removeChild(message);
  };

  var openMessage = function (element, text) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    document.querySelector('main').appendChild(fragment);
    var message = document.querySelector('main').lastChild;

    if (message.className === 'error') {
      message.querySelector('h2').textContent = text;
    }

    message.querySelector('button').addEventListener('click', onMessageClose);
    message.querySelector('button').addEventListener('keydown', onMessageCloseEnterPress);
    document.addEventListener('keydown', onMessageEscPress);
    message.addEventListener('click', function (evt) {
      if (evt.target === message) {
        onMessageClose();
      }
    });
  };

  window.message = {
    createSuccessElement: createSuccessElement,
    createErrorElement: createErrorElement,
    open: openMessage,
    getPhotos: getPhotos,
    setPhotos: setPhotos
  };
})();
