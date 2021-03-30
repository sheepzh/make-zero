import { DEFAULT_PASSWORD } from "../../../../src/zero/cryptor-config"
import Cryptor3 from "../../../../src/zero/cryptor/cryptor3"

const cryptor = new Cryptor3()

function randomStr() {
  let str = ""
  for (let length = 16; length; length--) {
    str += String.fromCharCode(Math.random() * 2 ^ 16)
  }
  return str
}

test('test-cryptor3', () => {
  for (let i = 5; i; i--) {
    const str = randomStr()
    const cipher = cryptor.encript(str, DEFAULT_PASSWORD)
    const plain = cryptor.decrypt(cipher, DEFAULT_PASSWORD)
    expect(str).toEqual(plain)
  }
})