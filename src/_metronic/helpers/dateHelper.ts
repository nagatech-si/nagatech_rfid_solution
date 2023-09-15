export const getStringDateOnly = (date: Date, format: 'IDN' | 'ENG') => {
  try {
    const data = date.toISOString().split('T')[0]
    if (format === 'IDN') {
      const list = data.split('-')
      return list.reverse().join('-')
    }
    return data
  } catch (error) {
    throw new Error('Unsupported date format')
  }
}

export function decreaseDay(startDate: Date, jumlahHari: number): Date {
  const result = new Date(startDate)
  result.setDate(startDate.getDate() - jumlahHari)
  return result
}

export function increaseDay(startDate: Date, jumlahHari: number): Date {
  const result = new Date(startDate)
  result.setDate(startDate.getDate() + jumlahHari)
  return result
}

export function formatDateWithTime(input: string): string {
  const date = new Date(input)

  // Memastikan bahwa hari dan bulan selalu memiliki dua digit
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Bulan dimulai dari 0
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
}
