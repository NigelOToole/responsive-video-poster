// Use an img or picture element as the poster image for a video since the poster does not support src-set. This allows you to specify multiple image sizes which is better for performance. It adds an stylable overlay to the image which starts the video.

/**
  Responsive images for Video posters

  @param {Object} object - Container for all options.
    @param {string} selector - Container element selector.
    @param {string} overlaySelector - Overlay element used to hide poster and show video when clicked.
    @param {string} posterSelector - Image element to be used as the poster.
    @param {string} videoSelector - The video element.
    @param {string} hideClass - CSS class used to hide poster and overlay.
*/

const ResponsiveVideoPoster = function({
  selector: selector = '.responsive-video-poster',
  overlaySelector: overlaySelector = '.poster-overlay',
  posterSelector: posterSelector = '.poster',
  videoSelector: videoSelector = '.video',
  animClass: animClass = 'is-anim',
  inactiveClass: inactiveClass = 'is-inactive',
  embedPreload: embedPreload = 500,
	} = {}) {

  // Options
  const elements = document.querySelectorAll(selector);



	// Utils
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
  
  const fireEvent = (item, eventName, eventDetail) => {
    const event = new CustomEvent(eventName, {
      bubbles: false,
      detail: eventDetail,
    });

    item.dispatchEvent(event);
  };



  // Click handler
  const clickHandler = function(event, overlay, video, videoControls) {
    event.preventDefault();
    
    let transitionDuration = getTransitionDuration(overlay);
    let embedTransitionDuration = (transitionDuration <= embedPreload) ? 0 : transitionDuration - embedPreload;
    let videoType = (video.nodeName === 'VIDEO') ? 'video' : 'embed';

		overlay.classList.add(animClass);

    video.setAttribute('aria-hidden', false);
    video.setAttribute('tabindex', 0);
    video.focus();

    if(videoType === 'video') {
      video.setAttribute('preload', 'auto');

      setTimeout(() => {
        video.play();
        if(videoControls) video.setAttribute('controls', '');
      }, transitionDuration);
    }
    else {
      setTimeout(() => {
        if (video.getAttribute('srcdoc') === '') video.removeAttribute('srcdoc');
        video.setAttribute('src', `${addParameterToURL(video.getAttribute('src'), 'autoplay=1')}`);
      }, embedTransitionDuration);
    }

		setTimeout(() => {
			overlay.classList.remove(animClass);
			overlay.classList.add(inactiveClass);
      overlay.style.display = 'none';
		}, transitionDuration);
    
  }


  // Init
  const init = function() {
    
    elements.forEach(function(item) {
      let overlay = item.querySelector(overlaySelector);
      let video = item.querySelector(videoSelector);
      if(overlay === null || video === null) return;

      video.setAttribute('aria-hidden', true);
      video.setAttribute('tabindex', -1);

      let videoControls = (video.getAttribute('controls') === '');
      if(videoControls) video.removeAttribute('controls');

      // console.log(video.getAttribute('srcdoc') !== null);

      overlay.addEventListener('click', (event) => clickHandler(event, overlay, video, videoControls));
    });
    
  };



  // Self initiate
  if (elements.length) {
		init();
	};

  // Reveal API
  return {
    init
  };

};

export default ResponsiveVideoPoster;
