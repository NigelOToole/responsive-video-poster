class ResponsiveVideoPoster extends HTMLElement {

  // Setup
  constructor() {
    super();

    this.options = {
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
    };

    this.hasControls;
    this.playDelayAdjusted;
    this.preConnectionSites = ['https://www.youtube.com', 'https://www.youtube-nocookie.com', 'https://player.vimeo.com'];
    
    this.setup();
  }

  connectedCallback() {
    this.setup();
  } 

  setup() {
    if (this._instantiated) return;

    this.element = this.querySelector('button');
    if (!this.element) return;

		for (const item of this.getAttributeNames()) {
      let prop = this.camelCase(item);
      let value = this.checkBoolean(this.getAttribute(item));
      this.options[prop] = value;
		}

    if (!Array.isArray(this.options.preConnections)) {
      this.options.preConnections = this.options.preConnections.split(',').map(item => item.trim());
    }

    this.placeholder = this.querySelector(this.options['placeholderSelector']);
    this.poster = this.querySelector(this.options['posterSelector']);
    this.video = this.querySelector(this.options['videoSelector']);
    if (this.placeholder === null || this.video === null) return;

    this.video.setAttribute('aria-hidden', true);
    this.video.setAttribute('tabindex', -1);

    if (this.options.hideControlsOnLoad) {
      this.hasControls = this.video.hasAttribute('controls');
      if (this.hasControls) this.video.removeAttribute('controls');
    }

    if (this.options.playDelay === 'transition') this.options.playDelay = this.getTransitionDuration(this.placeholder);
    this.playDelayAdjusted = (this.options.playDelay > this.options.playDelayOffset) ? this.options.playDelay - this.options.playDelayOffset : this.options.playDelay;

    this.addEventListeners();

    this._instantiated = true;
  }

  addEventListeners() {
    this.placeholder.addEventListener('pointerover', (event) => {
      this.warmConnections();
    }, { once: true });   

    this.placeholder.addEventListener('click', (event) => {
      event.preventDefault();
      this.playVideo();
    });
  };


  // Utilities
  fireEvent(element, eventName, eventDetail) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail: eventDetail,
    });

    element.dispatchEvent(event);
  };

  checkBoolean(string) {
	  if (string.toLowerCase() === 'true') return true;
	  if (string.toLowerCase() === 'false') return false;
		return string;
  };

  getTransitionDuration(element) {
		let transitionDuration = getComputedStyle(element)['transitionDuration'];
		let animationDuration = getComputedStyle(element)['animationDuration'];
		
		let transitionDurationNumber = parseFloat(transitionDuration);
		let animationDurationNumber = parseFloat(animationDuration);

		let duration = animationDurationNumber > 0 ? animationDuration : transitionDuration;
		let durationNumber = animationDurationNumber > 0 ? animationDurationNumber : transitionDurationNumber;

		duration = duration.includes('ms') ? durationNumber : durationNumber*1000;
		return duration;
	};

  addPrefetch(kind, url) {
    let connectionExists = document.querySelector(`link[rel="${kind}"][href="${url}"]`);
    if (connectionExists) return;

    const linkElement = document.createElement('link');
    linkElement.rel = kind;
    linkElement.href = url;
    document.head.append(linkElement);
  };

  warmConnections() {
    let videoSrc = this.video.getAttribute('src');

    for (const item of this.options.preConnections) {
      this.addPrefetch('preconnect', item);
    } 

    for (const item of this.preConnectionSites) {
      if (videoSrc.includes(item)) this.addPrefetch('preconnect', item);
    }
  };

  camelCase(text, delimiter = '-') {
    const pattern = new RegExp((`${delimiter}([a-z])`), 'g');
    return text.replace(pattern, (match, replacement) => replacement.toUpperCase());
  }

 
  // Methods
  playVideo() {
    this.fireEvent(this, 'playVideo', { action: 'start' });

    let playStart;

		this.classList.add(this.options.animClass);
    this.video.setAttribute('aria-hidden', false);
    this.video.setAttribute('tabindex', 0);
    this.video.focus();

    if (this.video.nodeName === 'VIDEO') {
      this.video.setAttribute('preload', 'auto');

      playStart = () => {
        this.video.play();

        if (this.hasControls && this.options.hideControlsOnLoad && this.video.duration !== NaN) {
          let controlsDelay = this.options.hideControlsOnFirstPlay ? this.video.duration * 1000 : 0;

          setTimeout(() => {
            this.video.setAttribute('controls', '');
          }, controlsDelay);
        } 
      };
    }
    else {
      if (this.video.getAttribute('srcdoc') === '') this.video.removeAttribute('srcdoc');
      if (this.video.getAttribute('allow') === null) this.video.setAttribute('allow', 'autoplay;');
      if (!this.video.getAttribute('allow').includes('autoplay')) this.video.setAttribute('allow', `autoplay; ${this.video.getAttribute('allow')}`);

      let videoSrc = this.video.getAttribute('src');
      this.video.setAttribute('src', '');

      playStart = () => {
        let videoURL = new URL(videoSrc);
        videoURL.searchParams.append('autoplay', 1);    
        this.video.setAttribute('src', videoURL.href);
      };
    }

		setTimeout(() => {
      playStart();
      this.fireEvent(this, 'playVideo', { action: 'end' });
		}, this.playDelayAdjusted);

		setTimeout(() => {
			this.classList.remove(this.options.animClass);
			this.classList.add(this.options.activeClass);
      this.placeholder.style.display = 'none';
		}, this.options.playDelay);

  }
}

customElements.define('responsive-video-poster', ResponsiveVideoPoster);
export { ResponsiveVideoPoster };
