import {
	TextControl,
	ToggleControl,
	Notice
} from '@wordpress/components';
import {
	RichText
} from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

export function SNDModalButton({
	button,
	setText,
	setLink,
	setTarget,
	setModal,
	setShow,
	label = 'КНОПКА',
	showButtonLabel = 'Показывать кнопку',
	modalLabel = "Модальное окно",
	textButtonLabel = "Текст кнопки",
	URLButtonLabel = "URL кнопки",
	targetLabel = "Открывать в новой вкладке",
	noticeErrorText = "Введите корректный URL, например: https://example.com"
}) {
	return (
		<div className="components-base-control">
			<label className="components-base-control__label" style={{ display: 'block', marginBottom: '8px' }}>
				{label}
			</label>
			
			<ToggleControl
				__nextHasNoMarginBottom={true}
				checked={button.show}
				label={showButtonLabel}
				onChange={setShow}
			/>

			<ToggleControl
				__nextHasNoMarginBottom={true}
				checked={button.modal}
				label={modalLabel}
				onChange={setModal}
			/>

			<TextControl
				value={button.text}
				label={textButtonLabel}
				__nextHasNoMarginBottom={true}
				onChange={setText}
			/>

			{!button.modal && (
				<>
					<TextControl
						label={URLButtonLabel}
						value={button.link}
						__nextHasNoMarginBottom={true}
						onChange={setLink}
					/>

					<ToggleControl
						__nextHasNoMarginBottom={true}
						checked={button.target}
						label={targetLabel}
						onChange={setTarget}
					/>
				</>
			)}
		</div>
	);
}

export function SNDRichTextModalButton({ button, setText }) {
	return (
		<>
			{ button.show && (
				<RichText
					tagName="a"
					value={button.text}
					placeholder="Введите текст кнопки..."
					onChange={setText}
					__nextHasNoMarginBottom={true}
					className={` ${button.modal ? 'sd-button-modal' : ' sd-button-link'}` }
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
				<button
					href={!button.modal && button.link ? button.link : '#'}
					target={!button.modal && button.target ? '_blank' : '_self'}
					className={`sd-burger__tel ${button.modal ? 'sd-button-modal' : 'sd-button-link'} ${classList ? classList : ''}`}
				>{button.text}</button>
			)}
		</>
	);
}