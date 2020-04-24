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

  /**
    Responsive images for Video posters
  
    @param {Object} object - Container for all options.
      @param {string} selector - Container element selector.
      @param {string} overlaySelector - Overlay element selector.
      @param {string} posterSelector - Poster element selector.
      @param {string} videoSelector - Video element selector.
      @param {string} animClass - CSS class to transition the video overlay between states.
      @param {string} inactiveClass - CSS class to hide the video overlay.
      @param {integer} embedPreload - Amount of time given to preload an embedded video.
  */
  var ResponsiveVideoPoster = function ResponsiveVideoPoster() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? '.responsive-video-poster' : _ref$selector,
        _ref$overlaySelector = _ref.overlaySelector,
        overlaySelector = _ref$overlaySelector === void 0 ? '.video-overlay' : _ref$overlaySelector,
        _ref$posterSelector = _ref.posterSelector,
        posterSelector = _ref$posterSelector === void 0 ? '.poster' : _ref$posterSelector,
        _ref$videoSelector = _ref.videoSelector,
        videoSelector = _ref$videoSelector === void 0 ? '.video' : _ref$videoSelector,
        _ref$animClass = _ref.animClass,
        animClass = _ref$animClass === void 0 ? 'is-anim' : _ref$animClass,
        _ref$inactiveClass = _ref.inactiveClass,
        inactiveClass = _ref$inactiveClass === void 0 ? 'is-inactive' : _ref$inactiveClass,
        _ref$embedPreload = _ref.embedPreload,
        embedPreload = _ref$embedPreload === void 0 ? 500 : _ref$embedPreload;

    // Options
    var element;
    var overlay;
    var poster;
    var video;
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

    var fireEvent = function fireEvent(element, eventName, eventDetail) {
      var event = new CustomEvent(eventName, {
        bubbles: false,
        detail: eventDetail
      });
      element.dispatchEvent(event);
    }; // Methods


    var clickHandler = function clickHandler(event) {
      event.preventDefault();
      playVideo();
    };

    var playVideo = function playVideo() {
      fireEvent(element, 'playVideo', {
        action: 'start'
      });
      var transitionDuration = getTransitionDuration(overlay);
      var embedTransitionDuration = transitionDuration <= embedPreload ? 0 : transitionDuration - embedPreload;
      var videoType = video.nodeName === 'VIDEO' ? 'video' : 'embed';
      overlay.classList.add(animClass);
      video.setAttribute('aria-hidden', false);
      video.setAttribute('tabindex', 0);
      video.focus();

      if (videoType === 'video') {
        video.setAttribute('preload', 'auto');
        setTimeout(function () {
          video.play();
          if (videoControls) video.setAttribute('controls', '');
        }, transitionDuration);
      } else {
        setTimeout(function () {
          if (video.getAttribute('srcdoc') === '') video.removeAttribute('srcdoc');
          video.setAttribute('src', "".concat(addParameterToURL(video.getAttribute('src'), 'autoplay=1')));
        }, embedTransitionDuration);
      }

      setTimeout(function () {
        fireEvent(element, 'playVideo', {
          action: 'end'
        });
        overlay.classList.remove(animClass);
        overlay.classList.add(inactiveClass);
        overlay.style.display = 'none';
      }, transitionDuration);
    }; // Setup properties of the element


    var setup = function setup() {
      overlay = element.querySelector(overlaySelector);
      video = element.querySelector(videoSelector);
      poster = element.querySelector(posterSelector);
      if (overlay === null || video === null) return;
      video.setAttribute('aria-hidden', true);
      video.setAttribute('tabindex', -1); // Video controls are hidden so the transition between the poster and video is seamless

      videoControls = video.getAttribute('controls') === '';
      if (videoControls) video.removeAttribute('controls');
      overlay.addEventListener('click', function (event) {
        return clickHandler(event);
      });
    }; // Init


    var init = function init() {
      element = typeof selector === 'string' ? document.querySelector(selector) : selector;
      if (element === null) return;
      setup();
    }; // Self initiate


    init();

    var getInfo = function getInfo() {
      return {
        element: element,
        overlay: overlay,
        poster: poster,
        video: video
      };
    }; // Reveal API


    return {
      init: init,
      playVideo: playVideo,
      getInfo: getInfo
    };
  };

  var _default = ResponsiveVideoPoster;
  _exports["default"] = _default;
});