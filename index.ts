import express from "express";
const app = express();

console.log("Starging express app...");

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = 3003;

app.listen(PORT);
