$(document).ready(function() {

createSequence20();

$(".strict").click(function() {
  switch(strictToggle) {
    case 1:
      strictMode = true;
      $(this).toggleClass("green");
      strictToggle--;
      break;
    case 0:
      strictMode = false;
      $(this).toggleClass("green");
      strictToggle++;
      break;
  }  // Closes switch statement
});  // Closes .strict jQuery Selector

// Begins Player Click Event
$(".boxes" ).click(function() {

  switch (this.id) {
    case "boxGreen":
      audioGreen.play();
      break;
    case "boxRed":
      audioRed.play();
      break;
    case "boxYellow":
      audioYellow.play();
      break;
    case "boxBlue":
      audioBlue.play();
      break;
  }

  $(this).animate({
    opacity: 1
  }, 250, function() {
    // Animation complete.
  $(this).animate({
    opacity: 0.4
  }, 250, function() {});
  });

  arrayPlayer.push("#" + this.id);

  if (arrayPlayer.length === counter) {
     console.log(arrayPlayer);
    if (testMatch(goalPattern, arrayPlayer) === true) {
      console.log("correct");
      counter = counter + 1;
      $("#counter").text(counter);
      arrayPlayer = [];
      loop(0);
    }
    else if (testMatch(goalPattern, arrayPlayer) === false) {
      alert("Wrong choice!  Try the same pattern again, you are still on level " + counter + "!");
      arrayPlayer = [];
      loop(0);
    }
    else if (counter === 21) {
      $("#counter").text("WIN!");
      alert("Congratulations, you win!  The game will reset now!");
      resetGame();
    }
  }  // End if statement that checks if player's selection matched the goalPattern array element.

  console.log(testMatch(goalPattern, arrayPlayer));
  console.log("strictMode is " + strictMode);

 if (strictMode === true) {
  if (testMatch(goalPattern, arrayPlayer) === false) {
    arrayPlayer = [];
    alert("Sorry, you lose!  You're in strict mode, so you'll have to start over again!");
    resetGame();
  }
 }

});  //  Ends player click event

  // The code below begins the random sequence, in other words, the computer's turn.
$("#start").click(function(){
  counter = 1;
  $("#counter").text(counter);
  startSequence();
});


function startSequence() {

  current = goalPattern[0];
  switch (current) {
    case "#boxGreen":
      audioGreen.play();
      break;
    case "#boxRed":
      audioRed.play();
      break;
    case "#boxYellow":
      audioYellow.play();
      break;
    case "#boxBlue":
      audioBlue.play();
      break;
  }

  $(current).animate({
    opacity: 1
  }, 250, function() {
    // Animation complete.
  $(current).animate({
    opacity: 0.4
  }, 250, function() {});
  });

} // End of start function

 // Reset Game
 $("#reset").click(function(){
   resetGame();
 });

// This code is recursive, and it makes the pattern, with time gaps in between.
function loop(i) {
  if (i === counter - 1) {
    arrayPlayer = [];
  }
  if(i < counter) {
    console.log(i);

    setTimeout(function() {

  current = goalPattern[i];
  switch (current) {
    case "#boxGreen":
      audioGreen.play();
      break;
    case "#boxRed":
      audioRed.play();
      break;
    case "#boxYellow":
      audioYellow.play();
      break;
    case "#boxBlue":
      audioBlue.play();
      break;
  }

  $(current).animate({
    opacity: 1
  }, 250, function() {
    // Animation complete.
  $(current).animate({
    opacity: 0.4
  }, 250, function() {});
  });

  i++;
  loop(i);

    }, 1000); // Ends setTimeout;

  }  //  Ends IF Statement\

}  //  Ends loop()

});  //  Closes jQuery wrapper

var audioGreen = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var audioRed = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var audioBlue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var audioYellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var counter = 0;
var arrayIds = ["#boxGreen", "#boxRed", "#boxBlue", "#boxYellow"];
var arrayPlayer = [];
var goalPattern = [];
var strictMode = false;
var strictToggle = 1;
var current;
var i = 0;


// This generates a random number from 0 to 3, to target one of the three colors in the array called arrayId's.
function randomNum0to3() {
  return Math.floor(Math.random() * 4);
}

// This creates a random sequence of 20 items.
function createSequence20() {
  for (var i = 0; i < 20; i++) {
    goalPattern.push(arrayIds[randomNum0to3()]);
    //  If an item in the sequence repeats the item in the sequence before it, it is removed from the array, then i is decreased one, so that the sequence can go one more time, but still produce only 20 items in the array.
    if (goalPattern[i] === goalPattern[i - 1]) {
      goalPattern.pop();
      i--;
    }
  }
  console.log(goalPattern);
}

function testMatch(goalPattern, arrayPlayer) {
  for (var i = 0; i < arrayPlayer.length; i++) {
    if (goalPattern[i] !== arrayPlayer[i]){
      return false;
    }
  }
  return true;
}

function resetGame() {
  arrayPlayer = [];
  goalPattern =[];
  createSequence20();
  counter = 0;
  $("#counter").text(counter);
}
