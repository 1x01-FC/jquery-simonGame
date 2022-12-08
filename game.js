//________________Variables____________________

var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []

var userClickedPattern = []

var started = false

var level = 0



//________________FUNCTIONS____________________

function nextSequence() {

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;

  $('#level-title').html("Level " + level);

  userClickedPattern = []

}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function animatePress(currentColor) {
  $("."+currentColor).addClass("pressed");

  setTimeout(function() { $("."+currentColor).removeClass("pressed")
  },100);

}


function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}

//________________Button Click____________________

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});


//________________Start Game____________________
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

//________________Check Answer____________________

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (currentLevel === gamePattern.length - 1)
      setTimeout(nextSequence,1000);
  }

  else {

    audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over")

      }, 200
    );

    $('#level-title').html("Game over, Press Any Key to Restart");

    startOver();

  }

}
