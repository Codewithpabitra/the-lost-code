
# The Function Forge

The five crystals begin glowing.

A hidden door opens, leading to a giant underground forge. Inside, thousands of mechanical devices are scattered across the floor.

A message appears on the wall:

*"A true developer does not rebuild the same machine every time. They create a blueprint and reuse it."*

The forge contains a control panel with a strange symbol.

Your guide explains:

"Every time you need the same operation, you can call a function instead of rewriting the instructions."

The forge is ready to create your first reusable command.

<!-- LEARNING -->

# Learning: Functions in JavaScript

## What is a function?

A function is a reusable block of code designed to perform a particular task.

Imagine a vending machine.

You provide an input, press a button, and receive an output.

Functions work similarly:

1. Receive input.
2. Perform an operation.
3. Return a result, if needed.

## 1. Creating a function

```javascript
function greet() {
  console.log("Welcome, Developer!");
}
```

This creates a function named `greet`.

But defining a function does not execute it.

You need to call it:

```javascript
greet();
```

Output:

```text
Welcome, Developer!
```

## 2. Function parameters

Parameters allow a function to receive information.

```javascript
function greet(name) {
  console.log("Hello, " + name);
}

greet("Alex");
greet("Sam");
```

Output:

```text
Hello, Alex
Hello, Sam
```

Here, `name` is a parameter.

`"Alex"` and `"Sam"` are arguments passed to the function.

## 3. Returning values

A function can send a result back using `return`.

```javascript
function add(a, b) {
  return a + b;
}

const result = add(10, 20);

console.log(result);
```

Output:

```text
30
```

Important: `return` sends a value back and ends the function execution.

## 4. Arrow functions

JavaScript also supports a shorter function syntax called an arrow function.

Regular function:

```javascript
function multiply(a, b) {
  return a * b;
}
```

Arrow function:

```javascript
const multiply = (a, b) => {
  return a * b;
};
```

For a single expression, you can shorten it further:

```javascript
const multiply = (a, b) => a * b;
```

Both versions perform the same operation.

## 5. Default parameters

You can provide a default value for a parameter.

```javascript
function welcome(name = "Developer") {
  return "Welcome, " + name;
}

console.log(welcome());
console.log(welcome("Alex"));
```

Output:

```text
Welcome, Developer
Welcome, Alex
```

## Mission Challenge

The forge needs a reusable energy calculator.

Create a function named `calculateEnergy` that:

- Accepts two parameters: `a` and `b`.
- Returns their sum.
- Is called with `40` and `60`.
- Prints the returned result.

Expected output:

```text
100
```

## Remember

- A function is reusable code.
- Parameters receive information.
- Arguments are the actual values passed.
- `return` sends a result back.
- Arrow functions provide shorter syntax.

The forge is now yours. Build once, reuse everywhere.
