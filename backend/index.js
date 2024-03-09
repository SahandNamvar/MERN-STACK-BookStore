import express from 'express';
import { PORT, mongoDB_URL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

// Instance of Express app to configure routes, middleware, handle requests
const app = express();

// Middleware for parsing Request body
app.use(express.json());

// Middleware for handling CORS POLICY
/*
    CORS (Cross-Origin Resource Sharing) policy.
    - origin: Specifies the allowed origin for CORS requests. Here, requests from 'http://localhost:3000' are allowed.
    - methods: Specifies the allowed HTTP methods for CORS requests (GET, POST, PUT, DELETE).
    - allowedHeaders: Specifies the allowed headers for CORS requests (Content-Type).
*/
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))


// Route to handle GET request to root ('/')
app.get('/', function(request, response) {
    return response.status(200).send({ message: 'welcome to my MERN app' });
});

// Middleware for using booksRoute for all incoming requests to '/book'
/*
Set up a middleware function to handle incoming requests for the '/book' endpoint.
Here, booksRoute is the middleware function or router that will be invoked to handle any requests made to this endpoint.
When a request is made to '/book' or any subpath of '/book', Express will direct that request to the booksRoute middleware 
for further processing. This allows for organizing application routes into separate modules or files, making code more modular/easier to manage.
*/
app.use('/books', booksRoute);

// Connect to DB
mongoose.connect(mongoDB_URL)
    .then(function(){
        console.log('>> App Connected to Database');
        // Start server once connection to DB successful
        app.listen(PORT, function(){
            console.log(`>> App Listening on Port: ${PORT}`);
        });
    })
    .catch(function(error){
        console.log(error.message);
    });