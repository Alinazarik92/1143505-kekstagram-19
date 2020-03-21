'use strict';

(function () {
  var Effect = {
    CHROME: {MIN: 0, MAX: 1},
    SEPIA: {MIN: 0, MAX: 1},
    MARVIN: {MIN: 0, MAX: 100},
    PHOBOS: {MIN: 0, MAX: 3},
    HEAT: {MIN: 1, MAX: 3},
  };
  var imageUpload = document.querySelector('.img-upload__overlay');
  var imageUploadPreview = imageUpload.querySelector('.img-upload__preview');
  var imagePreview = imageUploadPreview.querySelector('img');
  var effectLevel = imageUpload.querySelector('.img-upload__effect-level');
  var effectsList = imageUpload.querySelectorAll('.effects__radio');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

  var getEffectValue = function () {
    var pinX = effectLevelPin.offsetLeft;
    var lineWidth = effectLevelLine.offsetWidth;
    var pinWidth = effectLevelPin.offsetWidth;
    var effectValue = Math.floor((pinX + (pinWidth / 2)) / lineWidth * 100);
    return effectValue;
  };

  var getFilterValue = function (min, max) {
    var effectDepthValue = min + (((max - min) * getEffectValue()) / 100);
    return effectDepthValue;
  };


  // var classNameToFilter = {
  //   'effects__preview--none': 'filter: none',
  //   'effects__preview--chrome': 'filter: grayscale(' + getFilterValue(Effect.CHROME.MIN, Effect.CHROME.MAX) + ')',
  //   'effects__preview--sepia': 'filter: sepia(' + getFilterValue(Effect.SEPIA.MIN, Effect.SEPIA.MAX) + ')',
  //   'effects__preview--marvin': 'filter: invert(' + getFilterValue(Effect.MARVIN.MIN, Effect.MARVIN.MAX) + '%)',
  //   'effects__preview--phobos': 'filter: blur(' + getFilterValue(Effect.PHOBOS.MIN, Effect.PHOBOS.MAX) + 'px)',
  //   'effects__preview--heat': 'filter: brightness(' + getFilterValue(Effect.HEAT.MIN, Effect.HEAT.MAX) + ')'
  // };
  var chooseFilter = function () {
    // imagePreview.style = classNameToFilter[imagePreview.className];
    if (imagePreview.className === 'effects__preview--none') {
      imagePreview.style = 'filter: none';
    }
    if (imagePreview.className === 'effects__preview--chrome') {
      imagePreview.style = 'filter: grayscale(' + getFilterValue(Effect.CHROME.MIN, Effect.CHROME.MAX) + ')';
    }
    if (imagePreview.className === 'effects__preview--sepia') {
      imagePreview.style = 'filter: sepia(' + getFilterValue(Effect.SEPIA.MIN, Effect.SEPIA.MAX) + ')';
    }
    if (imagePreview.className === 'effects__preview--marvin') {
      imagePreview.style = 'filter: invert(' + getFilterValue(Effect.MARVIN.MIN, Effect.MARVIN.MAX) + '%)';
    }
    if (imagePreview.className === 'effects__preview--phobos') {
      imagePreview.style = 'filter: blur(' + getFilterValue(Effect.PHOBOS.MIN, Effect.PHOBOS.MAX) + 'px)';
    }
    if (imagePreview.className === 'effects__preview--heat') {
      imagePreview.style = 'filter: brightness(' + getFilterValue(Effect.HEAT.MIN, Effect.HEAT.MAX) + ')';
    }
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
    chooseFilter();
    effectLevelPin.addEventListener('mousedown', onMouseDown);

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
    if (imagePreview.className !== 'effects__preview--none') {
      if (imagePreview.className === '') {
        imagePreview.classList.add('effects__preview--none');
        chooseFilter();
      }
      imagePreview.classList.remove(imagePreview.className);
      imagePreview.classList.add('effects__preview--none');
      chooseFilter();
    }
  };

  var turnOnEffectChange = function () {
    resetEffect();
    effectsList.forEach(function (effect) {
      effect.addEventListener('click', onEffectChange);
    });
  };

  var turnOffEffectChange = function () {
    effectsList.forEach(function (effect) {
      effect.addEventListener('click', onEffectChange);
    });
  };

  window.effect = {
    reset: resetEffect,
    turnOnChange: turnOnEffectChange,
    turnOffChange: turnOffEffectChange
  };
})();
