import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import Finder from './components/Finder';

export default class App extends Component {
	render() {
		return (
			<div className="app">
				<Switch>
					<Route exact path="/search">
						<Finder />
					</Route>

					<Route exact path="/">
						<BookShelf />
					</Route>

					<Route>
						<strong> Page not found!</strong>
					</Route>
				</Switch>
			</div>

		)
	}
}
