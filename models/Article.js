// Variable to require mongoose dependency 
var mongoose = require("mongoose");

// Create Schema class for the database
var Schema = mongoose.Schema;

// Create articles schema
var ArticleSchema = new Schema(
{  
    // Title is a required string for article
    title: 
    {
        type: String,
        required: true,
        unique: true
    },
    // Link is a required string
    link: 
    {
        type: String,
        required: true
    },
    date: String,
    saved: 
    {
            type: Boolean,
            default: false
    },
    // This only note saves the note's ObjectId to insert data into the notes modal
    note: 
    [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

// Create the Article model with the ArticleSchema 
var Article = mongoose.model("Article", ArticleSchema);

// Export the model 
module.exports = Article;