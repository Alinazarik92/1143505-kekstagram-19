'use strict';

(function () {
  var effectsConfiguration = {
    chrome: {min: 0, max: 1},
    sepia: {min: 0, max: 1},
    marvin: {min: 0, max: 100},
    phobos: {min: 0, max: 3},
    heat: {min: 1, max: 3},
  };
  var imageUpload = document.querySelector('.img-upload__overlay');
  var imageUploadPreview = imageUpload.querySelector('.img-upload__preview');
  var imagePreview = imageUploadPreview.querySelector('img');
  var effectLevel = imageUpload.querySelector('.img-upload__effect-level');
  var effectsList = imageUpload.querySelectorAll('.effects__radio');
  var effectNoneInput = imageUpload.querySelector('#effect-none');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

  var getEffectValue = function () {
    var pinX = effectLevelPin.offsetLeft;
    var lineWidth = effectLevelLine.offsetWidth;
    var effectValue = Math.floor(pinX / lineWidth * 100);
    return effectValue;
  };

  var getFilterValue = function (min, max) {
    return min + (((max - min) * getEffectValue()) / 100);
  };

  var classNameToFilter = {
    'effects__preview--none': function () {
      return 'filter: none';
    },
    'effects__preview--chrome': function () {
      return 'filter: grayscale(' + getFilterValue(effectsConfiguration.chrome.min, effectsConfiguration.chrome.max) + ')';
    },
    'effects__preview--sepia': function () {
      return 'filter: sepia(' + getFilterValue(effectsConfiguration.sepia.min, effectsConfiguration.sepia.max) + ')';
    },
    'effects__preview--marvin': function () {
      return 'filter: invert(' + getFilterValue(effectsConfiguration.marvin.min, effectsConfiguration.marvin.max) + '%)';
    },
    'effects__preview--phobos': function () {
      return 'filter: blur(' + getFilterValue(effectsConfiguration.phobos.min, effectsConfiguration.phobos.max) + 'px)';
    },
    'effects__preview--heat': function () {
      return 'filter: brightness(' + getFilterValue(effectsConfiguration.heat.min, effectsConfiguration.heat.max) + ')';
    }
  };

  var chooseFilter = function () {
    imagePreview.style = classNameToFilter[imagePreview.className] && classNameToFilter[imagePreview.className]();
  };

  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();

    var startX = downEvt.clientX;
    var startPinX = effectLevelPin.offsetLeft;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startX - moveEvt.clientX;
      startX = moveEvt.clientX;
      startPinX = effectLevelPin.offsetLeft - shiftX;

      if (startPinX <= 0) {
        effectLevelPin.style.left = 0 + 'px';
        effectLevelDepth.style.width = 0 + 'px';
        effectLevelValue.value = 0;
        effectLevelValue.setAttribute('value', 0);
      } else if (startPinX >= effectLevelLine.offsetWidth) {
        effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
        effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
        effectLevelValue.setAttribute('value', 100);
        effectLevelValue.value = 100;
      } else {
        effectLevelPin.style.left = startPinX + 'px';
        effectLevelDepth.style.width = startPinX + 'px';
        var value = Math.floor(startPinX / effectLevelLine.offsetWidth * 100);
        effectLevelValue.setAttribute('value', value);
        effectLevelValue.value = value;
      }

      chooseFilter();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onEffectChange = function (evt) {
    var activeEffect = evt.target;
    effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
    effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
    var effectName = 'effects__preview--' + activeEffect.value;
    imagePreview.classList.remove(imagePreview.className);
    imagePreview.classList.add(effectName);
    effectLevelPin.addEventListener('mousedown', onMouseDown);
    chooseFilter();

    if (activeEffect.value === 'none') {
      effectLevelPin.removeEventListener('mousedown', onMouseDown);
      effectLevel.classList.add('hidden');
    } else if (effectLevel.classList.contains('hidden')) {
      effectLevel.classList.remove('hidden');
      effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
      effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
      chooseFilter();
    }
  };

  var resetEffect = function () {
    effectLevel.classList.add('hidden');
    if (imagePreview.className.trim() === '') {
      imagePreview.classList.add('effects__preview--none');
    }
    if (!imagePreview.classList.contains('effects__preview--none')) {
      imagePreview.classList.remove(imagePreview.className);
      imagePreview.classList.add('effects__preview--none');
    }
    chooseFilter();
    effectNoneInput.checked = true;
  };

  var turnOnEffectChange = function () {
    resetEffect();
    effectsList.forEach(function (effect) {
      effect.addEventListener('click', onEffectChange);
    });
  };

  var turnOffEffectChange = function () {
    resetEffect();
    effectsList.forEach(function (effect) {
      effect.removeEventListener('click', onEffectChange);
    });
  };

  window.effect = {
    reset: resetEffect,
    turnOnChange: turnOnEffectChange,
    turnOffChange: turnOffEffectChange
  };
})();
