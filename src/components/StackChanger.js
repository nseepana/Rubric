import React from 'react';

/**
 * @description Stackchanger used to move books from one shelf to another shelf, use none to remove a book from shelf
 */

const StackChanger = ({ shelfId, shelfIds = [], shelfOptions, onStackChange = () => { } }) => {
	return (
		<div className="book-shelf-changer">
			<select defaultValue={shelfId} onChange={onStackChange}>
				{shelfIds.map(shelf => (
					(shelfId !== shelf) ? (
						<option key={shelf} value={shelf}>{shelfOptions[shelf]}</option>
					) : <option key={shelf} value={shelf} disabled>{shelfOptions[shelf]}</option>)
				)}
			</select>
		</div>
	)
}

export default StackChanger;


