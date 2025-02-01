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

interface exerciseInputs {
  target: number;
  hoursPerDay: number[];
}

const parseExcerciseCalculatorArguments = (args: string[]): exerciseInputs => {
  // Validate number of arguments (at least 4, and max 30)
  if (args.length < 4) {
    throw new Error("Too few arguments.");
  } else if (args.length > 30) {
    throw new Error("Too many arguments.");
  }

  const [, , target, ...hoursPerDay] = args;

  // Type validations

  if (isNaN(Number(target))) {
    throw new Error("The hours should be numbers.");
  }

  const hoursPerDayAsNumbers = hoursPerDay.map((h) => {
    if (isNaN(Number(h))) {
      throw new Error("The hours should be numbers.");
    }

    return Number(h);
  });

  // Math validations

  if (Number(target) <= 0) {
    throw new Error("The target should be a positive number.");
  }

  return { target: Number(target), hoursPerDay: hoursPerDayAsNumbers };
};

/* MAIN PROGRAM */

try {
  const { target, hoursPerDay } = parseExcerciseCalculatorArguments(
    process.argv
  );

  console.log(calculateExercises(target, hoursPerDay));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
