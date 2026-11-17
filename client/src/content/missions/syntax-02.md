
# The Repetition Rune

The Logic Gate opens, revealing a massive chamber filled with floating blue crystals.

A mysterious inscription appears:

*"One action is easy. Repeating it a thousand times is a different challenge."*

In the center of the room, you find an ancient machine. It needs to activate five energy crystals, but the control panel contains only one command.

A small holographic guide appears.

"Don't write the same instruction again and again. Teach the machine how to repeat."

The machine is waiting for your command.

<!-- LEARNING -->

# Learning: Loops in JavaScript

## What is a loop?

Imagine telling someone to jump five times.

You could say:

- Jump.
- Jump.
- Jump.
- Jump.
- Jump.

But that is repetitive.

Instead, you can say:

"Jump five times."

A loop does exactly that. It executes a block of code repeatedly while a condition is satisfied.

## 1. The `for` loop

A `for` loop is useful when you know how many times you want to repeat something.

### Syntax

```javascript
for (initialization; condition; update) {
  // code to repeat
}
```

Example:

```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

Output:

```text
1
2
3
4
5
```

### Understanding the three parts

| Part | Meaning |
|---|---|
| `let i = 1` | Starting point |
| `i <= 5` | Continue while this is true |
| `i++` | Increase i after each iteration |

An iteration means one execution of the loop.

## 2. The `while` loop

A `while` loop repeats as long as its condition is true.

```javascript
let energy = 3;

while (energy > 0) {
  console.log("Crystal activated");
  energy--;
}
```

Output:

```text
Crystal activated
Crystal activated
Crystal activated
```

Be careful: if the condition never becomes false, the loop can run forever. This is called an infinite loop.

## 3. The `break` statement

`break` immediately stops a loop.

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 4) {
    break;
  }

  console.log(i);
}
```

Output:

```text
1
2
3
```

## 4. The `continue` statement

`continue` skips the current iteration and moves to the next one.

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }

  console.log(i);
}
```

Output:

```text
1
2
4
5
```

## Mission Challenge

The five energy crystals are waiting.

Write a `for` loop that prints the following output:

```text
Crystal 1 activated
Crystal 2 activated
Crystal 3 activated
Crystal 4 activated
Crystal 5 activated
```

**Your objective:** Use a loop instead of writing five separate `console.log()` statements.

## Remember

- `for` is useful when the number of iterations is known.
- `while` repeats while a condition remains true.
- `break` exits a loop.
- `continue` skips an iteration.

The machine doesn't need five commands anymore. It needs one intelligent command.
