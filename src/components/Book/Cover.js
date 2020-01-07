import React from 'react';
/**
 * @description Renders a book cover
 * @param {string} url
 */
const Cover = ({ imageLinks }) => {
	let style = {};
	// due to cors unable to use Image with svg
	if (imageLinks.thumbnail) {
		style.backgroundImage = `url("${imageLinks.thumbnail}")`;
		style.width = 128;
		style.height = 193;
	}
	return (
		<div role='presentation' className="book-cover" style={style}></div>
	)
};

export default Cover;