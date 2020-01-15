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

// Grab HTML elements for later DOM manipulation
let time = document.getElementById("timer");
let score = document.getElementById("user-score");

let startBtn = document.getElementById("start");
startBtn.addEventListener("click", newGame);

// Get each container <div>
let welcomeDiv = document.querySelector(".welcome-container");
let questionDiv = document.querySelector(".questions-container");
let formDiv = document.querySelector(".form-container");
let highScoreModal = document.querySelector(".modal-container");
let leaderboard = document.querySelector(".user-scores");
let leaderLink = document.querySelector(".leaderText");
leaderLink.addEventListener("click", showLeader)

let qTitle = document.getElementById("question-title");
let qChoices = document.getElementById("question-choices");

// Grab form input element 
let username = document.getElementById("username");

// Capture Submit Event
let userSubmit = document.getElementById("userSubmit");
userSubmit.addEventListener("click", saveUser);

// Modal Logic
let closeModal = document.querySelector(".close")
closeModal.addEventListener("click", clearModal);
// Close Modal when clicked outside of modal-container
window.addEventListener("click", outsideModal);

let exit = document.querySelector(".exit");
exit.addEventListener("click", clearModal);

let clearScores = document.querySelector(".clear");
clearScores.addEventListener("click", clearLeaderBoard);

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
                score: 90
            },
            {
                username: "Manhattan",
                score: 85
            },
            {
                username: "Kire",
                score: 83
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
    // Reset score
    gameScore = 0;

    // Initalize question set 
    currentQuestion = 0;

    // ** REMOVE ??? ** //
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
    check();
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
            gameOver();
        }
    }, 1000)  // Run every 1000 ms (or 1 second)
}


// ---------------------------------------------------- //
//
// Check Function: Tests if we have run out of quesitons
//
// ---------------------------------------------------- //
function check() {
    // TEST HOW MANY QUESTIONS LEFT
    if (currentQuestion === numQuestions) {
        // Run gameOver function
        gameOver();
    } else {
        loadQuestion();
    }
} 


// ---------------------------------------------------- //
//
// Load Question Function:
//
// ---------------------------------------------------- //
function loadQuestion() {
    // Clear question title
    qTitle.textContent = '';
    qChoices.textContent = '';

    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
        qTitle.textContent = questions[currentQuestion].title;

        //-- Render a new <li> for each question choice --//
        // Create li element for each answer choice
        let ansChoice = document.createElement("li");
        // Add 'id' attribute to each choice 
        ansChoice.setAttribute("id", i);
        // Add 'data' attribute to each choice
        ansChoice.setAttribute("data-name", `data-choice-${i}`);
        ansChoice.setAttribute("value", questions[currentQuestion].choices[i]);
        // Add our class containing the CSS styling 
        ansChoice.classList.add("ans-choice");


        // Add event listener
        ansChoice.addEventListener("click", next)
        // Update text of li element
        ansChoice.textContent = questions[currentQuestion].choices[i];

        // Add answer choice to <ul> DOM
        qChoices.appendChild(ansChoice);
    }

}

// ---------------------------------------------------- //
//
// Log User Selection Function:
//
// ---------------------------------------------------- //
function next(event) {
    // Uncomment the lines below and inspect the console output if your struggling with events
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.id);
    // console.log(event.target.innerText);

    if(event.target.innerText === questions[currentQuestion].answer) {
        gameScore += 10;
    }

    // Increment currentQuestion
    currentQuestion++;

    // Run check
    check();
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
    time.textContent = "- -";

    // Add any time left to game score
    gameScore += count;

    // Hide question container
    questionDiv.classList.add("hide");

    // Display Game Score
    score.textContent = gameScore;
    // Un-hide form container
    formDiv.classList.remove("hide");
    // Clear form input field
    username.value = '';
}


// ---------------------------------------------------- //
//
// Save User/Score Function: 
//
// ---------------------------------------------------- //
function saveUser() {
    // Prevent the form from reloading the page
    event.preventDefault();
    // Check that the input is NOT empty
    if (username.value == '') {
        return;
    }

    let tempArray = localStorage.getItem("userScores");
    // TEST Do we have a JSON object called 'userScores' stored in localStorage?
    let parsedTempArray = JSON.parse(tempArray);
    // IF we DO have stored data in localStorage run the following
    if (parsedTempArray !== null) {
        // Add current game score to high score array
        parsedTempArray.push(
            {
                username: username.value,
                score: gameScore
            }
        );
        // Save updated JavaScript OBJECT to local storage by turning it into a JSON OBJECT
        localStorage.setItem('userScores', JSON.stringify(parsedTempArray));
    } else {  
        // ELSE - the userScores OBJECT was cleared and we need to create a new ARRAY to put our JS Object into, convert it and store it.
        let highScoreArray = [];
        // Add current game score to high score array
        highScoreArray.push(
            {
                username: username.value,
                score: gameScore
            }
        );
        localStorage.setItem('userScores', JSON.stringify(highScoreArray));
    }
    // Clear form input field
    username.value = '';
    // Display the Leader Board
    showLeader();
}

// ---------------------------------------------------- //
//
// Leader Board Function: Function will pull userScore OBJECT
//     from local storage and create a leader board div
//
// ---------------------------------------------------- //
function showLeader() {
    // Hide All Container Divs
    formDiv.classList.add("hide");
    questionDiv.classList.add("hide");
    welcomeDiv.classList.add("hide");

    // Un-hide leader board modal container
    highScoreModal.classList.remove("hide");

    // Clear the users and scores from <ul id='highscores'>
    leaderboard.innerHTML = "";

    let highScoreBoard = localStorage.getItem('userScores');
    let parsedScoreBoard = JSON.parse(highScoreBoard);

    // Display high scores
    for (let i = 0; i < parsedScoreBoard.length; i++) {
        let newScore = document.createElement("li");
        newScore.textContent = parsedScoreBoard[i].username + " : " + parsedScoreBoard[i].score;
        newScore.classList.add("score-item");
        leaderboard.appendChild(newScore);
    }
}

// ---------------------------------------------------- //
//
// Clear Leader Board Function: Function will clear userScore OBJECT
//     from local storage
//
// ---------------------------------------------------- //
function clearLeaderBoard() {
    // Clear what is in localStorage
    localStorage.removeItem("userScores");

    // TEST to make sure it cleared
    console.log("Scores Cleared");
    console.log(localStorage);
    // Clear the <ul> DOM element
    leaderboard.innerHTML = "";
}

// ---------------------------------------------------- //
//
// Clear Modal Function: Function will clear Leader Board
//      Modal overlay and return to welcome screen
//
// ---------------------------------------------------- //
function clearModal() {
    // hide modal
    highScoreModal.classList.add("hide");
    // Un-hide Start Message
    welcomeDiv.classList.remove("hide");
}

function outsideModal(event) {
    if (event.target == highScoreModal) {
        // hide modal
        highScoreModal.classList.add("hide");
        // Un-hide Start Message
        welcomeDiv.classList.remove("hide");
    }
} 