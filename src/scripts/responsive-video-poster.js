/**
  Responsive poster image for videos

  @param {string || element} selector - Container element selector.
  @param {string} placeholderSelector - Placeholder element selector.
  @param {string} posterSelector - Poster element selector.
  @param {string} videoSelector - Video element selector.
  @param {string} animClass - CSS class to transition the video placeholder between states.
  @param {string} activeClass - CSS class when placeholder is transitioned and the video is playing.
  @param {'transition' || integer(ms)} playDelay - Delay playing the video until the placeholder transition has finished or by a set time.
  @param {integer(ms)} playDelayOffset - Reduces playDelay to start loading the video before the placeholder has finished transitioning.
  @param {boolean} hideControlsOnLoad - Hide video controls while transitioning placeholder.
  @param {boolean} hideControlsOnFirstPlay - Hide video controls on first video play.
  @param {array} preConnections - Domains to preconnect to for loading an embed. Youtube and Vimeo are automaticlly preconnected.
*/


const ResponsiveVideoPoster = function(args) {

  const defaults = {
    selector: '.responsive-video-poster',
    placeholderSelector: '.rvp-placeholder',
    posterSelector: '.rvp-poster',
    videoSelector: '.rvp-video',
    animClass: 'is-anim',
    activeClass: 'is-active',
    playDelay: 'transition',
    playDelayOffset: 0,
    hideControlsOnLoad: true,
    hideControlsOnFirstPlay: false,
    preConnections: [],
  }

  let options = {...defaults, ...args};

  let element;
  let placeholder;
  let poster;
  let video;

  let hasControls;
  let playDelayAdjusted;
  let preConnectionSites = ['https://www.youtube.com', 'https://www.youtube-nocookie.com', 'https://player.vimeo.com'];


  // Utilities
  const fireEvent = (element, eventName, eventDetail) => {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail: eventDetail,
    });

    element.dispatchEvent(event);
  };

  const checkBoolean = function (string) {
	  if (string.toLowerCase() === 'true') return true;
	  if (string.toLowerCase() === 'false') return false;
		return string;
  };
	
  const getTransitionDuration = function (element) {
		let transitionDuration = getComputedStyle(element)['transitionDuration'];
		let animationDuration = getComputedStyle(element)['animationDuration'];
		
		let transitionDurationNumber = parseFloat(transitionDuration);
		let animationDurationNumber = parseFloat(animationDuration);

		let duration = animationDurationNumber > 0 ? animationDuration : transitionDuration;
		let durationNumber = animationDurationNumber > 0 ? animationDurationNumber : transitionDurationNumber;

		duration = duration.includes('ms') ? durationNumber : durationNumber*1000;
		return duration;
	};

  const addPrefetch = function(kind, url) {
    let connectionExists = document.querySelector(`link[rel="${kind}"][href="${url}"]`);
    if (connectionExists) return;

    const linkElement = document.createElement('link');
    linkElement.rel = kind;
    linkElement.href = url;
    document.head.append(linkElement);
  };

  const warmConnections = function() {
    let videoSrc = video.getAttribute('src');

    for (const item of options.preConnections) {
      addPrefetch('preconnect', item);
    } 

    for (const item of preConnectionSites) {
      if (videoSrc.includes(item)) addPrefetch('preconnect', item);
    }
  };



  // Methods
  const playVideo = function() {
    fireEvent(element, 'playVideo', { action: 'start' });

    let playStart;

		element.classList.add(options.animClass);
    video.setAttribute('aria-hidden', false);
    video.setAttribute('tabindex', 0);
    video.focus();

    if (video.nodeName === 'VIDEO') {
      video.setAttribute('preload', 'auto');

      playStart = () => {
        video.play();
        
        if (hasControls && options.hideControlsOnLoad && video.duration !== NaN) {
          let controlsDelay = options.hideControlsOnFirstPlay ? video.duration * 1000 : 0;

          setTimeout(() => {
            video.setAttribute('controls', '');
          }, controlsDelay);
        } 
      };
    }
    else {
      if (video.getAttribute('srcdoc') === '') video.removeAttribute('srcdoc');
      if (video.getAttribute('allow') === null) video.setAttribute('allow', 'autoplay;');
      if (!video.getAttribute('allow').includes('autoplay')) video.setAttribute('allow', `autoplay; ${video.getAttribute('allow')}`);

      let videoSrc = video.getAttribute('src');
      video.setAttribute('src', '');

      playStart = () => {
        let videoURL = new URL(videoSrc);
        videoURL.searchParams.append('autoplay', 1);    
        video.setAttribute('src', videoURL.href);
      };
    }

		setTimeout(() => {
      playStart();
      fireEvent(element, 'playVideo', { action: 'end' });
		}, playDelayAdjusted);

		setTimeout(() => {
			element.classList.remove(options.animClass);
			element.classList.add(options.activeClass);
      placeholder.style.display = 'none';
		}, options.playDelay);
  };


  const addEventListeners = function() {
    placeholder.addEventListener('pointerover', (event) => {
      warmConnections();
    }, { once: true });   

    placeholder.addEventListener('click', (event) => {
      event.preventDefault();
      playVideo();
    });
  };


  const setup = function() {

    let datasetOptions = {...element.dataset};
    let datasetPrefix = 'rvp';

		for (const item in datasetOptions) {
			if (!item.startsWith(datasetPrefix)) continue;

			let prop = item.substring(datasetPrefix.length);
			prop = prop.charAt(0).toLowerCase() + prop.substring(1);
      let value = checkBoolean(datasetOptions[item]);

			options[prop] = value;
		};

    if (!Array.isArray(options.preConnections)) {
      options.preConnections = options.preConnections.split(',').map(item => item.trim());
    }


    placeholder = element.querySelector(options.placeholderSelector);
    poster = element.querySelector(options.posterSelector);
    video = element.querySelector(options.videoSelector);
    if (placeholder === null || video === null) return;

    video.setAttribute('aria-hidden', true);
    video.setAttribute('tabindex', -1);

    if (options.hideControlsOnLoad) {
      hasControls = video.hasAttribute('controls');
      if (hasControls) video.removeAttribute('controls');
    }

    if (options.playDelay === 'transition') options.playDelay = getTransitionDuration(placeholder);
    playDelayAdjusted = (options.playDelay > options.playDelayOffset) ? options.playDelay - options.playDelayOffset : options.playDelay;

    addEventListeners();
  };


  const init = function() {   
    element = (typeof options.selector === 'string') ? document.querySelector(options.selector) : options.selector;
    if (element === null) return;

    setup();
  };

	init();



  // API
  return {
    playVideo,
    getInfo: () => { return { element, placeholder, poster, video, ...options } }
  };

};


const ResponsiveVideoPosterAuto = function () {
	const elements = document.querySelectorAll('.responsive-video-poster');
	for (const item of elements) {
		ResponsiveVideoPoster({ selector: item });
	};
};


export { ResponsiveVideoPoster, ResponsiveVideoPosterAuto };
