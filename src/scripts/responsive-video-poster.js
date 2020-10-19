/**
  Responsive poster image for videos

  @param {string} selector - Container element selector.
  @param {string} overlaySelector - Overlay element selector.
  @param {string} posterSelector - Poster element selector.
  @param {string} videoSelector - Video element selector.
  @param {string} animClass - CSS class to transition the video overlay between states.
  @param {string} inactiveClass - CSS class to hide the video overlay.
  @param {integer} embedPreload - Amount of time given to preload an embedded video.
  @param {boolean} hideControls - Hide video controls while transitioning overlay.
*/

const ResponsiveVideoPoster = function(
  {
    selector = '.responsive-video-poster',
    overlaySelector = '.video-overlay',
    posterSelector = '.poster',
    videoSelector = '.video',
    animClass = 'is-anim',
    inactiveClass = 'is-inactive',
    embedPreload = 500,
    hideControls = false
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



  // Methods
  const playVideo = function() {
    fireEvent(element, 'playVideo', { action: 'start' });
    
    let transitionDuration = getTransitionDuration(overlay);
    let embedTransitionDuration = (transitionDuration <= embedPreload) ? 0 : transitionDuration - embedPreload;
    if (embedTransitionDuration < 50) embedTransitionDuration = 50;

		overlay.classList.add(animClass);
    video.setAttribute('aria-hidden', false);
    video.setAttribute('tabindex', 0);
    video.focus();

    if(video.nodeName === 'VIDEO') {
      video.setAttribute('preload', 'auto');

      setTimeout(() => {
        video.play();
        if(videoControls && hideControls) video.setAttribute('controls', '');
      }, transitionDuration);
    }
    else {
      let videoSrc = video.getAttribute('src');
      video.setAttribute('src', '');

      if (video.getAttribute('srcdoc') === '') video.removeAttribute('srcdoc');

      setTimeout(() => {
        video.setAttribute('src', `${addParameterToURL(videoSrc, 'autoplay=1')}`);
      }, embedTransitionDuration);
    }

		setTimeout(() => {
      fireEvent(element, 'playVideo', { action: 'end' });

			overlay.classList.remove(animClass);
			overlay.classList.add(inactiveClass);
      overlay.style.display = 'none';
		}, transitionDuration);
    
  };


  const addDocumentEventListener = function(targetSelector, targetElement) {
    document.addEventListener('click', function(event) {

      let target = (event.target.closest(targetSelector) === targetElement);
      if (!target) return;

      event.preventDefault();
      playVideo();
    });
  };


  const setup = function() {
    overlay = element.querySelector(overlaySelector);
    video = element.querySelector(videoSelector);
    poster = element.querySelector(posterSelector);
    if(overlay === null || video === null) return;

    video.setAttribute('aria-hidden', true);
    video.setAttribute('tabindex', -1);

    if(hideControls) {
      videoControls = (video.getAttribute('controls') === '');
      if(videoControls) video.removeAttribute('controls');
    }

    addDocumentEventListener(overlaySelector, overlay);
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
