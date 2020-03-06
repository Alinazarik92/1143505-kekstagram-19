'use strict';

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Иван', 'Ира', 'Галя', 'Толя', 'Милана', 'Оливия', 'Крис', 'Кемаль', 'Якоб', 'Джоанна', 'Вера', 'Айсылу'];

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
};

var getRandomElement = function (min, arr) {
  var randomI = Math.floor(Math.random() * (arr.length - min)) + min;
  var randomElement = arr[randomI];

  return randomElement;
};

var getCommentsList = function () {
  var randomComments = [];
  for (var i = 0; i < getRandomNumber(1, 18); i++) {
    randomComments[i] = {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getRandomElement(0, MESSAGES),
      name: getRandomElement(0, NAMES)
    };
  }
  return randomComments;
};

var photos = [];

for (var i = 0; i < 25; i++) {
  photos[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    description: '',
    likes: getRandomNumber(15, 200),
    comments: getCommentsList()
  };
}

var pictureContainerElement = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var fragment = document.createDocumentFragment();

photos.forEach(function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  fragment.appendChild(pictureElement);
});
pictureContainerElement.appendChild(fragment);

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var openPopup = function (popup) {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      popup.classList.add('hidden');
    }
  });
};

var closePopup = function (popup) {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      popup.classList.add('hidden');
    }
  });
};

var bigPicture = document.querySelector('.big-picture');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

bigPicture.classList.remove('hidden');
document.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_KEY) {
    bigPicture.classList.add('hidden');
  }
});
document.querySelector('body').classList.add('modal-open');

bigPictureClose.addEventListener('click', function () {
  closePopup(bigPicture);
  document.querySelector('body').classList.remove('modal-open');
});

bigPictureClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup(bigPicture);
    document.querySelector('body').classList.remove('modal-open');
  }
});

var bigPictureImage = bigPicture.querySelector('.big-picture__img');
bigPictureImage.querySelector('img').src = photos[0].url;
bigPicture.querySelector('.likes-count').textContent = photos[0].likes;

var SHOWN_COMMENT_COUNT = 5;

var getCommentTitle = function (arr) {
  var commentTitle = '';
  if (arr.length === 1) {
    commentTitle = ' комментарий';
  }
  if (arr.length >= 2 && arr.length <= 4) {
    commentTitle = ' комментария';
  }
  if (arr.length === 5) {
    commentTitle = ' комментариев';
  }
  return commentTitle;
};

if (photos[0].comments.length > SHOWN_COMMENT_COUNT) {
  bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
} else {
  bigPicture.querySelector('.social__comment-count').textContent = photos[0].comments.length + getCommentTitle(photos[0].comments);
  bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
}

var renderComment = function (comment) {
  var socialComment = document.createElement('li');
  socialComment.classList.add('social__comment');
  var socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  socialPicture.width = 35;
  socialPicture.height = 35;
  socialComment.appendChild(socialPicture);
  var socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = comment.message;
  socialComment.appendChild(socialText);

  fragment.appendChild(socialComment);
};

var commentList = bigPicture.querySelector('.social__comments');

if (photos[0].comments.length > SHOWN_COMMENT_COUNT) {
  for (i = 0; i < SHOWN_COMMENT_COUNT; i++) {
    renderComment(photos[0].comments[i]);
  }
} else {
  photos[0].comments.forEach(renderComment);
}
commentList.appendChild(fragment);

var imageUpload = document.querySelector('.img-upload__overlay');
var imageUploadOpen = document.querySelector('.img-upload__input');
var imageUploadClose = imageUpload.querySelector('.img-upload__cancel');

imageUploadOpen.addEventListener('change', function () {
  openPopup(imageUpload);
  effectLevel.classList.add('hidden');
});

imageUploadClose.addEventListener('click', function () {
  closePopup(imageUpload);
  imageUploadOpen.value = '';
});
imageUploadClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup(imageUpload);
    imageUploadOpen.value = '';
  }
});

var scaleControlValue = imageUpload.querySelector('.scale__control--value');
var scaleControlReduce = imageUpload.querySelector('.scale__control--smaller');
var scaleControlEnlarge = imageUpload.querySelector('.scale__control--bigger');
var imageUploadPreview = imageUpload.querySelector('.img-upload__preview');
var imagePreview = imageUploadPreview.querySelector('img');
var SCALE_VALUE = 100;
var SCALE_VALUE_MIN = 0;
var SCALE_VALUE_MAX = 100;
var STEP = 25;
var scaleValue = SCALE_VALUE;

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

scaleControlValue.value = scaleValue + '%';

scaleControlReduce.addEventListener('click', function () {
  scaleControlValue.value = getScaleValueSmaller() + '%';
  imageUploadPreview.style = 'transform: scale(' + (scaleValue / 100) + ')';
});

scaleControlEnlarge.addEventListener('click', function () {
  scaleControlValue.value = getScaleValueBigger() + '%';
  imageUploadPreview.style = 'transform: scale(' + (scaleValue / 100) + ')';
});

var effectsList = imageUpload.querySelectorAll('.effects__radio');
var effectLevel = imageUpload.querySelector('.img-upload__effect-level');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');

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

var effects = {
  CHROME: {MIN: 0, MAX: 1},
  SEPIA: {MIN: 0, MAX: 1},
  MARVIN: {MIN: 0, MAX: 100},
  PHOBOS: {MIN: 0, MAX: 3},
  HEAT: {MIN: 1, MAX: 3},
};

var chooseFilter = function () {
  effectLevelValue.value = getEffectValue();
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
  if (imagePreview.className === '') {
    imagePreview.classList.add(effectName);
    chooseFilter();
    effectLevelPin.addEventListener('mouseup', chooseFilter);
  } else {
    imagePreview.classList.remove(imagePreview.className);
    imagePreview.classList.add(effectName);
    chooseFilter();
    effectLevelPin.addEventListener('mouseup', chooseFilter);
  }
  if (activeEffect.value === 'none') {
    effectLevelPin.removeEventListener('mouseup', chooseFilter);
    effectLevel.classList.add('hidden');
  } else {
    if (effectLevel.classList.contains('hidden')) {
      effectLevel.classList.remove('hidden');
    }
  }
};

effectsList.forEach(function (effect) {
  effect.addEventListener('click', changeEffect);
});

// var hashtag = imageUpload.querySelector('.text__hashtags');
// var description = imageUpload.querySelector('.text__description');
//
// description.addEventListener('invalid', function (evt) {
//   if (description.validity.tooLong) {
//     description.setCustomValidity('Комментарий не должен превышать 140 символов');
//   }
// });
//
// description.addEventListener('input', function (evt) {
//   document.removeEventListener('keydown', function (evt) {
//     if (evt.key === ESC_KEY) {
//       popup.classList.add('hidden');
//     }
//   });
// });
