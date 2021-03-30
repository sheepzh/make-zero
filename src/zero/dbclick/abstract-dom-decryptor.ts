import ElementMarkable from "../element-markable"
/**
 * Prevent the circle imports
 * 
 * @since 1.1.2
 */
export default abstract class AbstractDomDecryptor implements ElementMarkable {

  private static ATTR_NAME: string = "make-zero-db-click"

  public mark(ele: HTMLElement): void {
    ele.setAttribute(AbstractDomDecryptor.ATTR_NAME, "1")
  }

  public hasMarked(ele: HTMLElement): boolean {
    return ele.hasAttribute(AbstractDomDecryptor.ATTR_NAME)
  }

  abstract support(host: string): boolean

  abstract handle(): void
}
