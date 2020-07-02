---
title: How to use Fiddler to Get and Modify Request for an App
date: 2020-07-01 23:57:13
tags: ['python', 'web crawler', 'fiddler']
categories: Article
cover: 'https://pic3.zhimg.com/v2-f7dd822655d8a76787389148658e4c41_1440w.jpg'
---

> a man-in-the-middle attack (MITM), also known as a hijack attack is an attack where the attacker secretly relays and possibly alters the communications between two parties who believe that they are directly communicating with each other.

I am not sure if you know Titok, which basically a short video platform that people uploads all kinds of videos to the Internet. However, if we want to download certain user's all videos, we need to make a connection between Tittok backend and ourself to get their returned json file. So, we will go thourgh how to use Fiddler and Python to apply MITM attack to achieve that.

## Environment

- Windows 10 system
- Python 3.8
- IOS device
- Fiddler

## Fiddler Setup

### Install

Go to [Fiddler Official Website](https://www.telerik.com/download/fiddler) and download the latest version for Windows. After you complete the download process, install `Fiddler` in your local computer and we will move to the confirguation section

### Configure

Open your Fiddler, and in the menu bar click `Tools -> Options` then click the `HTTPS` tab. Configure as the following.

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0.png?alt=media&token=6c43dfa3-2eb6-4845-a12a-cafd347b0d07" width="400px" height="auto"/>

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/1.png?alt=media&token=da470f88-a518-441a-8297-3ab009bd89a4" width="400px" height="auto"/>

> Since most site are using HTTPS protocal, we need to enable the Decrypt HTTPS traffic in order to get the requests from the app

Then in `Options` panel, go to `Connections` tab and configure as the following. We will configure our app WIFI on port `8888` later

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/2.png?alt=media&token=7f8c1b86-3021-4664-b2ae-3fbeea9102e3" width="400px" height="auto"/>

## IOS Device WIFI Configure

On your IOS device, click `Settings` and then go to `WIFI`. Click the WIFI that is being used for your IOS device and local computer. Then at the bottom of the screen click `Configure Proxy`. Click `Manual` and enter your server and port then save.

> For server, you can type ipconfig in your command line and the IPv4 will be the address. Port we will use 8888 same as we configure in Fiddler

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/4.png?alt=media&token=9373f90b-c472-45be-8fcd-8403e0ae96fc" width="400px" height="auto"/>

Make sure `Fiddler` is running because the port should be listen at 8888. Now open your `Safari` on your device, and enter your server or the IP address to download the `FiddlerRoot certificate`.

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/5.png?alt=media&token=b82c4fd8-82e5-46d7-b202-6a3300774aaf" width="400px" height="auto"/>

Once you complete the download process, open `Settings` on your device and go to `General -> Profiles -> DO_NOT_TRUST_FiddlerRoot` and install the certificate.
<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/7.png?alt=media&token=9fbb87e4-a1a0-4304-907f-e7695c27a950" width="400px" height="auto"/>

Then go to `General -> About -> Certificate Trust Settings` and enable `DO_NOT_TRUST_FiddlerRoot`.

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/6.png?alt=media&token=0c8ca4aa-f96c-40eb-974d-62234b434d40" width="400px" height="auto"/>

## Using Fiddler

Once we finish the setup, we should be able to see requests that returned whenever we are using our apps on our device. For example, let's open Tittok and go to one of my favourite author. As we scroll down to load more videos, we find there are many request that return to Fiddler. However, we would like to filter that only relevant to the videos. We can see that all the videos are hosting at `api3-core-c-lq.amemv.com` with `/aweme/post/`. However, notice that this will change depoends on Tiktok because last time I try to get the request the host is ssdk something like that.

Now, we apply filter to our requests which we only wang to see URL that contains `api3-core-c-lq.amemv.com/` since these includes the videos we want. Once you click `Run Filter Now`, we will only get the relevant results on the panel.

Since all the videos are stored in a json file, we want to get all the json files exported in order to use python to scrap the video url. Thus, we could apply script in Fiddler.

Go to `Rules -> Customize Rules`.

Add the following script inside `OnBeforeRequest(oSession: Session)`

```js
if (oSession.fullUrl.Contains('api3-core-c-lq.amemv.com/aweme/v1/aweme/post')) {
  var fso
  var file
  fso = new ActiveXObject('Scripting.FileSystemObject')

  file = fso.OpenTextFile(
    'C:\\Users\\Yang\\Desktop\\request.txt',
    8,
    true,
    true
  )
  file.writeLine('Request url: ' + oSession.url)
  file.writeLine('Request header: ' + oSession.oRequest.headers)
  file.writeLine('Request body: ' + oSession.GetRequestBodyAsString())
  file.writeLine('\n')
  file.close()
}
```

Add the following script inside `OnBeforeResponse(oSession: Session)`

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
  file.writeLine('Request body: ' + oSession.GetResponseBodyAsString())
  file.close()
}
```

Now, whenever you scroll a user's profile, Fiddler will store the requests and response and export on the directory that you set.

## Using Python to Download
