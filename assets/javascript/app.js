$(document).ready(function() {


var results;
var comedianImage;

  // Initial array of comedians
var topics = ['Eddie Izzard', 'Chris Rock', 'George Carlin', 'Sarah Silverman', 
'Patton Oswalt', 'Louis CK', 'Aziz Ansari', 'Nick Offerman', 'Amy Schumer', 
'Denis Leary', 'Steve Marmel', 'Jann Karam', 'Jerry Seinfeld', 'Natasha Leggero'];

  function comedianInfo(){

    // $('button.comedian').on('click', function() {
        var comedian = $(this).attr('data-name');

        console.log(comedian);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + comedian + 
        "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
          })
          .done(function(response) {

              // console.log("this is id[1] " + response.data[1].id);
              // console.log("this is fixed_w still " + response.data[1].images.fixed_width_still.url);
              // console.log("this is fixed_w animated " + response.data[1].images.fixed_width.url);

            results = response.data;

            for (var i = 0; i < results.length; i++) {
              var comedianDiv = $('<div class="item">')
              var rating = results[i].rating.toUpperCase();

              if (!rating == "") {
                var p = $('<p>').text( "Rated " + rating);
              }
              else {
                p = $('<p>').text( "Not rated");
              }

              comedianImage = $('<img>');
              comedianImage.attr('src', results[i].images.fixed_width_still.url);  
              comedianImage.attr('data-still', results[i].images.fixed_width_still.url);
              comedianImage.attr('data-animate', results[i].images.fixed_width.url);
              comedianImage.attr('data-state', 'still');
              comedianImage.attr('class', 'comedianImage');
              comedianImage.attr('alt', 'comedian image');

              comedianDiv.append(p)
              comedianDiv.prepend(comedianImage)

              $('#imagesHere').prepend(comedianDiv);

                $(comedianImage).on('click', function(){
                
                  var state = $(this).attr('data-state');
                
                    if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                     $(this).attr('data-state', 'animate');
                   }
                   else {
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                   }
                 // console.log("state = " + state);
                });
            };
        }); 
    };
  
   // comedianInfo();

  function renderButtons(){ 

    // Deletes the comedians in array prior to adding new comedians 
    $('#buttonsView').empty();

    // Loops through the array of comedians
      for (var i = 0; i < topics.length; i++){
      // Dynamically generate buttons for each comedian in the array and add them to buttonsView div
        var add = $('<button>') 
        add.addClass('comedian'); 
        add.attr('data-name', topics[i]); 
        add.text(topics[i]); 
        $('#buttonsView').append(add);
      }
  }

  renderButtons();

  // function addComs(){ 
    
    $('#addComedian').on('click', function(){

    // Grab the input from the textbox
    var comedian = $('#comedian-input').val().trim();

    // input from the textbox added to array
    topics.push(comedian);
   
    //Remove old text from input box when you click on the input box again
      $('#comedian-input').focus(
        function(){
          $(this).val('');
      });

    renderButtons();

    // To prevent pressing "enter" from causing a move to the next page
    return false;

    });
  // };

  // addComs();

  // comedianInfo();

  $(document).on('click', '.comedian', comedianInfo);

});
