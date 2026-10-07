// Select all 9 game boxes
const boxes = document.querySelectorAll(".box");

// Select Reset Game button
const resetBtn = document.querySelector("#reset-btn");

// Select New Game button
const newGameBtn = document.querySelector("#new-btn");

// Select result overlay
const resultOverlay = document.querySelector(".result-overlay");

// Select result message
const msg = document.querySelector("#msg");

// Select turn text
const turnText = document.querySelector("#turn-text");


// ==========================================
// GAME VARIABLES
// ==========================================

// Player O starts the game
let turnO = true;

// Count how many moves have been made
let count = 0;


// ==========================================
// WINNING PATTERNS
// ==========================================

const winPatterns = [

    [0, 1, 2], // Top row
    [0, 3, 6], // Left column
    [0, 4, 8], // Diagonal

    [1, 4, 7], // Middle column

    [2, 5, 8], // Right column
    [2, 4, 6], // Diagonal

    [3, 4, 5], // Middle row
    [6, 7, 8]  // Bottom row
];


// ==========================================
// BOX CLICK
// ==========================================

boxes.forEach((box) => {

    box.addEventListener("click", () => {

        // ----------------------------------
        // PLAYER O
        // ----------------------------------

        if (turnO) {

            box.innerText = "O";

            // Add class for O styling
            box.classList.add("o");

            // Change turn
            turnO = false;

            // Update turn indicator
            turnText.innerText = "Player X";

        }

        // ----------------------------------
        // PLAYER X
        // ----------------------------------

        else {

            box.innerText = "X";

            // Add class for X styling
            box.classList.add("x");

            // Change turn
            turnO = true;

            // Update turn indicator
            turnText.innerText = "Player O";
        }


        // Disable clicked box
        box.disabled = true;

        // Increase move count
        count++;


        // ----------------------------------
        // CHECK WINNER
        // ----------------------------------

        const winner = checkWinner();


        // ----------------------------------
        // CHECK DRAW
        // ----------------------------------

        if (count === 9 && !winner) {

            gameDraw();
        }

    });

});


// ==========================================
// CHECK WINNER
// ==========================================

const checkWinner = () => {

    // Check every winning pattern
    for (let pattern of winPatterns) {

        // Get values from the three boxes
        const pos1 = boxes[pattern[0]].innerText;
        const pos2 = boxes[pattern[1]].innerText;
        const pos3 = boxes[pattern[2]].innerText;


        // Make sure all three boxes have values
        if (
            pos1 !== "" &&
            pos2 !== "" &&
            pos3 !== ""
        ) {

            // Check if all three are equal
            if (
                pos1 === pos2 &&
                pos2 === pos3
            ) {

                // Highlight winning boxes
                pattern.forEach((index) => {

                    boxes[index].classList.add("winner");

                });


                // Show winner
                showWinner(pos1);

                return true;
            }
        }
    }


    // Nobody won
    return false;
};


// ==========================================
// SHOW WINNER
// ==========================================

const showWinner = (winner) => {

    // Winner message
    msg.innerText = `Player ${winner} Wins!`;

    // Show result overlay
    resultOverlay.classList.remove("hide");

    // Disable all boxes
    disableBoxes();
};


// ==========================================
// DRAW
// ==========================================

const gameDraw = () => {

    // Show draw message
    msg.innerText = "It's a Draw!";

    // Show result overlay
    resultOverlay.classList.remove("hide");

    // Disable all boxes
    disableBoxes();
};


// ==========================================
// DISABLE ALL BOXES
// ==========================================

const disableBoxes = () => {

    boxes.forEach((box) => {

        box.disabled = true;

    });
};


// ==========================================
// ENABLE ALL BOXES
// ==========================================

const enableBoxes = () => {

    boxes.forEach((box) => {

        // Enable box
        box.disabled = false;

        // Remove O / X
        box.innerText = "";

        // Remove styling classes
        box.classList.remove("o");
        box.classList.remove("x");
        box.classList.remove("winner");

    });
};


// ==========================================
// RESET GAME
// ==========================================

const resetGame = () => {

    // Player O starts again
    turnO = true;

    // Reset move counter
    count = 0;

    // Reset turn indicator
    turnText.innerText = "Player O";

    // Hide result screen
    resultOverlay.classList.add("hide");

    // Enable all boxes
    enableBoxes();
};


// ==========================================
// BUTTON EVENTS
// ==========================================

// Reset button
resetBtn.addEventListener("click", resetGame);


// New Game button
newGameBtn.addEventListener("click", resetGame);
