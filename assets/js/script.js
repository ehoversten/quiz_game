// Testing connection
console.log("scripts loaded");

// Let's connect our button
let btn = document.getElementById("start");
btn.addEventListener("click", startGame);

// Let's connect to our question div
let questionDiv = document.getElementById("question");


function startGame() {
    console.log("clicked");

    // Create a new element to hold our question
    let displayQuestion = document.createElement("h1");
    // Add text to our element
    displayQuestion.textContent = "Button Clicked!";
    // Add question to the DOM
    questionDiv.appendChild(displayQuestion);
}




