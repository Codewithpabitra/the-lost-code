
# The Array Vault

You step through the portal and enter a gigantic vault.

Thousands of objects float inside transparent containers. Each container holds multiple items, but every item has a numbered position.

A message appears:

*"Information becomes powerful when it can be organized and accessed."*

Your guide points towards a storage terminal.

"This vault stores collections of data. You need to learn how to create, access, and modify them."

The terminal activates.

<!-- LEARNING -->

# Learning: Arrays in JavaScript

## What is an array?

An array is a data structure used to store multiple values in a single variable.

Without arrays:

```javascript
const item1 = "Sword";
const item2 = "Shield";
const item3 = "Potion";
```

With an array:

```javascript
const items = ["Sword", "Shield", "Potion"];
```

Arrays make it easier to organize and work with collections of data.

## 1. Creating an array

```javascript
const players = ["Alex", "Sam", "John"];

console.log(players);
```

Output:

```text
["Alex", "Sam", "John"]
```

An array can contain strings, numbers, booleans, objects, or even other arrays.

## 2. Array indexing

JavaScript arrays use zero-based indexing.

That means the first element has index `0`.

```javascript
const items = ["Sword", "Shield", "Potion"];

console.log(items[0]);
console.log(items[1]);
console.log(items[2]);
```

Output:

```text
Sword
Shield
Potion
```

## 3. The length property

Use `.length` to find the number of elements.

```javascript
const items = ["Sword", "Shield", "Potion"];

console.log(items.length);
```

Output:

```text
3
```

## 4. Adding elements

### push()

Adds an element to the end.

```javascript
const items = ["Sword", "Shield"];

items.push("Potion");

console.log(items);
```

Output:

```text
["Sword", "Shield", "Potion"]
```

### unshift()

Adds an element to the beginning.

```javascript
const items = ["Shield", "Potion"];

items.unshift("Sword");

console.log(items);
```

Output:

```text
["Sword", "Shield", "Potion"]
```

## 5. Removing elements

### pop()

Removes the last element.

```javascript
const items = ["Sword", "Shield", "Potion"];

items.pop();

console.log(items);
```

Output:

```text
["Sword", "Shield"]
```

### shift()

Removes the first element.

```javascript
const items = ["Sword", "Shield", "Potion"];

items.shift();

console.log(items);
```

Output:

```text
["Shield", "Potion"]
```

## 6. Looping through arrays

You can use a loop to access every element.

```javascript
const items = ["Sword", "Shield", "Potion"];

for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
```

Output:

```text
Sword
Shield
Potion
```

You can also use `for...of`:

```javascript
for (const item of items) {
  console.log(item);
}
```

## 7. Useful array methods

### map()

Creates a new array by transforming each element.

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map((number) => number * 2);

console.log(doubled);
```

Output:

```text
[2, 4, 6]
```

### filter()

Creates a new array containing elements that satisfy a condition.

```javascript
const numbers = [1, 2, 3, 4, 5];

const even = numbers.filter((number) => number % 2 === 0);

console.log(even);
```

Output:

```text
[2, 4]
```

### find()

Returns the first element that satisfies a condition, or `undefined` if none matches.

```javascript
const numbers = [10, 20, 30];

const result = numbers.find((number) => number > 15);

console.log(result);
```

Output:

```text
20
```

## Mission Challenge

The vault contains three energy crystals.

Create an array named `crystals` containing:

`"Ruby"`, `"Sapphire"`, `"Emerald"`

Then:

- Add `"Diamond"` using `push()`.
- Print the array length.
- Print the final array.

Expected output:

```text
4
["Ruby", "Sapphire", "Emerald", "Diamond"]
```

## Remember

- Arrays store multiple values.
- Indexing starts at zero.
- `.length` returns the number of elements.
- `push()` and `pop()` work at the end.
- `shift()` and `unshift()` work at the beginning.
- `map()`, `filter()`, and `find()` help process arrays.

The vault recognizes your ability to manage data.
