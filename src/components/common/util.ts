/**
 * Get the selected texts
 */
export function getSelectionText(): string {
  const selection = window.getSelection ?
    window.getSelection()
    : (document.getSelection ? document.getSelection() : (document.createRange() ? document.createRange().toString() : "")
    )
  let selectionText = selection.toString()
  // Fix the bug of FireFox: window.getSelection() returns empty text in form
  // @see https://bugzilla.mozilla.org/show_bug.cgi?id=85686
  if (!selectionText || selectionText === "") {
    const activeElement = document.activeElement
    if (activeElement && activeElement instanceof HTMLInputElement) {
      const { value, selectionStart, selectionEnd } = activeElement as HTMLInputElement
      if (!!value) {
        return value.substring(selectionStart, selectionEnd)
      } else {
        return ""
      }
    }
  }

  // @2020/01/04 v1.1.2, fix the text in the iframes cant be encrypted/decrypted 
  const iframe = document.getElementsByTagName('iframe')
  for (let index = 0; index < iframe.length && !selectionText; index++) {
    selectionText = iframe[index].contentWindow.getSelection().toString()
  }
  return selectionText
}
