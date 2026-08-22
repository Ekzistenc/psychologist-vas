<?php

/**
 * Plugin Name: [ CORE Psychologist V.A.Smirnova ]
 * Description: Функционал темы "Психолог Смирнова В.А.": настройки, дополнительные параметры
 *
 * Author URI:  https://siteanddesign.ru
 * Author:      S&D
 *
 * Requires at least: 6.7.1
 * Requires PHP: 8.1
 *
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * Version:     1.0
 */

if (!defined('ABSPATH')) exit;

define("SND_PSH_DIR", plugin_dir_path(__FILE__));
define("SND_PSH_URL", plugin_dir_url(__FILE__));
define('SND_PSH_CORE_VERSION', '1.0.0');

require_once(SND_PSH_DIR . 'includes/navmenu_custom_fields.php');

add_filter('wpcf7_autop_or_not', '__return_false');

function snd_core_enqueue_blocks_editor_assets()
{
	wp_enqueue_script(
		'insert-nbsp-button',
		plugins_url('assets/js/insert-nbsp-button.js', __FILE__),
		['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-rich-text']
	);
}
add_action('enqueue_block_editor_assets', 'snd_core_enqueue_blocks_editor_assets');


function snd_core_enqueue_scripts()
{
	wp_enqueue_style(
		'snd-contact-form-7',
		plugins_url('assets/js/contact-form-7.js', __FILE__),
		[]
	);
}
add_action('enqueue_scripts', 'snd_core_enqueue_scripts');

function snd_wpcf7_validate($result) {
	$timestamp = isset($_POST['form_loaded'])
		? (int) $_POST['form_loaded']
		: 0;

	if (! $timestamp) {
		$result->invalidate('', 'Spam detected.');
		return $result;
	}

	$diff = time() - $timestamp;

	if ($diff < 5) {
		$result->invalidate('', 'Spam detected.');
		return $result;
	}

	if ($diff > DAY_IN_SECONDS) {
		$result->invalidate('', 'Form expired.');
	}

	return $result;
}
add_filter('wpcf7_validate', 'snd_wpcf7_validate', 20, 1);
