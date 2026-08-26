<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$image = !empty($attributes['image']) ? (array)$attributes['image'] : [];
?>

<div <?php echo get_block_wrapper_attributes(['id' => $id, 'class' => 'swiper-slide']); ?>>
	<?php if (!empty($image['url'])) : ?>
		<a href="<?php echo esc_url($image['sizes']['full']['url']); ?>" class="about-glightbox">
			<img
				src="<?php echo esc_url($image['url']); ?>"
				alt="<?php echo esc_attr($image['alt']); ?>"
				loading="lazy" />
		</a>
	<?php endif; ?>
</div>