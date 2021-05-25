import IDomCompleteHandler from "../../chrome/interface/i-dom-complete-hanler"

/**
 * Make the contenteditable div pastable
 * 
 * @since 1.1.2
 */
export default class ContentEditablePasteHandler implements IDomCompleteHandler {
  private hosts: string[]

  constructor(...hosts: string[]) {
    this.hosts = hosts
  }

  support(host: string, href: string): boolean {
    return this.hosts.includes(host)
  }
  handle(): void {
    document.querySelectorAll('[contenteditable]').forEach(
      (editableEle: HTMLElement) => {
        editableEle.onpaste = (e: ClipboardEvent) => {
          e.preventDefault();
          let content: string
          if (window['clipboardData']) {
            content = window['clipboardData'].getData('Text');
            if (window.getSelection) {
              var selObj = window.getSelection();
              var selRange = selObj.getRangeAt(0);
              selRange.deleteContents();
              selRange.insertNode(document.createTextNode(content));
            }
          } else if (e.clipboardData) {
            content = e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, content);
          }
        }
      }
    )
  }
}