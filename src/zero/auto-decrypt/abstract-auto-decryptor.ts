import ElementMarkable from "../element-markable"
/**
 * Prevent the circle imports
 * 
 * @since 1.1.2
 */
export default abstract class AbstractAutoDecryptor implements ElementMarkable {

  private static ATTR_NAME: string = "make-zero-auto-decrypted"

  public mark(ele: HTMLElement): void {
    ele.setAttribute(AbstractAutoDecryptor.ATTR_NAME, "1")
  }

  public hasMarked(ele: HTMLElement): boolean {
    return ele.hasAttribute(AbstractAutoDecryptor.ATTR_NAME)
  }

  abstract support(host: string): boolean
  abstract handle(): void
}