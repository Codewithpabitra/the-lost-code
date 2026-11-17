
# The Async Portal

You successfully cross the Promise Bridge.

At the end of the path, an enormous portal stands before you. Its surface displays hundreds of moving lines of code.

The portal's control system is different from anything you've encountered.

Your guide explains:

"Promises work, but chaining too many operations can become difficult to follow. There is a cleaner way to write asynchronous code."

Two keywords glow on the control panel:

`async`

`await`

The portal is waiting for its final activation command.

<!-- LEARNING -->

# Learning: Async and Await in JavaScript

## What is async/await?

`async` and `await` are JavaScript keywords that make working with Promises easier to read.

They allow asynchronous code to look similar to regular, sequential code.

They do not make asynchronous operations automatically faster.

## 1. The `async` keyword

Adding `async` before a function makes it return a Promise.

```javascript
async function greet() {
  return "Hello, Developer!";
}

greet().then((message) => {
  console.log(message);
});
```

Output:

```text
Hello, Developer!
```

Even though the function returns a normal string, JavaScript wraps the result in a fulfilled Promise.

## 2. The `await` keyword

`await` pauses the execution of the surrounding async function until a Promise settles.

```javascript
function getMessage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Portal activated");
    }, 1000);
  });
}

async function startPortal() {
  const message = await getMessage();

  console.log(message);
}

startPortal();
```

Output after approximately one second:

```text
Portal activated
```

`await` can only be used inside an async function, except in JavaScript environments that support top-level await in modules.

## 3. Handling errors with try/catch

When a Promise rejects, `await` throws the rejection reason.

Use `try/catch` to handle errors.

```javascript
function activatePortal() {
  return Promise.reject("Portal activation failed");
}

async function start() {
  try {
    const result = await activatePortal();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

start();
```

Output:

```text
Portal activation failed
```

## 4. Sequential asynchronous operations

When one operation depends on another, await them sequentially.

```javascript
function getPlayer() {
  return Promise.resolve("Alex");
}

function getLevel(player) {
  return Promise.resolve(player + " reached level 5");
}

async function loadGame() {
  const player = await getPlayer();
  const level = await getLevel(player);

  console.log(level);
}

loadGame();
```

Output:

```text
Alex reached level 5
```

## 5. Running independent tasks together

If two asynchronous tasks do not depend on each other, `Promise.all()` can run them concurrently.

```javascript
async function loadGame() {
  const [player, score] = await Promise.all([
    Promise.resolve("Alex"),
    Promise.resolve(500),
  ]);

  console.log(player);
  console.log(score);
}

loadGame();
```

Output:

```text
Alex
500
```

`Promise.all()` rejects if any of its input Promises rejects.

## Mission Challenge

Activate the portal.

Create an async function named `activatePortal` that:

- Creates a Promise that resolves with `"Portal activated"`.
- Uses `await` to get the result.
- Prints the result.

Expected output:

```text
Portal activated
```

## Remember

- An `async` function always returns a Promise.
- `await` waits for a Promise to settle.
- Use `try/catch` to handle rejected Promises.
- `Promise.all()` helps run independent asynchronous tasks concurrently.

The portal opens. A new world awaits.
