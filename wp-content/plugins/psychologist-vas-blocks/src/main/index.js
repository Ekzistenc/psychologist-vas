import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl
} from '@wordpress/components';
import SNDMediaUpload from '../snd-components/SNDMediaUpload';

import SNDSocList from '../snd-components/SNDSocList';

import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {

	edit: ({ attributes, setAttributes }) => {
		const {
			title,
			subtitle,
			imageBg,
			imageMobile,
			currentSocListId,
			currentSocList,
			button } = attributes;

		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки блока">
						<TextareaControl
							label="Заголовок"
							value={title}
							onChange={(value) =>
								setAttributes({ title: value })
							}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize
						/>
						<TextareaControl
							label="Подзаголовок"
							value={subtitle}
							onChange={(value) =>
								setAttributes({ subtitle: value })
							}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize
						/>
						<hr />
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
						<SNDMediaUpload
							onSelect={(media) => {
								const size = imageMobile?.size || 'full';
								const url = media?.sizes?.[size]?.url || media?.url || '';

								setAttributes({
									imageMobile: {
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
							value={imageMobile.id}
							media={imageMobile}
							onChangeMedia={(newImage) => {
								setAttributes({
									imageMobile: newImage
								});
							}}
							label='Выбрать мобильное изображение'
							labelButton={`${imageMobile?.url ? 'Изменить' : 'Выбрать'} мобильное изображение`}
						/>
						<hr />
						<TextControl
							label="Текст кнопки"
							value={button?.name}
							onChange={(value) =>
								setAttributes({
									button: {
										...button,
										name: value
									}
								})
							}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize
						/>
						<TextControl
							label="URL кнопки"
							type="url"
							value={button?.href}
							onChange={(value) =>
								setAttributes({
									button: {
										...button,
										href: value
									}
								})
							}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize
						/>
						<hr />
						<SNDSocList
							currentSocListId={currentSocListId}
							onChangeSocListId={(value) => {
								setAttributes({ currentSocListId: value })
							}}
							onChangeSocList={(value) => {
								setAttributes({ currentSocList: value })
							}}
						/>


					</PanelBody>
				</InspectorControls>

				<main {...useBlockProps({ style: { backgroundImage: imageBg?.url ? `url('${imageBg?.url}')` : null } })}>

					<div className="container">
						<div className="wp-block-snd-main__text">
							<RichText
								tagName="h1"
								value={title}
								onChange={(value) => setAttributes({ title: value })}
								placeholder="Введите заголовок..."
							/>
							<RichText
								tagName="h2"
								value={subtitle}
								onChange={(value) => setAttributes({ subtitle: value })}
								placeholder="Введите подзаголовок..."
							/>
							<a
								href="#"
								className="wp-block-snd-header__button menu-item"
								target="_self">
								{button?.name}
							</a>
						</div>
						{(currentSocList && currentSocList.length > 0) && (
							<div className="wp-block-snd-main__soc">
								{currentSocList.map((item, index) => {
									if (!item?.link) {
										return null;
									}
									return (
										<span
											className="wp-block-snd-main__soc--item"
											key={item?.id ? item.id : index}
											href={item.link}
											target="_blank"
											rel="noopener noreferrer"
										>
											{item?.icon?.url && <img src={item.icon.url} alt={item?.name || null} />}
											{!item?.icon?.url && <span>{item?.name || item.link}</span>}
										</span>
									)
								})}


							</div>
						)}
					</div>
				</main>
			</>

		);
	},

	save: () => {
		return null;
	},
});
