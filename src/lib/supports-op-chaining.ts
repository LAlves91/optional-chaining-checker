/**
 * Checks for browser's optional chaining support by adding a temporary script tag, so that
 * the main thread stays alive even if the browser doesn't support it (which would throw an
 * uncatchable SyntaxError).
 *
 * @param source - Path to the op-chaining-checker script (as it can vary deppending on a project's assets scheme).
 * @param async - Flag to run the script tag asynchronously.
 * @param integrity - Integrity hash of the op-chaining-script file.
 */
export function supportsOpChaining(
  source: string,
  async: boolean = true,
  integrity: string = 'sha384-HCrsXLpycz15mPyIbVyct0Kaum8iZJR91Hj3XzllD6CVF3vuSz3qX8RIY9rNXxzx'
): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = async;
    script.integrity = integrity;
    script.src = source;
    script.onload = () => {
      script.remove();
      resolve(true);
    };
    script.onerror = () => {
      script.remove();
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
