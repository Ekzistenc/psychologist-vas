<?php

if (! defined('ABSPATH')) {
	exit;
}

/**
 * @return string
 */
function snd_psh_get_posts_archive_heading($title_attr, $is_preview = false)
{
	if ($is_preview) {
		return esc_html($title_attr);
	}

	if (is_home()) {
		return esc_html($title_attr);
	}

	if (is_search()) {
		return sprintf(
			/* translators: %s: search query. */
			esc_html__('Результаты поиска: «%s»', 'sndpshsite-blocks'),
			get_search_query()
		);
	}

	if (is_category() || is_tag() || is_tax()) {
		return single_term_title('', false);
	}

	if (is_author()) {
		$author = get_queried_object();

		return $author instanceof WP_User ? esc_html($author->display_name) : '';
	}

	if (is_date()) {
		if (is_day()) {
			return get_the_date();
		}

		if (is_month()) {
			return get_the_date('F Y');
		}

		if (is_year()) {
			return get_the_date('Y');
		}
	}

	if (is_post_type_archive()) {
		return post_type_archive_title('', false);
	}

	if (is_archive()) {
		return wp_strip_all_tags(get_the_archive_title());
	}

	return '';
}

function snd_psh_render_posts_archive_item()
{
	?>
	<a href="<?php the_permalink(); ?>" class="swiper-slide">
		<h3><?php the_title(); ?></h3>
		<?php if (has_excerpt()) : ?>
			<p><?php echo esc_html(get_the_excerpt()); ?></p>
		<?php else : ?>
			<p><?php echo esc_html(wp_trim_words(get_the_content(), 40, '...')); ?></p>
		<?php endif; ?>
	</a>
	<?php
}
