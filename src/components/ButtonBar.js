import React from 'react';
import { Link } from 'react-router-dom';

const ButtonBar = () => {
    const margin = { marginRight: '8px'};
    return (
        <div className="container mt-4">
            <div className="btn-group d-flex justify-content-between align-items-center mb-3" role="group">
                <Link to="/" className="btn btn-primary" style={margin}>Books List</Link>
                <Link to="/add" className="btn btn-primary" style={margin}>Add Book</Link>
                <Link to="/edit/:id" className="btn btn-primary" style={margin}>Edit Book</Link>
                <Link to="/delete/:id" className="btn btn-danger">Delete Book</Link>
            </div>
        </div>
    );
}

export default ButtonBar;
