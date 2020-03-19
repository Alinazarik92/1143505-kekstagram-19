'use strict';

(function () {
  var imageUpload = document.querySelector('.img-upload__overlay');
  var imageUploadOpen = document.querySelector('.img-upload__input');
  var imageUploadClose = imageUpload.querySelector('.img-upload__cancel');
  var form = document.querySelector('.img-upload__form');

  var onImageUploadEscPress = function (evt) {
    window.preview.isEscPress(evt, onImageUploadClose);
  };

  var onImageUploadCloseEnterPress = function (evt) {
    window.preview.isEnterPress(evt, onImageUploadClose);
  };

  var checkInputFocus = function () {
    window.validation.hashtag.addEventListener('focus', function () {
      document.removeEventListener('keydown', onImageUploadEscPress);
    });
    window.validation.description.addEventListener('focus', function () {
      document.removeEventListener('keydown', onImageUploadEscPress);
    });
    window.validation.hashtag.addEventListener('blur', function () {
      document.addEventListener('keydown', onImageUploadEscPress);
    });
    window.validation.description.addEventListener('blur', function () {
      document.addEventListener('keydown', onImageUploadEscPress);
    });
  };

  var showSuccessMessage = function (element) {
    window.form.closeImageUpload();
    window.load.openMessage(element);
  };

  var showErrorMessage = function (element, error) {
    window.form.closeImageUpload();
    window.load.openMessage(element, error);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.upload.sendData(new FormData(form), showSuccessMessage, showErrorMessage);
  };

  var onImageUploadClose = function () {
    imageUpload.classList.add('hidden');
    imageUploadOpen.value = '';
    window.scale.turnOffChange();
    window.effect.turnOffChange();

    imageUploadClose.removeEventListener('click', onImageUploadClose);
    imageUploadClose.removeEventListener('keydown', onImageUploadCloseEnterPress);
    document.removeEventListener('keydown', onImageUploadEscPress);

    form.removeEventListener('submit', onFormSubmit);
  };

  var onImageUpload = function () {
    imageUpload.classList.remove('hidden');
    checkInputFocus();
    window.scale.turnOnChange();
    window.effect.turnOnChange();

    imageUploadClose.addEventListener('click', onImageUploadClose);
    imageUploadClose.addEventListener('keydown', onImageUploadCloseEnterPress);
    document.addEventListener('keydown', onImageUploadEscPress);

    form.addEventListener('submit', onFormSubmit);
  };

  imageUploadOpen.addEventListener('change', onImageUpload);

  window.form = {
    closeImageUpload: onImageUploadClose
  };
})();