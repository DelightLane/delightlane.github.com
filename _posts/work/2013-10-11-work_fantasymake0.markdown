---
layout: post
title:  "[Cocos2d-x] [일지] 슈팅 게임 만들기 (1) - 기본틀 완성"
date:   2013-10-11
tags: [work]
---

  일주일 정도 붙잡고 있었나. 예전에 그려놓은 리소스를 사용해서 간단한 슈팅 게임을 만듦으로써 코코스2d-x에 대한 이해도를 높여보고자 하는 나의 작은 바램으로 시작된 코코스 게임 코딩! AOS 프로젝트와 병행해서 했지만 최근 AOS 프로젝트가 약간 정체되어 있는 관계로 오늘은 꽤 오랫동안 코코스 코딩에 시간을 쏟았다. 

  일단 지금 구현되어 있는 건, 

<br/>

<h3>1. 터치시 캐릭터 움직임</h3>

 이건 액션의 Move To로 구현하면 더 자연스럽게, 그리고 가속도도 붙여서 구현할 수 있는데, 막상 캐릭터 움직이는 걸 구현할 때는 이 사실을 제대로 인지하지 못한 채였다. 그래서 그냥 Position을 바꾸는 데 그쳤는데 이것도 이것 나름대로 괜찮은 것 같다. 

<h3>2. 배경 스크롤</h3>

 그냥 무난하게 만들었는데, 뭔가 야매인 듯한 기분이 왜 이렇게 드는걸까. 

<h3>3. 캐릭터 걷은 애니메이션, 슬라임 움직이는 애니메이션</h3>

 그냥 애니메이션을 붙였을 뿐.. 

<h3>4. 슬라임 생성 및 움직임</h3>

 CCArray를 사용해서 동적으로 슬라임을 만들고 애니메이션과 위치 이동을 붙여서 무난하게 구현했다. 

<h3>5. 터치 종료시 캐릭터 공격</h3>

 애니메이션 후의 이벤트를 어떻게 처리하는지 몰라서 조금 헤멨지만, 시퀀스를 사용해서 애니메이션 후의 슬라임 removeChild까지 처리했다. 죽은 슬라임 시체를 때려도 계속 죽는 애니메이션이 반복되는 오류가 있다. 

<br/>

  이 정도인데, 공부하느라 만든 게임이다 보니 코드가 난장판이다. 좀 수정하고 싶은데.. 일단 만들고 있다 보니 역시 완성도 있게 만들고 싶다. 사람 욕심이란 게 다 그렇지 않을까 ㅋㅋ.. 

  그런 의미에서 주인공과 몬스터를 모두 클래스로 만들어서 인스턴스화 시키고 싶다. 캐릭터나 몬스터의 상태도 넣어서 관리하고 싶고.. 아무튼 그런 관계로 내일은 이걸 하기로 했다. 꽤 귀찮은 작업이 될거 같지만.. 귀찮음을 타파하자 ㅠㅠ.. 
  코딩만 하면 왜 이렇게 귀찮은 게 싫은지.. 귀찮음도 습관화 된 모양이다.


[[Cocos2d-x] [일지] 슈팅 게임 만들기 (2) - 기본틀 완성2]({{ site.url }}/2013/10/13/work_fantasymake1.html)

[[Cocos2d-x] [일지] 슈팅 게임 만들기 (3) - 기본틀 완성3]({{ site.url }}/2013/10/14/work_fantasymake2.html)

[[Cocos2d-x] [완성] 판타지 메이크]({{ site.url }}/2014/12/31/work_fantasymake3.html)