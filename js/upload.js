'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  var sendData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var error;
    var element;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        element = window.load.createSuccessElement();
        onSuccess(element);
      } else {
        error = 'Ошибка загрузки файла: ' + xhr.status + ' ' + xhr.statusText;
        element = window.load.createErrorElement();
        onError(element, error);
      }
    });

    xhr.addEventListener('error', function () {
      error = 'Ошибка загрузки файла: проверьте подключение к Интернету';
      element = window.load.createErrorElement();
      onError(element, error);
    });

    xhr.addEventListener('timeout', function () {
      error = 'Ошибка загрузки файла: время ожидания превысило ' + xhr.timeout + 'мс';
      element = window.load.createErrorElement();
      onError.openMessage(element, error);
    });

    xhr.timeout = 10000;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.upload = {
    sendData: sendData
  };
})();
