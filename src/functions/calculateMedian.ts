export function calculateMedian(values: number[]): number {
  if (values.length === 0) {
    throw new Error('Input array is empty');
  }
  // Sorting values, preventing original array
  // from being mutated.
  const sortedValues = [...values].sort((a, b) => a - b);

  const half = Math.floor(sortedValues.length / 2);
  const test = 0;

  return sortedValues.length % 2
    ? sortedValues[half]
    : (sortedValues[half - 1] + sortedValues[half]) / 2;
}
