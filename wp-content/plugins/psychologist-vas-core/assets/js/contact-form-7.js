(function () {
	const MIN_TIME = 5;        // минимальное время заполнения (сек)
	const MAX_TIME = 86400;    // 24 часа

	function setTimestamp() {
		const fields = document.querySelectorAll('input[name="form_loaded"]');

		fields.forEach((field) => {
			field.value = Math.floor(Date.now() / 1000);
		});
	}

	function bindValidation() {
		document.addEventListener('submit', function (e) {
			const form = e.target;

			if (!form.classList.contains('wpcf7-form')) {
				return;
			}

			const field = form.querySelector('input[name="form_loaded"]');

			if (!field || !field.value) {
				e.preventDefault();
				return;
			}

			const now = Math.floor(Date.now() / 1000);
			const diff = now - parseInt(field.value, 10);

			// слишком быстро (бот)
			if (diff < MIN_TIME) {
				e.preventDefault();
				return;
			}

			// слишком старая форма
			if (diff > MAX_TIME) {
				e.preventDefault();
				return;
			}
		});
	}

	document.addEventListener('DOMContentLoaded', function () {
		setTimestamp();
		bindValidation();
	});
})();
