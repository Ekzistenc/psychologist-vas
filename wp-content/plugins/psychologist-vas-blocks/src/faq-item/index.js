import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes }) => {
		const { question, answer } = attributes;

		return (
			<div {...useBlockProps({ className: 'wp-block-snd-faq__details-box' })}>
				<details className="wp-block-snd-faq__details" open>
					<summary className="wp-block-snd-faq__summary">
						<RichText
							tagName="span"
							value={question}
							onChange={(value) => setAttributes({ question: value })}
							placeholder="Вопрос..."
							allowedFormats={[]}
						/>
					</summary>
					<div className="wp-block-snd-faq__content">
						<RichText
							tagName="p"
							value={answer}
							onChange={(value) => setAttributes({ answer: value })}
							placeholder="Ответ..."
						/>
					</div>
				</details>
			</div>
		);
	},
	save: () => null,
});
