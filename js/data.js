'use strict';

(function () {
  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES = ['Иван', 'Ира', 'Галя', 'Толя', 'Милана', 'Оливия', 'Крис', 'Кемаль', 'Якоб', 'Джоанна', 'Вера', 'Айсылу'];
  var photos = [];

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

  for (var i = 0; i < 25; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: '',
      likes: getRandomNumber(15, 200),
      comments: getCommentsList()
    };
  }

  window.data = {
    photos: photos
  };
})();
