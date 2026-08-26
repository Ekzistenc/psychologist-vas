<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$title = !empty($attributes['title']) ? esc_html($attributes['title']) : '';
$category_id = !empty($attributes['categoryId']) ? (int) $attributes['categoryId'] : 0;
$posts_count = !empty($attributes['postsCount']) ? (int) $attributes['postsCount'] : 10;
$variant = !empty($attributes['variant']) ? esc_attr($attributes['variant']) : '';

$query_args = [
	'posts_per_page' => $posts_count,
	'post_type' => 'post',
	'post_status' => 'publish',
	'orderby' => 'date',
	'order' => 'DESC',
];

if ($category_id) {
	$query_args['cat'] = $category_id;
}

$posts_query = new WP_Query($query_args);
?>

<section <?php echo get_block_wrapper_attributes([
	'id' => $id,
	'class' => $variant,
]); ?>>
	<div class="container">
		<?php if ($title) : ?>
			<h2><?php echo $title; ?></h2>
		<?php endif; ?>

		<?php if ($posts_query->have_posts()) : ?>
			<div class="swiper swiper-articles">
				<div class="swiper-wrapper">
					<?php while ($posts_query->have_posts()) : $posts_query->the_post(); ?>
						<a href="<?php the_permalink(); ?>" class="swiper-slide">
							<h3><?php the_title(); ?></h3>
							<?php if (has_excerpt()) : ?>
								<p><?php echo esc_html(get_the_excerpt()); ?></p>
							<?php else : ?>
								<p><?php echo esc_html(wp_trim_words(get_the_content(), 40, '...')); ?></p>
							<?php endif; ?>
						</a>
					<?php endwhile; ?>
				</div>
			</div>
			<div class="swiper-scrollbar swiper-scrollbar-articles"></div>
			<?php wp_reset_postdata(); ?>
		<?php else : ?>
			<p>Записи не найдены</p>
		<?php endif; ?>
	</div>
</section>
