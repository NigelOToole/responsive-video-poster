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
      @param {string} overlaySelector - Overlay element containing the responsive image and the play button.
      @param {string} videoSelector - Video element.
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
        _ref$videoSelector = _ref.videoSelector,
        videoSelector = _ref$videoSelector === void 0 ? '.video' : _ref$videoSelector,
        _ref$animClass = _ref.animClass,
        animClass = _ref$animClass === void 0 ? 'is-anim' : _ref$animClass,
        _ref$inactiveClass = _ref.inactiveClass,
        inactiveClass = _ref$inactiveClass === void 0 ? 'is-inactive' : _ref$inactiveClass,
        _ref$embedPreload = _ref.embedPreload,
        embedPreload = _ref$embedPreload === void 0 ? 500 : _ref$embedPreload;

    // Options
    // const elements = document.querySelectorAll(selector);
    var instance;
    var overlay;
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
    };

    var clickHandler = function clickHandler(event) {
      event.preventDefault();
      playVideo();
    };

    var playVideo = function playVideo() {
      fireEvent(instance, 'playVideo', {
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
        fireEvent(instance, 'playVideo', {
          action: 'end'
        });
        overlay.classList.remove(animClass);
        overlay.classList.add(inactiveClass);
        overlay.style.display = 'none';
      }, transitionDuration);
    }; // Setup properties of the instance


    var setup = function setup() {
      overlay = instance.querySelector(overlaySelector);
      video = instance.querySelector(videoSelector);
      if (overlay === null || video === null) return;
      video.setAttribute('aria-hidden', true);
      video.setAttribute('tabindex', -1);
      videoControls = video.getAttribute('controls') === '';
      if (videoControls) video.removeAttribute('controls');
      overlay.addEventListener('click', function (event) {
        return clickHandler(event);
      });
    }; // Init


    var init = function init() {
      // Attempt to loop elements to init but it does'nt retain state
      // if(typeof selector === 'string') {
      //   let elements = document.querySelectorAll(selector);
      //   if(elements.length) {
      //     for (const item of elements) {
      //       console.log(item);
      //       instance = item;
      //       ResponsiveVideoPoster({ selector: item });
      //     }
      //   }
      //   else {
      //     return;
      //   }
      // }
      instance = typeof selector === 'string' ? document.querySelector(selector) : selector;
      if (instance === null) return;
      setup();
    }; // Self initiate


    init(); // Reveal API

    return {
      init: init,
      playVideo: playVideo
    };
  };

  var _default = ResponsiveVideoPoster;
  _exports["default"] = _default;
});