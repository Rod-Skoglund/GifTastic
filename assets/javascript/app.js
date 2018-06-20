// *************************************************
// Class - Coding Bootcamp MW 
// Assignment #6 - GifTastic
// Author: Rod Skoglund
// File: app.js
// *************************************************

// Declare Variables
var topics = ["Clouds", "Snow", "Northern Lights", "Lightning", "Forest"];

// Get 10 still images for the selected button item
function displayItemInfo() {

  //Create API URL to get the 10 images
  var myApiKey = "DFX3GIpizTjjNNUL9mhS7ZkHZq86fQ41";
  var thisItem = $(this).attr("data-name") + "+nature";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisItem + "&api_key=" + myApiKey + "&limit=10&rating=pg-13";


  // Creates AJAX call for the specific thisItem button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    //create variable to align with the data from the Giphy API call
    thisData = response.data;

    // For each item in teh data array, capture the still and animated images URLs
    // to be added to the diaplay
    for (var i = 0; i < thisData.length; i++) {
        //Create container div tag to hold the image and rating
        var itemDiv = $("<div>");
        itemDiv.addClass("image");
        console.log(response);

        //Create the paragraph tag to hold the image rating
        var ratingP = $("<p>");
        var thisRating = "Rating: " + thisData[i].rating;
        ratingP.text(thisRating);
        
        //Crete an image tag to hold one image
        var itemImg = $("<img>");
        itemImg.attr("src", thisData[i].images.fixed_height_still.url);
        itemImg.attr("data-state", "still");
        itemImg.attr("data-still", thisData[i].images.fixed_height_still.url);
        itemImg.attr("data-animate", thisData[i].images.fixed_height.url);
        itemImg.attr("data-rating", thisRating);
        itemImg.addClass("gif");
        
        //Add the rating and picture tags to the container tag
        itemDiv.append(itemImg);
        itemDiv.append(ratingP);

        console.log("itemImg.attr('data-state') = " + itemImg.attr("data-state"));
        console.log("thisData[i].images.fixed_height_still.url = " + thisData[i].images.fixed_height_still.url);
        console.log("thisData[i].images.fixed_height.url = " + thisData[i].images.fixed_height.url);
        console.log("**************************************");
        
        //Add the image container tag to the beginning of the display container tag
        $("#gifs-appear-here").prepend(itemDiv);
    }

  });

}

// Function for displaying Nature data buttons
function renderButtons() {
  // Deletes the Nature buttons prior to adding new items
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  
  // Loops through the array of topics so buttons can be created for each one
  for (var i = 0; i < topics.length; i++) {
    // Dynamicaly generate buttons for each item in the array
    var a = $("<button>");
    // Adds a class and attributes to the new button
    a.addClass("item-btn");
    // Added a unique data-name attribute
    a.attr("data-name", topics[i]);
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
    
    //Clear the input field on the page
    $("#item-input").val("");

    // Calling renderButtons which handles the processing of our topic array
    renderButtons();
  });

// Adding click event listeners to all elements with a class of "item-btn"
$(document).on("click", ".item-btn", displayItemInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

// Click handler for dynamically created images that will toggle between still and 
// animated image display
$("body").on("click", ".gif", function(event) {
    event.preventDefault();
    // Capture the current state of this image
    var state = $(this).attr("data-state");

    // Toggle the image between still and animated based on current state of the 
    // image and then toggle the current state to agree with the active image display.
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

