<?php
add_filter('doing_it_wrong_trigger_error', function ($status, $function_name) {
	if ('_load_textdomain_just_in_time' === $function_name) {
		return false;
	}
	return $status;
}, 10, 2);