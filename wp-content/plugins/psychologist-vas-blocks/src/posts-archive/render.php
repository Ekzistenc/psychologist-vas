<?php

if (! defined('ABSPATH')) {
	exit;
}

$id = ! empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$title_attr = ! empty($attributes['title']) ? $attributes['title'] : __('Случаи из практики', 'sndpshsite-blocks');
$variant = ! empty($attributes['variant']) ? esc_attr($attributes['variant']) : '';
$is_preview = defined('REST_REQUEST') && REST_REQUEST;
$use_main_query = ! $is_preview && (is_home() || is_archive() || is_search());

if (! $is_preview && ! $use_main_query) {
	return;
}

$heading = snd_psh_get_posts_archive_heading($title_attr, $is_preview);
$preview_query = null;

if (! $use_main_query) {
	$preview_query = new WP_Query([
		'posts_per_page' => (int) get_option('posts_per_page', 10),
		'post_type' => 'post',
		'post_status' => 'publish',
		'orderby' => 'date',
		'order' => 'DESC',
	]);
}

$has_posts = $use_main_query ? have_posts() : $preview_query->have_posts();
?>

<section <?php echo get_block_wrapper_attributes([
	'id' => $id,
	'class' => trim('wp-block-snd-posts-archive ' . $variant),
]); ?>>
	<div class="container">
		<?php if ($heading) : ?>
			<h2><?php echo $heading; ?></h2>
		<?php endif; ?>

		<?php if ($has_posts) : ?>
			<div class="swiper swiper-articles">
				<div class="swiper-wrapper">
					<?php
					if ($use_main_query) {
						while (have_posts()) {
							the_post();
							snd_psh_render_posts_archive_item();
						}
					} else {
						while ($preview_query->have_posts()) {
							$preview_query->the_post();
							snd_psh_render_posts_archive_item();
						}
						wp_reset_postdata();
					}
					?>
				</div>
			</div>

			<?php if ($use_main_query && $GLOBALS['wp_query']->max_num_pages > 1) : ?>
				<nav class="wp-block-snd-posts-archive__pagination navigation pagination" aria-label="<?php esc_attr_e('Записи', 'sndpshsite-blocks'); ?>">
					<div class="nav-links">
						<?php
						echo paginate_links([
							'total' => $GLOBALS['wp_query']->max_num_pages,
							'current' => max(1, (int) get_query_var('paged'), (int) get_query_var('page')),
							'prev_text' => '←',
							'next_text' => '→',
							'mid_size' => 2,
							'end_size' => 1,
						]);
						?>
					</div>
				</nav>
			<?php endif; ?>
		<?php else : ?>
			<p class="wp-block-snd-posts-archive__empty">
				<?php
				if (! $is_preview && is_search()) {
					esc_html_e('По вашему запросу ничего не найдено.', 'sndpshsite-blocks');
				} else {
					esc_html_e('Записи не найдены.', 'sndpshsite-blocks');
				}
				?>
			</p>
		<?php endif; ?>
	</div>
</section>
