import express from "express";
import bmiCalculator from "./bmiCalculator";

const app = express();

console.log("Starging express app...");

/* ENDPOINTS */

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  // Get the parameters
  const { height, weight } = req.query;

  /* Guard statements */

  if (typeof height !== "string" || typeof weight !== "string") {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  try {
    const { heightParsed, weightParsed } = bmiCalculator.parseBmiArguments([
      height,
      weight,
    ]);
    const bmi = bmiCalculator.calculateBmi(heightParsed, weightParsed);
    res.json({ height, weight, bmi });
    return;
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
