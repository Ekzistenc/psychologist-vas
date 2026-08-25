import { DEFAULT_IMAGE_SIZE } from '../mediaSizes';

export const emptyGalleryItem = () => ({
	type: 'image',
	id: 0,
	url: '',
	thumbUrl: '',
	alt: '',
	filename: '',
	size: DEFAULT_IMAGE_SIZE,
	sizes: {},
	poster: { id: 0, url: '', alt: '', size: DEFAULT_IMAGE_SIZE, sizes: {} },
});

export function buildImageFieldsFromMedia(media, size = DEFAULT_IMAGE_SIZE) {
	const sizes = media?.sizes || {};
	const fullUrl = sizes.full?.url || media?.url || '';
	const displayUrl = sizes[size]?.url || fullUrl;

	return {
		id: media?.id || 0,
		url: fullUrl,
		thumbUrl: displayUrl,
		alt: media?.alt || '',
		size,
		sizes,
	};
}

export function buildImageFieldsFromMediaChange(item, media) {
	if (!media?.url && !media?.id) {
		return {
			id: 0,
			url: '',
			thumbUrl: '',
			alt: '',
			size: DEFAULT_IMAGE_SIZE,
			sizes: {},
		};
	}

	const size = media?.size || item?.size || DEFAULT_IMAGE_SIZE;
	const sizes = media?.sizes || item?.sizes || {};
	const fullUrl = sizes.full?.url || item?.url || media?.url || '';
	const displayUrl = sizes[size]?.url || media?.url || fullUrl;

	return {
		id: media?.id || item?.id || 0,
		url: fullUrl,
		thumbUrl: displayUrl,
		alt: media?.alt ?? item?.alt ?? '',
		size,
		sizes,
	};
}

export function buildImageMediaProp(item) {
	return {
		id: item?.id || 0,
		url: item?.thumbUrl || item?.url || '',
		alt: item?.alt || '',
		size: item?.size || DEFAULT_IMAGE_SIZE,
		sizes: item?.sizes || {},
		type: 'image',
	};
}

export function buildPosterMediaProp(poster) {
	return {
		id: poster?.id || 0,
		url: poster?.url || '',
		alt: poster?.alt || '',
		size: poster?.size || DEFAULT_IMAGE_SIZE,
		sizes: poster?.sizes || {},
		type: 'image',
	};
}
