import express from 'express';
import { Book } from '../models/bookModel.js'

const router = express.Router();

// Route to handle POST request for adding new book data
/*
    This route handler is triggered when a POST request is made to the /books endpoint. 
    It starts by checking the request data for required fields (title, author, and publishYear).
    If the data is valid, a new book object is created and inserted into the database according to the Book collection schema.
    Upon successful insertion, a 201 (Created) status code is returned with a success message.
    If the request is incomplete or malformed, a 400 (Bad Request) status code is returned with a message indicating missing fields.
    If any error occurs during processing, a 500 (Internal Server Error) status code is returned along with an error message for debugging.
*/
router.post('/', async function(request, response) {
    try {
        // Check if all required fields are present in the request
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            // Return a 400 - Bad Request error if any field is missing
            return response.status(400).send({
                message: 'All fields are required: title, author, publishYear'
            });
        };
        
        // Create a new book object from the request body
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        // Create a new document in the Book collection with the provided book data
        const book = await Book.create(newBook);

        // Return a 201 - Created status code upon successful creation of the resource
        return response.status(201).json({
            message: 'Data added successfully',
            data: newBook
        });

    } catch (error) {
        // Log and return a 500 - Internal Server Error if an error occurs during processing
        console.log('POST request failed: ', error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to handle GET request to return ALL books
/*
    This route handler is triggered when a GET request is made to the /books endpoint.
    It retrieves a list of all documents from the Book collection in the database.
    Upon successful retrieval, it sends a JSON response containing the count of documents and the data itself.
    If an error occurs during the process, such as database access issues, it logs the error message for debugging purposes.
    In case of an error, it returns a 500 (Internal Server Error) status code along with the error message.
*/
router.get('/', async function(request, response) {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to handle GET request to return a specific book by its ID
/*
    This route handler is triggered when a GET request is made to the /books/:add endpoint, where :add is a route parameter representing the ID of the book.
    It extracts the value of the ID parameter from the request URL and stores it in the id variable using destructuring assignment.
    The route handler then attempts to find a book in the database by its ID using the Book.findById(id) method, which is an asynchronous operation.
    If a book with the specified ID is found, it is returned as the response with a status code of 200 (OK).
    In cases where an error occurs during the database operation or if the specified book ID is not found, the error is caught in the catch block.
    The error message is logged for debugging purposes, and a status code of 500 (Internal Server Error) is sent back in the response along with the error message.
*/
router.get('/:id', async function(request, response) {
    try {
        // Extract the value of the ID parameter from the request URL
        const { id } = request.params;

        // Find a book in the database by its ID
        const book = await Book.findById(id);

        // If the book is found, return it as the response with a status code of 200 (OK)
        if (book) {
            return response.status(200).json(book);
        } else {
            return response.status(404).send({ message: 'Book not found' });
        }
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to handle PUT request to Update a document (book data)
router.put('/:id', async function(request, response) {
    try {
        // Check for missing fields
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'All fields are required: title, author, publishYear'
            });
        };

        // Deconstruct document id to update
        const { id } = request.params;

        // Find document by id, update using request body
        const result = await Book.findByIdAndUpdate(id, request.body);

        // Check for result output (true/false)
        if (!result) {
            return response.status(404).send({ message: 'Book ID not found' });
        } else {
            return response.status(200).send({ message: 'Book updated successfully' });
        }
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }

});

// Route to handle Delete request for deleting a document
router.delete('/:id', async function(request, response) {
    try {

        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Book ID not found' });
        } else{
            return response.status(200).send({ message: 'Book deleted successfully' });
        }
        
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to handle Delete request for ALL books
router.delete('/', async function(request, response) {
    try {
        // Delete all documents from the collection
        const result = await Book.deleteMany({});

        if (!result) {
            // If no documents were deleted, return 404
            return response.status(404).send({ message: 'Books Not Deleted' });
        } else {
            // If documents were deleted successfully, return 200
            return response.status(200).send({ message: 'All Books deleted successfully' });
        }
    } catch (error) {
        // If an error occurs during the deletion process, return 500
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


export default router;