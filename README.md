## Description
A simple Single Page Application (SPA) developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The project consists of both frontend and backend components. The frontend is built using React.js and includes features such as displaying a list of books, adding new books, editing existing books, and deleting books. The backend, built with Node.js and Express.js, serves as the API for managing book data stored in a MongoDB database. The backend handles CRUD operations (Create, Read, Update, Delete) for books, and uses Mongoose as an object modeling tool for MongoDB. The frontend communicates with the backend API using Axios for HTTP requests.
<hr>

## Backend Code Explanation (notes):

### index.js
 The index.js file serves as the entry point for the backend of a MERN stack application. It imports necessary dependencies such as Express, mongoose, and cors, as well as configuration variables from a config.js file and a Book model from bookModel.js. An Express application instance is created, and middleware is set up for parsing request bodies and handling CORS policy, allowing requests from 'http://localhost:3000'. Routes are defined for the root path ('/') and for '/books', which delegates further request handling to the booksRoute middleware. The application then connects to a MongoDB database using the provided URL from the config.js file, and upon successful connection, starts listening for incoming requests on the specified port. If an error occurs during database connection, it is logged to the console.

 ### config.js
 The config.js file defines two constants used for configuration purposes in the backend of the MERN stack application. The PORT constant specifies the port number on which the server will listen for incoming requests, set to 5555. The mongoDB_URL constant specifies the Uniform Resource Identifier (URI) for connecting to the MongoDB database, which is mongodb://localhost:27017/bookStoreDB. This URI includes the protocol (mongodb://), the hostname (localhost) with the default port for MongoDB (27017), and the name of the database (bookStoreDB) to connect to. These constants are imported and used in other parts of the application, such as index.js, for configuration purposes.

### routes/booksRoute.js
The booksRoute.js file serves as the routing middleware for handling requests related to book data within the MERN stack application. It utilizes Express.js Router to define and manage routes specific to the '/books' endpoint. For the POST route, it validates incoming request data for required fields (title, author, and publishYear), creates a new book object using the provided data, inserts it into the MongoDB database using the Book model, and returns a success response upon successful insertion. The GET route retrieves all books from the database and returns them as a JSON response. Another GET route retrieves a specific book by its ID from the database. The PUT route updates an existing book in the database based on the provided ID and request body. The DELETE route deletes a book from the database based on the provided ID. Additionally, error handling is implemented to catch and handle any errors that occur during request processing, providing appropriate error messages and status codes. Overall, this file efficiently manages CRUD operations for book data and ensures robust error handling for seamless operation of the application.

### models/bookModel.js
The bookModel.js file defines the schema and model for book documents within the MongoDB database of the MERN stack application. It imports the mongoose library for interacting with MongoDB. The bookSchema constant defines the structure of each document in the 'Books' collection. Each document contains fields for 'title', 'author', and 'publishYear', with corresponding data types and required properties specified using the mongoose Schema constructor. Additionally, the schema includes a 'timestamps' option set to 'true', enabling automatic generation of 'createdAt' and 'updatedAt' fields in each document to track creation and modification times. The Book constant represents the mongoose model for the 'Books' collection, created using the mongoose model method. It takes two arguments: the name of the model ('Book'), which will be the name of the collection in MongoDB (pluralized), and the schema (bookSchema) that defines the structure of documents in the collection. This model provides an interface for interacting with the 'Books' collection, allowing CRUD operations and other interactions with book documents in the database.
<hr>

## Frontend Code Explanation (notes):

### index.js
The index.js file serves as the entry point for the React application. It imports necessary dependencies such as React, ReactDOM, App, and BrowserRouter from 'react-router-dom'. Additionally, it imports stylesheets for the application and the Bootstrap CSS framework. The ReactDOM.createRoot method is used to create a root instance for rendering React elements, specifying the DOM element with the id 'root' as the container. The BrowserRouter component is wrapped around the App component to enable client-side routing using React Router. Finally, the reportWebVitals function is called to measure and report performance metrics for the application, such as load times and resource usage.

### App.js
The App.js file is the main component of the React application, responsible for managing the application state and rendering different components based on the current route. It imports necessary dependencies such as React, useState, useEffect, and components related to book management (AddBook, EditBook, DeleteBook, BooksList, ButtonBar) from './components'. Additionally, it imports the Route and Routes components from 'react-router-dom' for client-side routing.

Within the App function component, it initializes the state variable books using the useState hook to keep track of the list of books fetched from the backend API. The useEffect hook is used to fetch the initial list of books from the backend API when the component mounts.

The fetchBooks function sends a GET request to the backend API endpoint 'http://localhost:5555/books' using Axios to retrieve the list of books. Upon successful retrieval, the list of books is set to the books state variable.

Several functions (handleAddBook, handleBookDelete, handleEditBook, handleBookDeleteAll) are defined to handle CRUD operations on books. These functions make HTTP requests to the corresponding backend API endpoints using Axios for creating, reading, updating, and deleting books.

The App component renders a <div> element with a className of 'App' as the root element. Inside this <div>, it renders the <ButtonBar> component and sets up routing using the <Routes> and <Route> components from 'react-router-dom'. Each <Route> component corresponds to a specific URL path and renders a corresponding component (BooksList, AddBook, EditBook, DeleteBook) with the necessary props passed down.

- fetchBooks Function:
This function is responsible for fetching the list of books from the backend API.
It sends a GET request to the '/books' endpoint of the backend server using Axios.
Upon successful retrieval of data, the list of books is set to the books state variable using the setBooks function.
If an error occurs during the request, it is caught in the catch block and logged to the console for debugging purposes.

- handleAddBook Function:
This function handles the addition of a new book to the database.
It takes the newBook object (representing the new book to be added) as a parameter.
It sends a POST request to the '/books' endpoint of the backend server with the newBook object as the request body.
Upon successful addition of the book, it triggers a re-fetch of the books list using the fetchBooks function to update the UI with the new data.
If an error occurs during the request, it is caught in the catch block and logged to the console.

- handleBookDelete Function:
This function handles the deletion of a specific book from the database.
It takes the bookId (ID of the book to be deleted) as a parameter.
It sends a DELETE request to the '/books/:id' endpoint of the backend server, where :id is replaced with the bookId.
Upon successful deletion of the book, it triggers a re-fetch of the books list using the fetchBooks function to update the UI with the updated data.
If an error occurs during the request, it is caught in the catch block and logged to the console.

- handleEditBook Function:
This function handles the editing of an existing book in the database.
It takes the bookId (ID of the book to be edited) and bookEdited (edited book data) as parameters.
It sends a PUT request to the '/books/:id' endpoint of the backend server, where :id is replaced with the bookId, with the bookEdited object as the request body.
Upon successful editing of the book, it triggers a re-fetch of the books list using the fetchBooks function to update the UI with the updated data.
If an error occurs during the request, it is caught in the catch block and logged to the console.

- handleBookDeleteAll Function:
This function handles the deletion of all books from the database.
It sends a DELETE request to the '/books' endpoint of the backend server.
Upon successful deletion of all books, it triggers a re-fetch of the books list using the fetchBooks function to update the UI with the updated data.
If an error occurs during the request, it is caught in the catch block and logged to the console.
<hr>

## Frontend Components

### BooksList.js
The BooksList.js file defines a functional component responsible for rendering a list of books in a tabular format. Within the component, it receives props as an argument, which contains an array of book objects passed from its parent component. The component returns a <div> element with the className 'container mt-4' for styling purposes. Inside this <div>, it renders a heading 'Books List' (<h2>), followed by a <table> element with the className 'table table-striped' for displaying the books in a tabular format. The <table> consists of a <thead> containing column headers ('Id', 'Title', 'Author', 'Publish Year') and a <tbody> where the actual book data is rendered. Within the <tbody>, it iterates over the props.books array using the map method to generate a <tr> element for each book object. Each <tr> contains <td> elements displaying the book's ID (index + 1), title, author, and publish year respectively. The key attribute is set to book._id to ensure uniqueness for each rendered book row. Finally, the component is exported as the default export.

### AddBook.js
The AddBook.js file defines a functional component responsible for adding a new book to the database. Within the component, it initializes state variables title, author, publishYear, and showToast using the useState hook to manage the form inputs and display a success message upon book addition. The handleSubmit function is triggered upon form submission, where it validates the publish year to ensure it is a 4-digit number greater than zero. If validation passes, it constructs a new book object (addNew) using the form input values and invokes the props.onAddNew function to add the new book to the database. After successful addition, it resets the form inputs, displays a success toast message for 3 seconds, and hides it thereafter. The component renders a form with input fields for title, author, and publish year, along with a submit button. Additionally, it conditionally renders a success toast message when showToast state is true. Event handlers are attached to input fields to update their corresponding state variables as users input data.

### DeleteBook.js
The DeleteBook.js file servers a functional component handling book deletion from the database. It initializes two state variables: id for managing the selected book's index and showToast for displaying a success message. The component contains two main functions: handleDelete and handleDeleteAll. When triggered, handleDelete extracts the book object from props.books using the selected index id. It then calls props.onDelete, passing the extracted _id field for the DELETE request to the backend endpoint. Similarly, handleDeleteAll initiates deletion of all books via props.onDeleteAll. After deletion, both functions reset the id state, show a success toast for 3 seconds, and then hide it. The component renders a form with a dropdown list of books and a submit button. It also includes a 'Delete All' button for removing all books. Event handlers attached to form submission and dropdown list onChange events manage deletion operations and update the selected book ID state. 

### EditBook.js
The EditBook.js file encompasses a functional component responsible for modifying book details in the database. It declares several state variables, including id, title, author, publishYear, showInputField, and showToast, initialized using the useState hook. The component comprises two key functions: handleEdit and handleBookSelect.

handleEdit is executed upon form submission and handles the editing process. It constructs a bookEdited object containing updated book details. The _id field of the selected book, obtained from props.books[id], is utilized to identify the book for editing. This _id field, along with the bookEdited object, is then passed to props.onEditBook to trigger a PUT request to the backend endpoint for updating the book. Upon successful editing, it resets state variables, displays a success toast message, and hides the input fields after 3 seconds.

handleBookSelect responds to the selection of a book from the dropdown list. It updates the id state with the selected index and determines whether to display input fields based on the selected book. The dropdown list is populated with book options retrieved from props.books, enabling users to select the book they wish to edit.

The component renders a form featuring dropdown selection for book choice and input fields for editing book details. Conditional rendering is applied to display input fields only when a book is selected. 

### ButtonBar.js
The ButtonBar.js servers as the Navbar for a Single Page Application (SPA). Each navigation button is represented by a <Link> component from 'react-router-dom', facilitating navigation to different routes within the application. Each <Link> component includes a to prop specifying the route to navigate to and a className prop setting the button styles to Bootstrap's primary or danger buttons. The style prop applies the margin inline style to ensure consistent spacing between buttons.

The buttons include options to navigate to the Books List page (/ route), Add Book page (/add route), Edit Book page (/edit/:id route), and Delete Book page (/delete/:id route), with appropriate labels displayed on each button.
<hr>

## Frontend React App Dependencies
axios: ^1.6.7
bootstrap: ^5.3.3
react: ^18.2.0
react-dom: ^18.2.0
react-router-dom: ^6.22.2

## Backend Server/DB Dependencies
cors: ^2.8.5
express: ^4.18.3
mongoose: ^8.2.1
nodemon: ^3.1.0
<hr>

## Run App on Localhost:3000
3 Terminal windows needed for running mongodb server, backend server, and the frontend:
    1. `brew services start mongodb/brew/mongodb-community` || `mongod` -> MongoDB server running locally on default port 27017 
    2. `cd backend` && `npm run dev` --> Start the Backend server using *nodemon index.js* hosted on port 5555
    3. `cd frontend` && `npm start` --> Compile and view the frontend in the browser on port 3000.