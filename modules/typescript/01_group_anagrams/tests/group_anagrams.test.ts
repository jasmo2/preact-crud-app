import { groupAnagrams } from "../src/group_anagrams";

describe("groupAnagrams", () => {
  test("should group anagrams correctly for a normal input", () => {
    const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
    const expectedOutput = [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]];
    const result = groupAnagrams(input);

    // Check if output matches the expected result (using deep equality)
    expect(result).toEqual(expectedOutput);
  });

  test("should handle empty input", () => {
    const input: string[] = [];
    const expectedOutput: string[][] = [];
    const result = groupAnagrams(input);

    // Check if output is an empty array
    expect(result).toEqual(expectedOutput);
  });

  test("should handle input with no anagrams", () => {
    const input = ["dog", "cat", "fish"];
    const expectedOutput = [["dog"], ["cat"], ["fish"]];
    const result = groupAnagrams(input);

    // Check if output groups each word separately
    expect(result).toEqual(expectedOutput);
  });

  test("should handle input with duplicate words", () => {
    const input = ["listen", "silent", "enlist", "listen"];
    const expectedOutput = [["listen", "silent", "enlist", "listen"]];
    const result = groupAnagrams(input);

    // Check if duplicates are included in the same group
    expect(result).toEqual(expectedOutput);
  });

  test("should handle input with single words", () => {
    const input = ["hello"];
    const expectedOutput = [["hello"]];
    const result = groupAnagrams(input);

    // Check if single word is grouped correctly
    expect(result).toEqual(expectedOutput);
  });
});

describe("Group Anagrams - Advanced Tests", () => {
  test("should handle a large input with multiple groups", () => {
    const input = [
      "star",
      "rats",
      "arts",
      "car",
      "arc",
      "scar",
      "cars",
      "hello",
      "elloh",
      "bat",
      "tab",
      "cat",
    ];
    const expectedOutput = [
      ["star", "rats", "arts"],
      ["car", "arc"],
      ["scar", "cars"],
      ["hello", "elloh"],
      ["bat", "tab"],
      ["cat"],
    ];
    const result = groupAnagrams(input);

    expect(result).toEqual(expectedOutput);
  });

  test("should handle input where all words are anagrams", () => {
    const input = ["abc", "cab", "bac"];
    const expectedOutput = [["abc", "cab", "bac"]];
    const result = groupAnagrams(input);

    expect(result).toEqual(expectedOutput);
  });

  test("should handle extremely large input efficiently", () => {
    const input = Array(10000)
      .fill("listen")
      .map((word, i) => {
        return i % 2 === 0 ? "silent" : "listen";
      });
    const result = groupAnagrams(input);

    // Since all words are anagrams ("listen" and "silent"), they should belong to one group
    expect(result.length).toEqual(1);
    expect(result[0].length).toEqual(10000);
  });

  test("should handle special characters in strings", () => {
    const input = ["a@b", "b@a", "ab@", "@ab"];
    const expectedOutput = [["a@b", "b@a", "ab@", "@ab"]];
    const result = groupAnagrams(input);

    expect(result).toEqual(expectedOutput);
  });

  test("should handle input with numbers in strings", () => {
    const input = ["1abc", "abc1", "cab1", "1cab"];
    const expectedOutput = [["1abc", "abc1", "cab1", "1cab"]];
    const result = groupAnagrams(input);

    expect(result).toEqual(expectedOutput);
  });
});
