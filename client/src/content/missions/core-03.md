
# The Algorithm Trial

The Object Archive opens into a massive arena.

At its center stands an ancient guardian surrounded by thousands of scattered numbers.

A final message appears:

*"Writing code is only the beginning. A developer must also learn to solve problems efficiently."*

The guardian gives you three challenges:

1. Find a specific number.
2. Arrange numbers in order.
3. Understand how many steps your solution requires.

Your guide steps forward.

"This is not about writing more code. It's about finding a better way to solve a problem."

The final trial begins.

<!-- LEARNING -->

# Learning: Algorithms in JavaScript

## What is an algorithm?

An algorithm is a step-by-step procedure for solving a problem.

Think about finding a name in a phone book.

You could check every name one by one.

Or, because the names are sorted, you could repeatedly check the middle and eliminate half of the remaining possibilities.

Both approaches solve the problem, but one can be much faster.

## 1. Linear search

Linear search checks each element until it finds the target or reaches the end.

```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }

  return -1;
}

const numbers = [10, 20, 30, 40];

console.log(linearSearch(numbers, 30));
```

Output:

```text
2
```

The function returns the index of the target.

If the target does not exist, it returns `-1`.

### Time complexity

In the worst case, linear search checks every element.

Its time complexity is:

\[
O(n)
\]

Here, `n` represents the number of elements.

## 2. Binary search

Binary search works on a sorted array.

Instead of checking every element, it repeatedly divides the search range in half.

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

const numbers = [10, 20, 30, 40, 50, 60];

console.log(binarySearch(numbers, 50));
```

Output:

```text
4
```

### Time complexity

Binary search eliminates approximately half the remaining elements each iteration.

Its time complexity is:

\[
O(\log n)
\]

Important: The array must be sorted for this implementation to work correctly.

## 3. Bubble sort

Bubble sort repeatedly compares neighboring elements and swaps them if they are in the wrong order.

```javascript
function bubbleSort(arr) {
  const numbers = [...arr];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length - i - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        const temp = numbers[j];

        numbers[j] = numbers[j + 1];
        numbers[j + 1] = temp;
      }
    }
  }

  return numbers;
}

console.log(bubbleSort([5, 2, 4, 1, 3]));
```

Output:

```text
[1, 2, 3, 4, 5]
```

The spread operator creates a copy so the original array is not modified.

### Time complexity

The standard bubble sort implementation has:

\[
O(n^2)
\]

time complexity.

It is useful for learning sorting concepts, but it is inefficient for large datasets.

## 4. Understanding Big O notation

Big O describes how an algorithm's resource requirements grow as its input size increases.

Common time complexities:

| Complexity | Meaning | Example |
|---|---|---|
| O(1) | Constant time | Accessing an array element |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear search |
| O(n log n) | Linearithmic | Efficient comparison sorting |
| O(n²) | Quadratic | Basic bubble sort |

These describe growth rates, not exact execution times.

## 5. Problem-solving approach

When solving a coding problem:

1. Understand the problem.
2. Identify the input and expected output.
3. Think about edge cases.
4. Create a simple solution.
5. Test it with different inputs.
6. Analyze its time and space complexity.
7. Improve it if necessary.

A working solution is important. An efficient solution is even better.

## Mission Challenge

The guardian has hidden an energy crystal inside an array.

Create a function named `linearSearch` that:

- Accepts an array and a target.
- Checks each element.
- Returns the index if the target exists.
- Returns `-1` if the target does not exist.

Test it using:

```javascript
const numbers = [12, 25, 37, 48, 59];

console.log(linearSearch(numbers, 37));
```

Expected output:

```text
2
```

## Remember

- An algorithm is a sequence of steps to solve a problem.
- Linear search checks elements one by one.
- Binary search works on sorted arrays.
- Bubble sort repeatedly swaps neighboring elements.
- Big O helps describe how an algorithm scales.

The guardian lowers its weapon.

*"You have learned not only how to write code, but how to think like a developer."*

The Lost Code has a new master.
