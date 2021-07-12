import { h, VNode } from "vue"

/**
 * Bold the element
 */
export function bold(element: VNode | string): VNode {
  return h('b', element)
}

/**
 * Italic the element
 */
export function italic(element: VNode | string): VNode {
  return h('i', element)
}

/**
 * Bold and italic the element
 */
export function boldAndItalic(element: VNode | string): VNode {
  return bold(italic(element))
}