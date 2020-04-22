import ResponsiveVideoPoster from './responsive-video-poster.js';
// import ResponsiveVideoPoster from './responsive-video-poster-class.js';


// Init with string
const responsiveVideoPosterDefault = ResponsiveVideoPoster({ selector: '#responsive-video-poster--demo-default' });


// Init with element
const responsiveVideoPosterPictureElement = document.querySelector('#responsive-video-poster--demo-picture');
const responsiveVideoPosterPicture = ResponsiveVideoPoster({ selector: responsiveVideoPosterPictureElement });



// Init by loop - this wont allow access to methods
// const responsiveVideoPosterElements = document.querySelectorAll('.responsive-video-poster');

// if (responsiveVideoPosterElements.length) {
//   responsiveVideoPosterElements.forEach((item) => {
//     ResponsiveVideoPoster({ selector: item });
//   });
// };    

// if (responsiveVideoPosterElements.length) {
//   for (const item of responsiveVideoPosterElements) {
//     ResponsiveVideoPoster({ selector: item });
//   }
// };    


// Methods
// setTimeout(() => {
//   responsiveVideoPosterDefault.playVideo();
// }, 500)



// Event listener
document.querySelector('#responsive-video-poster--demo-default').addEventListener('playVideo', (event) => { 
  console.log(`Action: ${event.detail.action}`);
});
