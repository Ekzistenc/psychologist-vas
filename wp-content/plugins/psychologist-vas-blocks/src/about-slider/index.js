import { registerBlockType } from '@wordpress/blocks';
import {
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import { gallery } from '@wordpress/icons';
import metadata from './block.json';

registerBlockType(metadata.name, {
	icon: gallery,
	edit: ({ }) => {
		const innerBlocksProps = useInnerBlocksProps({
			className: 'swiper-wrapper'
		}, {
			template: [
				['snd/about-slide'],
			// 	['snd/about-text']
			],
			allowedBlocks: ['snd/about-slide'],
			orientation: 'horizontal'
		});

		return (
			<>
				<div {...useBlockProps({ className: 'swiper swiper-about' })}>
					<div className="swiper-button-prev swiper-about-prev"></div>
					<div {...innerBlocksProps} />
					<div className="swiper-button-next swiper-about-next"></div>
				</div>
			</>
		);
	},
	save: () => {
		return <InnerBlocks.Content />;
	}
});