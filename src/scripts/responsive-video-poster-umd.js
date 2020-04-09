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
        _ref$animClass = _ref.animClass,
        animClass = _ref$animClass === void 0 ? 'is-anim' : _ref$animClass,
        _ref$inactiveClass = _ref.inactiveClass,
        inactiveClass = _ref$inactiveClass === void 0 ? 'is-inactive' : _ref$inactiveClass;

    // Options
    var elements = document.querySelectorAll(selector);
    var videoControls; // Utils

    var getTransitionDuration = function getTransitionDuration(element) {
      var transitionDuration = getComputedStyle(element)['transitionDuration'];
      var transitionDurationNumber = parseFloat(transitionDuration);
      transitionDuration = transitionDuration.indexOf('ms') > -1 ? transitionDurationNumber : transitionDurationNumber * 1000;
      return transitionDuration;
    };

    var addParameterToURL = function addParameterToURL(url, param) {
      url += (url.split('?')[1] ? '&' : '?') + param;
      return url;
    };

    var fireEvent = function fireEvent(item, eventName, eventDetail) {
      var event = new CustomEvent(eventName, {
        bubbles: false,
        detail: eventDetail
      });
      item.dispatchEvent(event);
    }; // Click handler


    var clickHandler = function clickHandler(event, overlay, video, videoControls) {
      event.preventDefault();
      var transitionDuration = getTransitionDuration(overlay);
      overlay.classList.add(animClass);
      video.setAttribute('aria-hidden', false);
      video.setAttribute('tabindex', 0);
      video.focus();
      console.log(video.nodeName);
      setTimeout(function () {
        overlay.classList.remove(animClass);
        overlay.classList.add(inactiveClass);
        overlay.style.display = 'none';

        if (video.nodeName === 'VIDEO') {
          video.play();
          if (videoControls) video.setAttribute('controls', '');
        } else {
          // video.setAttribute('src', `${video.getAttribute('src')}?autoplay=1`);
          video.setAttribute('src', "".concat(addParameterToURL(video.getAttribute('src'), 'autoplay=1')));
        }
      }, transitionDuration);
    }; // Init


    var init = function init() {
      elements.forEach(function (item) {
        var overlay = item.querySelector(overlaySelector);
        var video = item.querySelector(videoSrcSelector);
        if (overlay === null || video === null) return;
        video.setAttribute('aria-hidden', true);
        video.setAttribute('tabindex', -1);
        var videoControls = video.getAttribute('controls') === '' ? true : false;
        if (videoControls) video.removeAttribute('controls');
        overlay.addEventListener('click', function (event) {
          return clickHandler(event, overlay, video, videoControls);
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