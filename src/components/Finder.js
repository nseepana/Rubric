import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Finder extends Component {
	render() {
		return (
			<div className="search-books" >
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="search" />
					</div>
				</div>
				<div className="search-books-results">
					handle search results here...
				</div>
			</div>
		)
	}
}
