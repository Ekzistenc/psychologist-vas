<?php

if (! defined('ABSPATH')) {
	exit;
}

function snd_psh_get_attachment_url_by_size($attachment_id, $size, $fallback = '')
{
	$attachment_id = (int) $attachment_id;

	if ($attachment_id <= 0) {
		return $fallback;
	}

	$url = wp_get_attachment_image_url($attachment_id, $size);

	return $url ?: $fallback;
}

/**
 * @param array<int, array<string, mixed>> $gallery
 * @return array<int, array<string, mixed>>
 */
function snd_psh_build_gallery_items($post_id, array $gallery = [])
{
	$post_id = (int) $post_id;
	$items = [];

	if ($post_id && has_post_thumbnail($post_id)) {
		$thumb_id = (int) get_post_thumbnail_id($post_id);
		$full_url = wp_get_attachment_image_url($thumb_id, 'full');
		$display_url = wp_get_attachment_image_url($thumb_id, 'large') ?: $full_url;

		if ($full_url) {
			$items[] = [
				'type' => 'image',
				'id' => $thumb_id,
				'url' => $full_url,
				'thumbUrl' => $display_url,
				'alt' => (string) get_post_meta($thumb_id, '_wp_attachment_image_alt', true),
				'isFeatured' => true,
			];
		}
	}

	foreach ($gallery as $item) {
		if (! is_array($item) || empty($item['url'])) {
			continue;
		}

		$item_id = ! empty($item['id']) ? (int) $item['id'] : 0;

		if ($item_id && ! empty($items[0]['id']) && $item_id === (int) $items[0]['id']) {
			continue;
		}

		$items[] = $item;
	}

	return $items;
}

/**
 * @param array<int, array<string, mixed>> $items
 */
function snd_psh_render_post_gallery_items(array $items)
{
	if (empty($items)) {
		return;
	}
	?>
	<div class="wp-block-snd-article__media">
		<?php foreach ($items as $item) :
			$type = ! empty($item['type']) && $item['type'] === 'video' ? 'video' : 'image';
			$attachment_id = ! empty($item['id']) ? (int) $item['id'] : 0;
			$url = ! empty($item['url']) ? $item['url'] : '';
			$thumb_url = ! empty($item['thumbUrl']) ? $item['thumbUrl'] : $url;
			$alt = ! empty($item['alt']) ? $item['alt'] : '';

			if (! $url) {
				continue;
			}

			if ($type === 'image') {
				$size = ! empty($item['size']) ? $item['size'] : 'large';
				$url = snd_psh_get_attachment_url_by_size($attachment_id, 'full', $url);
				$thumb_url = snd_psh_get_attachment_url_by_size($attachment_id, $size, $thumb_url);
			}

			if ($type === 'video') {
				$poster = is_array($item['poster'] ?? null) ? $item['poster'] : [];
				$poster_id = ! empty($poster['id']) ? (int) $poster['id'] : 0;
				$poster_size = ! empty($poster['size']) ? $poster['size'] : 'large';
				$poster_url = snd_psh_get_attachment_url_by_size(
					$poster_id,
					$poster_size,
					! empty($poster['url']) ? $poster['url'] : ''
				);
				$poster_alt = ! empty($poster['alt']) ? $poster['alt'] : $alt;
				?>
				<a
					href="<?php echo esc_url($url); ?>"
					class="glightbox1 video"
					data-type="video"
					data-source="local"
					<?php if ($poster_url) : ?>
						data-poster="<?php echo esc_url($poster_url); ?>"
					<?php endif; ?>
				>
					<?php if ($poster_url) : ?>
						<img src="<?php echo esc_url($poster_url); ?>" alt="<?php echo esc_attr($poster_alt); ?>" loading="lazy" />
					<?php endif; ?>
				</a>
				<?php
				continue;
			}
			?>
			<a href="<?php echo esc_url($url); ?>" class="glightbox1">
				<img src="<?php echo esc_url($thumb_url); ?>" alt="<?php echo esc_attr($alt); ?>" loading="lazy" />
			</a>
		<?php endforeach; ?>
	</div>
	<?php
}
