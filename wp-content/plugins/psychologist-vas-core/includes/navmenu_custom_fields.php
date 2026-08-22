<?php
add_action('wp_nav_menu_item_custom_fields', 'snd_custom_menu_image_field', 10, 4);
function snd_custom_menu_image_field($item_id, $item, $depth, $args)
{
	// Получаем текущее значение (ID изображения)
	$menu_item_image = get_post_meta($item_id, '_menu_item_image', true);
	$image_url = $menu_item_image ? wp_get_attachment_image_url($menu_item_image, 'thumbnail') : '';
?>
	<div class="field-menu-image description description-wide">
		<label for="edit-menu-item-image-<?php echo $item_id; ?>">
			Изображение
		</label>

		<div style="display:flex; align-items: center; gap: 5px; margin-top: 5px;">
			<!-- Контейнер для превью (всегда присутствует) -->
			<div class="menu-image-preview" style="background-color: #f6f7f7; width:30px; height:30px; border: 1px solid #186fae; border-radius:3px; padding:3px; box-sizing:border-box; display: <?php echo $image_url ? 'flex' : 'none'; ?>; align-items: center; justify-content: center;">
				<?php if ($image_url): ?>
					<img src="<?php echo esc_url($image_url); ?>" alt="" style="object-fit:contain; width:100%; height:auto; max-width: 100%; max-height: 100%;" />
				<?php endif; ?>
			</div>

			<input type="hidden" id="edit-menu-item-image-<?php echo $item_id; ?>" class="widefat code edit-menu-item-image" name="menu-item-image[<?php echo $item_id; ?>]" value="<?php echo esc_attr($menu_item_image); ?>" />

			<button type="button" class="button button-secondary upload-menu-image" data-target="#edit-menu-item-image-<?php echo $item_id; ?>">
				<?php echo $menu_item_image ? 'Изменить' : 'Выбрать'; ?> изображение
			</button>

			<button type="button" class="button button-secondary remove-menu-image" data-target="#edit-menu-item-image-<?php echo $item_id; ?>" style="<?php echo !$menu_item_image ? 'display: none;' : ''; ?>">
				Удалить
			</button>
		</div>
	</div>
<?php
}

// Сохранение значения
add_action('wp_update_nav_menu_item', 'snd_save_menu_image_field', 10, 3);
function snd_save_menu_image_field($menu_id, $menu_item_db_id, $args)
{
	if (isset($_POST['menu-item-image'][$menu_item_db_id])) {
		$image_id = sanitize_text_field($_POST['menu-item-image'][$menu_item_db_id]);
		update_post_meta($menu_item_db_id, '_menu_item_image', $image_id);
	}
}

// Подключаем скрипты и стили для поля
add_action('admin_enqueue_scripts', 'snd_menu_image_admin_scripts');
function snd_menu_image_admin_scripts($hook)
{
	if ($hook == 'nav-menus.php') {
		wp_enqueue_media();
		wp_enqueue_script('menu-image-admin', SND_PSH_BLOCKS_URL . 'assets/js/menu-image-admin.js', array('jquery'), null, true);
	}
}

// Добавляем изображение в заголовок пункта меню
add_filter('nav_menu_item_title', 'snd_add_menu_image_to_title', 10, 4);
function snd_add_menu_image_to_title($title, $item, $args, $depth)
{
	$menu_item_image_id = get_post_meta($item->ID, '_menu_item_image', true);

	if (!empty($menu_item_image_id)) {
		$mime_type = get_post_mime_type($menu_item_image_id);

		// Проверяем, является ли изображение SVG
		if ($mime_type === 'image/svg+xml') {
			// Получаем путь к файлу SVG
			$svg_path = get_attached_file($menu_item_image_id);

			if ($svg_path && file_exists($svg_path)) {
				// Читаем содержимое SVG файла
				$svg_content = file_get_contents($svg_path);

				// Удаляем лишние пробелы и переносы строк
				$svg_content = preg_replace('/>\s+</', '><', $svg_content);

				// Проверяем, что это валидный SVG
				if (strpos($svg_content, '<svg') !== false) {
					// Извлекаем только содержимое между <svg> и </svg>
					preg_match('/<svg[^>]*>.*<\/svg>/si', $svg_content, $matches);

					if (!empty($matches[0])) {
						$svg_content = $matches[0];
					}

					// Добавляем классы для стилизации
					$svg_content = str_replace('<svg', '<svg class="menu-item-svg"', $svg_content);

					// Добавляем ширину и высоту если их нет
					if (strpos($svg_content, 'width=') === false) {
						$svg_content = str_replace('<svg', '<svg width="20"', $svg_content);
					}
					if (strpos($svg_content, 'height=') === false) {
						$svg_content = str_replace('<svg', '<svg height="20"', $svg_content);
					}

					$title = $svg_content;
				} else {
					// Если что-то пошло не так, используем стандартный метод
					$title = wp_get_attachment_image($menu_item_image_id, 'thumbnail');
				}
			} else {
				// Если файл не найден, используем стандартный метод
				$title = wp_get_attachment_image($menu_item_image_id, 'thumbnail');
			}
		} else {
			// Для всех остальных изображений используем стандартный тег img
			$image = wp_get_attachment_image($menu_item_image_id, 'thumbnail', false, array(
				'class' => 'menu-item-image',
				'loading' => 'lazy'
			));
			$title = $image;
		}
	}

	return $title;
}

// Добавляем класс для изображения в заголовке пункта меню
add_filter('nav_menu_css_class', 'snd_add_menu_image_class', 10, 4);
function snd_add_menu_image_class($classes, $item, $args, $depth)
{
	$menu_item_image_id = get_post_meta($item->ID, '_menu_item_image', true);
	if (! empty($menu_item_image_id)) {
		$classes[] = 'sd-nav__soc';
	}
	return $classes;
}
