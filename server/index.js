const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 8080;
const {
  addUser,
  getGrid,
  getUsers,
  getUserSymbols,
  getUserScores,
  getNextSymbol,
  getWinningIndexes,
  setGridValue,
  resetGame,
} = require("./services/game-service");

const cors = require("cors");
app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (client) => {
  console.log("A user connected");

  client.on("userAdded", (user) => {
    addUser(user);
    io.emit("usersUpdated", getUsers());
    io.emit("userSymbolUpdated", getUserSymbols());
    io.emit("userScoresUpdated", getUserScores());
    io.emit("nextSymbolUpdated", getNextSymbol());
  });

  client.on("setGridValue", (payload) => {
    setGridValue(payload);
    io.emit("userScoresUpdated", getUserScores());
    io.emit("nextSymbolUpdated", getNextSymbol());
    io.emit("gridUpdated", getGrid());
    io.emit("winningIndexesUpdated", getWinningIndexes());
  });

  client.on("resetGame", () => {
    resetGame();
    io.emit("gridUpdated", getGrid());
    io.emit("winningIndexesUpdated", getWinningIndexes());
  });

  client.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/users", (req, res) => {
  res.send(getUsers());
});

app.get("/user-symbols", (req, res) => {
  res.send(getUserSymbols());
});

app.get("/next-symbol", (req, res) => {
  res.send(JSON.stringify(getNextSymbol()));
});

app.get("/user-scores", (req, res) => {
  res.send(getUserScores());
});

app.get("/grid", (req, res) => {
  res.send(getGrid());
});

app.get("/winning-indexes", (req, res) => {
  res.send(getWinningIndexes());
});

const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(`${distPath}/index.html`);
  });
}

server.listen(port);
console.log(`Server Running on Port ${port}`);
