<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
?>

<div <?php echo get_block_wrapper_attributes(['id' => $id, 'class' => 'wp-block-snd-bread-crumbs']); ?>>
	<div class="container">
		<ul class="wp-block-snd-bread-crumbs__list">
			<?php echo $content; ?>
		</ul>
	</div>
</div>
