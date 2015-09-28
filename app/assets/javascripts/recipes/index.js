$(document).ready(function() {


console.log('recipes/index.js loaded')


$(".delete").on('click', function(event){
	eventDiv = $(event.target)
	divId = parseInt(eventDiv.parent().attr("id").substr(10))
	console.log("id of div is", divId)

	$.ajax({
		type: 'delete',
		url: 'recipes/'+divId,
		data: divId,
		success: function(data) {
			console.log('success function data', data)
			eventDiv.parent().remove()
		},

		error: function(error) {
			console.log(error)
		}

	})//ends ajax call

})//ends click function




var voteButtons = document.getElementsByClassName("upvote-button");

var voteButtonClick = function voteButtonClick(num){
  voteButtons[num].addEventListener("click", function(e){
    // console.log('upvote button clicked')
      
      //make event target into a jquery object
      a = $(event.target)
      //grab id attribute
      a = a.attr("id")
      //take numbers out of string
      a = a.match(/\d/g).join("");

      var votes = Number($(a+"#votes").text())
      var votes = votes + 1;
      var voteStatus = {};

      //set voteStatus key/value pairs
      voteStatus.upvote = true;
      voteStatus.id = a;
      voteStatus.upvotes = votes;
      // console.log("voteStatus data...", voteStatus)

      //need ajax call that will update votes in DB
      $.ajax({
        type: 'patch',
        url: '/recipes/'+a, //need to grab ID from previous data and put it here
        data: voteStatus,
        success: function(data) {
          // console.log(data)
          //update num of votes
          $("#upvote-span-"+a).text(data.upvotes)
        },
        error: function(error) {
          console.log(error)
        }
      })//end of ajax
   })
} 

//closure helper
for (var i = 0; i < voteButtons.length; i++){
  voteButtonClick(i)
}




$(".upvote-button").on('click', function(event){
	// console.log(event.target)

	$voteNum = $(event.target).parent().parent().find(".votes-num").text()
	$parentDiv = $(event.target).closest(".card")
	// console.log($voteNum)
	// console.log($parentDiv)
	
	if ($voteNum >= 14) {
		$parentDiv.css("background-color", "rgba(0, 100, 215, 0.3)")
	} else if ($voteNum >= 9) {
		$parentDiv.css("background-color", "rgba(0, 150, 255, 0.3)")
	} else if ($voteNum >= 4) {
		$parentDiv.css("background-color", "rgba(0, 200, 255, 0.3)")
	} else if (actualNum >= 1) {
		$parentDiv.css("background-color", "rgba(0, 255, 255, 0.3)")
	}
})


///////////to assign colors on page DOM load
var allTheVotes = $(".votes-num")
for(i = 0; i < allTheVotes.length; i++){
	$toGetParent = $(allTheVotes[i]).closest(".card")
	var $numVotes = $(allTheVotes[i]).text()
	var actualNum = parseInt($numVotes);
	// console.log("type of actualNum", typeof(actualNum));
	// console.log("val of actualNum", actualNum)
		if (actualNum >= 14) {
			$toGetParent.closest(".card").css("background-color", "rgba(0, 100, 215, 0.3)")
		} else if (actualNum >= 9) {
			$toGetParent.closest(".card").css("background-color", "rgba(0, 150, 255, 0.3)")
		} else if (actualNum >= 4) {
			$toGetParent.closest(".card").css("background-color", "rgba(0, 200, 255, 0.3)")
		} else if (actualNum >= 1) {
			$toGetParent.closest(".card").css("background-color", "rgba(0, 255, 255, 0.3)")
		}
}
////////end of assinging colors on page DOM load







})