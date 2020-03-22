'use strict';

(function () {
  var SHOWN_COMMENT_COUNT = 5;
  var START_VALUE = 0;
  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImageContainer = bigPicture.querySelector('.big-picture__img');
  var bigPictureImage = bigPictureImageContainer.querySelector('img');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var shownComment = bigPicture.querySelector('.shown-comments');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentList = bigPicture.querySelector('.social__comments');
  var comments = commentList.querySelectorAll('.social__comment');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var loadNextCommentsButton = bigPicture.querySelector('.social__comments-loader');
  var fragment = document.createDocumentFragment();
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
    body.classList.remove('modal-open');

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

    var targetImg = target.querySelector('img');
    var targetLikesCount = target.querySelector('.picture__likes');

    body.classList.add('modal-open');
    bigPictureImage.src = targetImg.src;
    bigPictureImage.alt = targetImg.alt;
    bigPictureDescription.textContent = targetImg.alt;
    likesCount.textContent = targetLikesCount.textContent;
    bigPicture.classList.remove('hidden');

    document.addEventListener('keydown', onBigPIctureEscPress);
    bigPictureClose.addEventListener('keydown', onBigPictureCloseEnterPress);
    bigPictureClose.addEventListener('click', onBigPictureClose);
    commentList.innerHTML = '';

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
      shownComment.textContent = shownCommentsCount;
    } else {
      photo.comments.forEach(renderComment);
      commentList.appendChild(fragment);
    }

    commentList.appendChild(fragment);

    if (comments.length >= photo.comments.length) {
      loadNextCommentsButton.classList.add('hidden');
    } else {
      loadNextCommentsButton.classList.remove('hidden');
    }

    if (photo.comments.length > shownCommentsCount) {
      commentsCount.textContent = photo.comments.length;
    } else {
      shownCommentsCount = photo.comments.length;
      shownComment.textContent = shownCommentsCount;
      loadNextCommentsButton.classList.add('hidden');
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
