'use strict';

(function () {
  var Key = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };

  var isEscPress = function (evt, action) {
    if (evt.key === Key.ESC) {
      action();
    }
  };
  var isEnterPress = function (evt, action) {
    if (evt.key === Key.ENTER) {
      action();
    }
  };
  window.util = {
    isEscPress: isEscPress,
    isEnterPress: isEnterPress
  };
})();
