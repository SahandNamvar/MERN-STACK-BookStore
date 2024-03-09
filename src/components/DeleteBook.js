import React, { useState } from 'react';

const DeleteBook = (props) => {
    const [ id, setId ] = useState('');
    const [showToast, setShowToast] = useState(false);


    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const bookObject = props.books[id];
            props.onDelete(bookObject._id);
            setId('');
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }

    const handleDeleteAll = async (e) => {
        e.preventDefault();
        try {
            props.onDeleteAll();
            setId('');
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            console.error('Error deleting ALL book:', error);
        }
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Delete Book</h2>
                <button type="button" className="btn btn-danger" onClick={handleDeleteAll}>Delete All</button>
            </div>
            {showToast && (
                <div className="alert alert-success" role="alert">
                    Book deleted successfully!
                </div>
            )}
            <form onSubmit={handleDelete}>
                <div className="mb-3">
                    <select className="form-select" id="deleteBook" value={id} onChange={(e) => setId(e.target.value)} required>
                        <option value="">Select a book to delete</option>
                        {props.books.map((book, index) => (
                            <option key={index} value={index}>{index + 1} - {book.title}</option>
                        ))}
                    </select>
                </div>
                    <button type="submit" className="btn btn-primary">Submit</button>                        
            </form>
        </div>
    );
}
export default DeleteBook;

// eslint-disable-next-line no-lone-blocks
{/*
The map() function in JavaScript is used to iterate over an array and perform some operation on
 each element of the array. It creates a new array by applying a given function to each element of the original array.

In the context of the provided code, props.books.map() is used to iterate over the array of books (props.books) 
and generate a set of <option> elements for each book in the dropdown list. For each book, the map() function executes the 
provided function, which generates an <option> element with the book's index and title.

Here's a breakdown of how props.books.map() works:

props.books: This is the array of books passed to the component as a prop.
.map(): This method is called on the array of books.
(book, index) => ...: This is the function provided to the map() method. It takes two parameters: book 
(representing the current book in the iteration) and index (representing the index of the current book in the array).
<option key={index} value={index}>{index + 1} - {book.title}</option>: This JSX code generates an <option> element for 
each book in the array. The key attribute is set to the index of the book to uniquely identify each option. The value attribute 
is also set to the index, which will be the value selected when the option is chosen. The text content of each option consists of 
the index (plus 1, since indices are zero-based) followed by a hyphen and the title of the book.

*/}