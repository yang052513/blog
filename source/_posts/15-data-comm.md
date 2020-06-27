---
title: Intro to Data Communication and Networks
date: 2020-06-20 12:25:43
tags: ['data communication', 'BCIT', 'notes']
categories: 'Notes'
cover: 'https://wallpaperplay.com/walls/full/b/1/e/42765.jpg'
---

# Chapter 6: Multiplexing

> Multiplexing(多路复用) is a set of techniques that allow the **simultaneous transmission** of multiple signals across a **single data link**

即 Multiplexing 可以在一个信号传输的通道中传输**多路信号**的技术。

## Multiplexing Categories

There are three categories of multiplexing: Frequency-division, Wavelength-division, and Time-division.

### 1. Frequency-Division Multiplexing (FDM) 频分多路复用

FDM is an analog multiplexing technique can can be applied when the bandwidth of a link is greater than the combined bandwidths of the signals to be transmitted. In addition, the signals from sending device will be separated to different carrier frequencies by sufficient bandwidth。

就是说，FDM 可以将用于传输信道的总带宽**划分**成若干个子频道。同时，总频率带宽要大于所有子信道组合的贷款。

#### Exercise 1

> Assume that a voice channel occupies a bandwidth of 4kHz. We need to combine three voice channels into a link with a bandwidth of 12kHz, from 20 to 32 kHz. Show the FDM confirguration, assuming there are no guard bands

首先们需要组合 3 个语音频道的信号到一个总传输通道。总传输通道带宽为 12kHz，范围在 20-32kHz。那么每个子频道的带宽即为 4kHz(其实题目已经给了)。我们同时可以得出每个子频道的范围为 4kHz, 所有得出 20-24kHz, 24-28kHz, 28-32kHz。

#### Exercise 2

> Five channels, each with a 100 kHz bandwidth, are to be multiplexed together. What is the minimum bandwidth of the link if there is a need for a guard band of 10 kHz between the channels to prevent interference?

首先 5 个子频道每个带宽为 100kHz, 于是我们可以得出子频道组合需要的带宽为 `5x100 = 500kHz`。

然后每个子频道需要有一个`guard band`为 10kHz。那么总共 guard band 所需要的带宽为`(n-1) * 10kHz = (5 - 1) * 10kHz = 40kHz`。最后相加即可得出所需带宽为`500kHz + 40kHz`为`540kHz`。

#### Exercise 3

> Four digital data channels, each transmitting at 1Mbps, use a satellite channel of 1MHz. Design an appropriate FDM confirguration

给定 4 个信号数据频道，每个频道传输 1Mbps。于是每个频道需要的带宽为`1MHz / 4 - 250kHz`。

### Wavelength-Division Multiplexing (WDM) 波分复用

WDM is an analog multiplexing technique used to combine **optical signals** to take advantage of the high data rate capability of **fiber optic cable**

简单来说，WDM 就是通过组合多个不同的波长到一个单个光源。

### Time-Division Multiplexing (TDM) 时分复用

TDM, aka **synchronous**, aka **statistical** is a digital multiplexing technique that allows several connections to share the **high bandwidth of a link**

时分复用是通过采用同一物理连接的**不同时段**来传输不同的信号以达到多路传输的目的。

#### Exercise 1

> Consider the following synchronous TDM system. The data rate for each input connection is 1kbps. If 1 bit at a time is multiplexed, answer the folllowing: 1. what is the duration of each input time slot? 2. What is the output time slot for each? 3. What is the output frame for each?

1. What is the **duration** of each input time slot?
   每个输入的 data rate 为 1kbps。如果每次有 1bit 复用。那么 duration 为`1bit / 1kbps = 1 millisecond`
2. What is the **output time slot** for each connection?
   从上题我们得出**input time slot**为`1 millisecond`。题中的 TDM system 有 3 个 input connections。那么每个 output time slot 均分即为 `1 / 3 millisecond`
3. What is the **output frame** for each?
   每个 frame 携带 3 个 output time slots。如上图，Frame 3 携带 C3, B3, A3。由此我们可得出每个 frame 的 duration 为`3 * 1/3 = 1 millisecond`

#### Exercise 2

> Consider the following synchronous TDM with a data stream for each input and adata stream for the output. 1 bit is multiplexed at a time. Determine the output bit rate and output frame rate.

给定 4 个 input connections 且每个为 1 Mbps。Output bit rate 为`4 x 1 Mbps = 4 Mbps`

Output frame rate 等同于 input connection rate，即 1 M frames/second

#### Exercise 3

> Four channels are multiplexed using synchronous TDM. Each channel sends 100 bytes/s and we multiplex 1 byte per channel. Determine the size of the TDM frame, the TDM frame rate, the duration of a TDM frame and the bit rate for the link

1. The size of the TDM frame
   Each TDM frame carries 1 byte from each channel. Thus, the size of each TDM frame is 4 bytes
2. The TDM frame rate
   TDM frame rate 等同于 input connection rate。即 100 frames / seconds
3. The duration of a TDM frame
   `1 byte / 100bytes/s = 10 millisecond`
4. The bit rate for the link
   `100 * 4 * 8 = 3200bps`

#### Exercise 4

> We have four sources, each creating 250 8-bit characters per second. The interleaved unit is 1 character and 1 synchronizing bit is added to each TDM frame. Determine the data rate of each source, the duration of each character in each source, the TDM frame rate, the number of bits in each TDM frame, and the data rate of the link

1. The data rate of each source
   250 \* 8 bit = 2000 bps
2. The duration of each character in each source
   Each source creating 250 characters per second. The duration of each character is 1 / 250s
3. The TDM frame rate
   The link needs to send 250 frames per second
4. The number of bits in each TDM frame
   Each frame carries 4 characters and 1 extra synchronizing bit. The number of bits in each TDM frame is (4x8)+1 = 33 bits
5. The data rate of the link
   The link sends 250 frames per second, and each frame contains 33 bits. The data rate of the link is 250 x 33 = 8250 bps

# Chapter 8: Switching

## Introduction

> A switched network consists of a series of interlinked nodes called switches. Switches are devices capable of creating temporary connections between two or more devices linked to the switch

### Three Methods of Switching

1. Circuit Switching
2. Packet Switching
   - Virtual-circuit approach
   - Datagram approach
3. Message Switching

## Circuit-switched Networks

> A circuit-switched network consists of a set of switches connected by physical links, in which each link is divided into n channels

### Phases

1. Connection Setup
   - Before the entities can communicate, a dedicated circuit needs to be established
   - end-to-end addressing is required for creating a connection between the two end systems
2. Data Transfer
   - After establish the dedicated, two entities can transfer data
3. Connection Teardown
   - When one of the entities needs to disconnect, a signal is sent to each switch to release the resources

### Efficiency

Not as efficient as packet or message switched networks because resources are allocated for the **entire duration** of the connection

However, the delay is **minimal** as the resource are allocated for the duration of the connection

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-06-27%20130744.png?alt=media&token=f1150738-ff43-4c5a-8abb-785c968a71d4" />

## Packet Switching

> In data communications, we need to send messages from one end system to another. If the message is going to pass through a **packet-switched** network, the message needs to be divided into packets of fixed or variable size.

However, resource are allocated on-demand on a first-come, first served basis.

### 1. Datagram Networks

In a datagram network, each packet is treated independently of all others.

Datagram switching is normally done at the network layer

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-06-27%20143510.png?alt=media&token=4384e092-b327-43a5-b532-888b53c8d00b" />

### 2. Virtual-Circuit Networks

A virtual-circuit network is a cross between a circuit-switched network and a datagram network.

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-06-27%20143357.png?alt=media&token=24092371-ef1a-4f13-a128-26d40c665936" />
