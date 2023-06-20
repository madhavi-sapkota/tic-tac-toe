let users = [];
let userSymbols = {};
let nextSymbol = "X";
let userScores = {};
let symbols = ["X", "O"];

let grid = ["", "", "", "", "", "", "", "", ""];
let winningIndexes = [];

const winnersCollection = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function addUser(user) {
  if (users.length < 2) {
    let userSymbol =
      users.length === 0
        ? symbols[Math.floor(Math.random() * 2)]
        : symbols.find((x) => x !== userSymbols[users[0]]); // to assign randomly 0 or 1 as index of symbols
    users.push(user);
    userSymbols[user] = userSymbol; // symbol for user at index 0
    userScores[user] = 0;
  }
}

function setGridValue(payload) {
  let index = payload.index;
  let value = payload.value;
  grid[index] = value;
  winnersCollection.forEach((winners) => {
    if (
      grid[winners[0]] === grid[winners[1]] &&
      grid[winners[1]] === grid[winners[2]] &&
      grid[winners[0]] !== ""
    ) {
      winners.forEach((winner) => {
        winningIndexes.push(winner);
      });
    }
  });

  // check if game over
  if (winningIndexes.length > 0) {
    let user = Object.keys(userSymbols).find((x) => userSymbols[x] === value);
    userScores[user] = userScores[user] + 1;
  }
  nextSymbol = nextSymbol === "X" ? "O" : "X";
}

function restartGame() {
  winningIndexes = [];
  for (let i = 0; i < grid.length; i++) {
    grid[i] = "";
  }
}

function resetGame() {
  winningIndexes = [];
  userScores = {};
  users = [];
  userSymbols = {};
  for (let i = 0; i < grid.length; i++) {
    grid[i] = "";
  }

  console.log(
    users,
    userScores,
    winningIndexes,
    userSymbols,
    grid,
    "user hatyo?"
  );
}

function getUsers() {
  return users;
}

function getUserSymbols() {
  return userSymbols;
}
function getUserScores() {
  return userScores;
}
function getNextSymbol() {
  return nextSymbol;
}
function getGrid() {
  return grid;
}
function getWinningIndexes() {
  return winningIndexes;
}

module.exports = {
  addUser,
  getGrid,
  getUsers,
  getUserSymbols,
  getUserScores,
  getNextSymbol,
  getWinningIndexes,
  setGridValue,
  resetGame,
  restartGame,
};
