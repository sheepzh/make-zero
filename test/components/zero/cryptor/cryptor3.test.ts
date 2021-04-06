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

test('test-cryptor3-support', () => {
  expect(cryptor.support('---')).toBeTruthy()
  expect(cryptor.support('-11')).toBeFalsy()
})

test('test-cryptor3-decrypt', () => {
  const cipher = '-·······-··--··-········-··-·-·---·--··---·---·--·---··----·-·-····-····-·----··-·--·-··--·--··-----·-··--·--··-----·-··--·--··-----·'
  expect(cryptor.decrypt(cipher, '我支持MakeZero')).toEqual('真的很好玩！！！')
})