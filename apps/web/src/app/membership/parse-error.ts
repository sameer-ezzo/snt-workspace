
export function parseAccountError(err: Error | unknown): string {
  return err instanceof Error ? err.message : (err as any).error.message as string;
}
