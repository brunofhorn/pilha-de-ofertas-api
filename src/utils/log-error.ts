export function logError(prefix: string, error: unknown) {
  if (error instanceof Error) {
    console.error(`${prefix}:`, error.message);
  } else {
    console.error(`${prefix}: Unknown error.`, error);
  }
}
