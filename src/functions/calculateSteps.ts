export function calculateSteps(length: number, factor: number) {
  if (factor && length) {
    return Math.ceil((length * 100) / factor);
  }

  return length;
}
