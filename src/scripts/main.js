// import ResponsiveVideoPoster from './responsive-video-poster.js';
import ResponsiveVideoPoster from './responsive-video-poster-class.js';


// ResponsiveVideoPoster();

// const responsiveVideoPoster = ResponsiveVideoPoster({ selector: '#responsive-video-poster--demo-default' });
// // responsiveVideoPoster.playVideo(document.querySelector('.responsive-video-poster--demo-default'));
// responsiveVideoPoster.playVideo();


// Class
const responsiveVideoPosterElements = document.querySelectorAll('.responsive-video-poster');

if (responsiveVideoPosterElements.length) {
  responsiveVideoPosterElements.forEach((item) => {
    let instance = new ResponsiveVideoPoster({ selector: item });

  });
};    


// const responsiveVideoPoster = new ResponsiveVideoPoster({ selector: '#responsive-video-poster--demo-default' });
// responsiveVideoPoster.playVideo();






// const responsiveVideoPosterDemoDefault = videoPosterPlus({
//   selector: '.responsive-video-poster--demo-default'
// });

setTimeout(() => {
  // videoPosterPlus().playVideo(document.querySelector('.responsive-video-poster--demo-default'));
  // responsiveVideoPosterDemoDefault.playVideo(document.querySelector('.responsive-video-poster--demo-default'));
}, 500)

// Add a listener to an item to monitor direction changes 

// document.querySelector('.responsive-video-poster--demo-swing .responsive-video-poster__card:first-child').addEventListener('directionChange', (event) => { 
//   console.log(`Action: ${event.detail.action} Direction: ${event.detail.direction}`);
// });

// let eventTargets = document.querySelectorAll('.responsive-video-poster--demo-swing .responsive-video-poster__card');
// eventTargets.forEach((item) => {
//   item.addEventListener('directionChange', (event) => { 
//     console.log(`Action: ${event.detail.action} Direction: ${event.detail.direction}`);
//     console.log(item);
//   });
// });
