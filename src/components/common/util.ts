/**
 * Get the selected texts
 */
export function getSelectionText(): string {
  const selection = window.getSelection ?
    window.getSelection()
    : (document.getSelection ? document.getSelection() : (document.createRange() ? document.createRange().toString() : "")
    )
  let selectionText = selection.toString()
  // @2020/01/04 v1.1.2, fix the text in the iframes cant be encrypted/decrypted 
  const iframe = document.getElementsByTagName('iframe')
  for (let index = 0; index < iframe.length && !selectionText; index++) {
    selectionText = iframe[index].contentWindow.getSelection().toString()
  }
  return selectionText
}
