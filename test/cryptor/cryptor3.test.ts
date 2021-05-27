import { DEFAULT_PASSWORD } from "../../src/config/default"
import Cryptor3 from "../../src/cryptor/cryptor3"

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
    const cipher = cryptor.encrypt(str, DEFAULT_PASSWORD)
    const plain = cryptor.decrypt(cipher, DEFAULT_PASSWORD)
    expect(str).toEqual(plain)
  }

  expect(cryptor.decrypt('---·····A', DEFAULT_PASSWORD)).toEqual('---·····A')
  expect(cryptor.decrypt('---', DEFAULT_PASSWORD)).toEqual('---')
  expect(cryptor.decrypt('---·-', DEFAULT_PASSWORD)).toEqual('---·-')
})

test('test-cryptor3-support', () => {
  expect(cryptor.support('---··-·-·------·')).toBeTruthy()
  expect(cryptor.support('---')).toBeFalsy()
  expect(cryptor.support('-11')).toBeFalsy()
  // #2 Wrong detection result of '-'
  expect(cryptor.support('-')).toBeFalsy()
})

test('test-cryptor3-decrypt', () => {
  const cipher = '-·······-··--··-········-··-·-·---·--··---·---·--·---··----·-·-····-····-·----··-·--·-··--·--··-----·-··--·--··-----·-··--·--··-----·'
  expect(cryptor.decrypt(cipher, '我支持MakeZero')).toEqual('真的很好玩！！！')
  // Ignore the tail part unit
  expect(cryptor.decrypt(cipher + '----', '我支持MakeZero')).toEqual('真的很好玩！！！')
})