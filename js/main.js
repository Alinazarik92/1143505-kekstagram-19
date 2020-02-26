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

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var bigPictureImage = bigPicture.querySelector('.big-picture__img');
bigPictureImage.querySelector('img').src = photos[0].url;
bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
if (photos[0].comments.length === 1) {
  bigPicture.querySelector('.social__comment-count').textContent = photos[0].comments.length + ' комментарий';
  bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
}
if (photos[0].comments.length >= 2 && photos[0].comments.length <= 4) {
  bigPicture.querySelector('.social__comment-count').textContent = photos[0].comments.length + ' комментария';
  bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
}
if (photos[0].comments.length === 5) {
  bigPicture.querySelector('.social__comment-count').textContent = photos[0].comments.length + ' комментариев';
  bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
}
if (photos[0].comments.length > 5) {
  bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
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

if (photos[0].comments.length > 5) {
  for (i = 0; i < 5; i++) {
    renderComment(photos[0].comments[i]);
  }
} else {
  photos[0].comments.forEach(function (comment) {
    renderComment(comment);
  });
}
commentList.appendChild(fragment);

document.querySelector('body').classList.add('modal-open');
