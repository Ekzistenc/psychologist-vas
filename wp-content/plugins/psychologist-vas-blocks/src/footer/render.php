<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : 'contacts';
$title = !empty($attributes['title']) ? esc_html($attributes['title']) : 'Контакты';
$form_title = !empty($attributes['formTitle']) ? esc_html($attributes['formTitle']) : '';
$phone = !empty($attributes['phone']) ? (array) $attributes['phone'] : [];
$image_bg = !empty($attributes['imageBg']) ? (array) $attributes['imageBg'] : [];
$image_mobile = !empty($attributes['imageMobile']) ? (array) $attributes['imageMobile'] : [];
$menu_left = !empty($attributes['menuFooterLinksLeft']) ? (int) $attributes['menuFooterLinksLeft'] : 0;
$menu_right = !empty($attributes['menuFooterLinksRight']) ? (int) $attributes['menuFooterLinksRight'] : 0;

$current_soc_list_id = !empty($attributes['currentSocListId']) ? esc_attr($attributes['currentSocListId']) : '';
$current_soc_list = [];
$soc_lists = get_option('snd_socials', []);
if ($soc_lists && $current_soc_list_id) {
	$current_soc_list = !empty($soc_lists[$current_soc_list_id]['items']) ? (array) $soc_lists[$current_soc_list_id]['items'] : [];
}

$render_footer_menu = static function ($menu_id) {
	if (!$menu_id) {
		return;
	}

	$items = wp_get_nav_menu_items($menu_id);
	if (!$items) {
		return;
	}

	echo '<div class="wp-block-snd-links">';
	foreach ($items as $item) {
		printf(
			'<a href="%1$s"%2$s%3$s>%4$s</a>',
			esc_url($item->url),
			$item->target ? ' target="' . esc_attr($item->target) . '"' : '',
			$item->xfn ? ' rel="' . esc_attr($item->xfn) . '"' : '',
			esc_html($item->title)
		);
	}
	echo '</div>';
};
?>

<footer <?php echo get_block_wrapper_attributes([
	'id' => $id,
	'style' => !empty($image_bg['url']) ? 'background-image: url(' . esc_url($image_bg['url']) . ');' : '',
]); ?>>
	<?php if (!empty($image_mobile['url'])) : ?>
		<img
			src="<?php echo esc_url($image_mobile['url']); ?>"
			alt=""
			loading="lazy"
			class="wp-block-snd-main__img">
	<?php endif; ?>

	<div class="wp-block-snd-footer__wrapper">
		<div class="container">
			<div class="wp-block-snd-footer__form-box">
				<?php if ($title) : ?>
					<h2><?php echo $title; ?></h2>
				<?php endif; ?>

				<div class="wp-block-snd-footer__contacts">
					<?php if (!empty($phone['numberPhone'])) : ?>
						<div class="wp-block-snd-footer__contact">
							<span>Телефон</span>
							<a href="tel:<?php echo esc_attr($phone['numberPhoneHref'] ?? ''); ?>">
								<?php echo esc_html($phone['numberPhone']); ?>
							</a>
						</div>
					<?php endif; ?>

					<?php if ($current_soc_list) : ?>
						<div class="wp-block-snd-footer__contact">
							<span>Соц сети</span>
							<div class="wp-block-snd-footer__soc">
								<?php foreach ($current_soc_list as $socitem) :
									if (empty($socitem['link'])) {
										continue;
									}
									$icon_url = !empty($socitem['icon']['url']) ? esc_url($socitem['icon']['url']) : '';
									?>
									<a
										href="<?php echo esc_url($socitem['link']); ?>"
										target="_blank"
										rel="noopener noreferrer"
										<?php if ($icon_url) : ?>
											style="mask-image: url('<?php echo $icon_url; ?>')"
										<?php endif; ?>
									></a>
								<?php endforeach; ?>
							</div>
						</div>
					<?php endif; ?>
				</div>

				<?php if ($form_title) : ?>
					<h3><?php echo $form_title; ?></h3>
				<?php endif; ?>

				<?php echo $content; ?>
			</div>
		</div>

		<div class="wp-block-snd-link container">
			<?php $render_footer_menu($menu_left); ?>
			<?php $render_footer_menu($menu_right); ?>
		</div>
	</div>
</footer>
