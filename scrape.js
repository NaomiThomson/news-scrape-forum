var cheerio = require("cheerio");
var request = require("request");



var scrapeNews = new Promise((resolve, reject) => {
  // Making a request for blizzard's overwatch news page. The page's HTML is passed as the callback's third argument
  request("https://news.blizzard.com/en-us/overwatch", (error, response, html) => {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var results = [];

    // With cheerio, find each "articlelistitem" class
    // (i: iterator. element: the current element)
    $(".ArticleListItem").each((i, element) => {

      var title = $(element)
        .children()
        .attr("data-analytics-placement")
        .split('-')[4]
        .trim();

      var ext = $(element).children().attr("href");
      var link = `https://news.blizzard.com${ext}`;

      // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        title: title,
        link: link
      });
    });

    // Return results
    resolve(results);
  });
});


// this worked, so promise works
// scrapeNews.then((result) => {
//   console.log(result)
// }, (err) => {
//   console.log(err)
// });

module.exports = (scrapeNews);



