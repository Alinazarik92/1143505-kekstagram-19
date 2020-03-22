'use strict';

(function () {
  var imageUpload = document.querySelector('.img-upload__overlay');
  var imageUploadOpen = document.querySelector('.img-upload__input');
  var imageUploadClose = imageUpload.querySelector('.img-upload__cancel');
  var form = document.querySelector('.img-upload__form');
  var picturesBlock = document.querySelector('.pictures');

  var onImageUploadEscPress = function (evt) {
    window.util.isEscPress(evt, onImageUploadClose);
  };

  var onImageUploadCloseEnterPress = function (evt) {
    window.util.isEnterPress(evt, onImageUploadClose);
  };

  var onEscPressListenerAdd = function () {
    document.addEventListener('keydown', onImageUploadEscPress);
  };

  var onEscPressListenerRemove = function () {
    document.removeEventListener('keydown', onImageUploadEscPress);
  };

  var setFormEventListeners = function () {
    window.validation.hashtag.addEventListener('focus', onEscPressListenerRemove);
    window.validation.description.addEventListener('focus', onEscPressListenerRemove);
    window.validation.hashtag.addEventListener('blur', onEscPressListenerAdd);
    window.validation.description.addEventListener('blur', onEscPressListenerAdd);
  };

  var removeFormEventListeners = function () {
    window.validation.hashtag.removeEventListener('focus', onEscPressListenerRemove);
    window.validation.description.removeEventListener('focus', onEscPressListenerRemove);
    window.validation.hashtag.removeEventListener('blur', onEscPressListenerAdd);
    window.validation.description.removeEventListener('blur', onEscPressListenerAdd);
  };


  var showSuccessMessage = function (element) {
    onImageUploadClose();
    window.message.open(element);
  };

  var showErrorMessage = function (element, error) {
    onImageUploadClose();
    window.message.open(element, error);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.load.sendData(new FormData(form), showSuccessMessage, showErrorMessage);
  };

  var onImageUploadClose = function () {
    imageUpload.classList.add('hidden');
    removeFormEventListeners();
    imageUploadOpen.value = '';
    window.scale.turnOffChange();
    window.effect.turnOffChange();
    window.validation.turnOffCheck();

    imageUploadClose.removeEventListener('click', onImageUploadClose);
    imageUploadClose.removeEventListener('keydown', onImageUploadCloseEnterPress);
    document.removeEventListener('keydown', onImageUploadEscPress);

    form.removeEventListener('submit', onFormSubmit);

    picturesBlock.addEventListener('click', window.preview.onBigPictureOpen);
    picturesBlock.addEventListener('keydown', window.preview.onBigPictureOpenEnterPress);
  };

  var onImageUpload = function () {
    imageUpload.classList.remove('hidden');
    setFormEventListeners();
    window.scale.turnOnChange();
    window.effect.turnOnChange();
    window.validation.turnOnCheck();

    picturesBlock.removeEventListener('click', window.preview.onBigPictureOpen);
    picturesBlock.removeEventListener('keydown', window.preview.onBigPictureOpenEnterPress);

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
