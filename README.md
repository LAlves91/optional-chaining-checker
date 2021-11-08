# optional-chaining-checker

Small utility library to check for browser native support for optional chaining.

## How to use

First, install the library:

```
npm install optional-chaining-checker
```

It exports a single function called `supportsOpChaining`, which tests optional chaining support, returning a boolean result as a Promise. There's also a checker script called op-chaining-checker.js, which you have to add to your project as an asset.

```
// Import it
import { supportsOpChaining } from 'optional-chaining-checker';

// Use it
const support = supportsOpChaining('path/to/op-chaining-checker.js').then(support => {
  // Do something!
});
```

The function offers the following parameters:
* source (`string` - mandatory): Path to the op-chaining-checker script (as it can vary deppending on a project's assets scheme).
* async (`boolean` - defaults to `true`): Flag to run the script tag asynchronously.
* integrity (`string` - optional): Integrity hash of the op-chaining-script file. If no value is provided, it uses the a SHA-384 hash of the raw op-chaining-checker.js file.

## How it works

Checking native support for an operator like optional chaining is not as straightforward as other checks. There's no way to check for a class/method to be undefined (which can easily be tested with `typeof Class` or `typeof Class['method']`). The only way to check for it is to actually use it. The problem is: lack of support generates a SyntaxError, which is uncatchable (because it happens when the browser is still parsing the code) and kills the thread the script is running into.

After a few days of research, I've found two ways to work around this issue. One was to use the `eval()` function, which I decided to avoid as it would demand a lot of research time in order to implement a solution as safe as possible. The second, which is currently the solution I've chosen, is to load an isolated script (op-chaining-checker.js) in a temporary script tag and listen to `onload` and `onerror` events.

In order to make it as safe as possible, the script is loaded with an integrity attribute. If needed, the function allows passing a different string to use as an integrity checker (choice made in order to keep the library as flexible as possible with all possible client projects).

## Motivation

This library was made after a really simple feature was needed in an Angular Library: we needed to check for native optional chaining support by a client's browser. The checker function was really simple, but there was a problem: TSC would always transpile the function, rendering our checker function ineffective. 

The solution was moving the checker funtion outside of the project: optional-chaining-checker was born!

As of now, I don't know the future of this library...maybe it'll evolve into a checker library, maybe it'll stay like this. We'll see!