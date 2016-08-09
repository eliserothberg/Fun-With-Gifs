$(document).ready(function() {

var results;
var resultsArray = [];
  // Initial array of comedians
  var comedians = ['Eddie Izzard', 'Chris Rock', 'George Carlin', 'Sarah Silverman', 'Patton Oswalt', 'Louis CK', 'Aziz Ansari', 'Nick Offerman', 'Amy Schumer', 'Denis Leary'];
  // console.log(comedians[3]);

  function renderButtons(){ 

    // Deletes the comedians in array prior to adding new comedians 
    $('#buttonsView').empty();

    // Loops through the array of comedians
    for (var i = 0; i < comedians.length; i++){

      // Dynamically generate buttons for each comedian in the array and add them to buttonsView div

        var a = $('<button>') 
        a.addClass('comedian'); 
        a.attr('data-name', comedians[i]); 
        a.text(comedians[i]); 
        $('#buttonsView').append(a);
    }
  };

  $('#addComedian').on('click', function(){

    // grab the input from the textbox
    var comedian = $('#comedian-input').val().trim();

    // comedian choice from the textbox added to array
    comedians.push(comedian);
    
    renderButtons();

    // We have this line so that users can hit "enter" instead of clicking on the button and it won't move to the next page
    return false;
  });

  renderButtons();

  // function displaycomedianInfo(){

    $('button.comedian').on('click', function() {
        var comedian = $(this).attr('data-name');
        var state = $(this).attr('data-state'); 

        console.log(comedian);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + comedian + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
               
                console.log("this is id " + response.data[1].id);
                console.log("this is fw still " + response.data[1].images.fixed_width_still.url);
                console.log("this is fw animated " + response.data[1].images.fixed_width.url);

                
                results = response.data;
                 console.log(results[1]);
                // .image_original_url;
                // console.log(results);

                // results.append(resultsArray);

                // for (var i = 0; i < results.length; i++) {
                //   resultsArray.push(results[i].images.fixed_width.url);
                  
                // }
                // console.log("resultsArry: " + resultsArray);

                for (var i = 0; i < results.length; i++) {
                    var comedianDiv = $('<div class="item">')
                    var rating = results[i].rating;

                    if (!rating == "") {
                    var p = $('<p>').text( "Rating: " + rating);
                  }
                  else {
                    var p = $('<p>').text( "Rating: not rated");
                  }

                    // console.log("resp1 = " + response[1].id);

                    var comedianImage = $('<img>');
                    comedianImage.attr('src', results[i].images.fixed_width.url);

                $(comedianImage).on('click', function(){
                  for (var i = 0; i < results.length; i++) {
                if (comedianImage.attr('src', results[i].images.fixed_width_still.url)){
                  //hide and show??
                $(this).attr('src', $(this).data(results[i].images.fixed_width.url));
                // $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data(results[i].images.fixed_width_still.url));
                // $(this).attr('data-state', 'still');
            }
          }
          });
            console.log('this =' + $(this).data(results[i].images.fixed_width_still.url));
            console.log($(this).data(results[1]));
            console.log("comedianImage.attr('src etc = " + comedianImage.attr('src', results[i].images.fixed_width_still.url));

                    comedianImage.attr('alt', 'comedian image');  

                    comedianDiv.append(p)
                    comedianDiv.prepend(comedianImage)

                    $('#gifsHere').prepend(comedianDiv);
                    // this = results;
                    // $this = comedianImage;


                };
           });     
            });
    // };
console.log();
    // $(document).on('click', 'comedian', displaycomedianInfo);

    // renderButtons();
//call function
//loop

    });