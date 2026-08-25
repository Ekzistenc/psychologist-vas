import {
	TextControl,
	ToggleControl,
	Notice
} from '@wordpress/components';
import {
	RichText
} from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

const onChangeButtonProp = (field, value, button, setAttributes) => {
	setAttributes({
		button: {
			...button,
			[field]: value,
		},
	});
};

export function SNDModalButton({
	button,
	setAttributes,
	label = 'Button',
	showButtonLabel = 'Show the button',
	modalLabel = "Modal window",
	textButtonLabel = "Button text",
	URLButtonLabel = "Button URL",
	targetLabel = "Open in a new tab",
	noticeErrorText = "Enter the correct URL, for example: https://example.com"
}) {
	const isValidUrl = (url) => {
		try {
			new URL(url);
			return true;
		} catch (_) {
			return false;
		}
	};

	const [linkError, setLinkError] = useState(false);

	return (
		<div className="components-base-control">
			<label className="components-base-control__label">
				{label}
			</label>

			<ToggleControl
				__nextHasNoMarginBottom={true}
				checked={button.show}
				label={showButtonLabel}
				onChange={() =>
					onChangeButtonProp('show', !button.show, button, setAttributes)
				}
			/>

			<ToggleControl
				__nextHasNoMarginBottom={true}
				checked={button.modal}
				label={modalLabel}
				onChange={() =>
					onChangeButtonProp('modal', !button.modal, button, setAttributes)
				}
			/>

			<TextControl
				value={button.text}
				label={textButtonLabel}
				__nextHasNoMarginBottom={true}
				onChange={(value) =>
					onChangeButtonProp('text', value, button, setAttributes)
				}
			/>

			{!button.modal && (
				<>
					<TextControl
						label={URLButtonLabel}
						value={button.link}
						__nextHasNoMarginBottom={true}
						onChange={(value) => {
							onChangeButtonProp('link', value, button, setAttributes);
							setLinkError(
								value && !isValidUrl(value)
							);
						}}
					/>

					{linkError && (
						<Notice
							status="error"
							isDismissible={false}
						>
							{noticeErrorText}
						</Notice>
					)}

					<ToggleControl
						__nextHasNoMarginBottom={true}
						checked={button.target}
						label={targetLabel}
						onChange={() =>
							onChangeButtonProp(
								'target',
								!button.target, button, setAttributes
							)
						}
					/>
				</>
			)}
		</div>
	);
}

export function SNDRichTextModalButton({ button, setAttributes }) {
	return (
		<>
			{ button.show && (
				<RichText
					tagName="a"
					value={button.text}
					placeholder="Enter the text of the button..."
					onChange={(value) =>
						onChangeButtonProp('text', value, button, setAttributes)
					}
					__nextHasNoMarginBottom={true}
					className={` ${button.modal ? 'sd-modal-link' : ' sd-button-link'}` }
					href={
						!button.modal && button.link
							? button.link
							: '#'
					}
					target={
						!button.modal && button.target
							? '_blank'
							: '_self'
					}
				/>
			) }
		</>
	);
}

export function SNDModalButtonSave({button, classList = ''}) {
	return (
		<>
			{button.show && (
				<a
					href={!button.modal && button.link ? button.link : '#'}
					target={!button.modal && button.target ? '_blank' : '_self'}
					className={`sd-burger__tel ${button.modal ? 'sd-modal-link' : 'sd-button-link'} ${classList ? classList : ''}`}
				>{button.text}</a>
			)}
		</>
	);
}