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

import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes }) => {
		const { title, variant } = attributes;

		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки">
						<TextControl
							label="Заголовок (только для главной / страницы записей)"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							help="На архивах, странице поиска и других страницах заголовок формируется автоматически."
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
					<ServerSideRender block="snd/posts-archive" attributes={attributes} />
				</div>
			</>
		);
	},
	save: () => null,
});
