import mongoose from "mongoose";

// Book Schema - define the shape of each document in the collection
const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true // time added/updated
    }
);

// Book Model -  a class that represents the `Books` collection and provides an interface for interacting with the collection.
// It takes two arguments: the name of the model (which will be the name of the collection in MongoDB, pluralized) and the schema that defines the structure of documents in the collection.
export const Book = mongoose.model('Book', bookSchema);