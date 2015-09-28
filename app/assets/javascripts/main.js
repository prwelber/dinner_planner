$(document).ready(function() {
console.log('test')


// closure!!!!

var nominateButtons = document.getElementsByClassName("results-card");
var dataId;
var dataUpvotes = 0;

var buttons = function buttons(number){
  nominateButtons[number].addEventListener("click", function(e){

    $("#"+number).appendTo(".nominated")
    console.log("should have moved")
    console.log(event.target)


    //gather up information on nominated recipe
    var nominatedRecipe = {};
    nominatedRecipe.name = $("#recipe-name"+number).text();
    nominatedRecipe.course = $("#course"+number).text();
    nominatedRecipe.cuisine = $("#cuisine"+number).text();
    nominatedRecipe.rating = $("#rating"+number).text();
    nominatedRecipe.ingredients = $("#ingredients"+number+" span").text();
    nominatedRecipe.time = $("#time"+number).text();
    nominatedRecipe.nominated = true
    nominatedRecipe.party_id = parseInt($("#hiddenParty"+number).val());

    $.ajax({
      type: 'post',
      url: '/recipes',
      data: nominatedRecipe,

      success: function(data) {

        console.log('success function logging')
        console.log(data);
        dataId = data.id;
        dataUpvotes = data.upvotes;
      },

      error: function(error) {
        console.log(error)
      }
    })
    
    //removes original event listener, now event listener is only for voting and delete
    e.target.removeEventListener(e.type, arguments.callee);


    //had to set timeout to get around async...how do i do this?
    setTimeout(function(){console.log('data.id outside the function..', dataId)},250);   

    var one = "<div id='button-upvote-"+number+"' class='ui basic green button button-upvote'>upvote</div></div>";
    var two = "<span>upvotes: </span><span class='votes-num' id='span-upvote-"+number+"'>"+dataUpvotes+"</span>";
      
    $("#"+number+" .extra").append("<div class='ui one buttons'>").append(one).append(two);

      //adds event listener to class button-upvote, defined on 56
    $(".button-upvote").click(function(e){
    //add event listener and ajax call here to edit votes and update votes with jquery
      event.stopPropagation();
      console.log("event target is ", e.target)
      //converts string to num
      var votes = Number($("#span-upvote-"+number).text())

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
          $("#span-upvote-"+number).text(data.upvotes)
        },
        
        error: function(error) {
          console.log(error)
        }

      })//end of ajax

    })//end of click function that will add a vote and make ajax call to update votes in DB 
  
  })
}//end of buttons function



//closure helper

for (var i = 0; i < nominateButtons.length; i++) {
  buttons(i)
}





////////////word cloud stuff

      var emptyObj = {};
      var otherArray = [];
      ingredientList = $(".ingreds").text().split(", ")


      //inspired by:
      //http://stackoverflow.com/questions/5667888/counting-the-occurrences-of-javascript-array-elements
      
      for(i = 0; i < ingredientList.length; ++i) {
        if(!emptyObj[ingredientList[i]]) {
            emptyObj[ingredientList[i]] = 0;
        }
        ++emptyObj[ingredientList[i]];
      }

      //this works when given an object
      for(i = 0; i < Object.keys(emptyObj).length; i++){
        a = Object.keys(emptyObj)[i]

        otherArray.push({text: a, weight: emptyObj[a]})
      }

      $(function() {
        $(".word-cloud").jQCloud(otherArray);
      });


//////////////ends word cloud stuff

})
