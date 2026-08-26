import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: () => (
		<div {...useBlockProps({ className: 'wp-block-snd-bread-crumbs' })}>
			<div className="container">
				<ul
					{...useInnerBlocksProps(
						{ className: 'wp-block-snd-bread-crumbs__list' },
						{
							template: [['core/breadcrumbs']],
							allowedBlocks: ['core/breadcrumbs', 'yoast-seo/breadcrumbs'],
							templateLock: false,
							orientation: 'horizontal',
						}
					)}
				/>
			</div>
		</div>
	),
	save: () => {
		return <InnerBlocks.Content />;
	},
});
