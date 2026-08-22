(function ($) {
	$(document).ready(function () {
		// При клике на кнопку "Выбрать изображение"
		$(document).on('click', '.upload-menu-image', function (e) {
			e.preventDefault();
			var button = $(this);
			var targetInput = $(button.data('target'));
			var previewContainer = button.closest('.field-menu-image').find('.menu-image-preview');
			var currentImageId = targetInput.val();

			// Создаем фрейм выбора изображения
			var frame = wp.media({
				title: 'Выберите изображение',
				multiple: false,
				library: {
					type: 'image'
				},
				button: {
					text: 'Использовать это изображение'
				}
			});

			// Если уже есть изображение, устанавливаем его как выбранное
			if (currentImageId) {
				frame.on('open', function () {
					var selection = frame.state().get('selection');
					var attachment = wp.media.attachment(currentImageId);
					attachment.fetch();
					selection.add(attachment ? [attachment] : []);
				});
			}

			frame.on('select', function () {
				var attachment = frame.state().get('selection').first().toJSON();
				var thumbnailUrl = attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;

				// Обновляем значение поля
				targetInput.val(attachment.id);

				// Обновляем превью
				previewContainer.html('<img src="' + thumbnailUrl + '" alt="" style="object-fit:contain; width:100%; height:auto; max-width: 100%; max-height: 100%;" />');
				previewContainer.show();

				// Обновляем текст кнопки
				button.text('Изменить изображение');

				// Показываем кнопку удаления
				button.siblings('.remove-menu-image').show();
			});

			frame.open();
		});

		// При клике на кнопку "Удалить"
		$(document).on('click', '.remove-menu-image', function (e) {
			e.preventDefault();
			var button = $(this);
			var targetInput = $(button.data('target'));
			var previewContainer = button.closest('.field-menu-image').find('.menu-image-preview');
			var uploadButton = button.siblings('.upload-menu-image');

			// Очищаем значение
			targetInput.val('');

			// Очищаем и скрываем превью
			previewContainer.empty().hide();

			// Обновляем текст кнопки выбора
			uploadButton.text('Выбрать изображение');

			// Скрываем кнопку удаления
			button.hide();
		});
	});
})(jQuery);