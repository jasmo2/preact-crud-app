# JavaScript Homework: Algorithms and Frontend Development

## Necessary Tools

- **Node.js**: Version 14+ (to run JavaScript code locally)
- **NPM**: A package manager, included with Node.js
- **Git**: Version 2.24+
- **Preact**: Version 10+ (for frontend challenges)

## Task

Tasks 1-3 weight: 60 points

## Evaluation Criteria

- **Code Quality :** Code should follow clean code principles and be well-structured.
- **Correctness :** The implementation should meet all task requirements and function correctly.
- **Testing :** Sufficient unit tests should be provided to cover key functionalities.

##### 1. Group Anagrams (20 points):

- File: [groupAnagrams.js](01_group_anagrams/src/group_anagrams.ts)
- Description: Write a function that groups anagrams from a list of strings. Two strings are anagrams if they contain the same characters in different orders (e.g., `"eat"` and `"tea"`).
- Expected output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]].

##### 2. Two Sum (20 points):

- File: [twoSum.js](02_two_sum/src/two_sum.ts)
- Description: Write a function that finds two numbers in an array that add up to a specific target. The function should return indices of the two numbers.
- Expected output: [0, 1] for input `[2, 7, 11, 15]` with target `9`.

##### 3: Retry Promise (20 points)

- File: [minimumWeight.js](03_retry_promise/src/retry_promise.ts)
- Description: Write a function that implements a retry policy for a promise-based function. The function should:
  - Retry the promise a specified number of times upon failure.
  - Include an optional function to decide if it should perform the retry.
- Function Signature:

  ```ts
      type RetryPromiseOptions = {
      retries: number;
      shouldRetry?: (error: unknown) => boolean;
      };

      function retryPromise<T>(promiseFn: () => Promise<T>, options: RetryPromiseOptions) { ... }
  ```

- Example Usage:

  ```ts
  const unreliableApiCall = () => {
    return Math.random() > 0.5
      ? Promise.resolve("Success")
      : Promise.reject("Failure");
  };

  retryPromise(unreliableApiCall, { retries: 3 })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  ```

Tasks 4-5 weight: 40 points

##### 4: CRUD app (30 points)

- File: [Preact CRUD App](04-preact-crud-app/src/app.tsx)
- Description: Develop a CRUD (Create, Read, Update, Delete) application using **Preact** and data from the JSONPlaceholder API.
- Functionality:
  - Fetch and display posts (`GET /posts`).
  - Create a new post (`POST /posts`).
  - Edit an existing post (`PUT /posts/:id`).
  - Delete a post (`DELETE /posts/:id`).
- Example API Call Code:
  ```javascript
  // Fetch posts from JSONPlaceholder
  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return response.json();
  };
  ```

##### 5: Add unit test for the CRUD app (10 points)

- Write tests for the React/Preact CRUD application to validate its correctness.

## References

- [JavaScript Algorithms](https://github.com/trekhleb/javascript-algorithms)
- [Preact Documentation](https://preactjs.com/guide/v10/getting-started)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [JSONPlaceholder API Documentation](https://jsonplaceholder.typicode.com/posts)
- [Preact testing library](https://preactjs.com/guide/v10/preact-testing-library/)
