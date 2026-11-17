The terminal has finally awakened. Its screen lights up, revealing a map of the surrounding ruins. But before the map can be fully restored, a security door blocks your path.

An inscription appears above the door:

> A message without a memory cannot survive.

Behind the door lies an encrypted message left by the civilization that built this place.

You discover that the machine can remember information using something called a **variable**.

A variable is like a container: you give it a name, store a value inside it, and retrieve that value whenever you need it.

The ancient system has already identified a secret message, but it needs you to store that message in memory before it can unlock the door.

## Understanding Variables

Variables allow us to store information and use it later.

In JavaScript, you can declare variables using `let`, `const`, or `var`.

### Example

```javascript
const message = "The code lives!";

console.log(message);
```

Here:

- `const` declares a variable that cannot be reassigned.
- `message` is the variable name.
- `"The code lives!"` is the value stored inside it.
- `console.log(message)` displays the stored value.

### let vs const

Use `const` when you don't need to reassign a variable.

Use `let` when the value needs to change later.

Your task is to restore the secret message stored inside the machine.
