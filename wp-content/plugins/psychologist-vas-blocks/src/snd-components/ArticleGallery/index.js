import { useSelect } from '@wordpress/data';

import {
	DEFAULT_IMAGE_SIZE,
	getImageItemDisplayUrl,
	getImageItemFullUrl,
	getPosterDisplayUrl,
	selectAttachmentRecord,
} from '../mediaSizes';

export function buildGalleryItems(featuredMedia, gallery = []) {
	const items = [];
	const galleryItems = Array.isArray(gallery) ? gallery : [];

	if (featuredMedia?.source_url) {
		items.push({
			type: 'image',
			id: featuredMedia.id,
			url: featuredMedia.source_url,
			thumbUrl:
				featuredMedia.media_details?.sizes?.large?.source_url ||
				featuredMedia.media_details?.sizes?.medium?.source_url ||
				featuredMedia.source_url,
			alt: featuredMedia.alt_text || '',
			size: DEFAULT_IMAGE_SIZE,
			isFeatured: true,
		});
	}

	galleryItems.forEach((item) => {
		if (!item?.url) {
			return;
		}

		if (item.id && items[0]?.id && item.id === items[0].id) {
			return;
		}

		items.push(item);
	});

	return items;
}

function GalleryItem({ item, featuredMedia, isEditor }) {
	const type = item?.type === 'video' ? 'video' : 'image';
	const imageAttachmentId = type === 'video' ? 0 : item?.id || 0;
	const posterAttachmentId = type === 'video' ? item?.poster?.id || 0 : 0;

	const imageMedia = useSelect(
		(select) => {
			if (item?.isFeatured && featuredMedia) {
				return featuredMedia;
			}

			return selectAttachmentRecord(select, imageAttachmentId);
		},
		[imageAttachmentId, item?.isFeatured, featuredMedia]
	);

	const posterMedia = useSelect(
		(select) => selectAttachmentRecord(select, posterAttachmentId),
		[posterAttachmentId]
	);

	const url = type === 'video' ? item?.url || '' : getImageItemFullUrl(item, imageMedia);
	const previewUrl =
		type === 'video'
			? getPosterDisplayUrl(item?.poster, posterMedia)
			: getImageItemDisplayUrl(item, imageMedia);
	const alt = item?.poster?.alt || item?.alt || '';

	if (type === 'video' && !url) {
		return null;
	}

	if (type !== 'video' && !previewUrl) {
		return null;
	}

	const className = type === 'video' ? 'glightbox1 video' : 'glightbox1';

	return (
		<a
			href={url || '#'}
			className={className}
			data-type={type === 'video' ? 'video' : undefined}
			data-source={type === 'video' ? 'local' : undefined}
			data-poster={type === 'video' && previewUrl ? previewUrl : undefined}
			onClick={isEditor ? (event) => event.preventDefault() : undefined}
		>
			{previewUrl ? (
				<img src={previewUrl} alt={alt} loading="lazy" />
			) : (
				isEditor &&
				type === 'video' && (
					<span className="wp-block-snd-article__media-placeholder">
						Добавьте постер для видео
					</span>
				)
			)}
		</a>
	);
}

export function useArticleGalleryItems(gallery = []) {
	const featuredImageId = useSelect(
		(select) => select('core/editor').getEditedPostAttribute('featured_media'),
		[]
	);

	const featuredMedia = useSelect(
		(select) => selectAttachmentRecord(select, featuredImageId),
		[featuredImageId]
	);

	return buildGalleryItems(featuredMedia, gallery);
}

export default function ArticleGallery({ items = [], isEditor = false }) {
	const featuredImageId = useSelect(
		(select) => select('core/editor').getEditedPostAttribute('featured_media'),
		[]
	);

	const featuredMedia = useSelect(
		(select) => selectAttachmentRecord(select, featuredImageId),
		[featuredImageId]
	);

	if (!items.length) {
		if (!isEditor) {
			return null;
		}

		return (
			<div className="wp-block-snd-article__media wp-block-snd-article__media--empty">
				<p>Добавьте изображение записи или элементы в галерею (настройки блока).</p>
			</div>
		);
	}

	return (
		<div className="wp-block-snd-article__media">
			{items.map((item, index) => (
				<GalleryItem
					key={`${item?.id || index}-${item?.type || 'image'}-${item?.size || ''}-${item?.poster?.size || ''}`}
					item={item}
					featuredMedia={featuredMedia}
					isEditor={isEditor}
				/>
			))}
		</div>
	);
}
