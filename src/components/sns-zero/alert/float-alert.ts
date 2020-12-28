import $ = require('jquery')

const idPrefix: string = 'make-zero-float-'

export default function creatAlert(): JQuery<HTMLElement> {
  const id = `${idPrefix}alert-container-${roundId()}`
  const floatAlertContainer = $(`<div id="${id}"></div>`)

  floatAlertContainer.append(createIcon())
  floatAlertContainer.append(createAlertText())

  floatAlertContainer.css({
    position: "absolute",
    margin: "5px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    width: "50px",
    height: "50px",
    verticalAlign: "middle",
    boxShadow: "5px 5px 5px #aaa",
    padding: "10px"
  })
  return floatAlertContainer
}

function createAlertText(): JQuery<HTMLElement> {
  const floatAlert = $(`<p id="${idPrefix}alert-${roundId()}">双击</p>`)
  floatAlert.css({
    fontFamily: "Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif",
    margin: "0 auto",
    lineHeight: "14px",
    fontSize: "14px",
    textAlign: "center"
  })
  return floatAlert
}

function createIcon() {
  const svg = '<svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="26" height="26"><path d="M512 659.576471a174.682353 174.682353 0 1 1 0-349.364706 174.682353 174.682353 0 0 1 0 349.364706z m0-58.217412a116.464941 116.464941 0 1 0 0-232.929883 116.464941 116.464941 0 0 0 0 232.929883z" fill="#ec7eda" p-id="4062"></path><path d="M512 780.197647c-271.149176 0-431.134118-280.003765-431.134118-280.003765a26.202353 26.202353 0 0 1-0.150588-25.148235S237.206588 195.041882 512 195.041882s431.043765 279.642353 431.043765 279.642353c4.517647 7.348706 4.336941 18.552471 0.090353 25.509647 0 0-159.984941 280.003765-431.134118 280.003765z m0-58.217412c231.755294 0 366.863059-234.375529 366.863059-234.375529S751.616 254.102588 512 254.102588c-239.616 0-369.031529 233.502118-369.031529 233.502118S280.244706 721.980235 512 721.980235z" fill="#ec7eda" p-id="4063"></path></svg>'
  const id = `${idPrefix}icon-container-${roundId()}`
  const svgP = $(`<p id=${id}>${svg}</p>`)
  svgP.css({
    padding: "0px",
    marginBlockStart: 0,
    marginBlockEnd: 0,
    textAlign: "center",
    fontColor: "#ec7eda"
  })
  return svgP
}

function roundId(): number {
  return Math.round(Math.random() * 100000 + 1)
}