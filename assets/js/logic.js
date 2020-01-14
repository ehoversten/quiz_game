// **  Declare Global Variables ** //

// Define amount of game time (in seconds)
let count;

// How many questions do we have?
let numQuestions = questions.length;

// Create a variable to keep track of what question we are on
let currentQuestion;

// Create a variable to hold the STATE of the game
let gameStop = true;

// Create a variable to store the current games score
let gameScore;

// Declare our timer variable globally and we can clear it anywhere in our code later (not just when the timer ends, say when the game ends)
let timerInterval;

// Create a GLOBAL variable to hold our users answers
let userAnswers = [];

let highScoreArray = [];

// Grab HTML elements for later DOM manipulation
let time = document.getElementById("timer");

let startBtn = document.getElementById("start");
startBtn.addEventListener("click", newGame);

// Get each container <div>
let welcomeDiv = document.querySelector(".welcome-container");
let questionDiv = document.querySelector(".questions-container");
let formDiv = document.querySelector(".form-container");
let highScoreModal = document.querySelector(".modal-container");

// ---------------------------------------------------- //
//
// Initalization Function: Function will look into local
//    storage, convert JSON objct into JavaScript object,
//    and sort through object array for highest score.
//
// ---------------------------------------------------- //
function initialize() {

    // IF there is nothing stored currently in local storage add some filler data
    if (localStorage.length === 0) {
        // Create a variable to PERSIST our high score
        highScoreArray = [
            {
                username: "Bobby",
                score: 45
            },
            {
                username: "Manhattan",
                score: 42
            },
            {
                username: "Kire",
                score: 40
            }
        ];

        localStorage.setItem("userScores", JSON.stringify(highScoreArray));
    }

    // Pull out scores from the localStorage OBJECT
    let findTopScore = localStorage.getItem("userScores");

    // Parse the string JSON object into a JavaScript Object
    let parsedScore = JSON.parse(findTopScore);
    console.log(parsedScore);

    // create a variables to hold the max score by which user;
    let max = 0;
    let user;

    // Let's find the TOP score
    for (let i = 0; i < parsedScore.length; i++) {
        // TEST to see if current score [i] is greater than current value of max
        // NOTE that we are dealing with an OBJECT, the OBJECT contains both 'username' and 'score' properties
        if (max < parsedScore[i].score) {
            // IF GREATER than set new max value
            max = parsedScore[i].score;
            user = parsedScore[i].username;
        }
    }

    questionDiv.classList.add("hide");
    formDiv.classList.add("hide");
    highScoreModal.classList.add("hide");

}

// We declared it let's run it in the browswer
initialize();

// ---------------------------------------------------- //
//
// New Game Function: 
//
// ---------------------------------------------------- //
function newGame() {
    // Set gameEnd variable to FALSE and start game
    gameStop = false;

    // Initalize question set 
    currentQuestion = 0;
    // Reset answer array for new game
    userAnswers = [];

    // ** Initialize Timer ** //
    // Define amount of game time (in seconds)
    count = 75;
    // call timer function to initiate timerInterval
    timer();
    // Show time on the DOM
    time.textContent = count;

    // Hide 'welcome-container' div
    welcomeDiv.classList.add("hide");
    // Un-hide 'question-container' div
    questionDiv.classList.remove("hide");

    // Run check function
    // check();
}

// ---------------------------------------------------- //
//
// Timer Function:
//
// ---------------------------------------------------- //
function timer() {

     // Create a new timer
    timerInterval = setInterval(function() {
        // decrement timer count
        count--;
        // update display in DOM
        time.textContent = count;

        // Test - Time rus out 
        if (count === 0) {
            // Run gameOver function
            // endGame();
        }
    }, 1000)  // Run every 1000 ms (or 1 second)
}



// ---------------------------------------------------- //
//
// End Game Function: Updates gameEnd variable, clears the timer interval, displays end game text 
//      calls the scoring function and the username form
//
// ---------------------------------------------------- //
function gameOver() {

    // Set gameStop variable to TRUE
    gameStop = true;

    // Clear countdown timer
    clearInterval(timerInterval);

    // Empty Question and Selection Choice Div
    // clear();

    // *** Display endGame Message *** //

    // askQuestion.textContent = "GAME OVER";
    time.textContent = "- - - -";
    console.log("Game OVER!!");

    // Find out users score 
    // scoreGame();
    // Send user to form to save username and score
    // saveUser();

}