document.addEventListener("DOMContentLoaded", function () {
	const sectionName = 'wp-block-snd-about';
	document.querySelectorAll(`.${sectionName}`).forEach((item, index) => {
		item.classList.add(`${sectionName}-${index}`);

		const swiper = new Swiper(`.${sectionName}-${index} .swiper-about`, {
			effect: 'cards',
			centeredSlides: true,
			slidesPerView: 'auto',
      navigation: {
				nextEl: `.${sectionName}-${index} .swiper-about-next`,
				prevEl: `.${sectionName}-${index} .swiper-about-prev`,
      },
    });
  });
});