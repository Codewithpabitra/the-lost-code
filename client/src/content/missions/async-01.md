
# The Callback Signal

The forge activates.

A strange communication device rises from the ground. It has three disconnected terminals.

The first terminal sends a signal. The second waits for the signal. The third responds when the signal arrives.

Your guide looks concerned.

"This machine cannot perform every task immediately. Sometimes it must wait for another operation to finish before continuing."

A new instruction appears:

*"Give the machine a function to execute when the task is complete."*

The communication system is waiting.

<!-- LEARNING -->

# Learning: Callbacks in JavaScript

## What is a callback?

A callback is a function passed as an argument to another function.

The receiving function can execute that callback later.

Think of ordering food.

You place an order and give your phone number. When the food is ready, the restaurant calls you.

You don't stand at the counter repeating the same question. You provide a callback: what should happen when the task finishes?

## 1. A simple callback

```javascript
function greet(name, callback) {
  console.log("Hello, " + name);

  callback();
}

function sayWelcome() {
  console.log("Welcome to the world!");
}

greet("Alex", sayWelcome);
```

Output:

```text
Hello, Alex
Welcome to the world!
```

Notice that we passed `sayWelcome`, not `sayWelcome()`.

We passed the function itself so that `greet` could execute it.

## 2. Callback with parameters

A callback can receive values too.

```javascript
function calculate(a, b, callback) {
  const result = a + b;

  callback(result);
}

function displayResult(value) {
  console.log("Result:", value);
}

calculate(20, 30, displayResult);
```

Output:

```text
Result: 50
```

## 3. Asynchronous callbacks

JavaScript can schedule work to happen later.

For example, `setTimeout()` executes a callback after a specified delay.

```javascript
console.log("Signal started");

setTimeout(() => {
  console.log("Signal received");
}, 2000);

console.log("Waiting...");
```

Output:

```text
Signal started
Waiting...
Signal received
```

The callback executes after approximately two seconds.

JavaScript does not stop the entire program while waiting for this timer.

## 4. Callback hell

Callbacks can become difficult to manage when many asynchronous operations depend on each other.

Example:

```javascript
setTimeout(() => {
  console.log("Step 1");

  setTimeout(() => {
    console.log("Step 2");

    setTimeout(() => {
      console.log("Step 3");
    }, 1000);

  }, 1000);

}, 1000);
```

This nested structure can become difficult to read.

It is commonly called callback hell.

Promises and async/await help make asynchronous code easier to manage.

## Mission Challenge

The communication device needs to execute a callback.

Create a function named `sendSignal` that:

- Accepts a callback as its parameter.
- Prints `"Signal sent"`.
- Executes the callback.
- Pass a callback that prints `"Signal received"`.

Expected output:

```text
Signal sent
Signal received
```

## Remember

- A callback is a function passed into another function.
- Callbacks can execute immediately or later.
- `setTimeout()` is one example of asynchronous callback usage.
- Deeply nested callbacks can become difficult to maintain.

The signal has reached its destination.
