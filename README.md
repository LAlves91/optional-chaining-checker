# optional-chaining-checker

Small utility library to check for browser native support for optional chaining.

## Motivation

This library was made after a really simple feature was needed in an Angular Library: we needed to check for native optional chaining support by a client's browser. The checker function was really simple, but there was a problem: TSC would always transpile the function, rendering our checker function ineffective. 

The solution was moving the checker funtion outside of the project: optional-chaining-checker was born!

As of now, I don't know the future of this library...maybe it'll evolve into a checker library, maybe it'll stay like this. We'll see!

## How to use

The library exports a single function called `supportsOpChaining`, which tests optional chaining support, returning a boolean value as an answer:

```
// Import it
import { supportsOpChaining } from 'optional-chaining-checker';

// Use it
const support = supportsOpChaining();
```