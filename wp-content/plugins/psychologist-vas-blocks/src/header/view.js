document.addEventListener('DOMContentLoaded', () => {
	const body = document.querySelector('body');
	const html = document.documentElement;

	if (!document.querySelector('.wp-block-snd-burger-button')) {
		return;
	}

	const burgerButton = document.querySelector('.wp-block-snd-burger-button');
	const burgerMenu = document.querySelector('.wp-block-snd-burger');
	const burgerLinks = document.querySelectorAll('.menu-item');
	const header = document.querySelector('.wp-block-snd-header__wrapper');

	const toggleMenu = () => {
		body.classList.toggle('body-overflow');
		html.classList.toggle('body-overflow');
		burgerMenu.classList.toggle('open');
		burgerButton.classList.toggle('wp-block-snd-burger-button-open');
		header?.classList.toggle('active');
	};

	const closeMenu = () => {
		body.classList.remove('body-overflow');
		html.classList.remove('body-overflow');
		burgerMenu.classList.remove('open');
		burgerButton.classList.remove('wp-block-snd-burger-button-open');
		header?.classList.remove('active');
	};

	burgerLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.stopPropagation();
			closeMenu();
		});
	});

	burgerButton.addEventListener('click', (e) => {
		e.stopPropagation();
		toggleMenu();
	});

	document.addEventListener('click', (e) => {
		const target = e.target;
		const itsBurgerMenu = target === burgerMenu || burgerMenu.contains(target);
		const itsBurgerButton = target === burgerButton;
		const burgerMenuIsOpen = burgerMenu.classList.contains('open');

		if (!itsBurgerMenu && !itsBurgerButton && burgerMenuIsOpen) {
			toggleMenu();
		}
	});
});
