// Variable to require mongoose dependency
var mongoose = require("mongoose");

// Variable to create a schema class
var Schema = mongoose.Schema;

// Variable to create the Note Schema used for the database
var NoteSchema = new Schema({
  // Body to be used as a string to write notes about article
    body: 
    {
        type: String
    }
});

// Variable to create the Note Model with the stored NoteSchema
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;