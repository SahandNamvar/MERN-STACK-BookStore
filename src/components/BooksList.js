import React from "react";

const BooksList = (props) => {
    return (
        <div className="container mt-4">
            <h2>Books List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publish Year</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {props.books.map((book, index) => (
                        <tr key={book._id}>
                            <td>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publishYear}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BooksList;
