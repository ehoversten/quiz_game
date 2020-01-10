// Testing connection
console.log("scripts loaded");

//  Declare Global Variables
// Define amount of game time (in seconds)
let count;

// How many questions do we have?
let numQuestions = questions.length;

// Create a variable to keep track of what question we are on
let currentQuestion;

// Create a variable to hold the STATE of the game
let gameEnd = true;

// Create a variable to store the current games score
let gameScore;

// Declare our timer variable globally and we can clear it anywhere in our code later (not just when the timer ends, say when the game ends)
let timerInterval;

// Create a GLOBAL variable to hold our users answers
let userAnswers = [];

// Create a variable to PERSIST our high score
// let highScoreArray = [
//     {
//         username: "Bobby",
//         score: 45
//     },
//     {
//         username: "Manhattan",
//         score: 42
//     },
//     {
//         username: "Kire",
//         score: 40
//     }
// ];

// localStorage.setItem("userScores", JSON.stringify(highScoreArray));

// Grab HTML elements for later DOM manipulation
let score = document.getElementById("score");
let username = document.getElementById("username");
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
    let findTopScore = localStorage.getItem("userScores");

    // Parse the string JSON object into a JavaScript Object
    let parsedScore = JSON.parse(findTopScore);
    console.log(parsedScore);

    // create a variable to hold the max score;
    let max = 0;
    let user;

    // Let's find the TOP score
    for(let i = 0; i < parsedScore.length; i++) {
        // TEST to see if current score [i] is greater than current value of max
        // NOTE that we are dealing with an OBJECT, the OBJECT contains both 'username' and 'score' properties
        if(max < parsedScore[i].score) {
            // IF GREATER than set new max value
            max = parsedScore[i].score;
            user = parsedScore[i].username;
        }
    }

    // Update high score in DOM
    score.textContent = max;
    username.textContent = user;
}

// We declared it let's call it on Browser!
initialize();

// ---------------------------------------------------- //
//
// Start Game Function: 
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
    // Define amount of game time (in seconds)
    count = 75;
    // call timer function to initiate timerInterval
    timer();
    // Update the timer on the DOM
    time.textContent = count;

    // ** REMOVE ** //
    // let timeupDisplay = document.getElementById("timeup");
    // timeupDisplay.remove();
    // ** REMOVE ** //

    // Hide start button
    btn.classList.add("hide");
    // Hide Leader Board
    scoreBoard.classList.add("hide");
    // Un-hide Question Div (if playing consecutive times)
    ask.classList.remove("hide");

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
        if (count === 0 ) {
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
    // Uncomment the lines below and inspect the console output if your struggling with events
    // console.log(event);
    // console.log(event.target);
    console.log(event.target.id);

    console.log(event.target.innerText);
    userAnswers.push(event.target.innerText);
    
    clear();
    // Increment currentQuestion
    currentQuestion++;

    // Run check
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
// Clear Question Function: Clears the question and selection text from the DOM
//
// ---------------------------------------------------- //
function clear() {
    // ** THIS WILL NOT WORK THE WAY WE THINK ** //
    // This way will remove the HTML elements from the DOM, so after question #1 there is no
    // DOM ELEMENT to change the text content of.
    // questionDiv.removeChild(askQuestion);
    // questionDiv.removeChild(choices);

    // ** THIS WILL NOT WORK THE WAY WE THINK ** //
    // Same thing as above, removes the DOM NODE
    // askQuestion.remove();
    // choices.remove();

    // ** Either of the two methods below will work ** //
    // askQuestion.textContent = '';
    // choices.textContent = '';

    // We clear out the text contents 
    askQuestion.innerHTML = '';
    choices.innerHTML = '';

    return;
}

// ---------------------------------------------------- //
//
// End Game Function: Updates gameEnd variable, clears the timer interval, displays end game text 
//      calls the scoring function and the username form
//
// ---------------------------------------------------- //
function endGame() {

    // Set gameEnd variable to TRUE
    gameEnd = true;

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
    // Clear form input field
    userInitials.value = '';

    // Capture Submit Event
    let userSubmit = document.getElementById("userSubmit");
    userSubmit.addEventListener("click", function(event) {
        event.preventDefault();

        console.log(userInitials.value);

        let tempArray = localStorage.getItem("userScores");
        let parsedTempArray = JSON.parse(tempArray);
        console.log(parsedTempArray);
        
        // Add current game score to high score array
        parsedTempArray.push( 
            {   
                username: userInitials.value, 
                score: gameScore 
            } 
            ); 
            
        console.log(parsedTempArray);

        // Save updated JavaScript OBJECT to local storage by turning it into a JSON OBJECT
        localStorage.setItem('userScores', JSON.stringify(parsedTempArray));

        // Clear form input
        userInitials.innerHTML = '';

        // Show Leader Board
        showLeader();
        // Un-Hide start button
        btn.classList.remove("hide");
    });
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

    let scoreBoardText = document.getElementById("highscores");
    console.log("parseing local storage object")
    let highScoreBoard = localStorage.getItem('userScores');
    let parsedScoreBoard = JSON.parse(highScoreBoard);

    console.log(parsedScoreBoard);

    // Display high scores
    for (let i = 0; i < parsedScoreBoard.length; i++) {
        let newScore = document.createElement("li");
        newScore.textContent = parsedScoreBoard[i].username + " : " + parsedScoreBoard[i].score;
        scoreBoardText.appendChild(newScore);
    }

}


