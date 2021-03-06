---
layout: post
title:  "[CoronaSDK] 블록 어태커 개발 일지"
date:   2019-01-28
tags: [work, blockAttacker]
---

## 시작 글

  저번주 월요일, 할 일이 갑자기 사라졌다고 생각하며 게임을 켰다. 그리고 한번 테스트나 해볼까, 간단한 생각이 문득 들어서 게임을 돌리기 시작했다. 위이잉, 실제로 소리는 나지 않았지만 마치 소리를 낼 듯이 게임은 열심히 돌아갔다. 자, 오브젝트 풀링에다가 심지어 대사 시 스크롤 기능까지 넣어서 이제는 너무나 쾌적한 환경에서 게임을 테스트 할 수 있겠구나. 마치 유원지에서 파는 솜사탕의 무게 만큼이나 마음이 가벼워져서는 마우스를 클릭했다.

  그리고 정신을 차리고 보니 어느새 일주일이 흘러 있다. 테스트 후 생긴 사이드 이펙트들이 내 시간을 몽땅, 싸그리 싸매서 후다닥, 황금 도끼에 나오는 도둑 드워프들처럼 훔쳐가 버렸다. 얼마나 재빠른지 내가 휘두르는 무기들은 허우적 허우적 공기를 가를 뿐이었다.

  결국 그렇게 이번주도 공쳤다. 사이드 이팩트가 왜 이리도 많은지.
<br>

## 작업

![screenshot]({{ site.url }}/resource/post/blockAttacker/190128_history.png)
<br>
<small>그간 작업 분량</small>

  덕분에 커밋은 많이 했다.

<br>
<h4> 1. createTalkBy 이벤트 시 방향이 전이되지 않는 문제</h4>

  이전에 만든 기능으로, 다시 한 번 설명하자면 주인공의 이미지를 다른 캐릭터로 변경해서 유동적인 맵 환경에 대처하여 이벤트를 발생시켜 보자는 목적의 심플한 기능이다.

  근데 기존 방향이 그대로 다른 캐릭터의 이미지로 전이가 되지 않았는데, 문제는 정말 심플했다.(문제는 늘 심플하다. 디버깅의 문제일 뿐.)

  캐릭터이름_RIGHT

  형식이 바로 애니메이션 이름인데, 주인공의 이름 + 방향으로 된 애니메이션 이름은 전이되는 캐릭터 이미지 셋에는 없는 애니메이션 이름이었기 때문이다..

  결국 마지막 방향을 저장해서 처리했다.
  
<br>
<h4> 2. 이벤트 트리거 시 NPC 혹은 주인공의 방향 전환</h4>
  
  이벤트가 트리거 되어도 방향을 바꾸지 않으니 영 어색했다. 데면데면한 고향 친구라도 만난 듯 어색한 시선처리를 아무튼 어떻게든 해야 했다.

  처리는 했으나, 역시나 이 것도 사이드 이펙트의 발판이 되었다.
  서있지 않은 NPC와 트리거 했을 경우에도 방향 애니메이션을 플레이 해버리는 문제가 발생한 것이다. 음.. 이벤트 트리거 시 방향 전환 기능을 플래그로 처리하긴 했으나.. 뭐, 보통은 방향 전환이 되어야 할테니 디폴트는 방향 전환을 적용시켜 두었다.

<br>
<h4> 3. 맵 이동 기능</h4>
  
  사실상 가장 크게 적용된 새로운 기능. 맵과 맵 사이를 왔다 갔다 하는 기능을 추가했다.

  어려웠던 점이라면.. 바보같이 주인공 setPos 기능에 맵 풀링 업데이트를 해주지 않아서 이미지가 없는 타일 위에 올라가는 바람에 검은 화면에 덩그러니 올라가게 되었는데 맵 바깥으로 빠져나간 줄 알고 한참을 헤멨던 점.

  뭐, 버그도 아니고 특별한 점은 없었다.

<br>

## 맺음 글

  그 외에도 잡다구리하게 이런 저런 작업을 했다. 다 일일이 적자니 너무 소소해서.. 소소하고 또 소소하다. 그래도 소소한 것들이 모여서 대대해짐을 믿기 때문에 오늘 하루도 이렇게 키보드를 붙들고 있는 게 아니겠어.

  조용한 밤이 나를 통과해 간다. 밤에서 걸러진 것들이 내 심장 속을 조용히 굴러간다.