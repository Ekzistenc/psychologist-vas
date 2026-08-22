<?php

/**
 * Plugin Name:       [ BLOCKS Psychologist V.A.Smirnova ]
 * Description:       Блоки для темы "Психолог Смирнова В.А.".
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            S&D
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       psychologist-vas-blocks
 * Requires Plugins:   psychologist-vas-core
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

define("SND_PSH_BLOCKS_DIR", plugin_dir_path(__FILE__));
define("SND_PSH_BLOCKS_URL", plugin_dir_url(__FILE__));

require_once SND_PSH_BLOCKS_DIR . 'includes/soclist.php';

function snd_block_categories($categories)
{
	$include = true;

	foreach ($categories as $category) {
		if ('snd-blocks' === $category['slug']) {
			$include = false;
		}
	}

	if ($include) {
		$categories = array_merge(
			[
				[
					'slug'  => 'snd-blocks',
					'title' => 'SND PSH Site Blocks',
				],
			],
			$categories
		);
	}
	return $categories;
}
add_filter('block_categories_all', 'snd_block_categories');

function create_block_psychologist_vas_blocks_block_init()
{
	if (function_exists('wp_register_block_types_from_metadata_collection')) {
		wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
		return;
	}

	if (function_exists('wp_register_block_metadata_collection')) {
		wp_register_block_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
	}

	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach (array_keys($manifest_data) as $block_type) {
		register_block_type(__DIR__ . "/build/{$block_type}");
	}
}
add_action('init', 'create_block_psychologist_vas_blocks_block_init');

add_action('admin_head', function () {
?>
	<script id="psh-blocks-plugin-object">
		const scriptPluginObject = {
			assets: "<?php echo SND_PSH_BLOCKS_URL; ?>assets/"
		};
	</script>
<?php
}, 1);

add_action('admin_enqueue_scripts', function () {
	$page_for_posts_id = get_option('page_for_posts');
	$page_for_posts_url = $page_for_posts_id ? esc_url(get_permalink($page_for_posts_id)) : '';

	$inline_script = sprintf(
		'const pshPluginObject = {
				assets: "%sassets/",
				postPageUrl: "%s",
				menusEditUrl: "%s",
				adminUrl: "%s"
			};',
		esc_url(SND_PSH_BLOCKS_URL),
		esc_url($page_for_posts_url),
		esc_url(admin_url('nav-menus.php')),
		esc_url(admin_url())
	);

	wp_add_inline_script('wp-block-editor', $inline_script, 'before');
}, 0);

function snd_register_bls_block_assets()
{
	wp_register_script(
		'glightbox',
		plugins_url('assets/js/glightbox.min.js', __FILE__),
		[],
		false,
		true
	);
	wp_register_script(
		'swiper',
		plugins_url('assets/js/swiper-bundle.min.js', __FILE__),
		[],
		false,
		true
	);

	wp_register_style(
		'glightbox',
		plugins_url('assets/css/glightbox.min.css', __FILE__)
	);
	wp_register_style(
		'swiper',
		plugins_url('assets/css/swiper-bundle.min.css', __FILE__)
	);
}
add_action('wp_enqueue_scripts', 'snd_register_bls_block_assets');

function snd_theme_setup()
{
	register_nav_menus();
}
add_action('after_setup_theme', 'snd_theme_setup');
