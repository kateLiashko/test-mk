/*slider swiper section-promo*/
var swiper = new Swiper('.swiper-container', {
  speed: 400,
    autoplay: {
      delay: 4000,
    },
    loop: true,
    mousewheelControl: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  });

  var swiper = new Swiper('.swiper-container-work', {
    speed: 300,
      autoplay: {
        delay: 4000,
      },
      loop: true,
      mousewheelControl: true,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });

  var swiper = new Swiper('.slider-container', {
    slideClass: 'slide',
    wrapperClass: 'slider-wrapper',
    spaceBetween: 30,
    speed: 400,

    autoplay: {
      delay: 4000,
    },
    loop: true,
    mousewheelControl: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
  });