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

import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes }) => {
		const { colorHeader, menuHeader, menuMobile, button } = attributes;

		const { menus, hasMenus } = SNDUseNavigationEntities();
		const menusEditUrl = pshPluginObject?.menusEditUrl || '';

		const options = [{ value: 0, label: 'Не выбрано' }];
		if (hasMenus) {
			menus.forEach((item) => {
				options.push({ value: parseInt(item.id, 10), label: item.name });
			});
		}

		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'wp-block-snd-header__wrapper' },
			{
				template: [
					['snd/header-links'],
					['snd/header-buttons'],
				],
				allowedBlocks: ['snd/header-links', 'snd/header-buttons'],
				templateLock: 'all',
			}
		);

		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки шапки">
						<SelectControl
							label="Цвет шапки"
							value={colorHeader}
							options={[
								{ label: 'Светлый', value: '' },
								{ label: 'Синий', value: 'blue' },
							]}
							onChange={(value) => setAttributes({ colorHeader: value })}
						/>
					</PanelBody>
					<PanelBody title="Меню">
						<Tip>
							Добавить и редактировать меню можно в разделе{' '}
							<a href={menusEditUrl} target="_blank" rel="noreferrer">
								Меню
							</a>
						</Tip>
						<br />
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label="Меню в шапке"
							options={options}
							value={menuHeader}
							onChange={(val) => setAttributes({ menuHeader: parseInt(val, 10) })}
							help={
								menusEditUrl && menuHeader ? (
									<a href={`${menusEditUrl}?menu=${menuHeader}`} target="_blank" rel="noreferrer">
										Редактировать меню
									</a>
								) : null
							}
						/>
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label="Мобильное меню"
							options={options}
							value={menuMobile}
							onChange={(val) => setAttributes({ menuMobile: parseInt(val, 10) })}
							help={
								menusEditUrl && menuMobile ? (
									<a href={`${menusEditUrl}?menu=${menuMobile}`} target="_blank" rel="noreferrer">
										Редактировать меню
									</a>
								) : null
							}
						/>
						<TextControl
							label="Текст кнопки"
							value={button?.name}
							onChange={(value) =>
								setAttributes({ button: { ...button, name: value } })
							}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
						<TextControl
							label="URL кнопки"
							type="url"
							value={button?.href}
							onChange={(value) =>
								setAttributes({ button: { ...button, href: value } })
							}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
					</PanelBody>
				</InspectorControls>

				<header {...useBlockProps({ className: colorHeader })}>
					<div className="container">
						<div {...innerBlocksProps} />
					</div>
				</header>
			</>
		);
	},
	save: () => {
		return <InnerBlocks.Content />;
	},
});
