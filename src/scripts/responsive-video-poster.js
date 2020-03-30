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

const ResponsiveVideoPoster = function({
  selector: selector = '.responsive-video-poster',
  overlaySelector: overlaySelector = '.poster-overlay',
  posterSrcSelector: posterSrcSelector = '.poster-src',
  videoSrcSelector: videoSrcSelector = '.video-src',
  animClass: animClass = 'is-anim',
  inactiveClass: inactiveClass = 'is-inactive',
	} = {}) {

  // Options
  const elements = document.querySelectorAll(selector);
  let videoControls;



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
		overlay.classList.add(animClass);

    video.setAttribute('aria-hidden', false);
    video.setAttribute('tabindex', 0);
    video.focus();

    console.log(video.nodeName);

		setTimeout(() => {
			overlay.classList.remove(animClass);
			overlay.classList.add(inactiveClass);
      overlay.style.display = 'none';

      if(video.nodeName === 'VIDEO') {
        video.play();
        if(videoControls) video.setAttribute('controls', '');
      }
      else {
        // video.setAttribute('src', `${video.getAttribute('src')}?autoplay=1`);
        video.setAttribute('src', `${addParameterToURL(video.getAttribute('src'), 'autoplay=1')}`);

        
      }
      
		}, transitionDuration);
    
  }


  // Init
  const init = function() {
    
    elements.forEach(function(item) {
      let overlay = item.querySelector(overlaySelector);
      let video = item.querySelector(videoSrcSelector);
      if(overlay === null || video === null) return;

      video.setAttribute('aria-hidden', true);
      video.setAttribute('tabindex', -1);

      let videoControls = (video.getAttribute('controls') === '') ? true : false;
      if(videoControls) video.removeAttribute('controls');

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
