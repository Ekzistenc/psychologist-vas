import { useEffect } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes, context }) => {
		const { menuHeader } = attributes;
		const parentMenuHeader = context?.['snd/headerMenuHeader'];

		useEffect(() => {
			if (parentMenuHeader !== undefined && parentMenuHeader !== menuHeader) {
				setAttributes({ menuHeader: parentMenuHeader });
			}
		}, [parentMenuHeader, menuHeader]);

		return (
			<div {...useBlockProps()}>
				<ServerSideRender block="snd/header-links" attributes={attributes} />
			</div>
		);
	},
	save: () => null,
});
