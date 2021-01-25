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

const ResponsiveVideoPoster = function(
  {
    selector = '.responsive-video-poster',
    overlaySelector = '.video-overlay',
    posterSelector = '.poster',
    videoSelector = '.video',
    animClass = 'is-anim',
    inactiveClass = 'is-inactive',
    playDelay = 0,
    hideControlsOnLoad = true,
    preConnections = []
	} = {}) {

  let element;
  let overlay;
  let poster;
  let video;
  let videoControls;



	// Utilities
	const getTransitionDuration = function (element) {
		let transitionDuration = getComputedStyle(element)['transitionDuration'];
		let transitionDurationNumber = parseFloat(transitionDuration);
		transitionDuration = transitionDuration.indexOf('ms')>-1 ? transitionDurationNumber : transitionDurationNumber*1000;
		return transitionDuration;
	};

  const addParameterToURL = function(url, param){
    url += (url.split('?')[1] ? '&':'?') + param;
    return url;
  };
  
  const fireEvent = (element, eventName, eventDetail) => {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail: eventDetail,
    });

    element.dispatchEvent(event);
  };

  const addPrefetch = function(kind, url) {
    const linkElement = document.createElement('link');
    linkElement.rel = kind;
    linkElement.href = url;
    document.head.append(linkElement);
  }

  const warmConnections = function() {
    for (const item of preConnections) {
      let connectionExists = document.querySelector(`link[rel="preconnect"][href="${item}"]`);
      if(!connectionExists) addPrefetch('preconnect', item);
    }  
  }



  // Methods
  const playVideo = function() {
    fireEvent(element, 'playVideo', { action: 'start' });
    
    let transitionDuration = getTransitionDuration(overlay);
    if (playDelay === 'transition') playDelay = transitionDuration;

		overlay.classList.add(animClass);
    video.setAttribute('aria-hidden', false);
    video.setAttribute('tabindex', 0);
    video.focus();

    if(video.nodeName === 'VIDEO') {
      video.setAttribute('preload', 'auto');

      setTimeout(() => {
        video.play();
        if(videoControls && hideControlsOnLoad) video.setAttribute('controls', '');
      }, playDelay);
    }
    else {
      if (video.getAttribute('srcdoc') === '') video.removeAttribute('srcdoc');

      let videoSrc = video.getAttribute('src');
      video.setAttribute('src', '');

      setTimeout(() => {
        video.setAttribute('src', `${addParameterToURL(videoSrc, 'autoplay=1')}`);
      }, playDelay);
    }

		setTimeout(() => {
      fireEvent(element, 'playVideo', { action: 'end' });

			overlay.classList.remove(animClass);
			overlay.classList.add(inactiveClass);
      overlay.style.display = 'none';
		}, transitionDuration);
    
  };


  const addEventListeners = function(targetSelector, targetElement) {
    document.addEventListener('click', function(event) {
      if(event.target.closest(targetSelector) !== targetElement) return;

      event.preventDefault();
      playVideo();
    });

    targetElement.addEventListener('pointerover', function(event) {
      warmConnections();
    }, { once: true });   
  };


  const setup = function() {
    overlay = element.querySelector(overlaySelector);
    video = element.querySelector(videoSelector);
    poster = element.querySelector(posterSelector);
    if(overlay === null || video === null) return;

    video.setAttribute('aria-hidden', true);
    video.setAttribute('tabindex', -1);

    if(hideControlsOnLoad) {
      videoControls = (video.getAttribute('controls') === '');
      if(videoControls) video.removeAttribute('controls');
    }

    addEventListeners(overlaySelector, overlay);
  };


  const init = function() {   
    element = (typeof selector === 'string') ? document.querySelector(selector) : selector;
    if (element === null) return;

    setup();
  };

	init();



  // API
  return {
    playVideo,
    elements: {
      element,
      overlay,
      poster,
      video
    }
  };

};

export default ResponsiveVideoPoster;
