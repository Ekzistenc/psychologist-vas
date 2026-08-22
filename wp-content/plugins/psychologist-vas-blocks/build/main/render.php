<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$title = !empty($attributes['title']) ? wp_kses_post($attributes['title']) : '';
$subtitle = !empty($attributes['subtitle']) ? wp_kses_post($attributes['subtitle']) : '';
$image_bg = !empty($attributes['imageBg']) ? (array)$attributes['imageBg'] : [];
$image_mobile = !empty($attributes['imageMobile']) ? (array)$attributes['imageMobile'] : [];
$button = !empty($attributes['button']) ? (array)$attributes['button'] : [];

$currentSocListId = !empty($attributes['currentSocListId']) ? esc_attr($attributes['currentSocListId']) : '';
$currentSocList = [];

$socLists = get_option('snd_socials', []);
if ($socLists) {
	$currentSocList = !empty($socLists[$currentSocListId]['items']) ? (array)$socLists[$currentSocListId]['items'] : [];
}
?>

<main <?php echo get_block_wrapper_attributes([
				'id' => $id,
				'style' => !empty($image_bg['url']) ? 'background-image: url(' . esc_url($image_bg['url']) . ');' : '',
			]); ?>>

	<?php if ($image_mobile) : ?>
		<img
			src="<?php echo esc_url($image_mobile['url']); ?>"
			alt=""
			loading="lazy"
			class="wp-block-snd-main__img">
	<?php endif; ?>
	<div class="container">
		<div class="wp-block-snd-main__text">
			<?php if ($title) {
				echo '<h1>' . $title . '</h1>';
			} ?>

			<?php if ($subtitle) {
				echo '<h2>' . $subtitle . '</h2>';
			} ?>
			<?php if ($button) {
				$button_url = !empty($button['href']) ? esc_url($button['href']) : '#';
				$button_target = !empty($button['target']) ? esc_attr($button['target']) : '_self';
				$button_name = !empty($button['name']) ? esc_html($button['name']) : 'Записаться на консультацию →';

				echo '<a href="' . $button_url . '" target="' . $button_target . '" class="wp-block-snd-header__button menu-item">' . $button_name . '</a>';
			} ?>
		</div>
		<?php if ($currentSocList) : ?>
			<div class="wp-block-snd-main__soc">
				<?php
				foreach ($currentSocList as $socitem) {
					if (empty($socitem['link'])) {
						continue;
					}

					$soc_url = esc_url($socitem['link']);
					$soc_name = !empty($socitem['name']) ? esc_attr($socitem['name']) : '';
					$soc_icon_url = !empty($socitem['icon']['url']) ? esc_url($socitem['icon']['url']) : '';

					echo "<a href=\"{$soc_url}\" target=\"_blank\" title=\"{$soc_name}\" rel=\"noopener noreferrer\">";
					if ($soc_icon_url) {
						echo "<img src=\"{$soc_icon_url}\" alt=\"{$soc_name}\" loading=\"lazy\">";
					} elseif ($soc_name) {
						echo $soc_name;
					} else {
						echo $soc_url;
					}
					echo "</a>";
				}
				?>
			</div>
		<?php endif; ?>
	</div>
</main>