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

class ResponsiveVideoPoster {

  constructor(options) {
    this.selector = '.responsive-video-poster';
    this.overlaySelector = '.video-overlay';
    this.posterSelector = '.poster';
    this.videoSelector = '.video';
    this.animClass = 'is-anim';
    this.inactiveClass = 'is-inactive';
    this.embedPreload = 500;

    this.config = ResponsiveVideoPoster.mergeSettings(options);
    this.selector = typeof this.config.selector === 'string' ? document.querySelector(this.config.selector) : this.config.selector;

    console.log(this.selector);
    // let item = document.querySelector(this.selector);

    // this.elements = document.querySelectorAll(this.selector);

    this.init();
  }

  // let options = {
  // selector: selector = '.responsive-video-poster',
  // overlaySelector: overlaySelector = '.video-overlay',
  // posterSelector: posterSelector = '.poster',
  // videoSelector: videoSelector = '.video',
  // animClass: animClass = 'is-anim',
  // inactiveClass: inactiveClass = 'is-inactive',
  // embedPreload: embedPreload = 500,
	// }
  // Options
  // const elements = document.querySelectorAll(selector);



  static mergeSettings(options) {
    const settings = {
      selector: '.responsive-video-poster',
      overlaySelector: '.video-overlay',
      posterSelector: '.poster',
      videoSelector: '.video',
      animClass: 'is-anim',
      inactiveClass: 'is-inactive',
      embedPreload: 500,
    };

    // const userSttings = options;
    // for (const attrname in userSttings) {
    //   // Nigel - Auto convert data attributes to int
    //   if(attrname === 'autoplay') {
    //     settings[attrname] = parseInt(userSttings[attrname], 10);
    //   }
    //   else {
    //     settings[attrname] = userSttings[attrname];
    //   }
    // }
    // console.log(settings);

    console.log({...settings, ...options})

    return {...settings, ...options};
  }


	// Utils
	static getTransitionDuration (element) {
		let transitionDuration = getComputedStyle(element)['transitionDuration'];
		let transitionDurationNumber = parseFloat(transitionDuration);
		transitionDuration = transitionDuration.indexOf('ms')>-1 ? transitionDurationNumber : transitionDurationNumber*1000;
		return transitionDuration;
	};

  static addParameterToURL(url, param) {
    url += (url.split('?')[1] ? '&':'?') + param;
    return url;
  };
  
  static fireEvent (element, eventName, eventDetail) {
    const event = new CustomEvent(eventName, {
      bubbles: false,
      detail: eventDetail,
    });

    element.dispatchEvent(event);
  };



  // Click handler
  clickHandler (event) {
    event.preventDefault();
    this.playVideo();
    console.log(this);
  }  
  

  playVideo (element) {
    this.overlay.style.display = 'none';
    this.video.play();

    // let overlay = element.overlay;
    // let video = element.video;
    // let videoControls = element.videoControls;
    
    // let transitionDuration = getTransitionDuration(overlay);
    // let embedTransitionDuration = (transitionDuration <= embedPreload) ? 0 : transitionDuration - embedPreload;
    // let videoType = (video.nodeName === 'VIDEO') ? 'video' : 'embed';

		// overlay.classList.add(animClass);

    // video.setAttribute('aria-hidden', false);
    // video.setAttribute('tabindex', 0);
    // video.focus();

    // if(videoType === 'video') {
    //   video.setAttribute('preload', 'auto');

    //   setTimeout(() => {
    //     video.play();
    //     if(videoControls) video.setAttribute('controls', '');
    //   }, transitionDuration);
    // }
    // else {
    //   setTimeout(() => {
    //     if (video.getAttribute('srcdoc') === '') video.removeAttribute('srcdoc');
    //     video.setAttribute('src', `${addParameterToURL(video.getAttribute('src'), 'autoplay=1')}`);
    //   }, embedTransitionDuration);
    // }

		// setTimeout(() => {
		// 	overlay.classList.remove(animClass);
		// 	overlay.classList.add(inactiveClass);
    //   overlay.style.display = 'none';
		// }, transitionDuration);
    
  }


  // Init
  init() {
    let item = this.selector;

    // this.elements.forEach(function(item) {
      this.overlay = item.querySelector(this.overlaySelector);
      this.video = item.querySelector(this.videoSelector);
      if(this.overlay === null || this.video === null) return;

      this.video.setAttribute('aria-hidden', true);
      this.video.setAttribute('tabindex', -1);

      this.videoControls = (this.video.getAttribute('controls') === '');
      if(this.videoControls) this.video.removeAttribute('controls');


      console.log(this.overlay, this.video, this.videoControls)

      // overlay.addEventListener('click', (event) => clickHandler(event, overlay, video, videoControls));
      this.overlay.addEventListener('click', (event) => this.clickHandler(event));

    // });
    
  };

};

export default ResponsiveVideoPoster;
