// Require axios and cheerio dependency to make our scrape
var axios = require("axios");
var cheerio = require("cheerio");

// Function to scrape the New York Times website
var scrape = function() 
{
    // Scrape the New York Times website
    return axios.get("http://www.nytimes.com").then(function(res){
        var $ = cheerio.load(res.data);
        
        // Log our scraping
        console.log("scraping");
        
        // Articles array to save our article information
        var articles = [];

   
    $("div.css-1100km").each(function(i, element) 
    {
        // Grab the heading of the article
        var head = $(this)
            .find("h2")
            .text()
            .trim();

        // Grab the URL of the article
        var url = $(this)
            .find("a")
            .attr("href");

        // Grab the Summary of the article
        var sum = $(this)
            .find("p")
            .text()
            .trim();

        // So long as our headline and sum and url aren't empty or undefined, do the following
        if (head && sum && url) 
        {
            // Remove extra characters to establish a neat look
            var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Push the data to the articles array
        var dataToAdd = 
        {
            headline: headNeat,
            summary: sumNeat,
            url: "https://www.nytimes.com" + url
        };

        articles.push(dataToAdd);
      }
    });
    // Return the articles found to the user
    return articles;
  });
};

// Export the function for other files to use
module.exports = scrape;


  