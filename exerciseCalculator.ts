import { isNumber, isPositiveNumber } from "./utils/numbersHelper";

/* HELPER FUNCTIONS */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateArguments = (target: any, hoursPerDay: any): void => {
  // Type validations

  if (!isPositiveNumber(target)) {
    throw new Error("The target should be a positive number.");
  }

  if (!Array.isArray(hoursPerDay)) {
    throw new Error("malformatted parameters");
  }

  hoursPerDay.forEach((hours) => {
    if (!isNumber(hours)) {
      throw new Error("The hours should be numbers.");
    }
  });

  // Math validations

  if (Number(target) <= 0) {
    throw new Error("The target should be a positive number.");
  }

  // Other validations

  if (hoursPerDay.length < 2) {
    throw new Error("The daily exercises should have at least 2 days.");
  }
};

const parseCommandLineArguments = (args: string[]): ExerciseInputs => {
  // Validate number of arguments (at least 4, and max 30)
  if (args.length < 4) {
    throw new Error("Too few arguments.");
  } else if (args.length > 30) {
    throw new Error("Too many arguments.");
  }
  const [, , target, ...hoursPerDay] = args;

  // If validation doesnt throw any error, continue
  validateArguments(target, hoursPerDay);

  const hoursPerDayParsed = hoursPerDay.map((hour) => Number(hour));

  return {
    targetParsed: Number(target),
    hoursPerDayParsed,
  };
};

const parseWebArguments = (
  target: unknown,
  hoursPerDay: unknown
): ExerciseInputs => {
  // If not valid, it throws exception
  validateArguments(target, hoursPerDay);

  // Now the type of the parameters is safe, and i can assert them

  const hoursPerDayParsed = (hoursPerDay as string[]).map((hour) =>
    Number(hour)
  );

  return {
    targetParsed: Number(target),
    hoursPerDayParsed,
  };
};

/* MAIN FUNCTION */

type Rating = 1 | 2 | 3;

interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
}

const calculateExercises = (
  dailyHoursTarget: number,
  hoursPerDay: number[]
): ExercisesResult => {
  const descriptions = ["Terrible job", "Almost there", "Great job!"];

  // Computations
  const periodLength = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter((d) => d !== 0).length;
  const target = dailyHoursTarget;
  const average =
    hoursPerDay.reduce((sum, hours) => {
      return sum + hours;
    }) / hoursPerDay.length;
  const success = average >= target;
  const rating: Rating = average >= target ? 3 : average / target > 0.8 ? 2 : 1;
  const ratingDescription = descriptions[rating - 1];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

/* Helpers */

interface ExerciseInputs {
  targetParsed: number;
  hoursPerDayParsed: number[];
}

/* MAIN PROGRAM (to be run in the command line) */

if (require.main === module) {
  try {
    const { targetParsed, hoursPerDayParsed } = parseCommandLineArguments(
      process.argv
    );

    console.log(calculateExercises(targetParsed, hoursPerDayParsed));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

export { calculateExercises, parseCommandLineArguments, parseWebArguments };
