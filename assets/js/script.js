// Testing connection
console.log("scripts loaded");

// Global Variables
let highScore = 0;
let timeLeft = 10;

let score = document.getElementById("score");
let time = document.getElementById("time");

let numQuestions = questions.length;

// Let's connect our button
let btn = document.getElementById("start");
btn.addEventListener("click", startGame);

// Let's connect to our question div
let questionDiv = document.getElementById("question");


function initialize() {
    console.log("Started");
    // Initialize Timer
    time.textContent = timeLeft;
    score.textContent = highScore;
}

// Start Game Function
function startGame() {
    console.log("clicked");
    initialize();

    // ** TESTING ** //
    // Create a new element to hold our question
 //   let displayQuestion = document.createElement("h1");
    // Add text to our element
//    displayQuestion.textContent = "Button Clicked!";
    // Add question to the DOM
//    questionDiv.appendChild(displayQuestion);

    // Call Timer function
    timer();
    loadQuestion();
}



// Timer Function
function timer() {
    console.log("Timer Started ...");

    // Let's Create a new timer
    var timerInterval = setInterval(function () {
        // ** TESTING ** 
        // console.log(timeLeft);

        // Update the DOM with the time
        time.textContent = timeLeft;
        // Decrement time
        timeLeft--;

        // Make sure that we clear the timer when timer reaches zero
        if (timeLeft === 0) {
            // Clear the timer
            clearInterval(timerInterval);
            console.log("Time UP!");
            // Create a new element to hold the time left
            let timeDisplay = document.createElement("p");
            // Add text to our element
            time.textContent = timeLeft;
            timeDisplay.textContent = "Times Up!";
            // Add question to the DOM
            questionDiv.appendChild(timeDisplay);
        }
    }, 1000);

}


// Load Question
function loadQuestion() {

    // Clear current question and update span
    let askQuestion = document.getElementById("ask");
    askQuestion.textContent = questions[0].title;

    let choices = document.getElementById("choices");
    // Render a new li for each question choice
    for(let i = 0; i < questions[0].choices.length; i++) {
        console.log(i)
        // Create li element for each answer choice
        let ansChoice = document.createElement("li");
        // Add 'id' attribute to each choice 
        ansChoice.setAttribute("id", i);
        // Add 'data' attribute to each choice
        ansChoice.setAttribute("data", `data-choice-${i}`);
        ansChoice.setAttribute("value", `value-choice-${i}`);
        // Add event listener
        ansChoice.addEventListener("click", function(event) {
            event.stopPropagation();
            console.log(event.target);
            console.log(event.target.value);
        })
        // Update text of li element
        ansChoice.textContent = questions[0].choices[i]; 

        // Add answer choice to <ul> DOM
        choices.appendChild(ansChoice);
    }
}


