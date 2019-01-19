// Variable to call in the required dependency
var scrape = require("../scripts/scrape");
var Article = require("../models/Article");

module.exports = 
{
    fetch: function(callback) 
    {
        // Scrape the articles
        scrape(function(data) 
        {
            // Variable to grab the articles data
            var articlesArr = data;
            
            // Loop through the articles to ensure each article object has a date and is not saved by default.
            for (var i = 0; i < articlesArr.length; i++) 
            {
                articlesArr[i].date = new Date();
                articlesArr[i].saved = false;
                articlesArr[i].note = [];
            }

            // Filter out the duplicate articles because the article model must be unique
            Article.collection.insertMany(articlesArr, { ordered: false }, function(err, docs) 
            {
                callback(err, docs);
            });
        });
    },
    get: function(query, cb) 
    {
        // Query is currently sent to true
        Article.find(query)
        .sort({_id: -1})
        .exec(function(err, doc) {
        //send saved articles back to routes to be rendered
        cb(doc);
        });
    },
    update: function(query, cb) 
    {
    // Saves or unsaves an article depending on the user query which is in the patch request in app.js file.
        Article.update({ _id: query.id }, {
        $set: {saved: query.saved}
        }, {}, cb);
    },
    addNote: function(query, cb) 
    {
        Article.findOneAndUpdate({_id: query.id }, {
        $push: {note: query.note}
        }, {}, cb);
    }
};