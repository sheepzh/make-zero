import $ = require('jquery')

const idPrefix: string = 'make-zero-float-'

export default class FloatAlert {
  private parent: JQuery<HTMLElement>
  private target: JQuery<HTMLElement>

  private icon: JQuery<HTMLElement>

  constructor(parent: JQuery<HTMLElement>) {
    this.parent = parent

    this.initAlert()
  }

  public show(top: number, left: number) {
    this.target.css({ top, left })
    this.target.show()
  }

  public hide() {
    this.target && this.target.hide && this.target.hide()
  }

  private initAlert() {
    const id = `${idPrefix}alert-container-${this.roundId()}`
    const floatAlertContainer = $(`<div id="${id}"></div>`)

    this.initIcon()
    floatAlertContainer.append(this.icon)
    floatAlertContainer.append(this.createAlertText())

    floatAlertContainer.css({
      position: "absolute",
      margin: "5px",
      borderRadius: "10px",
      backgroundColor: "#fff",
      width: "46px",
      height: "46px",
      verticalAlign: "middle",
      boxShadow: "5px 5px 5px #aaa",
      padding: "10px"
    })
    this.target = floatAlertContainer

    // append to the body and hide it at first
    this.parent.append(this.target)
    this.target.hide()
  }

  private createAlertText(): JQuery<HTMLElement> {
    const floatAlert = $(`<p id="${idPrefix}alert-${this.roundId()}">${chrome.i18n.getMessage('button_dbclick')}</p>`)
    floatAlert.css({
      fontFamily: "Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif",
      margin: "0 auto",
      lineHeight: "12px",
      fontSize: "12px",
      textAlign: "center"
    })
    return floatAlert
  }

  private initIcon() {
    const svg = '<svg t="1609157731767" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5299" width="26" height="26"><path d="M455.68 404.032l91.264 529.152c0 0 67.456-69.44 123.136-117.888l122.432 163.904c4.928 6.656 15.68 7.104 23.872 1.088l52.288-38.208c8.256-6.016 10.944-16.32 5.952-22.976l-119.104-159.424c62.208-25.088 164.672-53.632 164.672-53.632L455.68 404.032zM308.352 648.384l-135.872 99.328c-20.544 15.04-24.256 43.968-8 65.408 16.256 21.376 46.272 27.008 66.752 12.032l135.872-99.328c20.992-15.36 24.512-45.504 8.256-66.88C359.168 637.504 329.344 633.024 308.352 648.384zM949.696 238.976c-16.256-21.376-45.632-26.176-67.072-10.496l-134.912 98.688c-21.44 15.68-25.152 44.672-8.896 66.048 16.256 21.376 46.272 27.008 67.712 11.328l134.912-98.688C962.88 290.176 965.952 260.352 949.696 238.976zM319.296 136.832c-15.936-20.928-45.248-25.728-66.752-10.048-20.096 14.72-24.256 43.968-8.32 64.896l105.536 138.816c15.936 20.992 45.696 25.408 65.792 10.688 21.44-15.68 25.216-44.608 9.28-65.6L319.296 136.832zM585.792 301.76c26.176 4.224 50.24-13.376 53.632-39.232l21.184-167.808c3.392-25.792-14.976-49.984-41.536-54.656-26.176-4.224-50.24 13.376-53.632 39.168l-21.248 167.872C540.928 272.96 559.296 297.088 585.792 301.76zM329.728 489.024c2.56-25.92-15.808-50.048-41.536-54.656l-170.048-27.968c-27.072-3.584-50.688 13.696-53.632 39.232-3.904 26.944 14.464 51.072 41.536 54.656l170.048 27.968C301.824 532.736 325.504 515.456 329.728 489.024z" p-id="5300"></path></svg>'
    const id = `${idPrefix}icon-container-${this.roundId()}`
    const svgP = $(`<p id=${id}>${svg}</p>`)
    svgP.css({
      padding: "0px",
      marginBlockStart: 0,
      marginBlockEnd: 0,
      textAlign: "center"
      // fontColor: "#ec7eda"
    })
    this.icon = svgP
  }

  private roundId(): number {
    return Math.round(Math.random() * 100000 + 1)
  }
}