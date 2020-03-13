'use strict';

(function () {

  var imageUpload = document.querySelector('.img-upload__overlay');
  var imageUploadOpen = document.querySelector('.img-upload__input');
  var imageUploadClose = imageUpload.querySelector('.img-upload__cancel');

  var pressEscImageUpload = function (evt) {
    if (evt.key === window.preview.ESC_KEY) {
      imageUpload.classList.add('hidden');
      imageUploadOpen.value = '';
    }
  };

  var checkInputFocus = function () {
    window.validation.hashtag.addEventListener('focus', function () {
      document.removeEventListener('keydown', pressEscImageUpload);
    });
    window.validation.description.addEventListener('focus', function () {
      document.removeEventListener('keydown', pressEscImageUpload);
    });
    window.validation.hashtag.addEventListener('blur', function () {
      document.addEventListener('keydown', pressEscImageUpload);
    });
    window.validation.description.addEventListener('blur', function () {
      document.addEventListener('keydown', pressEscImageUpload);
    });
  };

  var openImageUpload = function () {
    imageUpload.classList.remove('hidden');
    document.addEventListener('keydown', pressEscImageUpload);
    checkInputFocus();
  };

  var closeImageUpload = function () {
    imageUpload.classList.add('hidden');
    imageUploadOpen.value = '';
    document.removeEventListener('keydown', pressEscImageUpload);
  };

  imageUploadOpen.addEventListener('change', function () {
    openImageUpload();
    window.effect.effectLevel.classList.add('hidden');
    window.scale.scaleControlValue.value = window.scale.scaleValue + '%';
    if (window.scale.scaleControlValue.value !== '100%') {
      window.scale.scaleValue = window.scale.SCALE_VALUE;
      window.scale.scaleControlValue.value = window.scale.scaleValue + '%';
      window.scale.imageUploadPreview.style = 'transform: scale(' + (window.scale.scaleValue / 100) + ')';
    }
    if (window.effect.imagePreview.className !== 'effects__preview--none') {
      if (window.effect.imagePreview.className === '') {
        window.effect.imagePreview.classList.add('effects__preview--none');
      } else {
        window.effect.imagePreview.classList.remove(window.effect.imagePreview.className);
        window.effect.imagePreview.classList.add('effects__preview--none');
      }
    }
    window.effect.isFilterSelection();
  });

  imageUploadClose.addEventListener('click', function () {
    closeImageUpload();
  });
  imageUploadClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.preview.ENTER_KEY) {
      closeImageUpload();
    }
  });
})();
