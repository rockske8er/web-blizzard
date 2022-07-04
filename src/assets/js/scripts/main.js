// const { default: Swiper } = require("swiper")

const sliderThumbnails = new Swiper('.slider-thumbnails', {
  slidesPerView: 5, 
  direction: 'vertical', 
  spaceBetween: 20, 
  watchSlidesProgress: true
});

const sliderHero = new Swiper(".slider-main", {
  effect: 'fade', 
  thumbs: {
    swiper: sliderThumbnails
  },
  autoplay: {
    delay: 5000, 
    disableOnInteraction: false
  }
});