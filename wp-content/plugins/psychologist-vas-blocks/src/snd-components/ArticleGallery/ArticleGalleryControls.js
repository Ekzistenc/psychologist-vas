import { useSelect } from '@wordpress/data';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import SNDRepeater from '../SNDRepeater';
import SNDMediaUpload from '../SNDMediaUpload';
import {
	getImageItemDisplayUrl,
	getPosterDisplayUrl,
	selectAttachmentRecord,
	DEFAULT_IMAGE_SIZE,
} from '../mediaSizes';
import {
	emptyGalleryItem,
	buildImageFieldsFromMedia,
	buildImageFieldsFromMediaChange,
	buildImageMediaProp,
	buildPosterMediaProp,
} from './galleryHelpers';

import '../SNDRepeater/style.scss';
import '../SNDMediaUpload/style.scss';

function GalleryItemPreviewThumb({ item }) {
	const attachmentId =
		item?.type === 'video' ? item?.poster?.id || 0 : item?.id || 0;

	const media = useSelect(
		(select) => selectAttachmentRecord(select, attachmentId),
		[attachmentId]
	);

	const previewUrl =
		item?.type === 'video'
			? getPosterDisplayUrl(item?.poster, media)
			: getImageItemDisplayUrl(item, media);

	return previewUrl ? <img src={previewUrl} alt="" /> : null;
}

export default function ArticleGalleryControls({ gallery = [], onChange }) {
	const items = Array.isArray(gallery) ? gallery : [];

	const updateGallery = (nextItems) => {
		onChange(nextItems);
	};

	const updateItem = (index, patch) => {
		updateGallery(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
	};

	const onAdd = () => {
		updateGallery([...items, emptyGalleryItem()]);
	};

	const onRemove = (index) => {
		updateGallery(items.filter((_, i) => i !== index));
	};

	const onChangeField = (index, field, value) => {
		updateItem(index, { [field]: value });
	};

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const next = [...items];
		const [moved] = next.splice(result.source.index, 1);
		next.splice(result.destination.index, 0, moved);
		updateGallery(next);
	};

	return (
		<SNDRepeater
			items={items}
			onAdd={onAdd}
			onChange={onChangeField}
			onRemove={onRemove}
			onDragEnd={onDragEnd}
			droppableId="article-gallery"
			addButtonText={__('Добавить элемент', 'sndpshsite-blocks')}
			renderItemTitle={(item, index) =>
				item?.type === 'video'
					? `${__('Видео', 'sndpshsite-blocks')} ${index + 1}`
					: `${__('Изображение', 'sndpshsite-blocks')} ${index + 1}`
			}
			renderItemPreview={(item) => <GalleryItemPreviewThumb item={item} />}
		>
			{({ item, index }) => (
				<>
					<SelectControl
						label={__('Тип', 'sndpshsite-blocks')}
						value={item?.type || 'image'}
						options={[
							{ label: __('Изображение', 'sndpshsite-blocks'), value: 'image' },
							{ label: __('Видео', 'sndpshsite-blocks'), value: 'video' },
						]}
						onChange={(value) => {
							if (value === 'video') {
								updateItem(index, {
									type: 'video',
									poster: item?.poster || {
										id: 0,
										url: '',
										alt: '',
										size: DEFAULT_IMAGE_SIZE,
										sizes: {},
									},
									thumbUrl: item?.poster?.url || '',
								});
								return;
							}

							updateItem(index, {
								type: 'image',
								poster: {
									id: 0,
									url: '',
									alt: '',
									size: DEFAULT_IMAGE_SIZE,
									sizes: {},
								},
							});
						}}
					/>

					{item?.type === 'video' ? (
						<>
							<SNDMediaUpload
								onSelect={(media) => {
									updateItem(index, {
										id: media?.id || 0,
										url: media?.url || '',
										filename: media?.filename || media?.title || '',
										thumbUrl: item?.poster?.url || '',
									});
								}}
								allowedTypes={['video']}
								value={item?.id}
								media={{
									id: item?.id,
									url: item?.url,
									filename: item?.filename,
									type: 'video',
								}}
								onChangeMedia={(media) => {
									updateItem(index, {
										id: media?.id || 0,
										url: media?.url || '',
										filename: media?.filename || '',
										thumbUrl: item?.poster?.url || '',
									});
								}}
								label={__('Видео', 'sndpshsite-blocks')}
								labelButton={
									item?.url
										? __('Изменить видео', 'sndpshsite-blocks')
										: __('Выбрать видео', 'sndpshsite-blocks')
								}
							/>
							<SNDMediaUpload
								onSelect={(media) => {
									const posterFields = buildImageFieldsFromMedia(
										media,
										DEFAULT_IMAGE_SIZE
									);

									updateItem(index, {
										poster: {
											id: posterFields.id,
											url: posterFields.thumbUrl,
											alt: posterFields.alt,
											size: posterFields.size,
											sizes: posterFields.sizes,
										},
										thumbUrl: posterFields.thumbUrl,
										alt: posterFields.alt,
									});
								}}
								allowedTypes={['image']}
								value={item?.poster?.id}
								media={buildPosterMediaProp(item?.poster)}
								onChangeMedia={(media) => {
									if (!media?.url && !media?.id) {
										updateItem(index, {
											poster: {
												id: 0,
												url: '',
												alt: '',
												size: DEFAULT_IMAGE_SIZE,
												sizes: {},
											},
											thumbUrl: '',
										});
										return;
									}

									const size =
										media?.size || item?.poster?.size || DEFAULT_IMAGE_SIZE;
									const sizes = media?.sizes || item?.poster?.sizes || {};
									const displayUrl = sizes[size]?.url || media?.url || '';

									updateItem(index, {
										poster: {
											id: media?.id || item?.poster?.id || 0,
											url: displayUrl,
											alt: media?.alt ?? item?.poster?.alt ?? '',
											size,
											sizes,
										},
										thumbUrl: displayUrl,
										alt: media?.alt ?? item?.alt ?? '',
									});
								}}
								isRenderPhp={true}
								label={__('Постер видео', 'sndpshsite-blocks')}
								labelButton={
									item?.poster?.url
										? __('Изменить постер', 'sndpshsite-blocks')
										: __('Выбрать постер', 'sndpshsite-blocks')
								}
							/>
						</>
					) : (
						<SNDMediaUpload
							onSelect={(media) => {
								updateItem(index, buildImageFieldsFromMedia(media, DEFAULT_IMAGE_SIZE));
							}}
							allowedTypes={['image']}
							value={item?.id}
							media={buildImageMediaProp(item)}
							onChangeMedia={(media) => {
								updateItem(index, buildImageFieldsFromMediaChange(item, media));
							}}
							isRenderPhp={true}
							label={__('Изображение', 'sndpshsite-blocks')}
							labelButton={
								item?.url
									? __('Изменить изображение', 'sndpshsite-blocks')
									: __('Выбрать изображение', 'sndpshsite-blocks')
							}
						/>
					)}
				</>
			)}
		</SNDRepeater>
	);
}
