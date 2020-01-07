import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MyReads from "./MyReads";
import throttle from "lodash.throttle";
import * as BooksAPI from '../BooksAPI';


/**
 * @description Renders Searchbox and view results
 * @extends Component
 */
export default class Finder extends Component {

	constructor(props) {
		super(props);
		this.state = {
			books: {},
			schema: {},
			searchValue: "",
			searching: false,
			hasData: false
		}
		// add throttle
		this.handleInputChange = throttle(this.handleInputChange, 500);
	}

	handleInputChange(query) {
		if (query) {
			BooksAPI.search(query).then(results => {
				if (!results || results.error) {
					this.setState({ searching: false, hasData: false })
				} else {
					console.log(BooksAPI.getSearchData(results, this.props.books));
					const { books, schema } = BooksAPI.getSearchData(results, this.props.books);
					this.setState(state => {
						return {
							books,
							schema,
							hasData: true,
							searching: false
						}
					}, () => {
						console.log('')
					})

				}
			})
		} else {
			this.setState({ hasData: false })
		}
	}

	/** on shelf change update this component books, schema  notify to  parent componet */
	onShelfChange = (book, shelf) => {
		let currentShelf = book.shelf;

		// notify to parent componet
		this.props.updateShelf(book, shelf, () => {
			// once parent componet update completes this block wil be execute.
			// update books and schema;
			book.shelf = shelf;
			let schema = JSON.parse(JSON.stringify(this.state.schema));
			if (schema[currentShelf]) {
				schema[currentShelf] = schema[currentShelf].filter(bookId => bookId !== book.id)
			}
			schema[shelf] = schema[shelf] || [];
			schema[shelf].push(book.id);
			let books = JSON.parse(JSON.stringify(this.state.books));
			books[book.id] = book;

			this.setState({ schema, books }, () => {
				//console.log(this.state)
			})
		})
	}

	handleChange = (e) => {
		let { value } = e.target;
		this.setState((prevState, props) => {
			return { searchValue: value, searching: true, hasData: false }
		}, () => {
			this.handleInputChange(this.state.searchValue);
		})
	}


	handleView() {
		const { books, schema, searchValue, searching, hasData } = this.state;
		const { shelfOptions } = this.props;
		if (searchValue && searching) {
			return <strong>Searching...</strong>
		} else if (hasData === true) {
			return <MyReads books={books} schema={schema} shelfOptions={shelfOptions} onShelfChange={this.onShelfChange} />
		} else if (searchValue && !searching) {
			return (<strong> Your search -- {this.state.searchValue} -- did not match any books.</strong>)
		} else {
			return (<strong>Search by title or author</strong>);
		}
	}

	render() {
		return (
			<div className="search-books" >
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="search"
							onChange={this.handleChange}
							value={this.state.searchValue} />
					</div>
				</div>
				<div className="search-books-results">
					{this.handleView()}
				</div>
			</div>

		)
	}
}