import React from 'react'

import { Link } from "react-router-dom";

import MyReads from './MyReads';



/**
 * @description BookShelf holds Currently Reading, Want to read and read shelfs
 */

const BookShelf = (props) => {
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>My Reads</h1>
			</div>
			<div className="list-books-content">
				<MyReads {...props} />
			</div>
			<div className="open-search">
				<Link to="/search">Add a book</Link>
			</div>
		</div>
	)
}


export default BookShelf;
