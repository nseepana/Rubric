import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class BookShelf extends Component {
	render() {
		return (
			<div>
				<div className="list-books">
					<div className="list-books-title">
						<h1>My Reads</h1>
					</div>
					<div className="list-books-content">
						Handle books here...
					</div>
					<div className="open-search">
						<Link to="/search">Add a book</Link>
					</div>
				</div>
			</div>
		)
	}
}
