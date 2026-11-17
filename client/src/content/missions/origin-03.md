
The security door opens. Beyond it, you discover an enormous temple filled with floating symbols, glowing numbers, and fragments of forgotten data.

At the center of the temple stands a device known as the Memory Archive. It contains information about the civilization that once lived here.

However, the archive cannot interpret every symbol in the same way.

Some values represent numbers. Others represent text. Some represent true or false conditions.

JavaScript calls these different kinds of information **data types**.

## Understanding Data Types

JavaScript has several fundamental data types.

| Type | Example |
|---|---|
| String | `"Hello"` |
| Number | `100` |
| Boolean | `true` |
| Undefined | `undefined` |
| Null | `null` |

### Numbers

Numbers are used for mathematical operations, scores, measurements, and calculations.

```javascript
const score = 100;

console.log(score);
```

Notice that `100` does not have quotation marks.

If you write `"100"`, JavaScript treats it as a string instead of a number.

### Strings vs Numbers

```javascript
const first = 100;
const second = "100";

console.log(typeof first);
console.log(typeof second);
```

Output:

```text
number
string
```

The `typeof` operator helps us identify the type of a value.

## The Memory Archive

The archive needs you to restore a numerical record before it can continue.

You find an inscription showing that the ancient system used a variable called `score` to remember a player's progress.

Remember: the number must be stored as a number, not as text.
