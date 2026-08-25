import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody
} from '@wordpress/components';
import SNDMediaUpload from '../snd-components/SNDMediaUpload';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes }) => {
		const { image } = attributes;


		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки">
						<SNDMediaUpload
							onSelect={(media) => {
								const size = image?.size || 'full';
								const url = media?.sizes?.[size]?.url || media?.url || '';

								setAttributes({
									image: {
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
							value={image.id}
							media={image}
							onChangeMedia={(newImage) => {
								setAttributes({
									image: newImage
								});
							}}
							label='Выбрать изображение'
							labelButton={`${image?.url ? 'Изменить' : 'Выбрать'} изображение`}
						/>
					</PanelBody>
				</InspectorControls>

				<div {...useBlockProps({ className: 'swiper-slide' })}>
					{image?.url && (
						<a href="#" className="glightbox1">
							<img src={image.url} alt="" />
						</a>
					)
					}
				</div>
			</>
		);
	},
	save: () => {
		return null;
	}
});