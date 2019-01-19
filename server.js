// Dependencies For the Application
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Requiring our data models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express application
var app = express();

// Parse request body as JSON configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static directory folder
app.use(express.static('public'));


// Database configuration with mongoose
var databaseUri = "mongodb://localhost/mongoosearticles";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} 
else 
{
  mongoose.connect(databaseUri);
}

// Variable assigned to the mongoose connection
var db = mongoose.connection;

db.on("error", function(error) 
{
  console.log("Mongoose Database Connection Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection wasmsuccessful.");
});

// Set engine and default for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var router = express.Router();

// Require routes file pass router object
require("./config/routes")(router);

// Have every request go through router middlewar
app.use(router);

// Set port
var port = process.env.PORT || 3001;

// setup listener for the appliation
app.listen(port, function() {
  console.log("app running on port " + port);
});