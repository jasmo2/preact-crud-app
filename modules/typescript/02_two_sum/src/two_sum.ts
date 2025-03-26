export function twoSum(numbers: number[], target: number): number[] {
  const numMap: Record<number, number> = {}

  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i]

    if (complement in numMap) {
      return [numMap[complement], i]
    }

    numMap[numbers[i]] = i
  }

  return []
}
