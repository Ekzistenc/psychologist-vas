export const DEFAULT_IMAGE_SIZE = 'large';

export function selectAttachmentRecord(select, attachmentId) {
	if (!attachmentId) {
		return null;
	}

	return select('core').getEntityRecord('postType', 'attachment', attachmentId);
}

export function resolveAttachmentUrl(media, size, fallback = '') {
	if (!media) {
		return fallback;
	}

	const sizes = media.media_details?.sizes || {};

	if (sizes[size]?.source_url) {
		return sizes[size].source_url;
	}

	return media.source_url || fallback;
}

export function resolveMetaSizeUrl(metaSizes, size, fallback = '') {
	if (metaSizes?.[size]?.url) {
		return metaSizes[size].url;
	}

	return fallback;
}

export function getImageItemDisplayUrl(item, media = null) {
	const size = item?.size || DEFAULT_IMAGE_SIZE;
	const fallback = item?.thumbUrl || item?.url || '';

	if (media) {
		const fromStore = resolveAttachmentUrl(media, size, '');

		if (fromStore) {
			return fromStore;
		}
	}

	return resolveMetaSizeUrl(item?.sizes, size, fallback);
}

export function getImageItemFullUrl(item, media = null) {
	const fallback = item?.url || item?.thumbUrl || '';

	if (media) {
		return (
			resolveAttachmentUrl(media, 'full', '') ||
			resolveAttachmentUrl(media, 'large', '') ||
			media.source_url ||
			fallback
		);
	}

	return resolveMetaSizeUrl(item?.sizes, 'full', fallback);
}

export function getPosterDisplayUrl(poster, media = null) {
	if (!poster) {
		return '';
	}

	const size = poster?.size || DEFAULT_IMAGE_SIZE;
	const fallback = poster?.url || '';

	if (media) {
		const fromStore = resolveAttachmentUrl(media, size, '');

		if (fromStore) {
			return fromStore;
		}
	}

	return resolveMetaSizeUrl(poster?.sizes, size, fallback);
}

export function collectGalleryAttachmentIds(gallery = [], featuredImageId = 0) {
	const ids = new Set();

	if (featuredImageId) {
		ids.add(featuredImageId);
	}

	gallery.forEach((item) => {
		if (item?.id) {
			ids.add(item.id);
		}

		if (item?.poster?.id) {
			ids.add(item.poster.id);
		}
	});

	return [...ids];
}
