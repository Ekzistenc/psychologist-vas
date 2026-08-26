import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes }) => {
		const { title, categoryId, postsCount, variant } = attributes;

		const categories = useSelect((select) => {
			return select(coreStore).getEntityRecords('taxonomy', 'category', {
				per_page: -1,
			});
		}, []);

		const categoryOptions = [{ value: 0, label: 'Все записи' }];
		if (categories) {
			categories.forEach((cat) => {
				categoryOptions.push({ value: cat.id, label: cat.name });
			});
		}

		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки">
						<TextControl
							label="Заголовок"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
						<SelectControl
							label="Категория"
							value={categoryId}
							options={categoryOptions}
							onChange={(value) => setAttributes({ categoryId: parseInt(value, 10) })}
						/>
						<TextControl
							label="Количество записей"
							type="number"
							value={postsCount}
							onChange={(value) =>
								setAttributes({ postsCount: parseInt(value, 10) || 10 })
							}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
						<SelectControl
							label="Вариант оформления"
							value={variant}
							options={[
								{ label: 'Обычный', value: '' },
								{ label: 'Домашняя психология', value: 'home' },
								{ label: 'Дискуссионный клуб', value: 'dis' },
							]}
							onChange={(value) => setAttributes({ variant: value })}
						/>
					</PanelBody>
				</InspectorControls>
				<div {...useBlockProps()}>
					<ServerSideRender block="snd/articles" attributes={attributes} />
				</div>
			</>
		);
	},
	save: () => null,
});
