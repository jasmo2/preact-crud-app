import { twoSum } from "../src/two_sum";

describe("Two Sum Problem", () => {
  test("should return indices of numbers that add up to the target", () => {
    const numbers = [2, 7, 11, 15];
    const target = 9;
    const result = twoSum(numbers, target);

    expect(result).toEqual([0, 1]); // 2 + 7 = 9
  });

  test("should return indices for multiple pairs but any valid pair", () => {
    const numbers = [3, 2, 4, 6];
    const target = 6;
    const result = twoSum(numbers, target);

    expect(result).toEqual([1, 2]); // 2 + 4 = 6
  });

  test("should return empty array if no pair exists", () => {
    const numbers = [1, 2, 3, 4];
    const target = 10;
    const result = twoSum(numbers, target);

    expect(result).toEqual([]); // No pair adds up to 10
  });

  test("should handle negative numbers and the target", () => {
    const numbers = [-3, 4, 3, 90];
    const target = 0;
    const result = twoSum(numbers, target);

    expect(result).toEqual([0, 2]); // -3 + 3 = 0
  });

  test("should handle duplicate numbers in the array", () => {
    const numbers = [3, 3];
    const target = 6;
    const result = twoSum(numbers, target);

    expect(result).toEqual([0, 1]); // 3 + 3 = 6
  });

  test("should handle a single element array with no solution", () => {
    const numbers = [1];
    const target = 2;
    const result = twoSum(numbers, target);

    expect(result).toEqual([]); // No pair exists in the array
  });

  test("should return any valid pair if multiple solutions exist", () => {
    const numbers = [5, 75, 25, 75];
    const target = 100;
    const result = twoSum(numbers, target);

    // Any of these pairs is valid: [1, 2] or [1, 3]
    expect([
      [1, 2],
      [1, 3],
    ]).toContainEqual(result);
  });
});
