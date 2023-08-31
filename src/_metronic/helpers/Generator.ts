export default function generateAlphanumeric(length: number): string {
  const alphanumericChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result: string = ''
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * alphanumericChars.length)
    result += alphanumericChars.charAt(randomIndex)
  }
  return result
}
