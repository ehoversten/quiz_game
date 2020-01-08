// Testing connection
console.log("scripts loaded");

// Global Variables
let timeLeft = 60;
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
let gameScore;

let score = document.getElementById("score");
let time = document.getElementById("time");

let numQuestions = questions.length;
let currentQuestion;
let gameEnd = true;

// Declare our timer variable globally and we can clear it anywhere in our code later (not just when the timer ends, say when the game ends)
let timerInterval;

// Create a variable to hold our users answers
let userAnswers = [];


// Let's connect our button
let btn = document.getElementById("start");
btn.addEventListener("click", startGame);

// Let's connect to our question div
let questionDiv = document.getElementById("question");
let askQuestion = document.getElementById("ask");
let choices = document.getElementById("choices");

let userForm = document.getElementById("user-form");
let scoreBoard = document.getElementById("scoreboard");

function initialize() {
    console.log("Setting up");

    // initalize question set
    currentQuestion = 0;
    userAnswers = [];

    let topScore = localStorage.getItem("userScore")
    // score.textContent = topScore[0].score;
    let parseScore = JSON.parse(topScore);
    console.log(parseScore);
    score.textContent = parseScore.score;
}

// Start Game Function
function startGame() {
    console.log("Starting Game");
    gameEnd = false;
    // Initialize Timer

    // Call Timer function
    timer();
    time.textContent = timeLeft;

    // Hide start button
    btn.classList.add("hide");

    // Run check function
    check();
}



// Timer Function
function timer() {
    console.log("Timer Started ...");

    // Let's Create a new timer
    timerInterval = setInterval(function () {

        // Decrement time
        timeLeft--;
        // Update the DOM with the time
        time.textContent = timeLeft;

        // Make sure that we clear the timer when timer reaches zero
        if (timeLeft === 0 || gameEnd === true) {
            // Create a new element to hold the time left
            let timeDisplay = document.createElement("p");
            // Add text to our element
            time.textContent = timeLeft;
            timeDisplay.textContent = "Times Up!";
            // Add question to the DOM
            questionDiv.appendChild(timeDisplay);
            // Run endGame function
            endGame();
        }
    }, 1000);  // Run every 1000 ms (or 1 second)

}

function check() {
    // TEST HOW MANY QUESTIONS LEFT
    if (currentQuestion === numQuestions) {
        // Run endGame function
        endGame();
    } else {
        loadQuestion();
    }
} 

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


// Load Question
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


function endGame() {
    scoreGame();
    // Clear timer
    clearInterval(timerInterval);
    clear();
    
    askQuestion.textContent = "GAME OVER";
    time.textContent = "- - - -";
    console.log("Game OVER!!");
    
    // showLeader();
    saveUser();
}

function scoreGame() {
    gameScore = timeLeft;
    console.log(`Game Score: ${gameScore}`);;
    return;
}

function showLeader() {
    // Hide user-form div
    userForm.classList.add("hide");

    // let showLeader = document.getElementById("scoreboard");
    scoreBoard.classList.remove("hide");

    if(highScoreArray !== 0) {
        let highScoreBoard = document.getElementById("highscores");
        
        // loop through High Score Array
        for(let i = 0; i < highScoreArray.length; i++) {
            let newScore = document.createElement("li");
            newScore.textContent = highScoreArray[i].username + " : " + highScoreArray[i].score;
            highScoreBoard.appendChild(newScore);
        }
    }
}

function saveUser() {
    // let userForm = document.getElementById("user-form");
    userForm.classList.remove("hide");
    // reset user score

    let userScore = document.getElementById("userScore");
    userScore.innerHTML = gameScore;

    let userSubmit = document.getElementById("userSubmit");
    let userInitials = document.getElementById("userInitials");

    userSubmit.addEventListener("click", function(event) {
        event.preventDefault();

        console.log(userInitials.value);
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
        // set new submission
        localStorage.setItem("userScore", JSON.stringify(highUserScore));


        // Clear Input
        userInitials.innerHTML = '';

        // Show Leader Board
        showLeader();
    });
    
}


// Initalize Variables on Browser Load
initialize();