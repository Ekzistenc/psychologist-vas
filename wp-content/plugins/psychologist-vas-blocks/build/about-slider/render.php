<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
?>

<div <?php echo get_block_wrapper_attributes([
				'id' => $id,
				'class' => 'swiper swiper-about'
			]); ?>>
	<div class="swiper-button-prev swiper-about-prev"></div>
	<div class="swiper-wrapper">
		<?php echo $content; ?>
	</div>
	<div class="swiper-button-next swiper-about-next"></div>
</div>