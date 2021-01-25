import ResponsiveVideoPoster from './responsive-video-poster.js';


// Init with string
const responsiveVideoPosterDefault = ResponsiveVideoPoster({ 
  selector: '#responsive-video-poster--default' 
});

// Init with string and playback delayed
const responsiveVideoPosterPicture = ResponsiveVideoPoster({ 
  selector: '#responsive-video-poster--picture', 
  playDelay: 'transition'
});

// Init with element and pre connections for Youtube
const responsiveVideoPosterIframeElement = document.querySelector('#responsive-video-poster--iframe');

const responsiveVideoPosterIframe = ResponsiveVideoPoster({ 
  selector: responsiveVideoPosterIframeElement,
  preConnections: ['https://www.youtube.com', 'https://www.google.com']
});


// Init with loop - this wont allow access to methods
// const responsiveVideoPosterElements = document.querySelectorAll('.responsive-video-poster');   

// for (const item of responsiveVideoPosterElements) {
//   ResponsiveVideoPoster({ selector: item });
// }


// Methods
// responsiveVideoPosterDefault.playVideo();
// console.log(responsiveVideoPosterDefault['elements']);
// console.log(responsiveVideoPosterDefault['elements']['video']);


// Event listener - this can be attached to an element or the document
// document.querySelector('#responsive-video-poster--default').addEventListener('playVideo', (event) => { 
//   console.log(`Action: ${event.detail.action}`);
// });

// document.addEventListener('playVideo', (event) => { 
//   console.log(`Target: ${event.target.matches('#responsive-video-poster--default')}`, `Action: ${event.detail.action}`);
// });
