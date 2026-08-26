<?php
$gallery = isset($attributes['gallery']) && is_array($attributes['gallery'])
? $attributes['gallery']
: [];

$post_id = is_singular() ?  get_the_ID() : 0;
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
