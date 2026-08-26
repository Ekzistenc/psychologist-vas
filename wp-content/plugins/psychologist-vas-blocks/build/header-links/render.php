<?php
$menu_header = !empty($attributes['menuHeader']) ? (int) $attributes['menuHeader'] : 0;
?>

<?php
wp_nav_menu([
	'menu' => $menu_header,
	'container' => 'nav',
	'container_class' => 'wp-block-snd-nav',
	'menu_class' => 'wp-block-snd-nav__menu',
	'echo' => true,
	'fallback_cb' => false,
	'depth' => 1,
	'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
]);
?>
