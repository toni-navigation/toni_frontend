export function calculateSteps(length: number, factor: number) {
  if (factor && length) {
    return Math.ceil((length * 1000) / factor);
  }

  return length;
}
