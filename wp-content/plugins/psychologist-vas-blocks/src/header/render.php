<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$color_header = !empty($attributes['colorHeader']) ? esc_attr($attributes['colorHeader']) : '';
$menu_mobile = !empty($attributes['menuMobile']) ? (int) $attributes['menuMobile'] : 0;
$button = !empty($attributes['button']) ? (array) $attributes['button'] : [];
$button_url = !empty($button['href']) ? esc_url($button['href']) : '#contacts';
$button_name = !empty($button['name']) ? esc_html($button['name']) : 'Записаться на консультацию →';
?>

<header <?php echo get_block_wrapper_attributes(['id' => $id, 'class' => $color_header]); ?>>
	<div class="container">
		<div class="wp-block-snd-header__wrapper">
			<?php echo $content; ?>
		</div>
	</div>
</header>

<nav class="wp-block-snd-burger">
	<div class="wp-block-snd-burger__wrapper">
		<?php
		wp_nav_menu([
			'menu' => $menu_mobile,
			'container' => 'nav',
			'container_class' => 'wp-block-snd-nav',
			'menu_class' => 'wp-block-snd-nav__menu',
			'echo' => true,
			'fallback_cb' => false,
			'depth' => 1,
			'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
		]);
		?>
		<a href="<?php echo $button_url; ?>" class="wp-block-snd-header__button menu-item">
			<?php echo $button_name; ?>
		</a>
	</div>
</nav>
