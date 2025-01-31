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
  hoursPerDay: number[],
  dailyHoursTarget: number
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

  // Result element
  const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
