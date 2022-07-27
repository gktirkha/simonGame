var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keydown", function (event) {
    if (!started) {
        started = true;
        $("#level-title").text("Level " + 0);
        nextSequence();
    }
})

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
});

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    var playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => { audio.pause(); })
            .catch(error => { });
    }
}


function animatePress(currentColor) {
    $("#" + currentColor).fadeOut(100).fadeIn(100);
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function checkAnswer() {
    if (userClickedPattern[userClickedPattern.length - 1] == gamePattern[userClickedPattern.length - 1]) {
        if (userClickedPattern.length == gamePattern.length) setTimeout(nextSequence, 1000);
    }
    else {
        $("#level-title").text("Game Over Press Any Key To Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver()
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}