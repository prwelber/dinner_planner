$(document).ready(function() {
console.log('test')

// closure!!!!

var nominateButtons = document.getElementsByClassName("nominate-button");

var buttons = function buttons(number){
  nominateButtons[number].addEventListener("click", function(){
    console.log('clicked')
    //grab the value of the button
    //grab the corresponding div
    //move to nominated section
    $("#"+number).appendTo(".nominated")
    console.log("should have moved")
    

    var nominatedRecipe = {};
    nominatedRecipe.name = $("#recipe-name"+number).text()
    nominatedRecipe.course = $("#course"+number).text()
    nominatedRecipe.cuisine = $("#cuisine"+number).text()
    nominatedRecipe.rating = $("#rating"+number).text()
    nominatedRecipe.ingredients = $("#ingredients"+number+" span").text()
    nominatedRecipe.time = $("#time"+number).text()
    nominatedRecipe.nominated = true
    console.log(nominatedRecipe)

    $.ajax({
      type: 'post',
      url: '/recipes',
      data: nominatedRecipe,
      success: function(data) {
        // update dom with datarrr
        console.log('success function logging')
        console.log(data);
        console.log("the id for this is.. ", data.id)

      },
      error: function(error) {
        console.log(error)
      }
    })
    $("#nominate-button"+number).text("upvote")
    $("#"+number+" .extra").append('<span>upvotes: </span><span id="'+number+'votes">0</span>');
    //add event listener and ajax call here to edit votes and update votes with jquery
    $("#nominate-button"+number).click(function(){
      var votes = parseInt($(number+"#votes").text())
      var votes++
      console.log(votes)

      //need to create data object with vote tally {upvotes: votes} or something

      //need ajax call that will update votes in DB
      $.ajax({
        type: 'patch',
        url: '/recipes/:id', //need to grab ID from previous data and put it here
        data: voteStatus,
        success: function(data) {

        },
        error: function(error) {

        }
      })//end of ajax
    })//end of click function that will add a vote and make ajax call to update votes in DB 

  })
}

for (var i = 0; i < nominateButtons.length; i++) {
  buttons(i)
}




  // $('.save_button').click(function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     type: 'post',
  //     url: '/saveadventure',
  //     success: function(status) {
  //       if (status === 1) {
  //         $('.message').html("<h4>Saved!</h4>")
  //       }
  //       else if (status === 2) {
  //         $('.message').html("<h4>You already saved it! Stop clicking it!</h4>")
  //       }
  //       else {
  //         $('.message').html("<h4><a href='/login'>Log in to save!</a></h4>")
  //       }
  //     },
  //     error: function() {
  //       alert("Something went wrong")
  //     }
  //   })
  // })
var ingredient_array = [];

      ingredientList = $("p span").text().split(",")
      ingredientList.forEach(function(el,index,array){
        ingredient_array.push({text: el, weight: Math.floor(Math.random() * 8) +6})
      });



      $(function() {
        $(".word-cloud").jQCloud(ingredient_array);
      });



})
