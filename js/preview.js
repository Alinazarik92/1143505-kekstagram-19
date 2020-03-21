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

  var setVariableValue = function (variable, value) {
    variable = value;
  };
  var getVariableValue = function (variable) {
    return variable;
  };

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
    setVariableValue(lastShownIndex, START_VALUE);
    setVariableValue(shownCommentsCount, START_VALUE);
    bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
    renderAllComments(target.getAttribute('original-url'));
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
    commentList.appendChild(fragment);
  };

  var addComment = function (photo) {
    if (photo.comments.length > SHOWN_COMMENT_COUNT) {
      for (var i = 0; i < SHOWN_COMMENT_COUNT && (getVariableValue(lastShownIndex) + i) < photo.comments.length; i++) {
        renderComment(photo.comments[getVariableValue(lastShownIndex) + i]);
      }
      setVariableValue(lastShownIndex, (lastShownIndex += i));
      setVariableValue(shownCommentsCount, (shownCommentsCount += SHOWN_COMMENT_COUNT));
      bigPicture.querySelector('.shown-comments').textContent = shownCommentsCount;
    } else {
      photo.comments.forEach(renderComment);
    }

    commentList.appendChild(fragment);

    if (commentList.querySelectorAll('.social__comment').length >= photo.comments.length) {
      loadNextCommentsButton.classList.add('hidden');
    } else {
      loadNextCommentsButton.classList.remove('hidden');
    }

    if (photo.comments.length > getVariableValue(shownCommentsCount)) {
      bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    } else {
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
    }
  };

  var renderAllComments = function (photoUrl) {
    var photoItem = window.message.getPhotos().find(function (item) {
      return item.url === photoUrl;
    });

    addComment(photoItem);
    loadNextCommentsButton.addEventListener('click', function () {
      addComment(photoItem);
    });
  };

  window.preview = {
    onBigPictureOpen: onBigPictureOpen,
    onBigPictureOpenEnterPress: onBigPictureOpenEnterPress
  };
})();
