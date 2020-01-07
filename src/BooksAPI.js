import { getSentense } from './utils';
const api = "https://reactnd-books-api.udacity.com"

const NONE = 'none'


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// middleware to 'getAll' books api respone.
// bookShelfData extracts  shelf options, books and schema from array of books.
const bookShelfData = (data = []) => {
  if (!data.length) return null;
  let schema = {}, books = {}, shelfOptions = { [NONE]: getSentense(NONE) };

  for (let book of data) {
    const { shelf } = book;

    if (!shelfOptions[shelf]) {
      shelfOptions[shelf] = getSentense(shelf);
    }
    schema[shelf] = schema[shelf] || [];
    let key = book.id;
    schema[shelf].push(key);
    books[key] = book;
  }
  return {
    books, /* each book mapped with bookId as key */
    schema, /* separate bookIds based on shelf types*/
    shelfOptions /* book shelf options for add to shelf dropdown*/
  }
}

// if data type is array, data has books;
// if data type is object,  data is empty
export const getSearchData = (data, addedBooks = {}) => {
  try {
    let hasData = Array.isArray(data);
    if (hasData) {
      if (!data.length) return null;
      let schema = {}, books = {};
      for (let book of data) {
        let shelf = NONE;
        // if imageLinks not available ignore if;
        if (!book.imageLinks || !book.imageLinks.thumbnail) {
          continue;
        }
        let key = book.id;
        // fill book shelf value, if it exists;
        if (addedBooks[key]) {
          shelf = addedBooks[key].shelf;
        }

        // update shelf value
        book.shelf = shelf;

        // separate books based on shelf types;
        schema[shelf] = schema[shelf] || [];
        schema[shelf].push(key);
        // map book with key;
        books[key] = book;
      }
      return {
        books,
        schema
      }

    } else if (typeof data === 'object') {
      let { error } = data
      return error
    } else {
      return null;
    }
  } catch (e) {
    console.warn(e);
  }
}

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => bookShelfData(data.books))

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)
