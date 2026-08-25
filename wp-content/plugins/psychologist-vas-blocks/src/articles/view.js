document.addEventListener('DOMContentLoaded', () => {
	const sliders = document.querySelectorAll('.swiper-articles');

	sliders.forEach((container) => {
		const scrollbarEl = container.nextElementSibling;

		if (!scrollbarEl || !scrollbarEl.classList.contains('swiper-scrollbar-articles')) {
			return;
		}

		new Swiper(container, {
			slidesPerView: 1,
			spaceBetween: 10,
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
			},
			scrollbar: {
				el: scrollbarEl,
				draggable: true,
			},
		});
	});
});
