# Responsive Video Poster
### A JavaScript plugin to add a responsive poster image for the video element.

### [View demo](http://nigelotoole.github.io/responsive-video-poster/)



## Installation
```javascript
$ npm install responsive-video-poster --save-dev
```


## Usage

### Import JS

The script is an ES6(ES2015) module but the compiled version is included in the build as "src/scripts/responsive-video-poster-umd.js". You can also copy "src/scripts/responsive-video-poster.js" into your own site if your build process can accommodate ES6 modules.

```javascript
import videoPosterPlus from 'responsive-video-poster';

// Init with default setup
videoPosterPlus();

// Init with all options at default setting
const videoPosterPlusDefault = videoPosterPlus({
  selector: '.responsive-video-poster',
  itemSelector: '.responsive-video-poster__card',
  animationName: 'swing',
  animationPostfixEnter: 'enter',
  animationPostfixLeave: 'leave',
  enableTouch: true,
  touchThreshold: 250
});
```

### Options
| Property                | Default                     | Type       | Description                                                                                       |
| ----------------------- | --------------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| `selector`              | '.responsive-video-poster'         | String     | Container element selector.                                                                       |
| `itemSelector`          | '.responsive-video-poster\_\_card' | String     | Item element selector.                                                                            |
| `animationName`         | 'swing'                     | String     | Animation class.                                                                                  |
| `animationPostfixEnter` | 'enter'                     | String     | Animation CSS class postfix for enter event.                                                      |
| `animationPostfixLeave` | 'leave'                     | String     | Animation CSS class postfix for leave event.                                                      |
| `enableTouch`           | true                        | Boolean    | Adds touch event to show content on first click then follow link on the second click.             |
| `touchThreshold`        | 250                         | Number(ms) | The touch length in ms to trigger the reveal, this is to prevent triggering if user is scrolling. |


### Import SASS

```scss
@import "node_modules/responsive-video-poster/src/styles/responsive-video-poster.scss";
```


### Markup

```html
<div class="responsive-video-poster">

  <a href="#" class="responsive-video-poster__card">
    <img src="images/image.jpg" alt="Image" class="img-fluid">

    <div class="responsive-video-poster__overlay responsive-video-poster__anim--enter">
      <h3 class="responsive-video-poster__title">Title</h3>
      <p class="responsive-video-poster__text">Description text.</p>
    </div>
  </a>

  ...
</div>
```


### Using other tags
The demos use &lt;a&gt; tags for the "responsive-video-poster__card" but a &lt;div&gt; can be used as below, specifying the tabindex ensures keyboard navigation works as expected. They can all have a value of 0 and will follow the source order of the divs.

```html
<div class="responsive-video-poster__card" tabindex="0">
  ...
</div>
```

### Inverted animations

Most of the animations above can be inverted so the overlay is visible by default and animates out on hover. Change the class 'responsive-video-poster__anim--enter' to 'responsive-video-poster__anim--leave' for this effect.

You can also add the class 'responsive-video-poster__anim--enter' or 'responsive-video-poster__anim--leave' to the image to animate it at the same time as overlay. This effect can be seen in the Slide & Push demo.

## Events

A 'directionChange' event is broadcast once a user enters/leaves an item with information about the action(enter,leave) and direction(top, right, bottom, left).

```javascript
document.querySelector('#test').addEventListener('directionChange', (event) => { 
  console.log(`Action: ${event.detail.action} Direction: ${event.detail.direction}`);
});
```

## Compatibility

### Touch support
The plugin will detect touch support and reveal the hidden content on first click then follow link on the second click. This can be disabled with the option enableTouch.


### Browser support
Supports all modern browsers(Firefox, Chrome and Edge) released as of January 2018. For older browsers you may need to include polyfills for [Nodelist.forEach](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach), [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) and [Passive Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).



## Demo site
Clone or download from Github.

```javascript
$ npm install
$ gulp serve
```

### Credits

Inspired by a Codepen by [Noel Delgado](https://codepen.io/noeldelgado/pen/pGwFx), this [Stack overflow answer](https://stackoverflow.com/a/3647634), the article [Get an Element's position using javascript](https://www.kirupa.com/html5/get_element_position_using_javascript.htm) and [Images from Unsplash.](https://unsplash.com).


### License
MIT © Nigel O Toole
