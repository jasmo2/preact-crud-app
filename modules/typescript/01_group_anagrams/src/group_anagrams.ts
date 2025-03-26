export function groupAnagrams(input: string[]): string[][] {
  const anagramMap: Record<string, string[]> = {}

  for (const word of input) {
    const sortedWord = word.split("").sort().join("")

    const group = anagramMap[sortedWord] || []
    group.push(word)
    anagramMap[sortedWord] = group
  }

  const values = Object.values(anagramMap)
  return Array.from(values)
}
