// import { ShareUrl } from './share-url.js';
import { ShareUrl } from './share-url-wc.js';
import { ResponsiveVideoPoster, ResponsiveVideoPosterAuto } from './responsive-video-poster.js';
import { ResponsiveVideoPoster as ResponsiveVideoPosterWC } from './responsive-video-poster-wc.js';


window.addEventListener('DOMContentLoaded', (event) => {

// Init
const responsiveVideoPosterDefault = ResponsiveVideoPoster({ 
  selector: '#responsive-video-poster--default'
});

// const responsiveVideoPosterPicture = ResponsiveVideoPoster({ 
//   selector: '#responsive-video-poster--picture'
// });

// Embed
const responsiveVideoPosterEmbedElement = document.querySelector('#responsive-video-poster--embed');

const responsiveVideoPosterEmbed = ResponsiveVideoPoster({
  selector: responsiveVideoPosterEmbedElement,
  playDelayOffset: 250
});

const responsiveVideoPosterNoImage = ResponsiveVideoPoster({ 
  selector: '#responsive-video-poster--no-image'
});


// // Init with loop - this wont allow access to methods
// const responsiveVideoPosterElements = document.querySelectorAll('.responsive-video-poster');   

// for (const item of responsiveVideoPosterElements) {
//   ResponsiveVideoPoster({ selector: item });
// }


// Methods
// responsiveVideoPosterDefault.playVideo();
// console.log(responsiveVideoPosterDefault['elements']);
// console.log(responsiveVideoPosterDefault.getInfo());


// Event listener - this can be attached to an element or the document
// document.querySelector('#responsive-video-poster--default').addEventListener('playVideo', (event) => { 
//   console.log(`Action: ${event.detail.action}`);
// });

// document.addEventListener('playVideo', (event) => { 
//   console.log(`Target: ${event.target.matches('#responsive-video-poster--default')}`, `Action: ${event.detail.action}`);
// });

  
  // Encoded text
  const encodeElements = document.querySelectorAll('.encode');
  for (const item of encodeElements) {
    let decode = atob(item.dataset['encode']);

    if (item.dataset['encodeAttribute']) {
      item.setAttribute(`${item.dataset['encodeAttribute']}`, `${decode}`);
    }
  }
});