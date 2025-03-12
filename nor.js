// Ensure script runs only after DOM loads
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");

    if (!canvas) {
        console.error("Canvas not found! Make sure <canvas id='myCanvas'> exists in your HTML.");
        return;
    }

    let ctx = canvas.getContext("2d");

    // Run justorgate() only if the canvas exists
    justorgate();
});

// Global context variable
let ctx = null;
let correctAnswer = ""; // Store correct answer globally

const canvas = document.getElementById("myCanvas");
if (canvas) {
    ctx = canvas.getContext("2d");
} else {
    console.error("Canvas not found! Make sure <canvas id='myCanvas'> exists in HTML.");
}

// Function to check the selected answer
function checkAnswer(selectedButton) {
    let selectedAnswer = selectedButton.innerText;
    let correctButton = [...document.querySelectorAll(".option-text")]
        .find(btn => btn.innerText === correctAnswer);

    if (selectedAnswer === correctAnswer) {
        selectedButton.style.backgroundColor = "green"; // Correct answer
    } else {
        selectedButton.style.backgroundColor = "red"; // Wrong answer
        correctButton.style.backgroundColor = "green"; // Highlight correct answer
    }

    // Disable Further Selections
    document.querySelectorAll(".option-text").forEach(btn => {
        btn.onclick = null;
    });
}

// Function to generate decoder questions
function generateDecoderQuestion() {
    const questions = [questionType5, questionType4, draw31Decoder];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    randomQuestion();
}

// Function to draw a 2-to-4 decoder circuit
function draw2Decoder() {
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Draw 2-to-4 Decoder Box
    ctx.strokeRect(150, 50, 200, 160);
    ctx.fillText("2-to-4 Decoder", 250, 130);

    // Generate Random Inputs (A, B)
    let A = Math.random() < 0.5 ? 0 : 1;
    let B = Math.random() < 0.5 ? 0 : 1;

    // Display inputs in the circuit
    ctx.fillText("A", 40, 105);
    ctx.fillText("B", 40, 145);
    ctx.fillText("A", 165, 105);
    ctx.fillText("B", 165, 145);

    // Connect inputs to decoder
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(150, 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 140);
    ctx.stroke();

    // Draw outputs Y0 to Y3 on the right
    for (let i = 0; i < 4; i++) {
        let yPos = 80 + i * 30;
        ctx.beginPath();
        ctx.moveTo(350, yPos);
        ctx.lineTo(400, yPos);
        ctx.stroke();
        ctx.fillText(`Y${i}`, 330, yPos + 5);
    }

    // Calculate the correct Y output based on (A, B)
    let outputIndex = (A << 1) | B; // Converts (A, B) to binary index

    // Display the question with the random inputs
    ctx.fillText(`If A=${A}, B=${B}, what is the output?`, 400, 250);

    // Store the correct answer as "Yx"
    correctAnswer = `Y${outputIndex}`;

    // Generate 3 incorrect answers randomly
    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let randWrong = Math.floor(Math.random() * 4); // Random Y0-Y3
        if (randWrong !== outputIndex) {
            incorrectAnswers.add(`Y${randWrong}`);
        }
    }
    incorrectAnswers = Array.from(incorrectAnswers);

    // Shuffle answers (1 correct + 3 incorrect)
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5); // Shuffle order

    // Assign answers to buttons
    document.getElementById("option1").innerText = allAnswers[0];
    document.getElementById("option2").innerText = allAnswers[1];
    document.getElementById("option3").innerText = allAnswers[2];
    document.getElementById("option4").innerText = allAnswers[3];

    // Reset Button Colors
    document.querySelectorAll(".option-text").forEach(btn => {
        btn.style.backgroundColor = "";
        btn.onclick = function () {
            checkAnswer(this);
        };
    });
}

// Function to draw a 3-to-8 decoder circuit
function draw31Decoder() {
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Draw 3-to-8 Decoder Box
    ctx.strokeRect(250, 105, 150, 220);
    ctx.fillText("3-to-8 Decoder", 330, 350);

    // Generate Random Inputs (X, Y, Z)
    let X = Math.random() < 0.5 ? 0 : 1;
    let Y = Math.random() < 0.5 ? 0 : 1;
    let Z = Math.random() < 0.5 ? 0 : 1;

    // Display inputs in the circuit
    ctx.fillText("X", 150, 170);
    ctx.fillText("Y", 150, 210);
    ctx.fillText("Z", 150, 250);

    // Connect inputs to decoder
    ctx.beginPath();
    ctx.moveTo(160, 165);
    ctx.lineTo(250, 165);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(160, 205);
    ctx.lineTo(250, 205);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(160, 245);
    ctx.lineTo(250, 245);
    ctx.stroke();

    // Draw outputs Y0 to Y7 on the right
    for (let i = 0; i < 8; i++) {
        let yPos = 130 + i * 25;
        ctx.beginPath();
        ctx.moveTo(400, yPos);
        ctx.lineTo(450, yPos);
        ctx.stroke();
        ctx.fillText(`Y${i}`, 380, yPos + 5);
    }

    // Calculate the correct Y output based on (X, Y, Z)
    let outputIndex = (X << 2) | (Y << 1) | Z; // Converts (X, Y, Z) to binary index

    // Display the question with the random inputs
    ctx.fillText(`If X=${X}, Y=${Y}, Z=${Z}, which output will be activated?`, 350, 420);

    // Store the correct answer as "Yx"
    correctAnswer = `Y${outputIndex}`;
}

// Function to initialize the page
function justorgate() {
    console.log("justorgate function loaded and running.");

    if (!ctx) {
        console.error("Canvas context is not initialized.");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText("Binary Decoder Loaded", canvas.width / 2, canvas.height / 2);
}

// Toggle Truth Table
document.getElementById("toggle-truth-table").addEventListener("click", function () {
    const truthTable = document.getElementById("truth-table");

    if (truthTable.style.display === "none" || truthTable.style.display === "") {
        truthTable.style.display = "block";
        this.textContent = "Hide Truth Table";
    } else {
        truthTable.style.display = "none";
        this.textContent = "Show Truth Table";
    }
});
