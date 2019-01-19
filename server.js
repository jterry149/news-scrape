// Dependencies For the Application
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Requiring our Note and Article models
var Note = require("./models/Note");
var Article = require("./models/Article");

// Set port
var Port = process.env.PORT || 3000;

// Initialize Express application
var app = express();


// Parse request body as JSON configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static directory folder
app.use(express.static('public'));

// Set engine and default for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Database configuration with mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

if (process.env.MONGODB_URI) 
{
  mongoose.connect(process.env.MONGODB_URI);
} 
else 
{
  mongoose.connect(MONGODB_URI);
}

// Import routes and give the server access to them.
var router = express.Router();

// Require routes file pass router object
require("./config/routes")(router);

// Have every request go through router middlewar
app.use(router);

// setup listener for the appliation
app.listen(Port, function() 
{
  console.log("Listening app is running on port " + Port);
});