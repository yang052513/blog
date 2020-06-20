---
title: 自定义Windows10下的terminal外观
date: 2020-06-15 00:55:13
tags: ['windows', 'powershell', 'terminal']
categories: Articels
cover: 'https://i1.wp.com/regroove.ca/wp-content/uploads/2018/08/powershell.png?fit=2560%2C1440&ssl=1'
---

> 之前用 MacOS 时用的 iterm2 非常好用，无论外观自定义还是 git 当前分支的提醒，都比系统自带的 terminal 好看很多。换到 windows 之后，这个原生的界面...不能看！好在微软自己推出了一个 terminal 可以自定义 powershell 和 cmd 的外观，更改完后...真香！

<!-- more -->

## 安装软件

首先我们去 windows microsoft store 搜索`Windows Terminal`，然后点击 install 安装。

完成安装后我们打开 Terminal 应用，按下`Ctrl+,`打开配置文件`settings.json`。

我们主要就在这个文件内更改 powershell 的字体和外观。

## 色板 Color Schemes

https://atomcorp.github.io/themes/ 这个网站提供了大量的色彩配色方案。各种主题应有尽有...

我们先挑选一个色调，比如`Batman`。

然后我们点击`Get Theme`, 你的剪贴板内就会复制这个主题的 json 格式

```json
{
  "name": "Batman",
  "black": "#1b1d1e",
  "red": "#e6dc44",
  "green": "#c8be46",
  "yellow": "#f4fd22",
  "blue": "#737174",
  "purple": "#747271",
  "cyan": "#62605f",
  "white": "#c6c5bf",
  "brightBlack": "#505354",
  "brightRed": "#fff78e",
  "brightGreen": "#fff27d",
  "brightYellow": "#feed6c",
  "brightBlue": "#919495",
  "brightPurple": "#9a9a9d",
  "brightCyan": "#a3a3a6",
  "brightWhite": "#dadbd6",
  "background": "#1b1d1e",
  "foreground": "#6f6f6f"
}
```

我们再回到 settings.json 文件内，找到`"schemes": [ ],`。

这个数组就是用来定义我们主题色。我们把刚刚拷贝的主题粘贴到这个数组内。

```json
{
  "schemes": [
    {
      "name": "Batman",
      "black": "#1b1d1e",
      "red": "#e6dc44",
      "green": "#c8be46",
      "yellow": "#f4fd22",
      "blue": "#737174",
      "purple": "#747271",
      "cyan": "#62605f",
      "white": "#c6c5bf",
      "brightBlack": "#505354",
      "brightRed": "#fff78e",
      "brightGreen": "#fff27d",
      "brightYellow": "#feed6c",
      "brightBlue": "#919495",
      "brightPurple": "#9a9a9d",
      "brightCyan": "#a3a3a6",
      "brightWhite": "#dadbd6",
      "background": "#1b1d1e",
      "foreground": "#6f6f6f"
    }
  ]
}
```

然后在`profiles`部分添加该主题名来指定我们的主题

```json
{
  "colorScheme": "Batman"
}
```

当然，因为这是一个配置文件，`schemes`里的任何颜色变量时都可以更改的。也就是说你可以在一个主题的基础上进行魔改达到你想要的效果。

这样我们的颜色主题就更改完成了

## 自定义平台

在`setting.json`文件中，我们看下`profiles`这一部分。

每个 profiles 的类都有一个`guid`，比如 Powershell, Cmd, Azure Cloud Shell 他们的 guid 都是不同的。

`profiles`的上方我们可以看到有一个`defaultProfile`，那这个定义的 guid 就是我们默认 Termin 应用打开时启动的终端。

如果我们想用原生 Cmd, 就可以把 cmd 的 guid 复制到`defaultProfile`内。

## 自定义字体，背景

`fontFace`更改字体，字体名可以在 windows 字体库中查看
`fontSize` 定义字体的大小
`icon`: 更改应用上方的图标，文件地址为绝对路径
`backgroundImage`: 更改应用内的背景，图片地址为绝对地址
`backgroundImageOpacity`: 背景图片的透明度。0 即不显示
`startingDirector`: 打开应用时的默认路径

```json
  "profiles":
    [
        {
        "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
        "name": "Yang's WorkSpace",
        "commandline": "powershell.exe",
        "hidden": false,
        "colorScheme": "Thayer Bright",
        "fontFace": "Monaco",
        "fontSize": 9,
        "cursorShape": "underscore",
        "cursorColor": "#fff",
        "icon": "C:\\Users\\Yang\\Pictures\\Footage\\logo.png",
        "backgroundImage": "C:\\Users\\Yang\\Pictures\\Footage\\Wallpaper\\login-bg.png",
        "backgroundImageOpacity": 0.2,
        "startingDirectory": "C:\\Users\\Yang\\Projects"
        },
    ]
```
