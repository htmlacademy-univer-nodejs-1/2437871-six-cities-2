export function throwErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
