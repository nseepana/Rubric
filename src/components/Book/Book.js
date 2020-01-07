import React from 'react';
import Cover from './Cover';


/**
 * @description Renders a book cover
 * @extends Component
 */
const Book = ({ imageLinks, title, authors = [], id, infoLink }) => {
	return (
		<div className="book">
			<div className="book-top">
				<a href={infoLink} target="_blank" rel="noopener noreferrer">
					<Cover imageLinks={imageLinks}></Cover>
				</a>
			</div>
			<div className="book-title">{title}</div>
			<div className="book-authors">{authors}</div>
		</div>
	)
}

export default Book;