import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import './style.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: () => {
		const blockProps = useBlockProps({ className: 'wp-block-snd-article__text' });
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			template: [
				['core/heading', { level: 2, placeholder: 'Заголовок' }],
				['core/heading', { level: 3, placeholder: 'Подзаголовок' }],
				['core/paragraph', { placeholder: 'Текст статьи...' }],
			],
			allowedBlocks: ['core/heading', 'core/paragraph', 'core/list'],
			templateLock: false,
		});

		return <div {...innerBlocksProps} />;
	},
	save: () => {
		return (
			<div className="wp-block-snd-article__text">
				<InnerBlocks.Content />
			</div>
		);
	},
});
