'use strict';

(function () {
  var imageUpload = document.querySelector('.img-upload__overlay');
  var hashtag = imageUpload.querySelector('.text__hashtags');
  var description = imageUpload.querySelector('.text__description');
  var hashtags = [];

  var onDescriotionValidityCheck = function () {
    if (description.validity.tooLong) {
      description.setCustomValidity('Комментарий не должен превышать 140 символов');
      description.classList.add('input-error');
    }
  };

  var onHashtagValidityCheck = function (evt) {
    hashtags = evt.target.value.split(' ');
    var isHashtagValid = true;
    var hastagRegExp = new RegExp('^[а-яА-ЯёЁa-zA-Z0-9]+$');

    if (hashtags.length === 1 && hashtags[0].trim() === '') {
      isHashtagValid = true;
      hashtag.setCustomValidity('');
      hashtag.classList.remove('input-error');
      return;
    }

    if (hashtags.length > 5) {
      hashtag.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      isHashtagValid = false;
      return;
    } else {
      for (var k = 0; k < hashtags.length; k++) {
        if (hashtags[k].startsWith('#') === false) {
          hashtag.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
          hashtag.classList.add('input-error');
          isHashtagValid = false;
          return;
        } else if (hashtags[k] === '#') {
          hashtag.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
          hashtag.classList.add('input-error');
          isHashtagValid = false;
          return;
        } else if (hashtags[k].length > 20) {
          hashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
          hashtag.classList.add('input-error');
          isHashtagValid = false;
          return;
        } else if (hastagRegExp.test(hashtags[k].substr(1, hashtags[k].length)) === false) {
          hashtag.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
          hashtag.classList.add('input-error');
          isHashtagValid = false;
          return;
        } else {
          var count = 0;
          for (var j = 0; j < hashtags.length; j++) {
            if (hashtags[j].toLowerCase() === hashtags[k].toLowerCase()) {
              count++;
            }
          }
          if (count > 1) {
            hashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
            hashtag.classList.add('input-error');
            isHashtagValid = false;
            return;
          }
        }
      }
    }

    if (isHashtagValid) {
      hashtag.setCustomValidity('');
      hashtag.valid = true;
      hashtag.classList.remove('input-error');
    }
  };

  var resetInput = function (input) {
    input.value = '';
    input.setCustomValidity('');
    input.valid = true;
    input.classList.remove('input-error');
  };

  var turnOnValidationCheck = function () {
    description.addEventListener('invalid', onDescriotionValidityCheck);
    hashtag.addEventListener('input', onHashtagValidityCheck);
  };

  var turnOffValidationCheck = function () {
    resetInput(hashtag);
    resetInput(description);
    description.removeEventListener('invalid', onDescriotionValidityCheck);
    hashtag.removeEventListener('input', onHashtagValidityCheck);
  };

  window.validation = {
    hashtag: hashtag,
    description: description,
    turnOnCheck: turnOnValidationCheck,
    turnOffCheck: turnOffValidationCheck
  };
})();
