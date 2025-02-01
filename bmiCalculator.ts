import { isPositiveNumber } from "./utils/numbersHelper";

/* Main function */
const calculateBmi = (heightCm: number, weight: number): string => {
  const height = heightCm / 100;
  const bmi = weight / (height * height);

  if (bmi < 18.5) return "Underweight";
  if (bmi < 24.9) return "Normal range";
  if (bmi < 29.9) return "Overweight";

  return "Obese";
};

/* Helpers */

interface BmiInputs {
  weightParsed: number;
  heightParsed: number;
}

const parseBmiArguments = (args: string[]): BmiInputs => {
  let height: string;
  let weight: string;

  // If it is run from the command line
  if (require.main === module) {
    // Validate number of arguments
    if (args.length < 4) {
      throw new Error("Too few arguments.");
    } else if (args.length > 4) {
      throw new Error("Too many arguments.");
    }
    height = args[2];
    weight = args[3];
  } else {
    height = args[0];
    weight = args[1];
  }

  if (!isPositiveNumber(height) || !isPositiveNumber(weight)) {
    throw new Error("Arguments should be positive numbers.");
  }

  return { weightParsed: Number(weight), heightParsed: Number(height) };
};

/* MAIN PROGRAM (to be run in the command line) */
if (require.main === module) {
  try {
    const { heightParsed, weightParsed } = parseBmiArguments(process.argv);
    console.log(calculateBmi(heightParsed, weightParsed));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
export default { parseBmiArguments, calculateBmi };
