'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  // var SHOWN_COMMENT_COUNT = 5;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img');
  // var commentList = bigPicture.querySelector('.social__comments');
  // var fragment = document.createDocumentFragment();

  var isEscPress = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };
  var isEnterPress = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var onBigPIctureEscPress = function (evt) {
    isEscPress(evt, onBigPictureClose);
  };

  var onBigPictureOpenEnterPress = function (evt) {
    isEnterPress(evt, onBigPictureOpen);
  };

  var onBigPictureCloseEnterPress = function (evt) {
    isEnterPress(evt, onBigPictureClose);
  };

  var onBigPictureClose = function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', onBigPIctureEscPress);
    bigPictureClose.removeEventListener('keydown', onBigPictureCloseEnterPress);
    bigPictureClose.removeEventListener('click', onBigPictureClose);
  };

  var onBigPictureOpen = function (evt) {
    if (!evt) {
      return;
    }

    var target = evt.target.closest('a');
    if (target === null) {
      return;
    }

    document.querySelector('body').classList.add('modal-open');
    bigPictureImage.querySelector('img').src = target.querySelector('img').src;
    bigPictureImage.querySelector('img').alt = target.querySelector('img').alt;
    bigPicture.querySelector('.likes-count').textContent = target.querySelector('.picture__likes').textContent;
    bigPicture.classList.remove('hidden');

    document.addEventListener('keydown', onBigPIctureEscPress);
    bigPictureClose.addEventListener('keydown', onBigPictureCloseEnterPress);
    bigPictureClose.addEventListener('click', onBigPictureClose);
  };

  // var getCommentTitle = function (arr) {
  //   var commentTitle = '';
  //   if (arr.length === 1) {
  //     commentTitle = ' комментарий';
  //   }
  //   if (arr.length >= 2 && arr.length <= 4) {
  //     commentTitle = ' комментария';
  //   }
  //   if (arr.length === 5) {
  //     commentTitle = ' комментариев';
  //   }
  //   return commentTitle;
  // };
  //
  // var renderComment = function (comment) {
  //   var socialComment = document.createElement('li');
  //   var socialPicture = document.createElement('img');
  //   var socialText = document.createElement('p');
  //
  //   socialComment.classList.add('social__comment');
  //   socialPicture.classList.add('social__picture');
  //   socialPicture.src = comment.avatar;
  //   socialPicture.alt = comment.name;
  //   socialPicture.width = 35;
  //   socialPicture.height = 35;
  //   socialComment.appendChild(socialPicture);
  //   socialText.classList.add('social__text');
  //   socialText.textContent = comment.message;
  //   socialComment.appendChild(socialText);
  //
  //   fragment.appendChild(socialComment);
  // };

  // var addComment = function (photos) {
  //   photos.forEach(function (photo) {
  //     if (photo.comments.length > SHOWN_COMMENT_COUNT) {
  //       bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  //     } else {
  //       bigPicture.querySelector('.social__comment-count').textContent = photo.comments.length + getCommentTitle(photo.comments);
  //       bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
  //     }
  //
  //     if (photo.comments.length > SHOWN_COMMENT_COUNT) {
  //       for (var i = 0; i < SHOWN_COMMENT_COUNT; i++) {
  //         renderComment(photo.comments[i]);
  //       }
  //     } else {
  //       photo.comments.forEach(renderComment);
  //     }
  //
  //     commentList.appendChild(fragment);
  //   };
  // };

  window.preview = {
    isEscPress: isEscPress,
    isEnterPress: isEnterPress,
    onBigPictureOpen: onBigPictureOpen,
    onBigPictureOpenEnterPress: onBigPictureOpenEnterPress
  };
})();
