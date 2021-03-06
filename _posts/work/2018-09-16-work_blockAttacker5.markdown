---
layout: post
title:  "[CoronaSDK] 블록 어태커 개발 일지"
date:   2018-09-16
tags: [work, blockAttacker]
---

## 시작 글

  흑흑, 일요일 늦은 밤. 이제서야 개발 일지를 쓰려고 슬쩍 노트북을 꺼냈다. 컴퓨터를 켜서 하기에는 너무나 늦은 시각.. 금요일부터 운동도 하지 않았고. 이번 주는 별로다, 별로. 물론 미리 이삿짐을 좀 옮겨 놓는다는 미명 하에, 그래서 피로했다는 핑계 아래에 이루어진 일이지만, 아무튼 너무 별로라는 사실은 바뀌지 않는다.

  아무튼 빨리 쓰고 다시 성실한 다음주 평일로 넘어가 보도록 하자.

<br>

## 작업

![screenshot]({{ site.url }}/resource/post/blockAttacker/180916_history.png)
<br>
<small>이번주 작업 분량</small>

<br>
<h4>1. 맵 파일 내에 캐릭터 Spawn 위치 지정 기능</h4>

  기존에 캐릭터 배치가 너무나 원시적이었다. 일일이 x, y 값을 적어야 한다니. 사실 Tiled에 마우스 커서만 얹으면 좌표값이 얼추 나오긴 하지만, 맵 파일이 바뀐다면? 그래서 캐릭터를 다른 곳에 스폰해야 한다면? 일일이 수작업으로 적어둔 좌표값들을 체크하고 수정하고 빠뜨리면 다시 재체크, 수정. 반복 작업을 해야 할 것이다.

  뭐, 구구절절 말이 길었지만 이제서야 해야 했던 작업을 했다는 것으로 일축할 수 있다.

  한 일은 간단하다. 스폰 전용 오브젝트를 작성했고, 타입을 만들었다. 이제는 Tiled에서 오브젝트 위치값용 object를 배치할 수 있게 되었다.

  스폰 전용 오브젝트가 오브젝트를 생성하고 스폰하는 함수를 가지게 된 것은 당연지사였다.

<br>
<h4> 2. 주인공 이동시의 dust 이펙트를 모든 objectBase가 이동할 때 표시</h4>

  스크립트를 작성하다 보니 적 병사들이 움직일 때는 뒤에 먼지가 나오지 않았다. 역시나 어색하다. 뭐, 주인공한테만 붙일 때도 왠지 다른 캐릭터들이 움직일 때는 어색하지 않을까? 하는 의구심이 들긴 했지만 실제로 목도하니 더더욱 어색하다. 역시 모든 오브젝트는 움직일 때 이 이펙트가 있어야겠다. 하는 결단을 내려야 했다.

  기능 자체는 뭐, 그렇게 복잡한 게 아니니까 쉽게 옮길 수 있었다. 마침 움직이는 기능도 주인공이 objectBase에서 상속(사실 루아에는 상속이라는 개념이 없긴 하지만..)받아서 일부 쓰고 있었기도 하고. 그냥 기능을 위로 격상시켜 주기만 하면 되는 간단한 일이었다.

  기능을 올리고 테스트하고 끝.

  움직임이 나와서 말인데 주인공의 움직임 기능은 다른 objectBase와는 상이하다. 주인공이 아닌 mapPanel이 움직여야 하기 때문.(주인공은 항상 고정 위치에 있어야 하니.) 그래서 정확히 말하자면 override 하여 mapPanel의 move 함수를 호출하게 구현되어 있다.

<br>

## 맺음 글

  스크립트 작업을 많이 한 것도 아니고, 기능 작업을 많이 한 것도 아닌데 왜 이렇게나 코딩이 더뎠지?.. 휴. 얼른 작업에 박차를 가해야 할텐데.

  아무튼 계속해서 스크립트 작업을 해나가야 할 것이다. 기술 부채는 일단 재쳐두고. 게임이 만들어지고 있다는 느낌이라도 받으려면 아무래도 그렇게 해나가야 하는 것이 맞겠지.

  글을 쓰는 것과 게임을 만드는 것. 뭔가 비슷한 작업일 것이라고 생각했는데 너무나 다르다. 게임의 제한된 리소스 안에서 이야기를 끌어나가기엔 글이 만들어내는 상상력이라는 도구가 너무나 강력하다..

  여튼 이번 주는 여기까지. 그래도 주말에 썼으니 다행이라고 할 수 있겠다.