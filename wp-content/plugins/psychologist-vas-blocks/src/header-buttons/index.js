import { useEffect } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes, context }) => {
		const { button } = attributes;
		const parentButton = context?.['snd/headerButton'];

		useEffect(() => {
			if (
				parentButton !== undefined &&
				JSON.stringify(parentButton) !== JSON.stringify(button)
			) {
				setAttributes({ button: parentButton });
			}
		}, [parentButton, button]);

		const buttonUrl = button?.href || '#contacts';
		const buttonName = button?.name || 'Записаться на консультацию →';

		return (
			<div {...useBlockProps({ className: 'wp-block-snd-header__buttons' })}>
				<a href={buttonUrl} className="wp-block-snd-header__button menu-item">
					{buttonName}
				</a>
				<span className="wp-block-snd-burger-button" role="button" tabIndex={0}>
					<span />
					<span />
					<span />
				</span>
			</div>
		);
	},
	save: () => null,
});
