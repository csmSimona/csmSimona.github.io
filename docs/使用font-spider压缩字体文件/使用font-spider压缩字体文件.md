## 使用font-spider压缩字体文件

[字蛛](https://github.com/aui/font-spider)是一个智能 WebFont 压缩工具，它能自动分析出页面使用的 WebFont 并进行按需压缩。



### 步骤一、otf转ttf

如果字体格式为otf，需要使用python库 `otf2ttf` 转化字体格式（font-spider只对TTF格式的字体进行处理）

```shell
pip install otf2ttf
otf2ttf MyFont.otf
```



### 步骤二、使用font-spider减少ttf字体文件大小

使用[font-spider](https://github.com/aui/font-spider)自动分析出页面使用的 WebFont 并进行按需压缩。

1.全局安装

```shell
npm install font-spider -g
```

2.定义字体并使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      @font-face {
        font-family: "Source Han Serif SC";
        src: url("./Source Han Serif SC.ttf");
      }
      .test {
        font-family: "Source Han Serif SC";
      }
    </style>
  </head>
  <body>
    <div class="test">你需要使用的文本</div>
  </body>
</html>
```

将[常用的3500个中文字](https://github.com/csmSimona/csmSimona.github.io/tree/main/docs/使用font-spider压缩字体文件/3500characters.txt)存储起来，然后通过font-spider来进行提取， 3500个字体可以包含99%的中文

3.执行命令，分离字体

```shell
font-spider index.html
```

在index.html同级目录下就会生成压缩后的字体文件

字体包更新，初始字体包被放置在.font-spider文件夹中



### 类似的WebFont (Web Open Font Format) 技术

[fontmin](http://ecomfe.github.io/fontmin/#usage)

[iconfont](https://www.iconfont.cn/webfont/#!/webfont/index)

[有字库](http://www.youziku.com/)
