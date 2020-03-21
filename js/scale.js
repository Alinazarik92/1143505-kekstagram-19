'use strict';

(function () {
  var SCALE_VALUE_MIN = 0;
  var SCALE_VALUE_MAX = 100;
  var STEP = 25;
  var SCALE_VALUE = 100;
  var scaleValue = SCALE_VALUE;
  var imageUpload = document.querySelector('.img-upload__overlay');
  var imageUploadPreview = imageUpload.querySelector('.img-upload__preview');
  var scaleControlValue = imageUpload.querySelector('.scale__control--value');
  var scaleControlReduce = imageUpload.querySelector('.scale__control--smaller');
  var scaleControlEnlarge = imageUpload.querySelector('.scale__control--bigger');

  var getScaleValueBigger = function () {
    if (scaleValue === SCALE_VALUE_MAX) {
      return scaleValue;
    }
    scaleValue += STEP;
    return scaleValue;
  };

  var getScaleValueSmaller = function () {
    if (scaleValue === SCALE_VALUE_MIN) {
      return scaleValue;
    }
    scaleValue -= STEP;
    return scaleValue;
  };

  var resizeImage = function () {
    var value = scaleValue + '%';
    scaleControlValue.value = value;
    scaleControlValue.setAttribute('value', value);
    imageUploadPreview.style = 'transform: scale(' + (scaleValue / 100) + ')';
  };

  var onImageSmallerButtonPress = function () {
    getScaleValueSmaller();
    resizeImage();
  };

  var onImageBiggerButtonPress = function () {
    getScaleValueBigger();
    resizeImage();
  };

  var resetScale = function () {
    scaleValue = SCALE_VALUE;
    resizeImage();
  };

  var turnOnScaleChange = function () {
    resetScale();
    scaleControlReduce.addEventListener('click', onImageSmallerButtonPress);
    scaleControlEnlarge.addEventListener('click', onImageBiggerButtonPress);
  };

  var turnOffScaleChange = function () {
    scaleControlReduce.removeEventListener('click', onImageSmallerButtonPress);
    scaleControlEnlarge.removeEventListener('click', onImageBiggerButtonPress);
  };

  window.scale = {
    turnOnChange: turnOnScaleChange,
    turnOffChange: turnOffScaleChange
  };
})();
