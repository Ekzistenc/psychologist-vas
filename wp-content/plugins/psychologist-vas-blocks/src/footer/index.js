import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Tip,
	TextControl,
} from '@wordpress/components';

import SNDUseNavigationEntities from '../snd-components/SNDUseNavigationEntities';
import SNDMediaUpload from '../snd-components/SNDMediaUpload';
import SNDSocList from '../snd-components/SNDSocList';

import './editor.scss';
import './style.scss';

import metadata from './block.json';

const normalizePhoneHref = (phone) => {
	let digits = phone.replace(/\D/g, '');

	if (digits.length === 10) {
		digits = '7' + digits;
	} else if (digits.length === 11 && digits.startsWith('8')) {
		digits = '7' + digits.slice(1);
	}

	return digits ? `+${digits}` : '';
};

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes }) => {
		const {
			title,
			formTitle,
			phone,
			imageBg,
			imageMobile,
			currentSocListId,
			currentSocList,
			menuFooterLinksLeft,
			menuFooterLinksRight,
		} = attributes;

		const { menus, hasMenus } = SNDUseNavigationEntities();
		const menusEditUrl = pshPluginObject?.menusEditUrl || '';

		const options = [{ value: 0, label: 'Не выбрано' }];
		if (hasMenus) {
			menus.forEach((item) => {
				options.push({ value: parseInt(item.id, 10), label: item.name });
			});
		}

		const innerBlocksProps = useInnerBlocksProps(
			{},
			{
				template: [['contact-form-7/contact-form-selector']],
				allowedBlocks: ['contact-form-7/contact-form-selector'],
				templateLock: false,
			}
		);

		return (
			<>
				<InspectorControls>
					<PanelBody title="Контакты">
						<TextControl
							label="Заголовок"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
						<TextControl
							label="Телефон"
							type="tel"
							value={phone?.numberPhone}
							onChange={(value) =>
								setAttributes({
									phone: {
										numberPhone: value,
										numberPhoneHref: normalizePhoneHref(value),
									},
								})
							}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
						<TextControl
							label="Телефон для ссылки"
							value={phone?.numberPhoneHref}
							onChange={(value) =>
								setAttributes({
									phone: {
										...phone,
										numberPhoneHref: value.replace(/[^0-9+]/g, ''),
									},
								})
							}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
						<TextControl
							label="Заголовок формы"
							value={formTitle}
							onChange={(value) => setAttributes({ formTitle: value })}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
						<hr />
						<SNDSocList
							currentSocListId={currentSocListId}
							onChangeSocListId={(value) => setAttributes({ currentSocListId: value })}
							onChangeSocList={(value) => setAttributes({ currentSocList: value })}
						/>
					</PanelBody>
					<PanelBody title="Изображения">
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
							label="Фон подвала"
							labelButton={`${imageBg?.url ? 'Изменить' : 'Выбрать'} изображение`}
						/>
						<SNDMediaUpload
							onSelect={(media) => {
								const size = imageMobile?.size || 'full';
								const url = media?.sizes?.[size]?.url || media?.url || '';
								setAttributes({
									imageMobile: {
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
							value={imageMobile?.id}
							media={imageMobile}
							onChangeMedia={(newImage) => setAttributes({ imageMobile: newImage })}
							label="Мобильное изображение"
							labelButton={`${imageMobile?.url ? 'Изменить' : 'Выбрать'} изображение`}
						/>
					</PanelBody>
					<PanelBody title="Ссылки в подвале">
						<Tip>
							Добавить и редактировать меню можно в разделе{' '}
							<a href={menusEditUrl} target="_blank" rel="noreferrer">
								Меню
							</a>
						</Tip>
						<br />
						<SelectControl
							label="Левая колонка ссылок"
							options={options}
							value={menuFooterLinksLeft}
							onChange={(val) =>
								setAttributes({ menuFooterLinksLeft: parseInt(val, 10) })
							}
						/>
						<SelectControl
							label="Правая колонка ссылок"
							options={options}
							value={menuFooterLinksRight}
							onChange={(val) =>
								setAttributes({ menuFooterLinksRight: parseInt(val, 10) })
							}
						/>
					</PanelBody>
				</InspectorControls>

				<footer
					{...useBlockProps({
						style: {
							backgroundImage: imageBg?.url ? `url('${imageBg.url}')` : null,
						},
					})}
				>
					{imageMobile?.url && (
						<img src={imageMobile.url} alt="" className="wp-block-snd-main__img" />
					)}
					<div className="wp-block-snd-footer__wrapper">
						<div className="container">
							<div className="wp-block-snd-footer__form-box">
								{title && <h2>{title}</h2>}
								<div className="wp-block-snd-footer__contacts">
									{phone?.numberPhone && (
										<div className="wp-block-snd-footer__contact">
											<span>Телефон</span>
											<a href={`tel:${phone.numberPhoneHref}`}>{phone.numberPhone}</a>
										</div>
									)}
									{currentSocList?.length > 0 && (
										<div className="wp-block-snd-footer__contact">
											<span>Соц сети</span>
											<div className="wp-block-snd-footer__soc">
												{currentSocList.map((item, index) =>
													item?.link ? (
														<a
															key={item?.id || index}
															href={item.link}
															style={
																item?.icon?.url
																	? { maskImage: `url('${item.icon.url}')` }
																	: undefined
															}
														/>
													) : null
												)}
											</div>
										</div>
									)}
								</div>
								{formTitle && <h3>{formTitle}</h3>}
								<div {...innerBlocksProps} />
							</div>
						</div>
					</div>
				</footer>
			</>
		);
	},
	save: () => {
		return <InnerBlocks.Content />;
	},
});
