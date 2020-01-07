import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';
import booksmodel from '../Booksmodel';

/**
 * @description Renders a book details with description
 * @extends Component
 */
class Details extends Component {
	state = {
		book: null,
		added: false
	}
	componentDidMount() {
		const bookId = this.props.bookId;
		booksmodel.getbook(bookId, this.props.searched).then(book => {
			this.setState({
				book
			})
		})
	}

	render() {
		let { book, added } = this.state;
		if (!book) {
			return 'loading...';
		} else if (added) {
			return <Redirect exact to="/"></Redirect>
		} else {
			return (
				<div>
					<div key={book.id} className="row">
						<div className="col-md">
							<a href={book.previewLink} target="_blank" rel="noopener noreferrer"><img src={book.imageLinks && book.imageLinks.thumbnail} alt={book.title} className="book-cover img-fluid" /></a>
						</div>
						<div className="col">
							<h3 className='book-title'>
								{book.title}
							</h3>
							<div>
								<div className="info">{book.publisher} </div>
								<div className="info">{book.publishedDate}</div>
								<div className="info">{book.category && book.category[0]}</div>
							</div>
							<h4 className='book-authors'>
								{book.authors && book.authors.join(", ")}
							</h4>
							<p>{book.description}</p>
							{(book.shelf !== 'none') ? (<Link to="/">My reads</Link>) : (<button onClick={(e) => {
								booksmodel.update(book.id, 'read').then(() => {
									this.setState({ added: true });
								})
							}}>Add</button>)}
						</div>
					</div>
				</div>
			)
		}
	}
}

export default Details;
