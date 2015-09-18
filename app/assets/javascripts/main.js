$(document).ready(function() {
console.log('test')

// closure!!!!

var nominateButtons = document.getElementsByClassName("nominate-button");
var dataId;
var buttons = function buttons(number){
  nominateButtons[number].addEventListener("click", function(e){
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
    console.log("nominatedRecipe obj..", nominatedRecipe)

    $.ajax({
      type: 'post',
      url: '/recipes',
      data: nominatedRecipe,
      success: function(data) {
        // update dom with datarrr
        console.log('success function logging')
        console.log(data);
        dataId = data.id;
      },
      error: function(error) {
        console.log(error)
      }
    })
    
    //had to set timeout to get around async...how do i do this?
    setTimeout(function(){console.log('data.id outside the function..', dataId)},250);   
    
    //removes original event listener, now event listener is only for voting
    e.target.removeEventListener(e.type, arguments.callee);
    $("#nominate-button"+number).text("upvote")
    $("#"+number+" .extra").append('<span>upvotes: </span><span id="'+number+'votes">0</span>');
    //add event listener and ajax call here to edit votes and update votes with jquery
    $("#nominate-button"+number).click(function(){

      var votes = Number($(number+"#votes").text())
      var votes = votes + 1;
      console.log(votes)
      console.log(typeof(votes))
      var voteStatus = {};
      voteStatus.upvote = true;
      voteStatus.id = dataId;
      voteStatus.upvotes = votes;
      console.log("voteStatus data...", voteStatus)

      //need to create data object with vote tally {upvotes: votes} or something

      //need ajax call that will update votes in DB
      $.ajax({
        type: 'patch',
        url: '/recipes/'+dataId, //need to grab ID from previous data and put it here
        data: voteStatus,
        success: function(data) {
          console.log(data)
          console.log(data.upvotes +"  "+ data.id)
          //update num of votes
          $("#"+number+"votes").text(data.upvotes)
        },
        error: function(error) {
          console.log(error)
        }
      })//end of ajax
    })//end of click function that will add a vote and make ajax call to update votes in DB 

  })
}//end of buttons function

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
