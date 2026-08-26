import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ArticleGallery, { useArticleGalleryItems } from '../snd-components/ArticleGallery';
import ArticleGalleryControls from '../snd-components/ArticleGallery/ArticleGalleryControls';

import './style.scss';
import './editor.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes }) => {
		const gallery = Array.isArray(attributes.gallery) ? attributes.gallery : [];
		const galleryItems = useArticleGalleryItems(gallery);

		const innerBlocksProps = useInnerBlocksProps(
			{},
			{
				template: [['snd/article-content']],
				allowedBlocks: ['snd/article-content'],
				templateLock: 'insert',
			}
		);

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Галерея', 'sndpshsite-blocks')} initialOpen={true}>
						<ArticleGalleryControls
							gallery={gallery}
							onChange={(items) => setAttributes({ gallery: items })}
						/>
					</PanelBody>
				</InspectorControls>

				<article {...useBlockProps({ className: 'wp-block-snd-article' })}>
					<div className="container">
						<div className="wp-block-snd-article__grid">
							<div {...innerBlocksProps} />
							<ArticleGallery items={galleryItems} isEditor />
						</div>
					</div>
				</article>
			</>
		);
	},
	save: () => {
		return <InnerBlocks.Content />;
	},
});
