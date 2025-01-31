/* Main function */
const calculateBmi = (heightCm: number, weight: number): string => {
  let message: string;

  const height = heightCm / 100;

  const bmi = weight / (height * height);

  if (bmi < 18.5) {
    message = "Underweight";
  } else if (bmi < 24.9) {
    message = "Normal range";
  } else if (bmi < 29.9) {
    message = "Overweight";
  } else {
    message = "Obese";
  }

  return message;
};

/* Helpers */

interface BmiInputs {
  weight: number;
  heightCm: number;
}

const parseBmiArguments = (args: string[]): BmiInputs => {
  // Validate number of arguments
  if (args.length < 4) {
    throw new Error("Too few arguments.");
  } else if (args.length > 4) {
    throw new Error("Too many arguments.");
  }

  const [_tsnode, _bmiCalculator, height, weight] = args;

  // Validate they are numbers
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    throw new Error("You should provide numbers.");
  }

  // Validate theye are not zero
  if (Number(height) <= 0 || Number(weight) <= 0) {
    throw new Error("You should provide positive numbers.");
  }

  return { weight: Number(weight), heightCm: Number(height) };
};

/* MAIN PROGRAM */

try {
  const { heightCm, weight } = parseBmiArguments(process.argv);

  console.log(calculateBmi(heightCm, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    console.log(errorMessage + error.message);
  }
}
