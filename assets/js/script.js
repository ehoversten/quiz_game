// Testing connection
console.log("scripts loaded");

//  Declare Global Variables
// Define amount of game time (in seconds)
let count = 60;

// How many questions do we have?
let numQuestions = questions.length;

// Create a variable to keep track of what question we are on
let currentQuestion;

// Create a variable to hold the STATE of the game
let gameEnd = true;
let gameScore;

// Declare our timer variable globally and we can clear it anywhere in our code later (not just when the timer ends, say when the game ends)
let timerInterval;

// Create a GLOBAL variable to hold our users answers
let userAnswers = [];

// ** TEMP TESTING CODE ** //
let highScore = 85;

let highScoreArray = [
    {
        username: "Bobby",
        score: 96
    },
    {
        username: "Manhattan",
        score: 90
    },
    {
        username: "Kire",
        score: 89
    } 
];
// ** TEMP TESTING CODE ** //

// Grab HTML elements for later DOM manipulation
let score = document.getElementById("score");
let time = document.getElementById("time");

// Let's connect our button
let btn = document.getElementById("start");
btn.addEventListener("click", startGame);

// Let's connect to our question div
let questionDiv = document.getElementById("question");
let askQuestion = document.getElementById("ask");
let choices = document.getElementById("choices");

let userForm = document.getElementById("user-form");
let scoreBoard = document.getElementById("scoreboard");


// ---------------------------------------------------- //
//
// Initalization Function: Function will look into local
//    storage, convert JSON objct into JavaScript object,
//    and sort through object array for highest score.
//
// ---------------------------------------------------- //

function initialize() {
    console.log("Setting up");

    // Pull out scores from the localStorage OBJECT
    let topScore = localStorage.getItem("userScore")

    // Parse the string JSON object into a JavaScript Object
    let parseScore = JSON.parse(topScore);
    console.log(parseScore);

    // Update high score in DOM
    score.textContent = parseScore.score;
}

// ---------------------------------------------------- //
//
// Start Game Function
//
// ---------------------------------------------------- //
function startGame() {
    console.log("Starting Game");
    // Set gameEnd variable to FALSE and start game
    gameEnd = false;
    
    // Initalize question set 
    currentQuestion = 0;
    // Reset answer array for new game
    userAnswers = [];

    // Initialize Timer
    timer();
    time.textContent = count;

    // Hide start button
    btn.classList.add("hide");

    // Run check function
    check();
}


// ---------------------------------------------------- //
//
// Timer Function:
//
// ---------------------------------------------------- //
function timer() {
    console.log("Timer Started ...");

    // Create a new timer
    timerInterval = setInterval(function () {
        // Decrement timer variable
        count--;

        // Update the DOM with the time
        time.textContent = count;

        // Test - Time rus out 
        if (count === 0 || gameEnd === true) {
            // Create a new element to hold the time left
            let timeDisplay = document.createElement("p");
            // Add text to our element
            timeDisplay.textContent = "Times Up!";
            // Add Element to the DOM
            questionDiv.appendChild(timeDisplay);
            // Run endGame function
            endGame();
        }

    }, 1000);  // Run every 1000 ms (or 1 second)

}

// ---------------------------------------------------- //
//
// Check Function:
//
// ---------------------------------------------------- //
function check() {
    // TEST HOW MANY QUESTIONS LEFT
    if (currentQuestion === numQuestions) {
        // Run endGame function
        endGame();
    } else {
        loadQuestion();
    }
} 

// ---------------------------------------------------- //
//
// Log User Selection Function:
//
// ---------------------------------------------------- //
function next(event) {
    // event.stopPropagation();

    // console.log(event);
    // console.log(event.target);
    console.log(event.target.id);
    // WHY CAN"T I USE VALUE HERE????
    console.log(event.target.innerText);
    userAnswers.push(event.target.innerText);
    
    clear();
    // Increment currentQuestion
    currentQuestion++;
    check();
}

// ---------------------------------------------------- //
//
// Load Question Function:
//
// ---------------------------------------------------- //
function loadQuestion() {
    // ** TESTING ** //
    console.log(`Current Question is ${1 + currentQuestion}`);

    for(let i = 0; i < questions[currentQuestion].choices.length; i++) {
        // Clear current question and update span
        askQuestion = document.getElementById("ask");
        askQuestion.textContent = questions[currentQuestion].title;
    
        // Grab the containing element to add dynamically created content
        choices = document.getElementById("choices");

    //-- Render a new <li> for each question choice --//
        // Create li element for each answer choice
        let ansChoice = document.createElement("li");
        // Add 'id' attribute to each choice 
        ansChoice.setAttribute("id", i);
        // Add 'data' attribute to each choice
        ansChoice.setAttribute("data", `data-choice-${i}`);
        ansChoice.setAttribute("value", questions[currentQuestion].choices[i] );
        // Add event listener
        ansChoice.addEventListener("click", next)
        // Update text of li element
        ansChoice.textContent = questions[currentQuestion].choices[i]; 

        // Add answer choice to <ul> DOM
        choices.appendChild(ansChoice);
    }

}

// ---------------------------------------------------- //
//
// Clear Question Function:
//
// ---------------------------------------------------- //
function clear() {
    // ** THIS WILL NOT WORK THE WAY WE THINK ** //
    // questionDiv.removeChild(askQuestion);
    // questionDiv.removeChild(choices);

    // ** THIS WILL NOT WORK THE WAY WE THINK ** //
    // askQuestion.remove();
    // choices.remove();

    // ** THIS WILL NOT WORK THE WAY WE THINK ** //
    // questionDiv.textContent = '';
    // askQuestion.textContent = '';

    // questionDiv.innerHTML = '';
    askQuestion.innerHTML = '';
    choices.innerHTML = '';
    return;
}

// ---------------------------------------------------- //
//
// End Game Function:
//
// ---------------------------------------------------- //
function endGame() {

    // Clear countdown timer
    clearInterval(timerInterval);
    // Empty Question and Selection Choice Div
    clear();
    
    // Display endGame Message 
    askQuestion.textContent = "GAME OVER";
    time.textContent = "- - - -";
    console.log("Game OVER!!");

    // Find out users score 
    scoreGame();
    // Send user to form to save username and score
    saveUser();
}

// ---------------------------------------------------- //
//
// Score Game Function: Function will calculate users score
//
// ---------------------------------------------------- //
function scoreGame() {
    // ** Calculate users score ** //
    gameScore = count;
    console.log(`Game Score: ${gameScore}`);

    // Return from scoreGame function
    return;
}

// ---------------------------------------------------- //
//
// Leader Board Function: Function will pull userScore OBJECT
//     from local storage and create a leader board div
//
// ---------------------------------------------------- //
function showLeader() {
    // Hide user-form div
    userForm.classList.add("hide");
    // Hide Question/Game Over Div
    askQuestion.classList.add("hide");

    // Un-hide score board div
    scoreBoard.classList.remove("hide");

    let highScoreBoard = document.getElementById("highscores");
    // TEST if any scores currently exist
    if(!highScoreArray) {
        highScoreBoard.textContent = " - "
    }
    // Display high scores
    for(let i = 0; i < highScoreArray.length; i++) {
        let newScore = document.createElement("li");
        newScore.textContent = highScoreArray[i].username + " : " + highScoreArray[i].score;
        highScoreBoard.appendChild(newScore);
    }

}

// ---------------------------------------------------- //
//
// Save User/Score Function:
//
// ---------------------------------------------------- //
function saveUser() {
    // Un-Hide User form and score
    userForm.classList.remove("hide");

    // Update user score in DOM
    let userScore = document.getElementById("userScore");
    userScore.innerHTML = gameScore;

    // Grab form input element 
    let userInitials = document.getElementById("userInitials");

    // Capture Submit Event
    let userSubmit = document.getElementById("userSubmit");
    userSubmit.addEventListener("click", function(event) {
        event.preventDefault();

        console.log(userInitials.value);

        // Add current game score to high score array
        highScoreArray.push( 
            {   
                username: userInitials.value, 
                score: gameScore 
            } 
        ); 

        // Create a new object to hold the new score and name
        let highUserScore = {
            username: userInitials.value,
            score: gameScore
        } 
        // Add new submission to Local Storage
        localStorage.setItem("userScore", JSON.stringify(highUserScore));

        // Clear form input
        userInitials.innerHTML = '';

        // Show Leader Board
        showLeader();
    });
    
}


// Initalize Variables on Browser Load
initialize();