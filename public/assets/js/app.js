// $('.scrape-articles').click((event) => {
//   event.preventDefault();
  

//   axios.get('/scrape')
//   .then((resp) => {
//     axios.get('/articles')
//     .then((res) => {
//       console.log(res)
//     })
//   })
// });


$('.save-note').click((event) => { 

  var thisId = $(this).attr('data-id');

  axios.post(`/articles/${thisId}`, {
    title: $('#title-input').val().trim(),
    body: $('#body-input').val().trim()
  })
  .then((res) => {
    console.log(res);
    $('#notes').empty();
    $('title-input').val('');
    $('body-input').val('');
  })
  .catch((err) => {
    console.log(err)
  })

});