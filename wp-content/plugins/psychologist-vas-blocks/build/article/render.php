<?php
$post_id = get_the_ID();

if (! $post_id) {
	return;
}

$gallery = isset($attributes['gallery']) && is_array($attributes['gallery'])
	? $attributes['gallery']
	: [];

$gallery_items = snd_psh_build_gallery_items($post_id, $gallery);
?>

<article <?php echo get_block_wrapper_attributes(['class' => 'wp-block-snd-article']); ?>>
	<div class="container">
		<div class="wp-block-snd-article__grid">
			<div class="wp-block-snd-article__text">
				<?php echo $content; ?>
			</div>

			<?php snd_psh_render_post_gallery_items($gallery_items); ?>
		</div>
	</div>
</article>
