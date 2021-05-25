import { DEFAULT_PASSWORD } from "../../src/config/default"
import Cryptor2 from "../../src/cryptor/cryptor2"

const cryptor = new Cryptor2()

test('test-cryptor2', () => {
  expect(cryptor.decrypt('z02傀Yt}}~1F~c}u1100000', DEFAULT_PASSWORD)).toEqual('Hello World  !!!!!')

  // Because the cipher is random
  // So can't use for definite ciphertexts
  const plain = '1111'
  const cipher = cryptor.encript(plain, DEFAULT_PASSWORD)
  expect(cryptor.decrypt(cipher, DEFAULT_PASSWORD)).toEqual(plain)
})