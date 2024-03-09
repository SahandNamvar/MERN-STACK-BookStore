import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import BooksList from './components/BooksList';
import ButtonBar from './components/ButtonBar';
import axios from 'axios';

function App() {
    // Keep track of the books list and pass this data to other components
    const [books, setBooks] = useState([]);

    // Hook - fetch data
    useEffect(() => {
        fetchBooks();
    }, []);

    // Fetch books data from backend API
    const fetchBooks = () => {
      axios.get('http://localhost:5555/books')
        .then(response => {
            setBooks(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
    }

    // Make a POST request to your backend API endpoint 
    const handleAddBook = (newBook) => {
      axios.post('http://localhost:5555/books', newBook)
        .then((response) => {
          fetchBooks(); // Fetch books again after adding new book
          console.log(response.data.message) // Log message (Backend - booksRoute.js return post req. response line 40)
        })
        .catch(error => {
          console.error('Error adding book:', error);
        });
    };

    const handleBookDelete = (bookId) => {
      axios.delete(`http://localhost:5555/books/${bookId}`)
        .then((response) => {
            fetchBooks(); // Fetch books again after deletion
            console.log(response.data.message);
        })
        .catch(error => {
            console.error('Error deleting book:', error);
        });
    };

    const handleEditBook = (bookId, bookEdited) => {
      axios.put(`http://localhost:5555/books/${bookId}`, bookEdited)
        .then((response) => {
          fetchBooks();
          console.log(response.data.message);
        })
        .catch(error => {
          console.error('Error deleting book:', error);
        });
    }

    const handleBookDeleteAll = () => {
      axios.delete('http://localhost:5555/books')
        .then((response) => {
          fetchBooks();
          console.log(response.data.message);
        })
        .catch(error => {
          console.error('Error deleting book:', error);
        });
    }

    return (
        <div className="App">
          <ButtonBar />
          <Routes>
            <Route exact path="/" element={<BooksList books={books} />} />
            <Route path="/add" element={<AddBook onAddNew={handleAddBook}/>} />
            <Route path="/edit/:id" element={<EditBook books={books} onEditBook={handleEditBook}/>} />
            <Route path="/delete/:id" element={<DeleteBook books={books} onDelete={handleBookDelete} onDeleteAll={handleBookDeleteAll}/>} />
          </Routes>
        </div>
    );
}
export default App;
