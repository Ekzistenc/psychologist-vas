import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, SelectControl } from '@wordpress/components';
import './style.scss';

const SNDMediaUpload = ({
	onSelect,
	allowedTypes,
	value,
	media,
	onChangeMedia,
	label = 'Select media',
	labelButton = 'Select media',
}) => {
	const type = media?.type || 'other';

	const onDeleteMedia = () => {
		let defaultMedia = {
			id: 0,
			url: '',
			filename: '',
			type: 'other',
		};

		onChangeMedia(defaultMedia);
	};

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={onSelect}
				allowedTypes={allowedTypes}
				value={value}
				render={({ open }) => (
					<div className="snd-media-upload">
						<div className="snd-media-upload__label-button">
							{label}
						</div>

						<div className="snd-media-upload__content">
							{
								(media?.url) && (
									<>
										{(type === 'image') && (
											<div className="snd-media-upload__preview">
												<img
													src={media.url}
													alt={media?.alt || ''}
													loading="lazy"
												/>
											</div>
										)}

										{(type !== 'image') && (
											<div className="snd-media-upload__preview">
												<div className="snd-media-upload__preview-file">{media?.type || 'File'}</div>
											</div>
										)}
									</>
								)
							}

							<div className="snd-media-upload__controls">
								{(media?.url) && (
									<>
										{(type === 'image' && media?.size) && (
											<SelectControl
												__next40pxDefaultSize
												__nextHasNoMarginBottom
												size="small"
												value={media.size}
												onChange={(value) => {
													const newUrl =
														media?.sizes?.[value]?.url || media?.url;

													onChangeMedia({
														...media,
														size: value,
														url: newUrl,
													});
												}}
												options={[
													{
														disabled: true,
														label: 'Choose size',
														value: ''
													},
													{
														label: 'Thumbnail size',
														value: 'thumbnail'
													},
													{
														label: 'Medium size',
														value: 'medium'
													},
													{
														label: 'Large size',
														value: 'large'
													},
													{
														label: 'Full size',
														value: 'full'
													},
												]}
											/>
										)}

										{(type !== 'image' && media?.filename) && (
											<div className="snd-media-upload__filename">{media?.filename}</div>
										)}
									</>
								)}

								<div className="snd-media-upload__buttons">
									<Button
										size="small"
										variant={media?.url ? 'secondary' : 'primary'}
										onClick={open}
									>{labelButton}</Button>

									{media?.url && (
										<Button
											isDestructive
											size="small"
											variant="secondary"
											onClick={onDeleteMedia}
										></Button>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			/>
		</MediaUploadCheck>
	);
};

export default SNDMediaUpload;