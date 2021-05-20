import DefaultDecryptor from "../../../../src/zero/dbclick/default-decryptor"

const cryptor = new DefaultDecryptor()

/**
 * The node with only one text child needs to listen
 * 
 * @since 1.6.2
 */
test('test-dbclick-listen', () => {
  const element = document.createElement('span')
  element.append("aa")
  expect(cryptor.needListen(element)).toBeTruthy()
  element.append(document.createElement('b'))
  expect(cryptor.needListen(element)).toBeFalsy()
})