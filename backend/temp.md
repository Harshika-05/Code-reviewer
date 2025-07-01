The function you've written, `function sum() {return a+b;}`, has a critical issue: **`a` and `b` are not defined within
the scope of the function.**

If you try to run this code as is, you will get a `ReferenceError`: `a is not defined` (or `b is not defined`, depending
on the JavaScript engine's order of checking).

For this `sum` function to work correctly, you need to provide `a` and `b` to it. There are a few common ways to do
this:

---

### 1. The Most Common and Recommended Way: Using Parameters

This is the standard approach for functions that need specific inputs. You pass the values as arguments when you call
the function.

```javascript
function sum(num1, num2) { // num1 and num2 are parameters
return num1 + num2;
}

// How to use it:
let result1 = sum(5, 10); // result1 will be 15
console.log(result1);

let result2 = sum(-3, 7); // result2 will be 4
console.log(result2);

console.log(sum(100, 200)); // Directly log the result: 300
```

**Why this is best:**
* **Reusability:** The function can sum *any* two numbers you give it, without needing to know them in advance or rely
on external variables.
* **Readability:** It's clear what inputs the function expects.
* **Isolation:** The function is self-contained and doesn't depend on global variables, making your code less prone to
unexpected side effects.

---

### 2. Summing an Array of Numbers

If you want to sum many numbers that are stored in an array, you can pass the array to the function.

```javascript
function sumArray(numbers) {
let total = 0;
for (let i = 0; i < numbers.length; i++) { total +=numbers[i]; } return total; } // Or, more concisely using `reduce`:
    function sumArrayWithReduce(numbers) { return numbers.reduce((accumulator, currentValue)=> accumulator +
    currentValue, 0);
    }

    // How to use it:
    let myNumbers = [1, 2, 3, 4, 5];
    console.log(sumArray(myNumbers)); // Output: 15
    console.log(sumArrayWithReduce(myNumbers)); // Output: 15

    console.log(sumArrayWithReduce([10, 20, 30])); // Output: 60
    ```

    ---

    ### 3. Summing an Arbitrary Number of Arguments (Rest Parameters `...`)

    If you don't know how many numbers you'll need to sum, you can use the rest parameter syntax (`...`) to collect all
    arguments into an array.

    ```javascript
    function sumAll(...args) { // args will be an array of all arguments passed
    let total = 0;
    for (let i = 0; i < args.length; i++) { total +=args[i]; } return total; } // Or, more concisely using `reduce`:
        function sumAllWithReduce(...args) { return args.reduce((accumulator, currentValue)=> accumulator +
        currentValue, 0);
        }


        // How to use it:
        console.log(sumAll(1, 2, 3)); // Output: 6
        console.log(sumAll(10, 20, 30, 40)); // Output: 100
        console.log(sumAllWithReduce(5, 5)); // Output: 10
        console.log(sumAllWithReduce(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); // Output: 55
        ```

        ---

        ### 4. (Less Recommended) Using Global Variables

        While it *would* make your original function work, relying on global variables for function inputs is generally
        discouraged because it makes your code harder to manage, test, and debug.

        ```javascript
        // DON'T DO THIS FOR PRODUCTION CODE USUALLY
        let a = 5;
        let b = 10;

        function sumBadPractice() {
        return a + b; // It will find the global a and b
        }

        console.log(sumBadPractice()); // Output: 15

        // If you change a or b later, the function's output changes:
        a = 20;
        b = 30;
        console.log(sumBadPractice()); // Output: 50 (because a and b changed globally)
        ```
        This approach makes the function's behavior unpredictable if `a` or `b` are changed elsewhere in your code,
        which is why parameters are preferred.

        ---

        **In summary:** For a `sum` function that adds two numbers, the **parameter approach** is almost always the
        correct choice:

        ```javascript
        function sum(num1, num2) {
        return num1 + num2;
        }

        // Use it like this:
        console.log(sum(5, 3)); // 8
        ```