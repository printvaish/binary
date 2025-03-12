
const canvas = document.getElementById("myCanvas");
let ctx = canvas ? canvas.getContext("2d") : null;

if (!ctx) {
    console.error("Canvas not found! Make sure <canvas id='myCanvas'> exists in HTML.");
}

function draw2Decoder() {

    
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Draw 2-to-4 Decoder Box
    ctx.strokeRect(150, 50, 200, 160);
    ctx.fillText("2-to-4 Decoder", 50, 130);

    // Generate Random Inputs (A, B)
    let A = Math.random() < 0.5 ? 0 : 1;
    let B = Math.random() < 0.5 ? 0 : 1;

    // Display inputs in the circuit
    ctx.fillText("A", 40, 105);
    ctx.fillText("A", 165, 105);

    // Connect inputs to decoder
    ctx.beginPath();
    ctx.moveTo(50, 100); ctx.lineTo(150, 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(50, 140); ctx.lineTo(150, 140);
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

function draw31Decoder() {

    // Clear canvas
    if (!ctx) return;
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
    ctx.fillText("A", 265, 170);
    ctx.fillText("B", 265, 210);
    ctx.fillText("C", 265, 250);

    // Connect inputs to decoder
    ctx.beginPath();
    ctx.moveTo(160, 165); ctx.lineTo(250, 165);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(160, 205); ctx.lineTo(250, 205);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(160, 245); ctx.lineTo(250, 245);
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

    // Generate 3 incorrect answers randomly
    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let randWrong = Math.floor(Math.random() * 8); // Random Y0-Y7
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

function draw3Decoder() {

    // Clear canvas
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Draw 3-to-8 Decoder Box
    ctx.strokeRect(150, 50, 200, 220);
    ctx.fillText("3-to-8 Decoder", 250, 150);

    // Generate Random Inputs (X, Y, Z)
    let X = Math.random() < 0.5 ? 0 : 1;
    let Y = Math.random() < 0.5 ? 0 : 1;
    let Z = Math.random() < 0.5 ? 0 : 1;

    // Display inputs in the circuit
    ctx.fillText("X", 40, 95);
    ctx.fillText("Y", 40, 135);
    ctx.fillText("Z", 40, 175);
    ctx.fillText("A", 165, 95);
    ctx.fillText("B", 165, 135);
    ctx.fillText("C", 165, 175);

    // Connect inputs to decoder
    ctx.beginPath();
    ctx.moveTo(50, 90); ctx.lineTo(150, 90);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(50, 130); ctx.lineTo(150, 130);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(50, 170); ctx.lineTo(150, 170);
    ctx.stroke();

    // Draw outputs Y0 to Y7 on the right
    for (let i = 0; i < 8; i++) {
        let yPos = 70 + i * 25;
        ctx.beginPath();
        ctx.moveTo(350, yPos);
        ctx.lineTo(400, yPos);
        ctx.stroke();
        ctx.fillText(`Y${i}`, 330, yPos + 5);
    }

    // Calculate the correct Y output based on (X, Y, Z)
    let outputIndex = (X << 2) | (Y << 1) | Z; // Converts (X, Y, Z) to binary index

    // Display the question with the random inputs
    ctx.fillText(`If X=${X}, Y=${Y}, Z=${Z}, what is the output?`, 400, 400);

    // Store the correct answer as "Yx"
    correctAnswer = `Y${outputIndex}`;

    // Generate 3 incorrect answers randomly
    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let randWrong = Math.floor(Math.random() * 8); // Random Y0-Y7
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


function draw2Decoder() {
    // Clear only the decoder area, not the whole canvas
    if (!ctx) return;
    ctx.clearRect(0, 0, 500, 300); // Adjust if needed

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Increase the height of the decoder box
    ctx.strokeRect(150, 60, 200, 180);
    ctx.fillText("2-to-4 Decoder", 250, 145);

    // Draw inputs A and B
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(150, 100);
    ctx.stroke();
    ctx.fillText("X", 40, 105)
    ctx.fillText("A", 165, 105);

    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 140);
    ctx.stroke();
    ctx.fillText("Y", 40, 145)
    ctx.fillText("B", 165, 145);

    // Draw outputs Y0, Y1, Y2, Y3 inside the decoder box, aligned to the right
    for (let i = 0; i < 4; i++) {
        let yPos = 90 + i * 30;
        ctx.fillText(`Y${i}`, 330, yPos + 5);

        // Draw output lines flushed to the right side of the decoder
        ctx.beginPath();
        ctx.moveTo(350, yPos);
        ctx.lineTo(400, yPos);
        ctx.stroke();
    }
}


function draw33Decoder() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Increase the height of the decoder box
    ctx.strokeRect(150, 50, 200, 220);
    ctx.fillText("3-to-8 Decoder", 250, 150);

    // Draw inputs X, Y, and Z
    ctx.beginPath();
    ctx.moveTo(50, 90);
    ctx.lineTo(150, 90);
    ctx.stroke();
    ctx.fillText("X", 40, 95)
    ctx.fillText("A", 165, 95);

    ctx.beginPath();
    ctx.moveTo(50, 130);
    ctx.lineTo(150, 130);
    ctx.stroke();
    ctx.fillText("Y", 40, 135)
    ctx.fillText("B", 165, 135);

    ctx.beginPath();
    ctx.moveTo(50, 170);
    ctx.lineTo(150, 170);
    ctx.stroke();
    ctx.fillText("Z", 40, 175)
    ctx.fillText("C", 165, 175);

    // Draw outputs Y0 to Y7 flush to the right side of the decoder box
    for (let i = 0; i < 8; i++) {
        let yPos = 70 + i * 25;
        ctx.beginPath();
        ctx.moveTo(350, yPos);
        ctx.lineTo(400, yPos);
        ctx.stroke();
        ctx.fillText(`Y${i}`, 330, yPos + 5);
    }

    ctx.fillText("If X= , Y= , Z= . What is the output?", 400, 405);
}


function drawNandGate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Draw AND gate body
    ctx.beginPath();
    ctx.moveTo(120, 80);
    ctx.lineTo(170, 80);
    ctx.quadraticCurveTo(220, 120, 170, 160);
    ctx.lineTo(120, 160);
    ctx.closePath();
    ctx.stroke();

    // Draw NAND gate negation circle
    ctx.beginPath();
    ctx.arc(200, 120, 5, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw NAND gate output line
    ctx.beginPath();
    ctx.moveTo(205, 120);
    ctx.lineTo(250, 120);
    ctx.stroke();
    ctx.fillText("Output", 290, 125);
}


function questionType1() {
    //Find the output for 2 to 4 decoder

    // Clear only the decoder area, not the whole canvas
    if (!ctx) return;
    ctx.clearRect(0, 0, 500, 300); // Adjust if needed

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Increase the height of the decoder box
    ctx.strokeRect(150, 60, 200, 180);
    ctx.fillText("2-to-4 Decoder", 250, 145);

    const inputA = Math.random() < 0.5 ? "X" : "X'"; // Randomly select X or X'
    const inputB = Math.random() < 0.5 ? "Y" : "Y'"; // Randomly select Y or Y'

    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(150, 100);
    ctx.stroke();
    ctx.fillText(inputA, 40, 105)
    ctx.fillText("A", 165, 105);

    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 140);
    ctx.stroke();
    ctx.fillText(inputB, 40, 145)
    ctx.fillText("B", 165, 145);

    if (inputA === "X'" && inputB === "Y'") {
        output = "Y0";
    } else if (inputA === "X'" && inputB === "Y") {
        output = "Y1";
    } else if (inputA === "X" && inputB === "Y'") {
        output = "Y2";
    } else if (inputA === "X" && inputB === "Y") {
        output = "Y3";
    }

    // Draw outputs Y0, Y1, Y2, Y3 inside the decoder box, aligned to the right
    for (let i = 0; i < 4; i++) {
        let yPos = 90 + i * 30;
        ctx.fillText(`Y${i}`, 330, yPos + 5);

        // Draw output lines flushed to the right side of the decoder
        ctx.beginPath();
        ctx.moveTo(350, yPos);
        ctx.lineTo(400, yPos);
        ctx.stroke();
    }

    ctx.fillText(`Output: ${output}`, 250, 200);

}

function questionType2() {

    //Find the output for 3 to 8 decoder
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Increase the height of the decoder box
    ctx.strokeRect(150, 50, 200, 220);
    ctx.fillText("3-to-8 Decoder", 250, 150);

    // Draw inputs X, Y, and Z
    const inputA = Math.random() < 0.5 ? "X" : "X'"; // Randomly select X or X'
    const inputB = Math.random() < 0.5 ? "Y" : "Y'"; // Randomly select Y or Y'
    const inputC = Math.random() < 0.5 ? "Z" : "Z'"; // Randomly select Z or Z'

    ctx.beginPath();
    ctx.moveTo(50, 90);
    ctx.lineTo(150, 90);
    ctx.stroke();
    ctx.fillText(inputA, 40, 95)
    ctx.fillText("A", 165, 95);

    ctx.beginPath();
    ctx.moveTo(50, 130);
    ctx.lineTo(150, 130);
    ctx.stroke();
    ctx.fillText(inputB, 40, 135)
    ctx.fillText("B", 165, 135);

    ctx.beginPath();
    ctx.moveTo(50, 170);
    ctx.lineTo(150, 170);
    ctx.stroke();
    ctx.fillText(inputC, 40, 175)
    ctx.fillText("C", 165, 175);

    if (inputA === "X'" && inputB === "Y'" && inputC === "Z'") {
        output = "Y0";
    } else if (inputA === "X'" && inputB === "Y'" && inputC === "Z") {
        output = "Y1";
    } else if (inputA === "X'" && inputB === "Y" && inputC === "Z'") {
        output = "Y2";
    } else if (inputA === "X'" && inputB === "Y" && inputC === "Z") {
        output = "Y3";
    } else if (inputA === "X" && inputB === "Y'" && inputC === "Z'") {
        output = "Y4";
    } else if (inputA === "X" && inputB === "Y'" && inputC === "Z") {
        output = "Y5";
    } else if (inputA === "X" && inputB === "Y" && inputC === "Z'") {
        output = "Y6";
    } else if (inputA === "X" && inputB === "Y" && inputC === "Z") {
        output = "Y7";
    }


    // Draw outputs Y0 to Y7 flush to the right side of the decoder box
    for (let i = 0; i < 8; i++) {
        let yPos = 70 + i * 25;
        ctx.beginPath();
        ctx.moveTo(350, yPos);
        ctx.lineTo(400, yPos);
        ctx.stroke();
        ctx.fillText(`Y${i}`, 330, yPos + 5);
    }

    ctx.fillText(`Output: ${output}`, 250, 200);
}

function questionType3() {
    if (!ctx) return;
    ctx.clearRect(0, 0, 500, 300); // Clear only the relevant area if needed

    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Draw 2-to-4 Decoder
    ctx.strokeRect(150, 60, 200, 180);
    ctx.fillText("2-to-4 Decoder", 250, 145);

    const inputA = Math.random() < 0.5 ? "X" : "X'";
    const inputB = Math.random() < 0.5 ? "Y" : "Y'";

    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(150, 100);
    ctx.stroke();
    ctx.fillText(inputA, 40, 105)
    ctx.fillText("A", 165, 105);

    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 140);
    ctx.stroke();
    ctx.fillText(inputB, 40, 145)
    ctx.fillText("B", 165, 145);

    let output = "";
    if (inputA === "X'" && inputB === "Y'") output = "Y0";
    else if (inputA === "X'" && inputB === "Y") output = "Y1";
    else if (inputA === "X" && inputB === "Y'") output = "Y2";
    else if (inputA === "X" && inputB === "Y") output = "Y3";

    // Draw outputs Y0, Y1, Y2, Y3 inside the decoder box, aligned to the right
    for (let i = 0; i < 4; i++) {
        let yPos = 90 + i * 30;
        ctx.fillText(`Y${i}`, 330, yPos + 5);

        // Connect decoder outputs to OR gate inputs
        ctx.beginPath();
        ctx.moveTo(350, yPos); // Right side of decoder
        ctx.lineTo(350, yPos); // Connect to OR gate
        ctx.stroke();
    }

    // Draw OR gate to the right of the decoder
    ctx.beginPath();
    ctx.moveTo(400, 80);  // Left curve starting near decoder outputs
    ctx.quadraticCurveTo(460, 120, 400, 160); // Left curve of OR gate
    ctx.lineTo(440, 160); // Bottom horizontal line
    ctx.quadraticCurveTo(500, 120, 440, 80); // Right curve of OR gate
    ctx.closePath();
    ctx.stroke();

    // Draw OR gate output line
    ctx.beginPath();
    ctx.moveTo(500, 120); // Output from OR gate
    ctx.lineTo(500, 120); // Extend the output line
    ctx.stroke();
    ctx.fillText("Output", 570, 125);


}


let correctAnswer = ""; // Store correct answer globally

function questionType4() {


    // Clear Canvas
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Draw Decoder Box
    ctx.strokeRect(100, 30, 140, 220);
    ctx.fillText("3-to-8 Decoder", 170, 20);

    // Generate Random Inputs (X, Y, Z)
    const inputA = Math.random() < 0.5 ? "X" : "X'";
    const inputB = Math.random() < 0.5 ? "Y" : "Y'";
    const inputC = Math.random() < 0.5 ? "Z" : "Z'";

    // Draw Input Lines
    ctx.beginPath();
    ctx.moveTo(50, 90);
    ctx.lineTo(100, 90);
    ctx.stroke();
    ctx.fillText("X", 40, 95);
    ctx.fillText("A", 115, 95);

    ctx.beginPath();
    ctx.moveTo(50, 130);
    ctx.lineTo(100, 130);
    ctx.stroke();
    ctx.fillText("Y", 40, 135);
    ctx.fillText("B", 115, 135);

    ctx.beginPath();
    ctx.moveTo(50, 170);
    ctx.lineTo(100, 170);
    ctx.stroke();
    ctx.fillText("Z", 40, 175);
    ctx.fillText("C", 115, 175);

    // Boolean Expressions for Y0 - Y7
    const booleanExpressions = [
        "X'Y'Z'", "X'Y'Z", "X'YZ'", "X'YZ",
        "XY'Z'", "XY'Z", "XYZ'", "XYZ"
    ];

    // Select 3 Random Outputs
    let selectedOutputs = new Set();
    while (selectedOutputs.size < 3) {
        selectedOutputs.add(Math.floor(Math.random() * 8));
    }
    selectedOutputs = Array.from(selectedOutputs);

    // Store Correct Answer
    correctAnswer = selectedOutputs.map(y => booleanExpressions[y]).join(" + ");

    // Generate 3 Incorrect Answers
    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let tempSet = new Set();
        while (tempSet.size < 3) {
            tempSet.add(Math.floor(Math.random() * 8));
        }
        let incorrectExpr = Array.from(tempSet).map(y => booleanExpressions[y]).join(" + ");
        if (incorrectExpr !== correctAnswer) {
            incorrectAnswers.add(incorrectExpr);
        }
    }
    incorrectAnswers = Array.from(incorrectAnswers);

    // Shuffle Answers
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);

    // Assign Answers to Buttons
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

    // Draw Decoder Outputs (Y0 - Y7)
    for (let i = 0; i < 8; i++) {
        let yPos = 50 + i * 25;
        ctx.fillText(`Y${i}`, 220, yPos + 5);

        if (selectedOutputs.includes(i)) {
            ctx.beginPath();
            ctx.moveTo(240, yPos);
            ctx.lineTo(300, yPos);
            ctx.stroke();
        }
    }

    // Draw OR Gate
    ctx.beginPath();
    ctx.moveTo(330, 80);
    ctx.quadraticCurveTo(380, 50, 440, 120);
    ctx.quadraticCurveTo(380, 190, 330, 160);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(330, 80);
    ctx.bezierCurveTo(370, 100, 370, 140, 330, 160);
    ctx.stroke();

    // Connect Selected Outputs to OR Gate
    for (let i = 0; i < 3; i++) {
        let yPos = 50 + selectedOutputs[i] * 25;
        ctx.beginPath();
        ctx.moveTo(300, yPos);
        ctx.lineTo(340, 120);
        ctx.stroke();
    }

    // OR Gate Output Line
    ctx.beginPath();
    ctx.moveTo(440, 120);
    ctx.lineTo(500, 120);
    ctx.stroke();

    // Display Correct F Expression
    ctx.fillText("F", 530, 125);
}

function justorgate() {
    // Clear Canvas
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Generate Random Inputs (X, Y, Z)
    const inputA = Math.random() < 0.5 ? "X" : "X'";
    const inputB = Math.random() < 0.5 ? "Y" : "Y'";
    const inputC = Math.random() < 0.5 ? "Z" : "Z'";

    // Boolean Expressions for Y0 - Y7
    const booleanExpressions = [
        "X'Y'Z'", "X'Y'Z", "X'YZ'", "X'YZ",
        "XY'Z'", "XY'Z", "XYZ'", "XYZ"
    ];

    // Select 3 Random Outputs
    let selectedOutputs = new Set();
    while (selectedOutputs.size < 3) {
        selectedOutputs.add(Math.floor(Math.random() * 8));
    }
    selectedOutputs = Array.from(selectedOutputs);

    // Store Correct Answer
    correctAnswer = selectedOutputs.map(y => booleanExpressions[y]).join(" + ");

    // Generate 3 Incorrect Answers
    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let tempSet = new Set();
        while (tempSet.size < 3) {
            tempSet.add(Math.floor(Math.random() * 8));
        }
        let incorrectExpr = Array.from(tempSet).map(y => booleanExpressions[y]).join(" + ");
        if (incorrectExpr !== correctAnswer) {
            incorrectAnswers.add(incorrectExpr);
        }
    }
    incorrectAnswers = Array.from(incorrectAnswers);

    // Shuffle Answers
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);

    // Assign Answers to Buttons
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

    // Fixed Y positions for output lines
    const fixedYPositions = [60, 120, 180];

    // Draw Selected Outputs (Only the chosen ones)
    selectedOutputs.forEach((output, index) => {
        let yPos = fixedYPositions[index];
        ctx.fillText(`Y${output}`, 220, yPos + 5);
        ctx.beginPath();
        ctx.moveTo(240, yPos);
        ctx.lineTo(330, yPos);
        ctx.stroke();
    });

    // Draw Stretched OR Gate
    ctx.beginPath();
    ctx.moveTo(330, 40);
    ctx.quadraticCurveTo(400, 20, 450, 120);
    ctx.quadraticCurveTo(400, 220, 330, 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(330, 40);
    ctx.bezierCurveTo(380, 80, 380, 160, 330, 200);
    ctx.stroke();

    // OR Gate Output Line
    ctx.beginPath();
    ctx.moveTo(450, 120);
    ctx.lineTo(500, 120);
    ctx.stroke();


    // Display Correct F Expression
    ctx.fillText("F", 530, 125);
}

function questionType5() {


    // Clear Canvas
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Draw Decoder Box
    ctx.strokeRect(100, 50, 140, 160);
    ctx.fillText("2-to-4 Decoder", 170, 30);

    // Generate Random Inputs (A, B)
    const inputA = Math.random() < 0.5 ? "A" : "A'";
    const inputB = Math.random() < 0.5 ? "B" : "B'";

    // Draw Input Lines
    ctx.beginPath();
    ctx.moveTo(50, 90);
    ctx.lineTo(100, 90);
    ctx.stroke();
    ctx.fillText("X", 40, 95);
    ctx.fillText("A", 115, 95);

    ctx.beginPath();
    ctx.moveTo(50, 130);
    ctx.lineTo(100, 130);
    ctx.stroke();
    ctx.fillText("Y", 40, 135);
    ctx.fillText("B", 115, 135);

    // Boolean Expressions for Y0 - Y3 (2-input Decoder)
    const booleanExpressions = [
        "A'B'", // Y0
        "A'B",  // Y1
        "AB'",  // Y2
        "AB"    // Y3
    ];

    // Select 2 Random Outputs
    let selectedOutputs = new Set();
    while (selectedOutputs.size < 2) {
        selectedOutputs.add(Math.floor(Math.random() * 4));
    }
    selectedOutputs = Array.from(selectedOutputs);

    // Store Correct Answer
    correctAnswer = selectedOutputs.map(y => booleanExpressions[y]).join(" + ");

    // Generate 3 Incorrect Answers
    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let tempSet = new Set();
        while (tempSet.size < 2) {
            tempSet.add(Math.floor(Math.random() * 4));
        }
        let incorrectExpr = Array.from(tempSet).map(y => booleanExpressions[y]).join(" + ");
        if (incorrectExpr !== correctAnswer) {
            incorrectAnswers.add(incorrectExpr);
        }
    }
    incorrectAnswers = Array.from(incorrectAnswers);

    // Shuffle Answers
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);

    // Assign Answers to Buttons
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

    // Draw Decoder Outputs (Y0 - Y3)
    for (let i = 0; i < 4; i++) {
        let yPos = 70 + i * 40;
        ctx.fillText(`Y${i}`, 220, yPos + 5);

        if (selectedOutputs.includes(i)) {
            ctx.beginPath();
            ctx.moveTo(240, yPos);
            ctx.lineTo(300, yPos);
            ctx.stroke();
        }
    }

    // Draw OR Gate
    ctx.beginPath();
    ctx.moveTo(330, 90);
    ctx.quadraticCurveTo(370, 60, 420, 120);
    ctx.quadraticCurveTo(370, 180, 330, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(330, 90);
    ctx.bezierCurveTo(360, 110, 360, 130, 330, 150);
    ctx.stroke();

    // Connect Selected Outputs to OR Gate
    for (let i = 0; i < 2; i++) {
        let yPos = 70 + selectedOutputs[i] * 40;
        ctx.beginPath();
        ctx.moveTo(300, yPos);
        ctx.lineTo(340, 120);
        ctx.stroke();
    }

    // OR Gate Output Line
    ctx.beginPath();
    ctx.moveTo(420, 120);
    ctx.lineTo(480, 120);
    ctx.stroke();

    // Display Correct F Expression
    ctx.fillText("F", 510, 125);
}

function generateDecoderQuestion() { //Seleting a random question type
    const questions = [questionType5, questionType4,draw31Decoder() ];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    randomQuestion();

}

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

