export function generateRandomData(size: number, minValue: number = 100, maxValue: number = 400): number[] {
  const result: number[] = Array.from({ length: size }).map((value) => (
    Math.round(minValue - 0.5 + Math.random() * (maxValue - minValue + 1))
  ));

  return result;
};