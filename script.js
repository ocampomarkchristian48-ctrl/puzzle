// script.js

const puzzles = [
  // Sample puzzles, pwedeng palitan o dagdagan pa
  [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  // Add more puzzles up to 20
];

let currentRound = 0;
let playerName = '';

function startGame() {
  const nameInput = document.getElementById('player-name');
  const name = nameInput.value.trim();
  if (name === '') {
    alert('Please enter your name!');
    return;
  }
  playerName = name;
  document.getElementById('player-display').innerText = playerName;
  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
  loadPuzzle(currentRound);
}

function loadPuzzle(roundIndex) {
  const grid = puzzles[roundIndex];
  const table = document.getElementById('sudoku-grid');
  table.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      if (grid[i][j] !== 0) {
        input.value = grid[i][j];
        input.disabled = true;
        input.style.backgroundColor = '#ddd';
      }
      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  document.getElementById('round-info').innerText = `Round: ${roundIndex + 1} / 20`;
  document.getElementById('message').innerText = '';
}

function checkSolution() {
  const inputs = document.querySelectorAll('#sudoku-grid input');
  const grid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    for (let j = 0; j < 9; j++) {
      const val = inputs[i * 9 + j].value;
      grid[i][j] = parseInt(val) || 0;
    }
  }
  if (isValidSudoku(grid)) {
    document.getElementById('message').innerText = 'Good job! Puzzle is correct.';
  } else {
    document.getElementById('message').innerText = 'There are errors. Please check your inputs.';
  }
}

function isValidSudoku(grid) {
  // Check rows
  for (let i = 0; i < 9; i++) {
    const rowSet = new Set();
    for (let j = 0; j < 9; j++) {
      const num = grid[i][j];
      if (num !== 0) {
        if (rowSet.has(num)) return false;
        rowSet.add(num);
      }
    }
  }
  // Check columns
  for (let j = 0; j < 9; j++) {
    const colSet = new Set();
    for (let i = 0; i < 9; i++) {
      const num = grid[i][j];
      if (num !== 0) {
        if (colSet.has(num)) return false;
        colSet.add(num);
      }
    }
  }
  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const boxSet = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const rowIdx = boxRow * 3 + i;
          const colIdx = boxCol * 3 + j;
          const num = grid[rowIdx][colIdx];
          if (num !== 0) {
            if (boxSet.has(num)) return false;
            boxSet.add(num);
          }
        }
      }
    }
  }
  return true;
}

function nextRound() {
  if (currentRound < puzzles.length - 1) {
    currentRound++;
    loadPuzzle(currentRound);
  } else {
    alert('You have completed all 20 rounds!');
  }
}
