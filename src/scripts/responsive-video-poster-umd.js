(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.responsiveVideoPoster = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  // Use an img or picture element as the poster image for a video since the poster does not support src-set. This allows you to specify multiple image sizes which is better for performance. It adds an stylable overlay to the image which starts the video.

  /**
    Responsive images for Video posters
  
    @param {Object} object - Container for all options.
      @param {string} selector - Container element selector.
      @param {string} overlaySelector - Overlay element used to hide poster and show video when clicked.
      @param {string} posterSrcSelector - Image element to be used as the poster.
      @param {string} videoSrcSelector - The video element.
      @param {string} hideClass - CSS class used to hide poster and overlay.
  */
  var ResponsiveVideoPoster = function ResponsiveVideoPoster() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? '.responsive-video-poster' : _ref$selector,
        _ref$overlaySelector = _ref.overlaySelector,
        overlaySelector = _ref$overlaySelector === void 0 ? '.poster-overlay' : _ref$overlaySelector,
        _ref$posterSrcSelecto = _ref.posterSrcSelector,
        posterSrcSelector = _ref$posterSrcSelecto === void 0 ? '.poster-src' : _ref$posterSrcSelecto,
        _ref$videoSrcSelector = _ref.videoSrcSelector,
        videoSrcSelector = _ref$videoSrcSelector === void 0 ? '.video-src' : _ref$videoSrcSelector,
        _ref$hideClass = _ref.hideClass,
        hideClass = _ref$hideClass === void 0 ? 'd-none' : _ref$hideClass;

    // Options
    var elements = document.querySelectorAll(selector); // Utils

    var getTransitionDuration = function getTransitionDuration(element) {
      var transitionDuration = getComputedStyle(element)['transitionDuration'];
      var transitionDurationNumber = parseFloat(transitionDuration);
      transitionDuration = transitionDuration.indexOf('ms') > -1 ? transitionDurationNumber : transitionDurationNumber * 1000;
      return transitionDuration;
    };

    var fireEvent = function fireEvent(item, eventName, eventDetail) {
      var event = new CustomEvent(eventName, {
        bubbles: false,
        detail: eventDetail
      });
      item.dispatchEvent(event);
    }; // Click handler


    var clickHandler = function clickHandler(event, overlay, poster, video) {
      event.preventDefault();
      poster.classList.add(hideClass);
      overlay.classList.add(hideClass);
      video.setAttribute('aria-hidden', false);
      video.setAttribute('tabindex', 0);
      video.focus();
      video.play();
    }; // Init


    var init = function init() {
      elements.forEach(function (item) {
        var overlay = item.querySelector(overlaySelector);
        var poster = item.querySelector(posterSrcSelector);
        var video = item.querySelector(videoSrcSelector);
        if (overlay === null || poster === null || video === null) return;
        video.setAttribute('aria-hidden', true);
        video.setAttribute('tabindex', -1);
        overlay.addEventListener('click', function (event) {
          return clickHandler(event, overlay, poster, video);
        });
      });
    }; // Self initiate


    if (elements.length) {
      init();
    }

    ; // Reveal API

    return {
      init: init
    };
  };

  var _default = ResponsiveVideoPoster;
  _exports["default"] = _default;
});