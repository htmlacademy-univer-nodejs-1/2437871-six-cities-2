export const throwErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export const createErrorObject = (message: string) => ({
  error: message,
});
