import React, { useState } from 'react';

const EditBook = (props) => {
    const [ id, setId ] = useState();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [ showInputField, setShowInputField ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {

            if (publishYear < 0 || publishYear.toString().length !== 4) {
                alert('Publish year must be 4-digit & must be > 0');
                return;
            }

            const bookEdited = {
                title: title,
                author: author,
                publishYear: publishYear
            };

            const objectID = props.books[id]._id

            props.onEditBook(objectID, bookEdited)
            setTitle('');
            setAuthor('');
            setPublishYear('');
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                setShowInputField(false);
            }, 3000);
            
        } catch (error) {
            console.log('Unable to edit book', error);
        }

    }

    const handleBookSelect = (e) => {
        const selectedIndex = e.target.value;
        setId(selectedIndex);
        setShowInputField(selectedIndex !== '' || selectedIndex !== 'Select a book to edit'); // Show input field if a book is selected
    };


    return (
        <div className="container mt-4">
            <h2>Edit Book</h2>
            {showToast && (
                <div className="alert alert-success" role="alert">
                    Book updated successfully!
                </div>
            )}
            <div>
                <div className="mb-3">
                    <select className="form-select" id="deleteBook" value={id} onChange={handleBookSelect} required>
                        <option value="">Select a book to edit</option>
                        {props.books.map((book, index) => (
                            <option key={index} value={index}>{index + 1} - {book.title}</option>
                        ))}
                    </select>
                </div>
                {showInputField && (
                    <form onSubmit={handleEdit}>
                        <div className="mb-3">
                            <label htmlFor="editTitle" className="form-label">Edit Title:</label>
                            <input type="text" className="form-control" id="editTitle" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editAuthor" className="form-label">Edit Author:</label>
                            <input type="text" className="form-control" id="editAuthor" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editPublishYear" className="form-label">Edit Publish Year:</label>
                            <input type="number" className="form-control" id="editPublishYear" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default EditBook;
