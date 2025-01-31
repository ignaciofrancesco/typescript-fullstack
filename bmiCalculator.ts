// bmi: weight / height^2
// kg and meters

/* Major adult BMI classifications are underweight (under 18.5 kg/m2),
 normal weight (18.5 to 24.9), overweight (25 to 29.9), and obese (30 or more).[1] */

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

console.log(calculateBmi(180, 74));
