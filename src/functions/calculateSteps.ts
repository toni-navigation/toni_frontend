export function calculateSteps(
  length: number | undefined,
  factor: number | null
) {
  if (factor && length) {
    return Math.ceil((length * 100) / factor);
  }

  return length;
}
