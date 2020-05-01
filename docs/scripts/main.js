import ResponsiveVideoPoster from './responsive-video-poster.js';
// import ResponsiveVideoPoster from './responsive-video-poster-class.js';


// Init with string
const responsiveVideoPosterDefault = ResponsiveVideoPoster({ 
  selector: '#responsive-video-poster--default' 
});

// Init with string and options
const responsiveVideoPosterPicture = ResponsiveVideoPoster({ 
  selector: '#responsive-video-poster--picture', 
  hideControls: true 
});

// Init with element
const responsiveVideoPosterIframeElement = document.querySelector('#responsive-video-poster--iframe');
const responsiveVideoPosterIframe = ResponsiveVideoPoster({ selector: responsiveVideoPosterIframeElement });



// Init with loop - this wont allow access to methods
// const responsiveVideoPosterElements = document.querySelectorAll('.responsive-video-poster');   

// for (const item of responsiveVideoPosterElements) {
//   ResponsiveVideoPoster({ selector: item });
// }  



// Methods
// setTimeout(() => {
//   responsiveVideoPosterDefault.playVideo();
//   console.log(responsiveVideoPosterDefault.getInfo());
//   console.log(responsiveVideoPosterDefault.getInfo()['video']);
// }, 500)



// Event listener
document.querySelector('#responsive-video-poster--default').addEventListener('playVideo', (event) => { 
  console.log(`Action: ${event.detail.action}`);
});
