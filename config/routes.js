// Variables used for the particuler routes
var Article = require("../models/Article");
var Note = require("../models/Note");
var articlesController = require("../controllers/articles");

module.exports = function(router) 
{
// Get route to find and article if the article not found then render response
    router.get("/", function(req, res) 
    {
        Article.find({saved: false}, function(error, found) 
    {
        if (error) 
        {
            console.log(error);
        } 
        else if (found.length === 0) 
        {
            res.render("empty")
        } 
        else 
        {
            var hbsObject = {
                articles: found
            };
            res.render("index", hbsObject);

          }
        });
    });
// Get route to fetch articles and save them to the database
    router.get("/api/fetch", function(req, res) 
    {
        // scrapes articles and saves unique ones to database
        articlesController.fetch(function(err, docs) 
        {
            // If statement to let user know if there were new articles to be found or not for the day
            if (!docs || docs.insertedCount === 0) 
            {
              res.json({message: "No new articles for today. Check back again tomorrow!"});
            }
            else 
            {
              res.json({message: "Added " + docs.insertedCount + " new articles!"});
            }
        });
    });

    // Get route to find the saved articles and display them
    router.get("/saved", function(req, res) 
    {
        articlesController.get({saved: true}, function(data) 
        {
          var hbsObject = {
            articles: data
          };
          res.render("saved", hbsObject);
        });
    });

    // Patch statement for saving or unsaving articles
    router.patch("/api/articles", function(req, res) 
    {

        articlesController.update(req.body, function(err, data) 
        {
          // Update statement gets sent back to app.js and the article is either saved or unsaved
          res.json(data);
        });
    });

    // Get statement to retrieve notes attached to saved articles and them displayed in the notes modal
    router.get('/notes/:id', function (req, res) 
    {
        // Send a query to find the matching id once found populate all the notes for that article
        Article.findOne({_id: req.params.id}).populate("note") 
        .exec(function (error, doc) 
        { 
            // If statement to execute the query send doc to browser in a json object 
            if (error) console.log(error); 
            else 
            {
                res.json(doc);
            }
        });
    });

    // Add a notes to a saved article in the database using a post
    router.post('/notes/:id', function (req, res) 
    {
        // Variable to create a new note with req.body
        var newNote = new Note(req.body);
        // Save newNote to the database
        newNote.save(function (err, doc) 
        {
            // Log any errors if there are some
            if (err) console.log(err);
            // Find the article and update the note by pushing to the notes array
            Article.findOneAndUpdate(
                {_id: req.params.id}, 
                {$push: {note: doc._id}}, 
                {new: true},
                function(err, newdoc)
                {
                  if (err) console.log(err);
                  res.send(newdoc);
                });
        });
    });

    // Get note to be removed and reload the page
    router.get('/deleteNote/:id', function(req, res)
    {
        Note.remove({"_id": req.params.id}, function(err, newdoc){
          if(err) console.log(err);
          res.redirect('/saved'); 
        });
    });
};
