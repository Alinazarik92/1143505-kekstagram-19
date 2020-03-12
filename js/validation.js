'use strict';

(function () {
  var imageUpload = document.querySelector('.img-upload__overlay');
  var hashtag = imageUpload.querySelector('.text__hashtags');
  var description = imageUpload.querySelector('.text__description');
  var hashtags = [];

  description.addEventListener('invalid', function () {
    if (description.validity.tooLong) {
      description.setCustomValidity('Комментарий не должен превышать 140 символов');
      description.style = 'border-color: tomato';
    }
  });

  hashtag.addEventListener('input', function (evt) {
    hashtags = evt.target.value.split(' ');
    var isHashtagValid = true;
    var hastagRegExp = new RegExp('^[a-z0-9]+$');

    if (hashtags.length > 5) {
      hashtag.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      isHashtagValid = false;
      return;
    } else {
      for (var k = 0; k < hashtags.length; k++) {
        if (hashtags[k].startsWith('#') === false) {
          hashtag.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
          isHashtagValid = false;
          return;
        } else if (hashtags[k] === '#') {
          hashtag.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
          isHashtagValid = false;
          return;
        } else if (hashtags[k].length > 20) {
          hashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
          isHashtagValid = false;
          return;
        } else if (hastagRegExp.test(hashtags[k].substr(1, hashtags[k].length)) === false) {
          hashtag.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
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
            isHashtagValid = false;
            return;
          }
        }
      }
    }

    if (isHashtagValid) {
      hashtag.setCustomValidity('');
      hashtag.valid = true;
    }
  });

  window.validation = {
    hashtag: hashtag,
    description: description
  };
})();
