import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: () => {
		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'wp-block-snd-about__text' },
			{
				template: [
					['core/heading', { level: 2, content: 'Обо мне' }],
					['core/heading', { level: 3, content: 'Образование и квалификация' }],
					['core/paragraph', { placeholder: 'Текст...' }],
				],
				allowedBlocks: ['core/heading', 'core/paragraph', 'core/list'],
			}
		);

		return <div {...useBlockProps()}><div {...innerBlocksProps} /></div>;
	},
	save: () => {
		return <InnerBlocks.Content />;
	},
});
