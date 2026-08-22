<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$image_bg = !empty($attributes['imageBg']) ? (array)$attributes['imageBg'] : [];
?>

<section <?php echo get_block_wrapper_attributes([
						'id' => $id,
						'style' => !empty($image_bg['url']) ? 'background-image: url(' . esc_url($image_bg['url']) . ');' : ''
					]); ?>>
	<div class="container">
		<?php echo $content; ?>
	</div>
</section>