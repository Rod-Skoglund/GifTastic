// *************************************************
// Class - Coding Bootcamp MW 
// Assignment #6 - GifTastic
// Author: Rod Skoglund
// File: app.js
// *************************************************

// Declare Variables
var topics = ["Clouds", "Snow", "Northern Lights", "Lightning", "forest"];

function displayItemInfo() {

  var myApiKey = "DFX3GIpizTjjNNUL9mhS7ZkHZq86fQ41";
  var thisItem = $(this).attr("data-name") + "+nature";

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisItem + "&api_key=" + myApiKey + "&limit=10&rating=pg-13";

  // Creates AJAX call for the specific thisItem button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creates a div to hold the movie
    // var itemDiv = $("<div>");
    // itemDiv.addClass("image");
    // console.log(response);
    thisData = response.data;
    console.log("thisData = ", thisData.length);

    for (var i = 0; i < thisData.length; i++) {
        var itemDiv = $("<div>");
        itemDiv.addClass("image");
        console.log(response);
        // thisData = response.data;
        console.log("in img creation loop - i = " + i);
        var ratingP = $("<p>");
        var thisRating = "Rating: " + thisData[i].rating;
        ratingP.text(thisRating);
        var itemImg = $("<img>");
        itemImg.attr("src", thisData[i].images.fixed_height_still.url);
        itemImg.attr("data-state", "still");
        itemImg.attr("data-still", thisData[i].images.fixed_height_still.url);
        itemImg.attr("data-animate", thisData[i].images.fixed_height.url);
        itemImg.attr("data-rating", thisRating);
        itemImg.addClass("gif");
        itemDiv.append(ratingP);
        itemDiv.append(itemImg);
        
        console.log("itemImg.attr('data-state') = " + itemImg.attr("data-state"));
        console.log("thisData[i].images.fixed_height_still.url = " + thisData[i].images.fixed_height_still.url);
        console.log("thisData[i].images.fixed_height.url = " + thisData[i].images.fixed_height.url);
        console.log("**************************************");
        $("#gifs-appear-here").prepend(itemDiv);
}


  });

}

// Function for displaying Nature data buttons
function renderButtons() {
  // Deletes the Nature buttons prior to adding new items
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  
  // Loops through the array of items
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generates buttons for each item in the array
    var a = $("<button>");
    // Adds a class of item-btn to our button
    a.addClass("item-btn");
    // Added a data-name attribute
    a.attr("data-name", topics[i]);
    // Provided the initial button text
    a.text(topics[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where the add item button is clicked
$("#add-item").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var thisItem = $("#item-input").val().trim();

    // If the text input is not blank, add item from the textbox to our array
    if (thisItem.length > 0) {
        topics.push(thisItem);
    }
    
    $("#item-input").val("");

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".item-btn", displayItemInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$("body").on("click", ".gif", function(event) {
    event.preventDefault();
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log("in .gif click - state = " + state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

