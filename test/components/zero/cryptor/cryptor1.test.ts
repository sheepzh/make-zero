import Cryptor1 from "../../../../src/zero/cryptor/cryptor1"

const cryptor = new Cryptor1()

test('cryptor', () => {
  expect(cryptor.encript('真的很好玩！！！', '我支持MakeZero')).toEqual('z01ጠኻ㮷㵂ព鬾鬾鬾')
  expect(cryptor.decrypt('z01ጠኻ㮷㵂ព鬾鬾鬾', '我支持MakeZero')).toEqual('真的很好玩！！！')
  expect(cryptor.support('z01dadsa')).toBeTruthy()
  expect(cryptor.support('312')).toBeFalsy()
})