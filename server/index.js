const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = 3000;
const cors = require("cors");
app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

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

io.on("connection", (client) => {
  console.log("A user connected");

  client.on("usersAdded", (userInfo) => {
    if (users.length === 0) {
      userInfo.forEach((user) => {
        users.push(user);
      });
      // first user
      let firstUserSymbol = symbols[Math.floor(Math.random() * 2)]; // to assign randomly 0 or 1 as index of symbols
      userSymbols[users[0]] = firstUserSymbol; // symbol for user at index 0
      userScores[users[0]] = 0;
      // second user
      let secondUserSymbol = symbols.find((x) => x !== firstUserSymbol);
      userSymbols[users[1]] = secondUserSymbol; // symbol for user at index 1
      userScores[users[1]] = 0;
    }

    io.emit("usersUpdated", users);
    io.emit("userSymbolUpdated", userSymbols);
    io.emit("userScoresUpdated", userScores);
    io.emit("nextSymbolUpdated", nextSymbol);
  });

  client.on("setGridValue", (payload) => {
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
      io.emit("userScoresUpdated", userScores);
    }
    nextSymbol = nextSymbol === "X" ? "O" : "X";
    io.emit("nextSymbolUpdated", nextSymbol);
    io.emit("gridUpdated", grid);
    io.emit("winningIndexesUpdated", winningIndexes);
  });

  client.on("resetGame", () => {
    winningIndexes = [];
    for (let i = 0; i < grid.length; i++) {
      grid[i] = "";
    }
    io.emit("gridUpdated", grid);
    io.emit("winningIndexesUpdated", winningIndexes);
  });

  client.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/user-symbols", (req, res) => {
  res.send(userSymbols);
});

app.get("/next-symbol", (req, res) => {
  res.send(JSON.stringify(nextSymbol));
});

app.get("/user-scores", (req, res) => {
  res.send(userScores);
});

app.get("/grid", (req, res) => {
  res.send(grid);
});

app.get("/winning-indexes", (req, res) => {
  res.send(winningIndexes);
});

server.listen(port);
console.log(`Server Running on Port ${port}`);
