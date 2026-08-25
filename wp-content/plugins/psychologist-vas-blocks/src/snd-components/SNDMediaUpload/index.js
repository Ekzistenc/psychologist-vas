import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { resolveAttachmentUrl, selectAttachmentRecord } from '../mediaSizes';
import './style.scss';

const SNDMediaUpload = ( {
	onSelect,
	allowedTypes,
	value,
	media,
	onChangeMedia,
	label = 'Select media',
	labelButton = 'Select media',
	isRenderPhp = false,
} ) => {
	const type = media?.type || 'other';

	const attachmentFromStore = useSelect(
		( select ) => {
			if ( type !== 'image' || ! media?.id ) {
				return null;
			}

			return selectAttachmentRecord(select, media.id);
		},
		[ media?.id, type ]
	);

	const previewUrl =
		type === 'image' && media?.size
			? resolveAttachmentUrl( attachmentFromStore, media.size, media.url )
			: media?.url;

	const onDeleteMedia = () => {
		let defaultMedia = {
			id: 0,
			url: '',
			filename: '',
			type: 'other',
		};

		onChangeMedia( defaultMedia );
	};

	const sizeOptions = [
		{
			disabled: true,
			label: 'Choose size',
			value: '',
		},
		{
			label: 'Thumbnail size',
			value: 'thumbnail',
		},
		{
			label: 'Medium size',
			value: 'medium',
		},
		{
			label: 'Large size',
			value: 'large',
		},
		{
			label: 'Full size',
			value: 'full',
		},
	];

	if ( isRenderPhp ) {
		sizeOptions.push(
			{
				label: 'Medium Large',
				value: 'medium_large',
			},
			{
				label: '1536x1536',
				value: '1536x1536',
			},
			{
				label: '2048x2048',
				value: '2048x2048',
			}
		);
	}

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={ onSelect }
				allowedTypes={ allowedTypes }
				value={ value }
				render={ ( { open } ) => (
					<div className="snd-media-upload">
						<div className="snd-media-upload__label-button">
							{ label }
						</div>

						<div className="snd-media-upload__content">
							{ media?.url && (
								<>
									{ type === 'image' && (
										<div className="snd-media-upload__preview">
											<img
												src={ previewUrl }
												alt={ media?.alt || '' }
												loading="lazy"
											/>
										</div>
									) }

									{ type !== 'image' && (
										<div className="snd-media-upload__preview">
											<div className="snd-media-upload__preview-file">
												{ media?.type || 'File' }
											</div>
										</div>
									) }
								</>
							) }

							<div className="snd-media-upload__controls">
								{ media?.url && (
									<>
										{ type === 'image' && media?.size && (
											<SelectControl
												__next40pxDefaultSize
												__nextHasNoMarginBottom
												size="small"
												value={ media.size }
												onChange={ ( value ) => {
													const newUrl =
														resolveAttachmentUrl(
															attachmentFromStore,
															value,
															''
														) ||
														media?.sizes?.[ value ]
															?.url ||
														media?.sizes?.full
															?.url ||
														media?.url;

													onChangeMedia( {
														...media,
														size: value,
														url: newUrl,
													} );
												} }
												options={ sizeOptions }
											/>
										) }

										{ type !== 'image' &&
											media?.filename && (
												<div className="snd-media-upload__filename">
													{ media?.filename }
												</div>
											) }
									</>
								) }

								<div className="snd-media-upload__buttons">
									<Button
										size="small"
										variant={
											media?.url ? 'secondary' : 'primary'
										}
										onClick={ open }
									>
										{ labelButton }
									</Button>

									{ media?.url && (
										<Button
											isDestructive
											size="small"
											variant="secondary"
											onClick={ onDeleteMedia }
										></Button>
									) }
								</div>
							</div>
						</div>
					</div>
				) }
			/>
		</MediaUploadCheck>
	);
};

export default SNDMediaUpload;