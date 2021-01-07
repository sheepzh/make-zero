<div align="center">
	<img src="./doc/img/banner.jpeg" width="50%">
</div>

<!-- # MAKE-ZERO -->

[![](https://img.shields.io/badge/chrome-extension-red?style=flat-square)](chrome://extensions/)
[![](https://img.shields.io/github/license/sheepzh/make-zero?style=flat-square)](https://github.com/sheepzh/make-zero/blob/main/LICENSE)
[![](https://img.shields.io/badge/license-Anti%20996-blue?style=flat-square)](https://github.com/996icu/996.ICU)
[![](https://img.shields.io/github/v/release/sheepzh/make-zero?style=flat-square)](https://github.com/sheepzh/make-zero/releases)
[![](https://img.shields.io/github/release-date/sheepzh/make-zero?style=flat-square)](https://github.com/sheepzh/make-zero/releases)

> 语言属于未知。

## 它是什么？

MakeZero 是一个用于加密网络文本的 Chrome 插件。


## 它能做什么？

它能够加密你在微博，豆瓣或者博客等 SNS 社区中发送的任何文本内容，只有拥有相同密码的人能够解密。

+ 文本加解密，支持多种方式：手动，自动，快捷加密。
+ 自定义密码，初次安装时缺省为 123456。
+ 多种密文格式供选择。

<div align="center">
  <img src="./doc/img/use-in-douban.gif">
</div>

还附带了一个小功能。

+ 筛选搜索引擎内的搜索结果，自动过滤不想看见的，如 CSDN 等恶意利用 SEO 引流的网站。

## 如何安装？

1. 克隆或者下载解压该项目。

2. 在 Chrome 的地址栏输入：***chrome://extensions/*** 。

3. 点击 ***加载已解压项目*** 按钮，选择项目目录下的 **chrome_dir** 文件夹。

<div align=center>
  <img src="./doc/img/install.gif" />
</div>

## 如何使用？

+ 插件设置

  1. 点击 Chrome 右上角的插件按钮，固定 MakeZero 插件。如果熟悉插件使用可省略该步骤。

  2. 点击 MakeZero 的小图标打开主面板，点击菜单进入 **文本加密** 设置界面。可在该界面修改密码，以及是否自动加/解密，修改完成之后请刷新网页或重启浏览器。

+ 自动加密

  如果设置面板勾选了自动加密，网页输入框在输入/获取焦点时会显示明文；输入完成/失去焦点时，框内文本会自动变成密文。

+ 手动加/解密
  
  直接选中文字，点击右键弹出菜单，然后点击菜单项 make-zero -> 加/解密

## 如何编译？

先确保已经安装 nodejs

```shell
git clone https://github.com/sheepzh/make-zero.git
cd make-zero
npm install
npm run build
```
输出目录为 ./chrome_dir

## 有什么好的建议吗？

> returnzhy1996@outlook.com


如果对你有帮助，请 star 噢！  

微信群

![Image text](./doc/img/qrcode.jpg)
