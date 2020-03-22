'use strict';

(function () {
  var SHOWN_COMMENT_COUNT = 5;
  var START_VALUE = 0;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img');
  var commentList = bigPicture.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  var loadNextCommentsButton = document.querySelector('.social__comments-loader');
  var lastShownIndex = START_VALUE;
  var shownCommentsCount = START_VALUE;
  var photo;

  var onBigPIctureEscPress = function (evt) {
    window.util.isEscPress(evt, onBigPictureClose);
  };

  var onBigPictureOpenEnterPress = function (evt) {
    window.util.isEnterPress(evt, onBigPictureOpen);
  };

  var onBigPictureCloseEnterPress = function (evt) {
    window.util.isEnterPress(evt, onBigPictureClose);
  };

  var onBigPictureClose = function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', onBigPIctureEscPress);
    bigPictureClose.removeEventListener('keydown', onBigPictureCloseEnterPress);
    bigPictureClose.removeEventListener('click', onBigPictureClose);
    loadNextCommentsButton.addEventListener('click', addComment);
    lastShownIndex = START_VALUE;
    shownCommentsCount = START_VALUE;
    photo = undefined;
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
    bigPicture.querySelector('.social__caption').textContent = target.querySelector('img').alt;
    bigPicture.querySelector('.likes-count').textContent = target.querySelector('.picture__likes').textContent;
    bigPicture.classList.remove('hidden');

    document.addEventListener('keydown', onBigPIctureEscPress);
    bigPictureClose.addEventListener('keydown', onBigPictureCloseEnterPress);
    bigPictureClose.addEventListener('click', onBigPictureClose);
    commentList.innerHTML = '';
    // bigPicture.querySelector('.social__comment-count').classList.remove('hidden');

    photo = window.message.getPhotos().find(function (item) {
      return item.url === target.getAttribute('original-url');
    });

    renderAllComments();
  };

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

    fragment.appendChild(socialComment);
  };

  var addComment = function () {
    if (photo.comments.length > SHOWN_COMMENT_COUNT) {
      for (var i = 0; i < SHOWN_COMMENT_COUNT && (lastShownIndex + i) < photo.comments.length; i++) {
        renderComment(photo.comments[lastShownIndex + i]);
        commentList.appendChild(fragment);
      }
      lastShownIndex += i;
      shownCommentsCount += SHOWN_COMMENT_COUNT;
      bigPicture.querySelector('.shown-comments').textContent = shownCommentsCount;
    } else {
      photo.comments.forEach(renderComment);
      commentList.appendChild(fragment);
    }

    commentList.appendChild(fragment);

    if (commentList.querySelectorAll('.social__comment').length >= photo.comments.length) {
      loadNextCommentsButton.classList.add('hidden');
    } else {
      loadNextCommentsButton.classList.remove('hidden');
    }

    if (photo.comments.length > shownCommentsCount) {
      bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    } else {
      shownCommentsCount = photo.comments.length;
      bigPicture.querySelector('.shown-comments').textContent = shownCommentsCount;
      bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
    }
  };

  var renderAllComments = function () {
    addComment(photo);

    loadNextCommentsButton.addEventListener('click', addComment);
  };

  window.preview = {
    onBigPictureOpen: onBigPictureOpen,
    onBigPictureOpenEnterPress: onBigPictureOpenEnterPress
  };
})();
