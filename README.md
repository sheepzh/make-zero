<div align="center">
	<img src="./doc/img/banner.jpeg" width="50%">
</div>

<!-- # MAKE-ZERO -->

> 语言属于未知。

[English](README.en.md)

## 它是什么？

MakeZero 是一个用于加密网络文本的 Chrome 插件。


## 它能做什么？

它能够加密你在微博，豆瓣或者博客等 SNS 社区中发送的任何文本内容，只有拥有相同密码的人能够解密。

+ 自行设置密码，初次安装时缺省为 123456。
+ 自动加密网页输入框内的文本。
+ 手动加密选中的文字，并粘贴至剪贴板。
+ 手动解密选中的文字，密码设置正确将会弹出明文。

<div align="center">
  <img src="https://github.com/sheepzh/make-zero/blob/main/doc/img/use-in-douban.gif">
</div>

还附带了一个小功能。

+ 筛选搜索引擎内的搜索结果，自动过滤不想看见的，如 CSDN 等恶意利用 SEO 引流的网站。

## 如何安装？

1. 克隆或者下载解压该项目。

2. 在 Chrome 的地址栏输入：***chrome://extensions/*** 。

3. 点击 ***加载已解压项目*** 按钮，选择项目目录下的 **chrome_dir** 文件夹。

<div align=center>
  <img src="https://github.com/sheepzh/make-zero/blob/main/doc/img/install.gif" />
</div>

## 如何使用？

+ 插件设置

  1. 点击 Chrome 右上角的插件按钮，固定 MakeZero 插件。如果熟悉插件使用可省略该步骤。

  2. 点击 MakeZero 的小图标打开主面板，点击菜单进入 **文本加密** 设置界面。可在该界面修改密码，以及是否自动加密，修改完成之后请刷新网页或重启浏览器。

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

![Image text](https://github.com/sheepzh/make-zero/blob/main/doc/img/qrcode.png)


