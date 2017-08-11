---
layout: post
title:  "[Cocos2d-x / nodejs] [완성] 네트워크 전략 게임"
date:   2013-11-08
tags: [work, complete]
---

![screenshot]({{ site.url }}/resource/post/platoonTacticsScreenShot.png)

<iframe width="560" height="315" src="https://www.youtube.com/embed/3AMW2SzM4e0" frameborder="0" allowfullscreen></iframe>

대학교 졸업작품으로 제작한 턴방식 rpg 게임이다.

지금까지 만들고 있는 FZ Tactics도 턴방식인데, 어찌 보면 내 최종 목표는 내 마음에 드는 턴 rpg를 만드는 것일지도.

아래는 내가 졸업작품 발표를 할 때 쓴 PPT의 내용이다.

-------------------------
<br/>

<h3>1. 소개</h3>

cocos2d-x 라이브러리와 Node.js 이용

턴제 기반으로 운영되는 캐주얼한 네트워킹 전략 모바일 게임 제작.

<h3>2. 개요 & 동기</h3>

턴제 기반 게임은 오랫동안 사랑받아온 게임 장르

싱글플레이 위주인 요즘 모바일 게임의 추세를 뒤집어 보고 싶었다.


<h3>3. 플랫폼</h3>

1) cocos2d-x

cocos2d-x 는 2D가 주류를 이루는 모바일 게임 환경에 최적화 되어있는 게임개발 라이브러리.
모바일 게임회사에서도 선택하여 사용하고 있으며 대표적인 cocos2d-x개발 작으로 쿠키런, 마구마구 등이 있다.


2)  node.js

Node.js는 자바스크립트 엔진 위에서 동작하는 이벤트 처리 I/O 프레임워크.
웹 서버와 같이 확장성 있는 네트워크 프로그램 제작을 위해 고안되었다.

 - WebSocket : HTML5 API에서 지원하는, 서버측에서의 복잡한 프로그래밍 없이 웹을 통해서 일반적인 TCP소켓과 같이 실시간 연결지향 양방향 전이중 통신을 가능하게 하는 기술


<h3>4. 게임방법</h3>

1) 각각의 플레이어들은 전사, 마법사, 궁수를 조합하여 자신이 사용하고 싶은 유닛을 원하는 스타팅 위치에 원하는 수만큼 배치

2) 한턴당 주어진 행동력 만큼 액션을 취할 수 있으며 적절한 상황판단을 통해 적을 섬멸시키면 승리