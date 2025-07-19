let buttonColors = ["green", "yellow", "red", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {
  let chosenColor = $(this).attr("id");
  userPattern.push(chosenColor);
  playSound(chosenColor);
  animatePress(chosenColor);
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (gamePattern.length === userPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);
  $("#" + randomColor)
    .fadeIn(50)
    .fadeOut(50)
    .fadeIn(50);
  playSound(randomColor);
}

function playSound(name) {
  //play audio on the base of color pressed
  console.log(name);
  new Audio("./sounds/" + name + ".mp3").play();
}

function animatePress(color) {
  $("." + color).addClass("pressed");
  setTimeout(function () {
    $("." + color).removeClass("pressed");
  }, 50);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
