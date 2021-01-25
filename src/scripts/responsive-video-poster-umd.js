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

  function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  /**
    Responsive poster image for videos
  
    @param {string || element} selector - Container element selector.
    @param {string} overlaySelector - Overlay element selector.
    @param {string} posterSelector - Poster element selector.
    @param {string} videoSelector - Video element selector.
    @param {string} animClass - CSS class to transition the video overlay between states.
    @param {string} inactiveClass - CSS class to hide the video overlay.
    @param {integer(ms) || 'transition'} playDelay - Delay playing the video by set time or wait for the overlay transition to finish.
    @param {boolean} hideControlsOnLoad - Hide video controls while transitioning overlay.
    @param {array} preConnections - Domains to pre-connect to for loading an embedded video.
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
        _ref$playDelay = _ref.playDelay,
        playDelay = _ref$playDelay === void 0 ? 0 : _ref$playDelay,
        _ref$hideControlsOnLo = _ref.hideControlsOnLoad,
        hideControlsOnLoad = _ref$hideControlsOnLo === void 0 ? true : _ref$hideControlsOnLo,
        _ref$preConnections = _ref.preConnections,
        preConnections = _ref$preConnections === void 0 ? [] : _ref$preConnections;

    var element;
    var overlay;
    var poster;
    var video;
    var videoControls; // Utilities

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
        bubbles: true,
        detail: eventDetail
      });
      element.dispatchEvent(event);
    };

    var addPrefetch = function addPrefetch(kind, url) {
      var linkElement = document.createElement('link');
      linkElement.rel = kind;
      linkElement.href = url;
      document.head.append(linkElement);
    };

    var warmConnections = function warmConnections() {
      var _iterator = _createForOfIteratorHelper(preConnections),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          var connectionExists = document.querySelector("link[rel=\"preconnect\"][href=\"".concat(item, "\"]"));
          if (!connectionExists) addPrefetch('preconnect', item);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }; // Methods


    var playVideo = function playVideo() {
      fireEvent(element, 'playVideo', {
        action: 'start'
      });
      var transitionDuration = getTransitionDuration(overlay);
      if (playDelay === 'transition') playDelay = transitionDuration;
      overlay.classList.add(animClass);
      video.setAttribute('aria-hidden', false);
      video.setAttribute('tabindex', 0);
      video.focus();

      if (video.nodeName === 'VIDEO') {
        video.setAttribute('preload', 'auto');
        setTimeout(function () {
          video.play();
          if (videoControls && hideControlsOnLoad) video.setAttribute('controls', '');
        }, playDelay);
      } else {
        if (video.getAttribute('srcdoc') === '') video.removeAttribute('srcdoc');
        var videoSrc = video.getAttribute('src');
        video.setAttribute('src', '');
        setTimeout(function () {
          video.setAttribute('src', "".concat(addParameterToURL(videoSrc, 'autoplay=1')));
        }, playDelay);
      }

      setTimeout(function () {
        fireEvent(element, 'playVideo', {
          action: 'end'
        });
        overlay.classList.remove(animClass);
        overlay.classList.add(inactiveClass);
        overlay.style.display = 'none';
      }, transitionDuration);
    };

    var addEventListeners = function addEventListeners(targetSelector, targetElement) {
      document.addEventListener('click', function (event) {
        if (event.target.closest(targetSelector) !== targetElement) return;
        event.preventDefault();
        playVideo();
      });
      targetElement.addEventListener('pointerover', function (event) {
        warmConnections();
      }, {
        once: true
      });
    };

    var setup = function setup() {
      overlay = element.querySelector(overlaySelector);
      video = element.querySelector(videoSelector);
      poster = element.querySelector(posterSelector);
      if (overlay === null || video === null) return;
      video.setAttribute('aria-hidden', true);
      video.setAttribute('tabindex', -1);

      if (hideControlsOnLoad) {
        videoControls = video.getAttribute('controls') === '';
        if (videoControls) video.removeAttribute('controls');
      }

      addEventListeners(overlaySelector, overlay);
    };

    var init = function init() {
      element = typeof selector === 'string' ? document.querySelector(selector) : selector;
      if (element === null) return;
      setup();
    };

    init(); // API

    return {
      playVideo: playVideo,
      elements: {
        element: element,
        overlay: overlay,
        poster: poster,
        video: video
      }
    };
  };

  var _default = ResponsiveVideoPoster;
  _exports["default"] = _default;
});