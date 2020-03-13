'use strict';

(function () {
  var pictureContainerElement = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var fragment = document.createDocumentFragment();

  window.data.photos.forEach(function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    fragment.appendChild(pictureElement);
  });
  pictureContainerElement.appendChild(fragment);

  window.picture = {
    pictureContainerElement: pictureContainerElement,
    fragment: fragment
  };
})();
