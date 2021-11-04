/**
 * Checks for browser's optional chaining support.
 *
 */
export function supportsOpChaining(): boolean {
  try {
    const optionalChaining = {
      support: true,
    };
    return optionalChaining?.support;
  } catch {
    return false;
  }
}
