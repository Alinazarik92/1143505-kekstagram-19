'use strict';

(function () {
  var Url = {
    POST: 'https://js.dump.academy/kekstagram',
    GET: ' https://js.dump.academy/kekstagram/data'
  };
  var RequestMethod = {
    GET: 'GET',
    POST: 'POST',
  };
  var XHR_TIMEOUT = 10000;
  var TYPE_JSON = 'json';
  var CODE_OK = 200;

  var sendData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var error;
    var element;
    xhr.responseType = TYPE_JSON;

    xhr.addEventListener('load', function () {

      if (xhr.status === CODE_OK) {
        element = window.message.createSuccessElement();
        onSuccess(element);
      } else {
        error = 'Ошибка загрузки файла: ' + xhr.status + ' ' + xhr.statusText;
        element = window.message.createErrorElement();
        onError(element, error);
      }
    });

    xhr.addEventListener('error', function () {
      error = 'Ошибка загрузки файла: проверьте подключение к Интернету';
      element = window.message.createErrorElement();
      onError(element, error);
    });

    xhr.addEventListener('timeout', function () {
      error = 'Ошибка загрузки файла: время ожидания превысило ' + xhr.timeout + 'мс';
      element = window.message.createErrorElement();
      onError.openMessage(element, error);
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(RequestMethod.POST, Url.POST);
    xhr.send(data);
  };

  var getData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = TYPE_JSON;
    var text;

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_OK) {
        window.message.setPhotos(xhr.response);
        var photos = window.message.getPhotos();
        onSuccess(photos);
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

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(RequestMethod.GET, Url.GET);
    xhr.send();
  };

  window.load = {
    sendData: sendData,
    getData: getData
  };
})();
