<div align="center">
	<img src="./doc/img/banner.jpeg" width="50%">
</div>

[![codecov](https://codecov.io/gh/sheepzh/make-zero/branch/main/graph/badge.svg?token=S98QSBSKCR&style=flat-square)](https://codecov.io/gh/sheepzh/make-zero)
[![](https://www.travis-ci.com/sheepzh/make-zero.svg?branch=main)](https://www.travis-ci.com/sheepzh/make-zero.svg?branch=main)
[![](https://img.shields.io/github/license/sheepzh/make-zero)](https://github.com/sheepzh/make-zero/blob/main/LICENSE)
[![](https://img.shields.io/badge/license-Anti%20996-blue)](https://github.com/996icu/996.ICU)
[![](https://img.shields.io/github/v/release/sheepzh/make-zero)](https://github.com/sheepzh/make-zero/releases)
![visitors](https://visitor-badge.glitch.me/badge?page_id=sheepzh.make-zero)
[![](https://img.shields.io/badge/dynamic/json?color=red&label=users&query=total&url=http%3A%2F%2F148.70.16.14%3A12345%2Fusercount%2Fmakezero)](http://148.70.16.14:12345/usercount/makezero)

> 语言属于未知。

简体中文 | [English](./README.en.md)

## 它是什么？

MakeZero 是一个用于加密网络文本的 Chrome 插件。它能够加密你在网络中存储的任何文本内容，只有知道密码的人能够解密。

<u>**插件演示视频**</u>：[www.bilibili.com](https://www.bilibili.com/video/BV1x54y1t7MR)

<u>**下载地址**</u>

[![Chrome](https://img.shields.io/chrome-web-store/v/ihpcojcdiclghnggnlkcinbmfpomefcc?label=Google%20Chrome)](https://chrome.google.com/webstore/detail/%E7%BD%91%E8%B4%B9%E5%BE%88%E8%B4%B5-%E4%B8%8A%E7%BD%91%E6%97%B6%E9%97%B4%E7%BB%9F%E8%AE%A1/ihpcojcdiclghnggnlkcinbmfpomefcc?hl=zh-CN)
[![Firefox](https://img.shields.io/amo/v/2688458?color=green&label=Mozilla%20Firefox)](https://addons.mozilla.org/zh-CN/firefox/addon/make-zero/)
[![Edge](https://img.shields.io/badge/dynamic/json?label=Microsoft%20Edge&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fgkjmpdoddilgcfoeokeajfecogaaocol)](https://microsoftedge.microsoft.com/addons/detail/timer-running-browsin/gkjmpdoddilgcfoeokeajfecogaaocol)

## 它能做什么？

- 文本加解密，支持多种交互方式：手动，自动，快捷加密。
- 自定义密码，初次安装时缺省为 123456。
- 多种密文风格供选择：固定密文，随机密文，摩斯码，切噜语。

<div align="center">
  <img src="./doc/img/use-in-douban.gif">
</div>

## 如何编译？

先确保已经安装 nodejs

```shell
git clone https://github.com/sheepzh/make-zero.git
cd make-zero
npm install

# 运行开发服务器
# 输出目录：
#    dist_dev(可加载至 Chrome，Edge)
#    firefox_dev(可加载至 FireFox)
# Chrome 内核浏览器与 FireFox 浏览器 manifest.json 有细微差别
npm run dev

# 生产环境编译
# 输出目录：chrome_dir，以及 market_packages (发布到各大插件商城的 zip，以及源码 zip)
npm run build
```

## 如何使用？

> 安装完成后会自动弹出插件的使用教程，按步骤操作一遍即可。

- 插件设置

点击 MakeZero 的小图标打开主面板。可在该界面修改密码和密文风格，以及是否自动加/解密。

- 自动加密

  如果设置面板勾选了自动加密，网页输入框在输入/获取焦点时会显示明文；输入完成/失去焦点时，框内文本会自动变成密文。

- 自动解密

  如果设置面板勾选了自动解密，网页在加载完成之后会自动将识别出的密文解密成明文。

- 手动加/解密

  直接选中文字，点击右键弹出菜单，然后点击菜单项 make-zero -> 加/解密。或者使用快捷键 Ctrl + ,

## 捐款链接

[面包多](https://mianbaoduo.com/o/bread/mbd-YZqUmJtx)

## 有什么好的建议吗？

[ISSUES](https://github.com/sheepzh/make-zero/issues/new)
