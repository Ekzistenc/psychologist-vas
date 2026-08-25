<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$title = !empty($attributes['title']) ? wp_kses_post($attributes['title']) : '';
$image_bg = !empty($attributes['imageBg']) ? (array) $attributes['imageBg'] : [];
?>

<section <?php echo get_block_wrapper_attributes([
	'id' => $id,
	'style' => !empty($image_bg['url']) ? 'background-image: url(' . esc_url($image_bg['url']) . ');' : '',
]); ?>>
	<div class="container">
		<?php if ($title) : ?>
			<h2><?php echo $title; ?></h2>
		<?php endif; ?>
		<div class="wp-block-snd-faq__details-wrapper">
			<?php echo $content; ?>
		</div>
	</div>
</section>
