// Testing connection
console.log("scripts loaded");

// Global Variables
let timeLeft = 60;
let highScore = 85;
let highScoreArray = [];
let gameScore;

let score = document.getElementById("score");
let time = document.getElementById("time");

let numQuestions = questions.length;
let currentQuestion;
let gameEnd = true;

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



function initialize() {
    console.log("Setting up");

    // initalize question set
    currentQuestion = 0;
    userAnswers = [];
    score.textContent = highScore;
}

// Start Game Function
function startGame() {
    console.log("Starting Game");
    gameEnd = false;
    // Initialize Timer

    // Call Timer function
    timer();
    time.textContent = timeLeft;
    // ** TESTING ** //
    // Create a new element to hold our question
 //   let displayQuestion = document.createElement("h1");
    // Add text to our element
//    displayQuestion.textContent = "Button Clicked!";
    // Add question to the DOM
//    questionDiv.appendChild(displayQuestion);
    btn.classList.add("hide");

    check();
}



// Timer Function
function timer() {
    console.log("Timer Started ...");

    // Let's Create a new timer
    timerInterval = setInterval(function () {
        // ** TESTING ** 
        // console.log(timeLeft);

        // Decrement time
        timeLeft--;
        // Update the DOM with the time
        time.textContent = timeLeft;

        // Make sure that we clear the timer when timer reaches zero
        if (timeLeft === 0 || gameEnd === true) {
            // Clear the timer
            // clearInterval(timerInterval);
            console.log("Time UP!");
            // gameEnd = true;

            // Create a new element to hold the time left
            let timeDisplay = document.createElement("p");
            // Add text to our element
            time.textContent = timeLeft;
            timeDisplay.textContent = "Times Up!";
            // Add question to the DOM
            questionDiv.appendChild(timeDisplay);
            endGame();
        }
    }, 1000);

}

function check() {
    // ** TESTING ** //
    console.log("Running check");
    console.log(`Current Question: ${currentQuestion}`);
    console.log(`Total Questions: ${numQuestions}`);
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
    
        choices = document.getElementById("choices");

        // Render a new li for each question choice

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

    // for (let i = 0; i < questions.length; i++) {
    //     // Clear current question and update span
    //     let askQuestion = document.getElementById("ask");
    //     askQuestion.textContent = questions[0].title;

    //     let choices = document.getElementById("choices");

    //     // Render a new li for each question choice
    //     for (let j = 0; j < questions.choices.length; j++) {

    //         // Create li element for each answer choice
    //         let ansChoice = document.createElement("li");
    //         // Add 'id' attribute to each choice 
    //         ansChoice.setAttribute("id", j);
    //         // Add 'data' attribute to each choice
    //         ansChoice.setAttribute("data", `data-choice-${j}`);
    //         ansChoice.setAttribute("value", `value-choice-${j}`);
    //         // Add event listener
    //         ansChoice.addEventListener("click", function (event) {
    //             event.stopPropagation();
    //             console.log(event.target);
    //             // console.log(event.target.value);
    //         })
    //         // Update text of li element
    //         ansChoice.textContent = questions[i].choices[j];

    //         // Add answer choice to <ul> DOM
    //         choices.appendChild(ansChoice);

    //     }
    // }

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
    let showLeader = document.getElementById("scoreboard");
    showLeader.classList.remove("hide");

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
    let userForm = document.getElementById("user-form");
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

        // Clear Input
        userInitials.innerHTML = '';

        // Show Leader Board
        showLeader();
    });
    
}


// Initalize Variables on Browser Load
initialize();