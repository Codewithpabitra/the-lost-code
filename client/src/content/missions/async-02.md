
# The Promise Bridge

The communication device sends a powerful signal.

A bridge appears above a bottomless digital void. At its entrance, a holographic gatekeeper blocks your path.

"Crossing this bridge requires patience. The next system might succeed, or it might fail."

Three symbols appear:

- Pending
- Fulfilled
- Rejected

Your guide explains:

"A Promise represents a result that may become available in the future."

The bridge is waiting for you to understand its rules.

<!-- LEARNING -->

# Learning: Promises in JavaScript

## What is a Promise?

A Promise is a JavaScript object representing the eventual completion or failure of an asynchronous operation.

Imagine ordering something online.

- Your order is being processed: pending.
- Your order is delivered: fulfilled.
- Your order is cancelled: rejected.

A Promise has three states:

| State | Meaning |
|---|---|
| Pending | Operation is still running |
| Fulfilled | Operation completed successfully |
| Rejected | Operation failed |

A Promise settles when it becomes fulfilled or rejected.

## 1. Creating a Promise

Use the `Promise` constructor.

```javascript
const task = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Task completed");
  } else {
    reject("Task failed");
  }
});
```

- `resolve()` marks the Promise as fulfilled.
- `reject()` marks the Promise as rejected.

## 2. Using `.then()`

Use `.then()` to handle a fulfilled Promise.

```javascript
const task = new Promise((resolve) => {
  resolve("Bridge activated");
});

task.then((message) => {
  console.log(message);
});
```

Output:

```text
Bridge activated
```

## 3. Handling errors with `.catch()`

Use `.catch()` to handle rejection.

```javascript
const task = new Promise((resolve, reject) => {
  reject("Bridge activation failed");
});

task
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });
```

Output:

```text
Bridge activation failed
```

## 4. Using `.finally()`

`.finally()` runs after the Promise settles, whether it succeeds or fails.

```javascript
const task = Promise.resolve("Mission complete");

task
  .then((message) => console.log(message))
  .finally(() => console.log("Process finished"));
```

Output:

```text
Mission complete
Process finished
```

## 5. Promise chaining

You can connect multiple asynchronous operations.

```javascript
Promise.resolve(10)
  .then((value) => {
    return value * 2;
  })
  .then((value) => {
    return value + 5;
  })
  .then((result) => {
    console.log(result);
  });
```

Output:

```text
25
```

Each `.then()` can return a value that becomes the input of the next `.then()`.

## Mission Challenge

The bridge needs a Promise that resolves with the message:

`"Bridge unlocked"`

Create a Promise, resolve it with that message, and use `.then()` to print the result.

Expected output:

```text
Bridge unlocked
```

## Remember

- A Promise represents a future result.
- `resolve()` fulfills a Promise.
- `reject()` rejects a Promise.
- `.then()` handles successful results.
- `.catch()` handles errors.
- `.finally()` runs after settlement.

The bridge recognizes your understanding and opens.
