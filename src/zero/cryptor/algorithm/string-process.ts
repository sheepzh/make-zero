/**
 * Translate string 2 unicode array 
 */
function toUnicodeArray(str: string): number[] {
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

function unicodes2Str(unicodes: number[]): string {
  return unicodes.map(cn => String.fromCharCode(cn)).join("")
}

/**
 * Ring with XOR
 * 
 * @param source source text
 */
export function ring(passwordNumber: number, source: string) {
  return unicodes2Str(ringToUnicodes(passwordNumber, source))
}

/**
 * Ring with XOR
 * 
 * @param source source text
 */
export function ringToUnicodes(passwordNumber: number, source: string): number[] {
  return toUnicodeArray(source).map(mn => mn ^ passwordNumber)
}

/**
 * Ring with XOR
 * 
 * @param source source text
 */
export function ringFromUnicodes(passwordNumber: number, source: number[]): string {
  return unicodes2Str(source.map(mn => mn ^ passwordNumber))
}