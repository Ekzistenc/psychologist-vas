<?php
$button = !empty($attributes['button']) ? (array) $attributes['button'] : [];
$button_url = !empty($button['href']) ? esc_url($button['href']) : '#contacts';
$button_name = !empty($button['name']) ? esc_html($button['name']) : 'Записаться на консультацию →';
?>

<a href="<?php echo $button_url; ?>" class="wp-block-snd-header__button menu-item">
	<?php echo $button_name; ?>
</a>
<a class="wp-block-snd-burger-button" role="button" tabindex="0">
	<span></span>
	<span></span>
	<span></span>
</a>
