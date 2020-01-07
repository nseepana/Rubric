import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import { Route, Switch } from "react-router-dom";



import Finder from './components/Finder';

import { noop } from "./utils";
import BookShelf from './components/BookShelf';



/**
 * @description Holds Booksshelf, search and book details
 * 
*/
class App extends Component {


	state = {
		books: {},
		schema: {},
		shelfOptions: {}
	}


	componentDidMount() {
		BooksAPI.getAll().then((data) => {
			if (!data) {
				// set flag for error/data-empty message
				this.setState({ "hasData": false });
			} else {
				let { books, schema, shelfOptions } = data;
				this.setState({ books, schema, shelfOptions, hasData: true })
			}
		});
	}

	// update shelfs with new schema from response
	updateShelf = (book, shelf, onShelfUpdate = noop) => {
		BooksAPI.update(book, shelf).then((schema = {}) => {
			book.shelf = shelf;
			let books = JSON.parse(JSON.stringify(this.state.books));
			books[book.id] = book;
			this.setState({ books, schema, hasData: true }, onShelfUpdate);
		})
	}

	render() {
		if (!this.state.hasData) {
			return (<strong>loading...</strong>)
		}
		const { shelfOptions, books, schema } = this.state;
		return (
			<div className="app">
				<Switch>
					<Route exact path="/">
						<BookShelf books={books} schema={schema} shelfOptions={shelfOptions} onShelfChange={this.updateShelf} />
					</Route>

					<Route exact path="/search">
						<Finder />
					</Route>

					<Route>
						<strong> Page not found!</strong>
					</Route>
				</Switch>
			</div>

		)
	}/**eof render */
}/**eof App */


export default App;
