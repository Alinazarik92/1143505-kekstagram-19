'use strict';

(function () {
  var photos = [];
  var main = document.querySelector('main');


  var setPhotos = function (arr) {
    photos = arr.slice();
  };

  var getPhotos = function () {
    return photos;
  };

  var createElement = function (id, className) {
    var template = document.querySelector(id)
        .content
        .querySelector(className);
    var element = template.cloneNode(true);
    return element;
  };

  var onMessageCloseEnterPress = function (evt) {
    window.util.isEnterPress(evt, onMessageClose);
  };

  var onMessageEscPress = function (evt) {
    window.util.isEscPress(evt, onMessageClose);
  };

  var onMessageClose = function () {
    main.removeChild(main.lastChild);
  };

  var onMessageOverlayClick = function (evt) {
    window.util.isOverlayClick(evt, main.lastChild, onMessageClose);
  };

  var openMessage = function (element, text) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    main.appendChild(fragment);
    var message = main.lastChild;
    var messageCloseButton = message.querySelector('button');

    if (message.classList.contains('error')) {
      message.querySelector('h2').textContent = text;
    }

    messageCloseButton.addEventListener('click', onMessageClose);
    messageCloseButton.addEventListener('keydown', onMessageCloseEnterPress);
    document.addEventListener('keydown', onMessageEscPress);
    message.addEventListener('click', onMessageOverlayClick);
  };

  window.message = {
    createElement: createElement,
    open: openMessage,
    getPhotos: getPhotos,
    setPhotos: setPhotos
  };
})();
