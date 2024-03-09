import React, { useState } from 'react';

const AddBook = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (publishYear < 0 || publishYear.toString().length !== 4) {
                alert('Publish year must be 4-digit & must be > 0');
                return;
            }

            const addNew = {
                title: title,
                author: author,
                publishYear: publishYear
            };
            props.onAddNew(addNew)
            setTitle('');
            setAuthor('');
            setPublishYear('');
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };
    return (
        <div className="container mt-4">
            <h2>Add New Book</h2>
            {showToast && (
                <div className="alert alert-success" role="alert">
                    Book added successfully!
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author:</label>
                    <input type="text" className="form-control" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="publishYear" className="form-label">Publish Year:</label>
                    <input type="number" className="form-control" id="publishYear" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
export default AddBook;

 // eslint-disable-next-line no-lone-blocks
 {/*
onChange={(e) => setAuthor(e.target.value)}

In the context of React event handling, e (or event) refers to the event object that is passed to event handler 
functions. This event object contains information about the event that occurred, such as the type of event, the 
element on which the event occurred, and any additional data related to the event.
    - (e) indicates that the event object will be passed as an argument to the event handler function.
    - e.target refers to the element that triggered the event, which in this case is the input field.
    - e.target.value retrieves the current value of the input field where the change event occurred.
So, e is simply a parameter representing the event object, and e.target.value is accessing the value of the input 
field that triggered the change event.
*/}