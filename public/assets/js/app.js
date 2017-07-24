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


$('#save-note').click((event) => { 
  
  var thisId = $(event.target).data('id');

  console.log(thisId);

  axios.post(`/notes/${thisId}`, {
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



$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});


$('.save-article').click((event) => {
  // var thisId = $(this).attr('data-id');
  var thisId = $(event.target).data('id');
  // var target = $(event.target);

  axios.post(`/articles/${thisId}`, {
    saved: true
  })

  console.log('saved to' + thisId);
    
})
