<?php
$question = !empty($attributes['question']) ? wp_kses_post($attributes['question']) : '';
$answer = !empty($attributes['answer']) ? wp_kses_post($attributes['answer']) : '';
?>

<div class="wp-block-snd-faq__details-box">
	<details class="wp-block-snd-faq__details">
		<?php if ($question) : ?>
			<summary class="wp-block-snd-faq__summary"><?php echo $question; ?></summary>
		<?php endif; ?>
		<?php if ($answer) : ?>
			<div class="wp-block-snd-faq__content"><?php echo wp_kses_post($answer); ?></div>
		<?php endif; ?>
	</details>
</div>
