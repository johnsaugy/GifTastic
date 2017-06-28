
//Creates an Array of TV Shows
var shows = ["Game of Thrones", "House of Cards", "Stranger Things", "Full House", "Westworld", "Breaking Bad", "Better Call Saul", "The Office", "Veep", "Narcos", "13 Reasons Why", "Friday Night Lights", "Daredevil", "Arrow", "Entourage"];

//Creates a button for each show
function makeButtons(){ 
    //When adding a new show, this deletes prior shows so no repeat buttons
    $('#buttonsView').empty();
    // loops through the shows array
    for (var i = 0; i < shows.length; i++){
        //Makes buttons for every show in the array
        var a = $('<button>') 
        a.addClass('show'); // Adds a class
        a.attr('data-name', shows[i]); // Adds a data-attribute
        a.text(shows[i]); //Makes button text
        $('#buttonsView').append(a);
    }
}

$("#addShow").on("click", function(){

    var show = $("#show-input").val().trim();
    // Users input is now added to the array
    shows.push(show);
    // the makeButtons function is called, which makes buttons for all my shows plus the user show
    makeButtons();
    // Users can hit "enter" instead of clicking the submit button
    return false; 
})

//Function to display gifs
function displayGifs(){
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=9&api_key=dc6zaTOxFJmzC";

        //Ajax call
        $.ajax({url: queryURL, method: "GET"}).done(function (response) {
            console.log(response.data);
            // save results as a variable
            var results = response.data;
            // for loop goes through each gif and adds these variables
            for (var i = 0; i < results.length; i++) {
                // creates a generic div to hold the results
                var gifDiv = $('<div class=gifs>');
                var showGif = $('<img>');
                    showGif.attr('src', results[i].images.fixed_height_still.url);
                var rating = results[i].rating;
                var p = $('<p>').text('Rating: ' + rating);
                gifDiv.append(showGif)
                gifDiv.append(p)

                $("#gifsView").prepend(gifDiv);
            }
            
        });
}

//Function for animating Gifs
$(document).on('click', '.gif', function(){
    var state = $(this).attr('data-state');
        if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});

// function for displaying show gifs
$(document).on("click", ".show", displayGifs);

// initially calls the makeButtons function
makeButtons();