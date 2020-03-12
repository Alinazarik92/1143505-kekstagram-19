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
    } else {
      scaleValue = scaleValue + STEP;
      return scaleValue;
    }
  };

  var getScaleValueSmaller = function () {
    if (scaleValue === SCALE_VALUE_MIN) {
      return scaleValue;
    } else {
      scaleValue = scaleValue - STEP;
      return scaleValue;
    }
  };

  scaleControlReduce.addEventListener('click', function () {
    scaleControlValue.value = getScaleValueSmaller() + '%';
    imageUploadPreview.style = 'transform: scale(' + (scaleValue / 100) + ')';
  });

  scaleControlEnlarge.addEventListener('click', function () {
    scaleControlValue.value = getScaleValueBigger() + '%';
    imageUploadPreview.style = 'transform: scale(' + (scaleValue / 100) + ')';
  });

  window.scale = {
    SCALE_VALUE: SCALE_VALUE,
    scaleValue: scaleValue,
    scaleControlValue: scaleControlValue,
    imageUploadPreview: imageUploadPreview
  };
})();
