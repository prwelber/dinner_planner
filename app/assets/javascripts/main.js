$(document).ready(function() {
console.log('test')

// closure!!!!

var nominateButtons = document.getElementsByClassName("results-card");
var dataId;
var dataUpvotes;
var buttons = function buttons(number){
  nominateButtons[number].addEventListener("click", function(e){
    console.log('nomination button clicky event')
    //grab the value of the button
    //grab the corresponding div
    //move to nominated section
    $("#"+number).appendTo(".nominated")
    console.log("should have moved")
    console.log(event.target)

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
        dataUpvotes = data.upvotes;
      },

      error: function(error) {
        console.log(error)
      }
    })
    
    //had to set timeout to get around async...how do i do this?
    setTimeout(function(){console.log('data.id outside the function..', dataId)},250);   
    
    //removes original event listener, now event listener is only for voting
    e.target.removeEventListener(e.type, arguments.callee);




    $("#"+number+" .extra").append("<div class='ui one buttons'>").append("
      <div id='button-upvote-"+number+"' class='ui basic green button button-upvote'>upvote</div></div>").append("
      <span>upvotes: </span><span id='span-upvote-"+number+"'>"+dataUpvotes+"</span>")


      //adds event listener to class button-upvote, defined on 56
    $(".button-upvote").click(function(){





    //$("#nominate-button"+number).text("upvote")
    // $("#"+number+" .extra").append('<span>upvotes: </span><span id="'+number+'votes">0</span>');
    
    //add event listener and ajax call here to edit votes and update votes with jquery

      //converts string to num
      var votes = Number($(number+"#votes").text())

      var votes = votes + 1;

      var voteStatus = {};
      //set voteStatus key/value pairs
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



var voteButtons = document.getElementsByClassName("upvote-button");

var voteButtonClick = function voteButtonClick(num){
  voteButtons[num].addEventListener("click", function(e){
    console.log('upvote button clicked')
      
      //make event target into a jquery object
      a = $(event.target)
      //grab id attribute
      a = a.attr("id")
      //take last character in string
      a = a.substr(a.length - 1)

      console.log(a)
    
      // $(".upvote-button").one("click", function(){
      var votes = Number($(a+"#votes").text())

      var votes = votes + 1;

      var voteStatus = {};
      //set voteStatus key/value pairs
      voteStatus.upvote = true;
      voteStatus.id = a;
      voteStatus.upvotes = votes;
      console.log("voteStatus data...", voteStatus)

      //need to create data object with vote tally {upvotes: votes} or something

      //need ajax call that will update votes in DB
      $.ajax({
        type: 'patch',
        url: '/recipes/'+a, //need to grab ID from previous data and put it here
        data: voteStatus,
        success: function(data) {
          console.log(data)
          //update num of votes
          $("#upvote-span-"+a).text(data.upvotes)
        },
        error: function(error) {
          console.log(error)
        }
      })//end of ajax
   })
} 



for (var i = 0; i < nominateButtons.length; i++) {
  buttons(i)
}
for (var i = 0; i < voteButtons.length; i++){
  voteButtonClick(i)
}




////////////word cloud stuff

var ingredient_array = [];

      ingredientList = $("p span").text().split(",")
      ingredientList.forEach(function(el,index,array){
        ingredient_array.push({text: el, weight: Math.floor(Math.random() * 7) +6})
      });

      // sort by function
      // loop through
      // each iteration... if doesn't exist, push in, if it does exist, increment the counter for that word

      // make empty obj
      // Object.keys(yourObj)


      $(function() {
        $(".word-cloud").jQCloud(ingredient_array);
      });



})
