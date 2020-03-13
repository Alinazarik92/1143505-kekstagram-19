'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var SHOWN_COMMENT_COUNT = 5;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img');
  var commentList = bigPicture.querySelector('.social__comments');

  var pressEscBigPIcture = function (evt) {
    if (evt.key === ESC_KEY) {
      bigPicture.classList.add('hidden');
    }
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', pressEscBigPIcture);
    document.querySelector('body').classList.add('modal-open');
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', pressEscBigPIcture);
    document.querySelector('body').classList.remove('modal-open');
  };

  bigPictureClose.addEventListener('click', function () {
    closeBigPicture();
  });

  bigPictureClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closeBigPicture();
    }
  });

  window.picture.pictureContainerElement.addEventListener('click', function (evt) {
    var target = evt.target.closest('a');
    if (target === null) {
      return;
    }
    bigPictureImage.querySelector('img').src = target.querySelector('img').src;
    bigPictureImage.querySelector('img').alt = target.querySelector('img').alt;
    bigPicture.querySelector('.likes-count').textContent = target.querySelector('.picture__likes').textContent;
    openBigPicture();
  });

  window.picture.pictureContainerElement.addEventListener('keydown', function (evt) {
    var target = evt.target.closest('a');
    if (evt.key === ENTER_KEY) {
      if (target === null) {
        return;
      }
      bigPictureImage.querySelector('img').src = target.querySelector('img').src;
      bigPictureImage.querySelector('img').alt = target.querySelector('img').alt;
      bigPicture.querySelector('.likes-count').textContent = target.querySelector('.picture__likes').textContent;
      openBigPicture();
    }
  });

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

  if (window.data.photos[0].comments.length > SHOWN_COMMENT_COUNT) {
    bigPicture.querySelector('.comments-count').textContent = window.data.photos[0].comments.length;
  } else {
    bigPicture.querySelector('.social__comment-count').textContent = window.data.photos[0].comments.length + getCommentTitle(window.data.photos[0].comments);
    bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
  }

  var renderComment = function (comment) {
    var socialComment = document.createElement('li');
    var socialPicture = document.createElement('img');
    var socialText = document.createElement('p');

    socialComment.classList.add('social__comment');
    socialPicture.classList.add('social__picture');
    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    socialPicture.width = 35;
    socialPicture.height = 35;
    socialComment.appendChild(socialPicture);
    socialText.classList.add('social__text');
    socialText.textContent = comment.message;
    socialComment.appendChild(socialText);

    window.picture.fragment.appendChild(socialComment);
  };

  if (window.data.photos[0].comments.length > SHOWN_COMMENT_COUNT) {
    for (var i = 0; i < SHOWN_COMMENT_COUNT; i++) {
      renderComment(window.data.photos[0].comments[i]);
    }
  } else {
    window.data.photos[0].comments.forEach(renderComment);
  }

  commentList.appendChild(window.picture.fragment);

  window.preview = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY
  };
})();
