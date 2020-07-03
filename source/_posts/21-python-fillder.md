---
title: Python Crawler - Fiddler
date: 2020-07-01 23:57:13
tags: ['python', 'article', 'web crawler', 'fiddler', 'python-crawler-series']
categories: Article
cover: 'https://pic3.zhimg.com/v2-f7dd822655d8a76787389148658e4c41_1440w.jpg'
---

暑假一门数据通信的课要求用中间人攻击的原理来做一个 project. 什么是中间人攻击呢? 举个日常的例子就是，小时候上课传纸条。你写了一张纸条给你的女票同学道歉因为 XXX 原因。这时候你要先传到中间人然后中间人再传给你女票。没错，这个中间人就是我。

<img src="https://i04picsos.sogoucdn.com/acbcdc834c93d292" />
<br />

我拿到纸条后就想搞事情啊，于是我给你把纸条内容改成了“还不给老子道歉？"，然后传给了前面的你的女票。然后你什么都不知道。

这时候你的女票就不爽了啊，就回复了你"老王 分 懂?", 然后把纸条给了我....

嘿嘿，我又要搞事情了。

<img src="https://lh3.googleusercontent.com/proxy/gqAzArGd9-0Dy9LwboYPTShy0bKNWA-jk7mk4pVfCQionuF6EvV0W1nkXf0UhCMXk2FmyO9xjN6m1fW00YSKYqM5I16GoGohSIBIKyFgjLlCl0n4b-QmYQ" />
<br />

我这时候把纸条改成了"我错了 放学厕所门口等我". 然后我把纸条传给了你。

我在你们不知情的的情况下创建了一个通信连接，让你们误以为你们的信息都是来自对方的。这就类似于中间人攻击了。

再扔给你一个官方的定义

> a man-in-the-middle attack (MITM), also known as a hijack attack is an attack where the attacker secretly relays and possibly alters the communications between two parties who believe that they are directly communicating with each other.

但是你让搞一个虚拟机然后自己攻击自己，我是拒绝的。这跟自己 FUC\*K 自己有什么区别吗..加上最近在学 Python，仔细一想，用 Fiddler 来抓包不就是用 Fiddler 来实现中间人吗？？顺便还能把抖音的小姐姐爬下来。嗯，完美。说干就干。不，说做就做。

<img src="https://tp1.tupiankucdn.com/ws/large/005GOaLIly1fze39zjk7kj3073073jre.jpg" />
<br />

具体的思路就是先把 Fiddler 和手机设备在同一 WIFI 下，然后配置网络代理。之后用 Fiddler 保存手机所有 response 的包到本地，有了视频列表的数据包用 python 下载就比较简单了。所以重点在于分析 request traffic，要找到视频是储存在哪里。下载的脚本可以到[我的 repo](https://github.com/yang052513/tiktok-dl-fiddler)查看。

## <span id="01">环境</span>

- Windows 10 system
- Python 3.8
- IOS device (我用的是 IOS12, 具体型号不同请求头也会不同)
- Fiddler

## <span id="02">Fiddler 的配置</span>

### 安装 Fiddler

如果你没有安装过 Fiddler, 你可以去[Fiddler 官方网站](https://www.telerik.com/download/fiddler)下载 windows 版的最新版本，下载完成后一直点击安装就好。

### 设置 Fiddler

安装完 Fiddler 后，以管理员身份运行 Fiddler。然后在顶部菜单栏找到 `Tools -> Options`。在`Option`面板中点击`HTTPS`，然后如下配置。其实就是用来抓取 HTTPS 协议的 traffic。不然 request 是抓不到的。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/1.png?alt=media&token=da470f88-a518-441a-8297-3ab009bd89a4" width="400px" height="auto"/>

然后我们在`Option`面板中切换到`Connections`。配置如下。端口你可以用别的但要确保之后和你手机配置的端口保持一致。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/2.png?alt=media&token=7f8c1b86-3021-4664-b2ae-3fbeea9102e3" width="400px" height="auto"/>

## <span id="03">手机配置</span>

在你的手机设备上，点击`Settings`然后点击`WIFI`。确保你和你的电脑都连接的同一个`WIFI`。然后点击最下方的`Configure Proxy`来配置代理。改为`Manual`后输入你的`IP 地址`和端口`8888`然后保存就可以了。

> server 可以在 windows 命令行中输入 ipconfig 来查询。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/4.png?alt=media&token=9373f90b-c472-45be-8fcd-8403e0ae96fc" width="auto" height="500px"/>

确保`Fiddler`还在后台运行，因为我们要安装`Fiddler`证书到手机上。在`Safari`浏览器内输入你的 server 地址然后下载`FiddlerRoot certificate`。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/5.png?alt=media&token=b82c4fd8-82e5-46d7-b202-6a3300774aaf" width="auto" height="500px"/>

<br />

证书下载完成后，我们需要在`Settings`中安装证书来启用。`General -> Profiles -> DO_NOT_TRUST_FiddlerRoot`然后点击安装证书。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/7.png?alt=media&token=9fbb87e4-a1a0-4304-907f-e7695c27a950" width="auto" height="500px"/>

<br />

在`General -> About -> Certificate Trust Settings`中启用`DO_NOT_TRUST_FiddlerRoot`.

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/6.png?alt=media&token=0c8ca4aa-f96c-40eb-974d-62234b434d40" width="auto" height="500px"/>

<br />

这样 Fiddler 和手机的配置就完成了。这个时候你可以打开一个 app, 然后你会发现 Fiddler 中会返回很多 request。

<img src="https://tp1.tupiankucdn.com/ws/large/005GOaLIgy1fyc35ofomnj3073073q2u.jpg" />
<br />

## <span id="04">使用 Fiddler 抓包</span>

### 添加过滤条件

比如我们要下载抖音某博主的所有视频，我们随便点击一个博主的主页然后向下滑动。这时候 Fiddler 会返回很多 request. 但仔细观察一段时间后，你会发现所有的视频数据都保存在`api3-core-c-lq.amemv.com/aweme/post/`。那我们这时候就可以添加过滤规则来筛选结果了。点击`Run Filter Now`，你会看到现在只返回`api3-core-c-lq.amemv.com/aweme/post/`的 requests 了。

### 自定义保存规则

所有的视频都保存在一个`aweme_list`中。那我们如果想保存到本地话可以用右键保存到本地文件。但是一般情况下博主的视频都是多于 1 个 json 文件，我们一般要滑动几次才能全部加载完。那我们就可以在脚本中设置一个规则来自动保存请求。

Go to `Rules -> Customize Rules`.

#### onBeforeRequest

在`OnBeforeRequest(oSession: Session)` 函数中添加以下脚本。我们把请求的头部，url 和 body 都写入到`reuqest.txt`文件中。之后用 Python 下载时需要创一个伪装头。

```js
if (oSession.fullUrl.Contains('api3-core-c-lq.amemv.com/aweme/v1/aweme/post')) {
  var fso
  var file
  fso = new ActiveXObject('Scripting.FileSystemObject')

  file = fso.OpenTextFile(
    // the path where you want to store everytime you make request to app
    'C:\\Users\\Yang\\Desktop\\request.txt',
    8,
    true,
    true
  )
  file.writeLine(oSession.url)
  file.writeLine(oSession.oRequest.headers)
  file.writeLine(oSession.GetRequestBodyAsString())
  file.writeLine('\n')
  file.close()
}
```

#### onBeforeResponse

同理，在`OnBeforeResponse(oSession: Session)`函数中添加以下脚本。主要用来保存响应的 body。

```js
if (oSession.fullUrl.Contains('api3-core-c-lq.amemv.com/aweme/v1/aweme/post')) {
  var fso
  var file
  fso = new ActiveXObject('Scripting.FileSystemObject')

  file = fso.OpenTextFile(
    'C:\\Users\\Yang\\Desktop\\response.txt',
    8,
    true,
    true
  )
  file.writeLine(oSession.GetResponseBodyAsString())

  //每个响应分隔，之后用来遍历每个列表
  file.writeLine('======')
  file.close()
}
```

修改完毕后保存脚本。这个时候当我们滑动博主的个人页面后，我们可以看到 Fiddler 会只返回我们需要的 json 文件，而且请求和响应文件都分别保存在桌面上。

## <span id="05">下载视频。</span>

拿到响应后，下载就比较容易了。但要先把保存的的响应文件保存为`utf-8`编码格式。不然 Python 不能读取。

因为每个视频都保存在`donwload_addr`数组中，我们只要遍历所有视频然后用`requests`库下载保存为 mp4 文件就可以了。源码可以在[这里](https://github.com/yang052513/tiktok-dl-fiddler)查看。需要注意的地方可能就是文件名保存，很多抖音视频文件名会有`<`或其他无效字符，不能保存。所以要先过滤把非法字符替换掉。然后要确保 Fiddler 没有关闭，因为我们是用 Fillder 来假装发起请求。

运行脚本后，我们发现小姐姐都爬下来了。嘿嘿

<img src="https://lh3.googleusercontent.com/proxy/Wecyu57S1y5tGULepLj6ojXDQBwfBTAiYKyK88buEME37NBZM0qwUIJtjx6k4qDD7QURR2UQajiFJWTH9O5biWZp7nUGN7Z_YLaxehj1" />

<br />

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-02%20220150.png?alt=media&token=f963df29-de3f-4720-b909-5348eac1e9f4"/>

<br />

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-02%20220228.png?alt=media&token=9d5fe44d-c093-44ce-afe2-ca1766310cb3"/>
