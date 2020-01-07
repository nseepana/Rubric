import React from 'react';
import Book from './Book';
import StackChanger from './StackChanger';

/**
 * @description Generates shelf based on books schema.
 * @param {Object} props
 * @param {Object} props.id
 * @param {Object} props.schema
 * @param {Object} props.types
 * @param {Function} props.onShelfChange
 */
const MyReads = ({ books, shelfOptions, schema, onShelfChange }) => {
	let shelfIds = Object.keys(shelfOptions);
	////console.log(shelfIds, books, schema)
	const onStackChange = (book) => (e) => {
		onShelfChange(book, e.target.value);
	};
	return (
		<div className="list-books-content">
			{shelfIds.map((shelfId) => {
				let title = shelfOptions[shelfId];
				let hasData = !!schema[shelfId];
				if (!hasData) {
					return null;
				}
				return (
					<div key={shelfId} className="bookshelf">
						{(shelfId !== 'none') ? <h3 className="bookshelf-title">{title}</h3> : null}
						<div className="bookshelf-books">
							<ul className="books-grid">
								{schema[shelfId].map(bookId => {
									let book = books[bookId];
									return (<li key={book.id}>
										<Book {...book} />
										<StackChanger shelfId={shelfId} shelfIds={shelfIds} shelfOptions={shelfOptions} onStackChange={onStackChange(book)} />
									</li>)
								}
								)}
							</ul>
						</div>
					</div>
				)
			})
			}
		</div>)

};
export default MyReads;