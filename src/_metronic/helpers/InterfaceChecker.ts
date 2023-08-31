export function instanceOfA<T>(object: any): object is T {
  return 'value' in object
}

export function getNumberFromString(input: string): string | null {
  const match = input.match(/^(\d+)/) // Mengambil angka dari awal string
  return match ? parseInt(match[0], 10).toFixed(3) : null
}
