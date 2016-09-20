document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  // Each cell is an object with four properties: row, column, whether it is a mine, and whether it is hidden
  cells: [
    // {row: 0, col: 0, isMine: false, hidden: true},
    // {row: 0, col: 1, isMine: true, hidden: true},
    // {row: 0, col: 2, isMine: true, hidden: true},
    // {row: 1, col: 0, isMine: false, hidden: true},
    // {row: 1, col: 1, isMine: false, hidden: true},
    // {row: 1, col: 2, isMine: false, hidden: true},
    // {row: 2, col: 0, isMine: false, hidden: true},
    // {row: 2, col: 1, isMine: false, hidden: true},
    // {row: 2, col: 2, isMine: true, hidden: true}
  ]
};

function startGame () {

  // Get a number for the width/height of the board
  var boardWidth = prompt("Set your board size! Enter a number between 3 and 6", "your number here");

  // Re-prompt if a different number is provided
  if (boardWidth < 3 || boardWidth > 6) {
    boardWidth = prompt("Try a number between 3 and 6", "3, 4, 5, or 6");
  }

  // Call function to create board
  createboard(boardWidth, boardWidth)

  // To count surrounding mines
  // Loop through the contents of board.cells (i.e, each cell)
  for (var i = 0; i < board.cells.length; i++) {
    // Call countSurroundingMines once for each cell in board.cells
    // Assign the result of countSurroundingMines to a property (surroundingMines) on each cell object.
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard()

  // In startGame, use document.addEventListener to call checkForWin every time the left mouse button is clicked.
  document.addEventListener("click", checkForWin);

  // Add another event listener that calls checkForWin when the right mouse button is clicked.
  document.addEventListener("contextmenu", checkForWin);

  // Check if bomb has been clicked on
  document.addEventListener("click", checkForBomb)
}

// Object constructor for minesweeper squares
function MineSq(row, col, isMine, isMarked, hidden) {
  // Each square needs to be an object with row #, col #, isMine, isMarked, hidden
  this.row = row;
  this.col = col;
  this.isMine = isMine;
  this.isMarked = isMarked;
  this.hidden = hidden;
}

// Create the minesweeper board
function createboard(width, height) {
  // Initialize row at zero
  var row = 0;
  for (var i = 0; i < height; i++) {   // Iterate row by row
    // Initialize col at zero
    var col = 0;
    // Then go along each square in the row and create a newSq
    for (var j = 0; j < width; j++) {
      // Use randomize function to automatically set whether there is a mine there. (Currently 20% likelihood)
      // To begin with, nothing should be marked and everything should be hidden
      newSq = new MineSq(row, col, randomizeMines(), false, true);
      console.log(newSq);
      board.cells.push(newSq);
      col++;
    }
    row++;
  }
}

// Function to generate random number and return true or false based on value
function randomizeMines() {
  // Get random number between 1 and 100
  var randomNo = Math.floor((Math.random() * 100) + 1);
  // Random number is 1-79 = no mine. 80 or over = mine
  if (randomNo < 80) {
    return false;
  }
  else {
    return true;
  }
}

// Function to play Wilhelm Scream if bomb is clicked on
function checkForBomb() {

  // Set the HTML audio element as the variable 'audio'
  var audio = document.getElementById("wilhelm");

  // if the particular cell that is clicked on is a mine,
  // audio.play();

  // The below logic is wrong!!!!
  // This is looping through the whole board, and if there is a mine anywhere, playing the sound
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine === true) {
      audio.play();
    }
  }
}


// Define this function to look for a win condition:

// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForWin () {

  // Check to see if any mines are unmarked. If so, game is not won
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine === true && board.cells[i].isMarked !== true) {
      return;
    }
  }

  // Check to see if any cells are still hidden
  // Note that marked mines are still counted as hidden! Since we've accounted for the mines above, just count them out entirely.
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine === false && board.cells[i].hidden === true) {
      return;
      }
  }

  // You can use this function call to declare a winner (once you've detected that they've won, that is
  lib.displayMessage('You win!');
}


// Define this function to count the number of mines around the cell (there could be as many as 8). You don't have to get the surrounding cells yourself! Just use `lib.getSurroundingCells`:
// var surrounding = lib.getSurroundingCells(cell.row, cell.col)

// Note: lib.getSurroundingCells returns a subset of the `cells` array, including only those cells which are adjacent to `row`, `col`
function countSurroundingMines (cell) {
  // Initialize count at zero
  count = 0;
  var surroundingCells = getSurroundingCells(cell.row, cell.col);
  // Loop through surroundingCells, seeing if each one is a mine; if so, increment count
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine === true ) {
      count++;
    }
  }
  return count;
}
