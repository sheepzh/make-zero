/**
 * Mark the element
 * @since 1.1.2
 */
export default interface ElementMarkable {
  /**
   * Mark the target element   
   */
  mark(ele: HTMLElement): void
  /**
   * Tell whether the target element has been marked
   */
  hasMarked(ele: HTMLElement): boolean
}