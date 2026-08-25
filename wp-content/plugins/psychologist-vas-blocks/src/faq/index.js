import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
	InnerBlocks,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import SNDMediaUpload from '../snd-components/SNDMediaUpload';

import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes }) => {
		const { title, imageBg } = attributes;

		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'wp-block-snd-faq__details-wrapper' },
			{
				template: [
					['snd/faq-item'],
					['snd/faq-item'],
					['snd/faq-item'],
				],
				allowedBlocks: ['snd/faq-item'],
			}
		);

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
										url,
										alt: media?.alt || '',
										size,
										sizes: media?.sizes || {},
										type: 'image',
									},
								});
							}}
							allowedTypes={['image']}
							value={imageBg?.id}
							media={imageBg}
							onChangeMedia={(newImage) => setAttributes({ imageBg: newImage })}
							label="Фон секции"
							labelButton={`${imageBg?.url ? 'Изменить' : 'Выбрать'} изображение`}
						/>
					</PanelBody>
				</InspectorControls>

				<section
					{...useBlockProps({
						style: {
							backgroundImage: imageBg?.url ? `url('${imageBg.url}')` : null,
						},
					})}
				>
					<div className="container">
						<RichText
							tagName="h2"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							placeholder="Заголовок..."
						/>
						<div {...innerBlocksProps} />
					</div>
				</section>
			</>
		);
	},
	save: () => {
		return <InnerBlocks.Content />;
	},
});
