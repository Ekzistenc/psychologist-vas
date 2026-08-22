import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
} from '@wordpress/components';

import './editor.scss';
import './style.scss';
import { inlineImage } from '@wordpress/icons';

import SNDMediaUpload from '../snd-components/SNDMediaUpload';

import metadata from './block.json';

registerBlockType(metadata.name, {
	icon: inlineImage,
	edit: ({ attributes, setAttributes }) => {
		const { imageBg } = attributes;

		const innerBlocksProps = useInnerBlocksProps({
			className: 'container'
		}, {
			template: [
				['snd/about-slider'],
			// 	['snd/about-text']
			],
			allowedBlocks: ['snd/about-slider', 'snd/about-text'],
			orientation: 'horizontal'
		});

		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки">
						<SNDMediaUpload
							onSelect={(media) => {
								const size = imageBg?.size || 'full';
								const url = media?.sizes?.[size]?.url || media?.url || '';

								setAttributes({
									imageBg: {
										id: media?.id || 0,
										url: url,
										alt: media?.alt || '',
										size: size,
										sizes: media?.sizes || {},
										type: 'image',
									},
								});
							}}
							allowedTypes={['image']}
							value={imageBg.id}
							media={imageBg}
							onChangeMedia={(newImage) => {
								setAttributes({
									imageBg: newImage
								});
							}}
							label='Выбрать изображение'
							labelButton={`${imageBg?.url ? 'Изменить' : 'Выбрать'} изображение`}
						/>
					</PanelBody>
				</InspectorControls>

				<section {...useBlockProps({ style: { backgroundImage: imageBg?.url ? `url('${imageBg?.url}')` : null } })}>
						<div {...innerBlocksProps} />
				</section>
			</>
		);
	},
	save: () => {
		return <InnerBlocks.Content />;
	}
});