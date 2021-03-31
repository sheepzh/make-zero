import cryptor from '../../../../src/zero/cryptor'

test('test-cryptor-support-01', () => {
  expect(cryptor.support('z01ጠኻ㮷㵂ព鬾鬾鬾')).toBeTruthy()
})

test('test-cryptor-support-01', () => {
  expect(cryptor.support('z02ጠኻ㮷㵂ព鬾鬾鬾')).toBeTruthy()
})

test('test-cryptor-support-02', () => {
  expect(cryptor.support('--adk')).toBeFalsy()
  expect(cryptor.support('-----')).toBeTruthy()
})
