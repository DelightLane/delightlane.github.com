---
layout: post
title:  "[CoronaSDK] 블록 어태커 개발 일지"
date:   2019-01-21
tags: [work, blockAttacker]
---

## 시작 글

  한 차례 재미있는 작업을 끝내고 나니 또 목표가 한없이 가벼워진다. 새로운 작업을 처음부터 시작하려 할 때는 늘 이런 기분이다. 붕 떠서 하늘 끝까지라도 솟아오를 수 있을 것만 같다.

  저번주에 한 차례 일을 끝내고 나니 할 일을 잘 정리해 놨음에도 도무지 뭐부터 시작해야 할지 정리가 되지 않는다. 하고 싶지 않다는 게 더 정확하려나.

  그래도 해야지. 일단 일지부터 한 차례 쓰고 시작해 봐야지.  
<br>

## 작업

![screenshot]({{ site.url }}/resource/post/blockAttacker/190121_history.png)
<br>
<small>그간 작업 분량</small>

  오브젝트 풀링 기능을 완성했다. 그리고 사이드 이펙트를 체크하면서 기능을 정리했다.
  성능 상승의 체감이 확실하니 더 재미가 붙었던 것 아닐까.

<br>
<h4> 1. 이미지 오브젝트 풀링 기능 확장</h4>

  이전에 일단 임시로 타일에만 적용해둔 오브젝트 풀링 기능을 아틀라스 path에 따라 풀링하도록 확장해서 ObjectBase로 승격시켰다. 이렇게 한 이유는 당연히 타일에만 적용하고 싶지 않아서이니, 다른 Placeable들에도 적용을 시켰고, 잘 동작했다.

  일단 얼추 깔끔하게 정리를 하긴 했지만, 사실 지금 단계에서는 타일에만 적용해도 괜찮지 않았을까 싶은 생각도 든다. 너무 과했을까. 아니, 하지만 이쁘지 않으면, 재미가 없으면, 내가 코딩하는 이유를 어디서 찾아야 하겠어.

  아무튼 만족, 만족스럽다.

  하지만 그 덕에 Image가 당연히 있다고 가정하고 짠 코드들을 체크하고 처리하는 과정, 홍역을 한차례 겪어야 했다.
  
<br>
<h4> 2. 화면 내에 있을 때만 이미지가 Draw되도록 함</h4>
  
  이전에 임시로 적용했던, 주인공과의 거리로 타일의 이미지 오브젝트를 적재하는 기능은 심각한 문제를 내제하고 있었다. 바로 스크롤링 시에는 화면 크기 너머서의 불려지지 않은 이미지들이 보이는 문제. 주인공만이 세상의 기준인 세계의 모순이다.

  아무튼 그래서 그런 연유로, 임시로 적용했었으니까 하며 나를 다독이며 '화면 내에 있는 오브젝트일 때'로 조건을 바꿔 코딩해 주었다.

<br>

## 맺음 글

  그다지 별로 작업하지 못했다. 이번 주말엔 연례 행사인 부산 다녀오기도 해서 지금 매우 힘이 빠진 상태.. 주중을 거치면서 다시 컨디션과 일상을 돌려 놔야겠다.

  작업을 시작해보자.