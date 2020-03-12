'use strict';

(function () {
  var imageUpload = document.querySelector('.img-upload__overlay');
  var imagePreview = window.scale.imageUploadPreview.querySelector('img');
  var effectLevel = imageUpload.querySelector('.img-upload__effect-level');
  var effectsList = imageUpload.querySelectorAll('.effects__radio');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effects = {
    CHROME: {MIN: 0, MAX: 1},
    SEPIA: {MIN: 0, MAX: 1},
    MARVIN: {MIN: 0, MAX: 100},
    PHOBOS: {MIN: 0, MAX: 3},
    HEAT: {MIN: 1, MAX: 3},
  };

  var getEffectValue = function () {
    var lineWidth = effectLevelLine.offsetWidth;
    var pinX = effectLevelPin.offsetLeft;
    var effectValue = Math.floor(pinX / lineWidth * 100);
    return effectValue;
  };

  var getFilterValue = function (min, max) {
    var effectDepthValue = min + (((max - min) * getEffectValue()) / 100);
    return effectDepthValue;
  };

  var chooseFilter = function () {
    effectLevelValue.value = getEffectValue();
    if (imagePreview.className === 'effects__preview--none') {
      imagePreview.style = 'filter: none';
    }
    if (imagePreview.className === 'effects__preview--chrome') {
      imagePreview.style = 'filter: grayscale(' + getFilterValue(effects.CHROME.MIN, effects.CHROME.MAX) + ')';
    }
    if (imagePreview.className === 'effects__preview--sepia') {
      imagePreview.style = 'filter: sepia(' + getFilterValue(effects.SEPIA.MIN, effects.SEPIA.MAX) + ')';
    }
    if (imagePreview.className === 'effects__preview--marvin') {
      imagePreview.style = 'filter: invert(' + getFilterValue(effects.MARVIN.MIN, effects.MARVIN.MAX) + '%)';
    }
    if (imagePreview.className === 'effects__preview--phobos') {
      imagePreview.style = 'filter: blur(' + getFilterValue(effects.PHOBOS.MIN, effects.PHOBOS.MAX) + 'px)';
    }
    if (imagePreview.className === 'effects__preview--heat') {
      imagePreview.style = 'filter: brightness(' + getFilterValue(effects.HEAT.MIN, effects.HEAT.MAX) + ')';
    }
    effectLevelPin.style = 'left: ' + getEffectValue() + '%';
    effectLevelDepth.style = 'width: ' + getEffectValue() + '%';
  };

  var changeEffect = function (evt) {
    var activeEffect = evt.target;
    var effectName = 'effects__preview--' + activeEffect.value;
    imagePreview.classList.remove(imagePreview.className);
    imagePreview.classList.add(effectName);
    chooseFilter();
    effectLevelPin.addEventListener('mouseup', chooseFilter);

    if (activeEffect.value === 'none') {
      effectLevelPin.removeEventListener('mouseup', chooseFilter);
      effectLevel.classList.add('hidden');
    } else if (effectLevel.classList.contains('hidden')) {
      effectLevel.classList.remove('hidden');
      chooseFilter();
    }
  };

  effectsList.forEach(function (effect) {
    effect.addEventListener('click', changeEffect);
  });

  window.effect = {
    imagePreview: imagePreview,
    effectLevel: effectLevel,
    isFilterSelection: function () {
      chooseFilter();
    }
  };
})();
