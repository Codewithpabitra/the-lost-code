
# The Object Archive

The Array Vault opens a secret passage.

You enter an archive containing thousands of player records. Each record contains a name, level, health, and inventory.

Unlike the previous vault, these records are not simple lists.

Each piece of information has a meaningful label.

Your guide explains:

"Arrays organize collections. Objects organize information using key-value pairs."

An empty record appears on the screen.

It is waiting for you to give it an identity.

<!-- LEARNING -->

# Learning: Objects in JavaScript

## What is an object?

An object stores related information as key-value pairs.

Think of a player profile.

It contains:

- Name
- Level
- Health
- Score

Instead of storing everything in separate variables, you can group them into one object.

```javascript
const player = {
  name: "Alex",
  level: 5,
  health: 100,
  score: 500,
};
```

Here:

- `name`, `level`, `health`, and `score` are keys.
- `"Alex"`, `5`, `100`, and `500` are values.

## 1. Accessing object properties

There are two common ways to access properties.

### Dot notation

```javascript
console.log(player.name);
console.log(player.level);
```

### Bracket notation

```javascript
console.log(player["name"]);
console.log(player["level"]);
```

Both methods can access object properties.

Bracket notation is especially useful when the property name is stored in a variable.

```javascript
const key = "health";

console.log(player[key]);
```

Output:

```text
100
```

## 2. Updating properties

You can change an existing property.

```javascript
const player = {
  name: "Alex",
  level: 5,
};

player.level = 6;

console.log(player.level);
```

Output:

```text
6
```

## 3. Adding and deleting properties

Add a property:

```javascript
player.weapon = "Sword";

console.log(player.weapon);
```

Delete a property:

```javascript
delete player.weapon;
```

## 4. Objects inside arrays

You can store multiple objects inside an array.

```javascript
const players = [
  { name: "Alex", score: 100 },
  { name: "Sam", score: 200 },
  { name: "John", score: 150 },
];

console.log(players[0].name);
```

Output:

```text
Alex
```

This structure is common when working with API responses and databases.

## 5. Looping through object properties

Use `Object.keys()` to get an array of keys.

```javascript
const player = {
  name: "Alex",
  level: 5,
};

console.log(Object.keys(player));
```

Output:

```text
["name", "level"]
```

Use `Object.values()` to get values.

```javascript
console.log(Object.values(player));
```

Output:

```text
["Alex", 5]
```

Use `Object.entries()` to get key-value pairs.

```javascript
console.log(Object.entries(player));
```

## 6. Destructuring objects

Destructuring allows you to extract properties into variables.

```javascript
const player = {
  name: "Alex",
  level: 5,
};

const { name, level } = player;

console.log(name);
console.log(level);
```

Output:

```text
Alex
5
```

## Mission Challenge

Create a player object named `hero` with:

- `name`: `"Knight"`
- `level`: `10`
- `health`: `100`

Then:

- Increase the level to `11`.
- Add a property called `weapon` with value `"Excalibur"`.
- Print the hero's name, level, and weapon.

Expected output:

```text
Knight
11
Excalibur
```

## Remember

- Objects store key-value pairs.
- Use dot or bracket notation to access properties.
- Properties can be updated, added, and deleted.
- Arrays can contain objects.
- Destructuring makes property access convenient.

The archive has recorded your identity as a developer.
