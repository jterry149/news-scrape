// Require scraping dependency tools
var request = require("request");
var cheerio = require("cheerio");

// Scrape the articles from the New YorK Times
var scrape = function(callback) {

  var articlesArr = [];

  request("http://www.nytimes.com/", function(error, response, html) {

      var $ = cheerio.load(html);


      $("h2.story-heading").each(function(i, element) {

          var result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this).children("a").text();
          result.link = $(this).children("a").attr("href");

          if (result.title !== "" && result.link !== "") {
              articlesArr.push(result);
          }
      });
      callback(articlesArr);
  });

};

// Export the function for other files to use
module.exports = scrape;


  