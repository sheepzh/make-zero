import { DEFAULT_PASSWORD } from "../../../../src/zero/cryptor-config"
import Cryptor4 from "../../../../src/zero/cryptor/cryptor4"

const cryptor = new Cryptor4()

test('test-cryptor4', () => {
  const plain = '你妈死了'
  const cipher = cryptor.encript(plain, DEFAULT_PASSWORD)
  expect(cryptor.decrypt(cipher, DEFAULT_PASSWORD)).toEqual(plain)
  expect(cryptor.decrypt(cipher.substring(0, cipher.length - 1), DEFAULT_PASSWORD) === plain).toBeFalsy()

  expect(cryptor.decrypt('123123', DEFAULT_PASSWORD)).toEqual('123123')
  // Unknown char '大'
  expect(cryptor.decrypt('切噜～♪切卟咧大', DEFAULT_PASSWORD)).toEqual('切噜～♪切卟咧大')
})

test('test-cryptor4-support', () => {
  expect(cryptor.support('123')).toBeFalsy()
  expect(cryptor.support('切噜～♪切卟咧13212')).toBeFalsy()
  expect(cryptor.support('切噜～♪切卟咧啵啰')).toBeTruthy()
})


test('test-cryptor4-version', () => {
  expect(cryptor.version()).toEqual(4)
})