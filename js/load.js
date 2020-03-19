'use strict';

(function () {
  var URL = ' https://js.dump.academy/kekstagram/data';

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
    window.preview.isEnterPress(evt, onMessageClose);
  };

  var onMessageEscPress = function (evt) {
    window.preview.isEscPress(evt, onMessageClose);
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

  var getData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    var text;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        text = 'Не удалось загрузить фотографии других пользователей. Ошибка: ' + xhr.status + ' ' + xhr.statusText;
        onError(text);
      }
    });
    xhr.addEventListener('error', function () {
      text = 'Не удалось загрузить фотографии других пользователей. Проверьте подключение к Интернету и перезагрузите страницу.';
      onError(text);
    });
    xhr.addEventListener('timeout', function () {
      text = 'Не удалось загрузить фотографии других пользователей. Время ожидания превысило ' + xhr.timeout + 'мс. Попробуйте перезагрузить страницую';
      onError(text);
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.load = {
    getData: getData,
    createSuccessElement: createSuccessElement,
    createErrorElement: createErrorElement,
    openMessage: openMessage
  };
})();
