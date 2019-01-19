// Variable to for our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Function to scrape articles from the New YorK Times
var scrape = function(callback) 
{
    // A variable to store the articles scraped into an array
    var articlesArr = [];

    request("https://www.nytimes.com/", function(error, response, html) 
    {
        
        var $ = cheerio.load(html);
        $("h2.story-heading").each(function(i, element) 
        {
            // Variable to store the text and links of the articles found
            var result = {};

            // Add the text and ahref of every link, and save them as properties of the result variable
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            if (result.title !== "" && result.link !== "") 
            {
                articlesArr.push(result);
            }
        });
        callback(articlesArr);
    });
};

module.exports = scrape;