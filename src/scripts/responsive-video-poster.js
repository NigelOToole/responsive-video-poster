// Use an img or picture element as the poster image for a video since the poster does not support src-set. This allows you to specify multiple image sizes which is better for performance. It adds an stylable overlay to the image which starts the video.

/**
  Responsive images for Video posters

  @param {Object} object - Container for all options.
    @param {string} selector - Container element selector.
    @param {string} overlaySelector - Overlay element containing the responsive image and the play button.
    @param {string} posterSelector - Image element to be used as the poster.
    @param {string} videoSelector - Video element.
    @param {string} animClass - CSS class to transition the video overlay between states.
    @param {string} inactiveClass - CSS class to hide the video overlay.
    @param {integer} embedPreload - Amount of time given to preload an embedded video.
*/

const ResponsiveVideoPoster = function({
  selector: selector = '.responsive-video-poster',
  overlaySelector: overlaySelector = '.video-overlay',
  posterSelector: posterSelector = '.poster',
  videoSelector: videoSelector = '.video',
  animClass: animClass = 'is-anim',
  inactiveClass: inactiveClass = 'is-inactive',
  embedPreload: embedPreload = 500,
	} = {}) {

  // Options
  // const elements = document.querySelectorAll(selector);
  let instance;
  let overlay;
  let video;
  let videoControls;


	// Utils
	const getTransitionDuration = function (element) {
    console.log('transition element ' + element);
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
  const clickHandler = function(event) {
    event.preventDefault();
    playVideo();
  }  
  

  // const playVideo = function(element) {
  const playVideo = function() {
    
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


  // Setup properties of the instance
  const setup = function() {
    console.log('setup ' + instance);

    overlay = instance.querySelector(overlaySelector);
    video = instance.querySelector(videoSelector);
    if(overlay === null || video === null) return;

    console.log(overlay, video);

    video.setAttribute('aria-hidden', true);
    video.setAttribute('tabindex', -1);

    videoControls = (video.getAttribute('controls') === '');
    if(videoControls) video.removeAttribute('controls');

    // overlay.addEventListener('click', (event) => clickHandler(event, overlay, video, videoControls));

    // overlay.addEventListener('click', (event) => clickHandler(event, item));
    overlay.addEventListener('click', (event) => clickHandler(event));
    
  };


  // Init
  const init = function() {    
    
    // Attempt to loop elements to init but it does'nt retain state

    // if(typeof selector === 'string') {
    //   let elements = document.querySelectorAll(selector);

    //   if(elements.length) {

    //     for (const item of elements) {
    //       console.log(item);
    //       // console.log(item.constructor.name);
    //       instance = item;
    //       ResponsiveVideoPoster({ selector: item });
    //     }

    //   }
    //   else {
    //     console.log('first return');
    //     return;
    //   }

    // }


    // instance = document.querySelector(selector);
    // if (instance === null) return;
    // console.log(instance.constructor.name);
    // setup();



    instance = (typeof selector === 'string') ? document.querySelector(selector) : selector;
    if (instance === null) return;
    setup();

  };



  // Self initiate
	init();


  // Reveal API
  return {
    init,
    playVideo
  };

};

export default ResponsiveVideoPoster;
