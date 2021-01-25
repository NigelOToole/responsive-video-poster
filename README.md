# Responsive Video Poster
### Responsive poster image for videos to improve performance and allow full control of video placeholders.

Video elements only allow one image as the poster, which is not optimal for performance. This JavaScript plugin uses a standard image tag as the poster. This means standard responsive image techniques can be used to load only the most appropriate image. This also gives full styling control of video placeholders. Performance optimizations are also included for loading of both native and embedded videos.

### [View demo](http://nigelotoole.github.io/responsive-video-poster/)

---
## Installation
```javascript
$ npm install responsive-video-poster --save-dev
```

---
## Usage

### Import JS

The script is an ES6(ES2015) module but the compiled version is included in the build as "src/scripts/responsive-video-poster-umd.js". You can also copy "src/scripts/responsive-video-poster.js" into your own site if your build process can accommodate ES6 modules.

```javascript
import ResponsiveVideoPoster from 'responsive-video-poster.js';

const responsiveVideoPosterDefault = ResponsiveVideoPoster({ 
  selector: '#responsive-video-poster--default' 
});
```

### Options
| Property                | Default                     | Type       | Description                                                                                       |
| ----------------------- | --------------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| `selector`              | '.responsive-video-poster'         | String     | Container element selector.                                                                       |
| `overlaySelector`          | '.video-overlay' | String     | Overlay element selector.                                                                            |
| `posterSelector`          | '.poster' | String     | Poster element selector.                                                                            |
| `videoSelector`          | '.video' | String     | Video element selector.                                                                            |
| `animClass`          | 'is-anim' | String     | CSS class to transition the video overlay between states.                                                                            |
| `inactiveClass`          | 'is-inactive' | String     | CSS class to hide the video overlay.                                                                            |
| `playDelay`          | 0 |  	Integer(ms) or 'transition     | Delay playing the video by set time or wait for the overlay transition to finish.                                                                            |
| `hideControlsOnLoad`          | false | Boolean     | Hide video controls while transitioning overlay.                                                                             |
| `preConnections`        | []    | Array       | Domains to pre-connect for loading an embedded video. 

### API
| Property                | Type       | Description                                                                                       |
| ----------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| `instance.playVideo()`  | Method     | Plays the video.                                         |
| `instance['elements']`  | Object     | Returns the elements used by this                        |


### Import SASS

```scss
@import "node_modules/responsive-video-poster/src/styles/responsive-video-poster.scss";
```


### Markup

```html
<div class="responsive-video-poster responsive-video-poster--16by9">
                
  <button class="video-overlay" aria-label="Play video">
    <div class="poster-btn"><svg class="poster-btn-icon"> ... </svg></div>

    <img srcset="images/720/image.jpg 720w, images/1080/image.jpg 1080w" src="images/1080/image.jpg" class="poster">
  </button>

  <video src="videos/video.mp4" preload="metadata" class="video" controls></video>

</div>
```


### Bootstrap 4 Example

```html
<div class="responsive-video-poster embed-responsive embed-responsive-16by9">             
  ...
</div>
```


### Bootstrap 5 Example

```html
<div class="responsive-video-poster ratio ratio-16x9">
  ...
</div>
```

---
## Video loading optimizations

[Responsive image techniques](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)(srcset, sizes, source, etc) are used to load the most appropriate image. [Native lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading) is used on the responsive poster image to reduce initial page load. The plugin should also work normally with lazy load plugins.

The [video element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) includes preload="metadata" so the video is not loaded until the user interacts with it. This will reduce the initial page load but may create lag in playback for some users. This can be removed if not needed.

The embedded video includes [srcdoc=""](https://dev.to/haggen/lazy-load-embedded-youtube-videos-520g) so the video and third-party scripts are not loaded until the user interacts with it. The 'preConnections' option can be used to pass domains to start [pre-connect](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preconnect) connections for loading an embedded video. this happens when the user hovers/taps on the video using the [pointerover event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/pointerover_event). For example Youtube could use ['https://www.youtube.com', 'https://www.google.com'].
        
---
## Events

A 'playVideo' event is started once a user clicks the video overlay. The event is ended once the overlay has become inactive and the video starts playing.

```javascript
document.querySelector('#responsive-video-poster--default').addEventListener('playVideo', (event) => { 
  console.log(`Action: ${event.detail.action}`);
});
```

You can also attach this to the document.
```javascript
document.addEventListener('playVideo', (event) => { 
  console.log(`Target: ${event.target.matches('#responsive-video-poster--default')}`, `Action: ${event.detail.action}`);
});
```

---
## Compatibility

Supports all modern browsers (Firefox, Chrome, Safari and Edge) released as of April 2020.


---
## Demo site
Clone or download from Github.

```javascript
$ npm install
$ gulp serve
```

---
### Credits

[Lazy loading of an embedded video](https://dev.to/haggen/lazy-load-embedded-youtube-videos-520g) by Arthur Corenzan. [Lazy load third-party resources with facades](https://web.dev/third-party-facades/).
Covverr videos of [Lago di braies](https://coverr.co/videos/lago-di-braies-y1yBShzUTZ) and [Lofoten rocks](https://coverr.co/videos/lofoten-rocks-GPfWh8WOtG). Youtube video of [Tustan Karpaty mountains](https://www.youtube.com/watch?v=FjPvaGt6Pw4).
