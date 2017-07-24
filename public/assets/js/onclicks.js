var scrapeNews = require('./scrape.js');

$('.scrape-articles').click((event) => {
  event.preventDefault();

  scrapeNews
  .then((results) => {

    // for (var i = 0; i < result.length; i++) {
    //   var article = new Article({
    //     title: result[i].title,
    //     link: result[i].link
    //   });
    // };

  console.log(results);
});

});

// $('.save-article').click((event) => { 

//   var id = $(this).data('id');

//   axios.post('/saved-news', {id});

//   var title = $('.card-title').text();
//   var link = $('.card-action').children().attr('href');

//   axios.post('/saved-news', {title, link})
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// });