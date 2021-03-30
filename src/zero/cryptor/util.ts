/**
 * Translate string 2 unicode array 
 */
export function toUnicodeArray(str: string): Array<number> {
  const result: Array<number> = []
  for (let i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i))
  }
  return result
}

/**
 * Translate the password 2 number
 * 
 * @param password 
 * @returns number
 */
export function password2Number(password: string): number {
  let pn: number = 0
  toUnicodeArray(password).forEach((n: number) => pn ^= n)
  return pn
}