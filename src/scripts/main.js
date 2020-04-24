import ResponsiveVideoPoster from './responsive-video-poster.js';
// import ResponsiveVideoPoster from './responsive-video-poster-class.js';


// // Init with string
// const responsiveVideoPosterDefault = ResponsiveVideoPoster({ selector: '#responsive-video-poster--demo-default' });
// const responsiveVideoPosterIframe = ResponsiveVideoPoster({ selector: '#responsive-video-poster--demo-iframe' });


// // Init with element
// const responsiveVideoPosterPictureElement = document.querySelector('#responsive-video-poster--demo-picture');
// const responsiveVideoPosterPicture = ResponsiveVideoPoster({ selector: responsiveVideoPosterPictureElement });



// Init with loop - this wont allow access to methods
const responsiveVideoPosterElements = document.querySelectorAll('.responsive-video-poster');   

for (const item of responsiveVideoPosterElements) {
  ResponsiveVideoPoster({ selector: item });
}  


// Methods
// setTimeout(() => {
//   responsiveVideoPosterDefault.playVideo();
//   console.log(responsiveVideoPosterDefault.getInfo()['video']);
// }, 500)



// Event listener
document.querySelector('#responsive-video-poster--demo-default').addEventListener('playVideo', (event) => { 
  console.log(`Action: ${event.detail.action}`);
});
