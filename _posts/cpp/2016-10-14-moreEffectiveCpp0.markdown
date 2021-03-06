---
layout: post
title:  "[More Effective C++] 항목 1 ~ 2"
date:   2016-10-14
tags: [work, cpp]
---

## 항목 1 : 포인터와 참조자를 구분하자 
- 포인터(*, ->)와 연산자(.) 
	>+ 다른 객체를 간접적으로 참조할 수 있게 한다. 
- 참조자엔 '널 참조자'라는 것이 없다 
- 포인터와 참조자를 쓸 시기를 구분하는 방법 
	>1. 포인터
		>>+ 어떤 객체가 참조하는 부분에 객체가 있지 않을 경우가 있다(포인터의 값을 널로 셋팅할 수 있다.)
	>2. 참조자
		>>+ 항상 유효한 객체여야 한다.

- 포인터를 널로 셋팅하고 그걸 역참조한 걸 참조자를 통해 참조하려는 경우에는 어떻게 될까? 
- ex)
```cpp
char *pc = 0; 
char& rc = *pc; 
```
- 컴파일은 되지만 실행 결과가 예측 불가하다. 

- 참조자는 선언될 때 반드시 초기화를 해줘야 하지만 포인터는 이런 제약이 없다. 
- 유효성 검사가 필요없는 참조자가 포인터보다 효율적일 수 있다.(널 테스트가 필요 없다)
- 포인터는 다른 객체 주소값으로 바꿀 수 있고, 참조자는 초기화될 때 객체만 참조 가능하다. 

- 일반적인 용법 
	>1. 포인터
		>>+ 딱히 가리킬 객체의 주소가 없을 때 
		>>+ 하나의 변수로 여러 객체를 바꾸어 참조해야 할 때 
	>2. 참조자
		>>+ 참조할 포인터가 처음부터 끝까지 존재할 것임을 알고 있을 때 
		>>+ 참조하는 대상을 바꿀 필요가 없을 때 

- 연산자 함수를 구현(오버로딩)할 때 리턴값으로 참조자를 쓴다. 
	>+ 포인터를 반환할 시 v가 포인터의 벡터인 것처럼 보이게 하는 단점이 있다. 고로 참조자를 반환해야 한다.
	>+ (*v[5] = 10; 처럼 사용해야 한다.) 
	>+ 즉 포인터를 사용하면 문법상 의미가 어색해지는 연산자를 구현할 때 참조자를 사용한다. 

## 항목 2 : 가능한 C++ 스타일의 캐스트를 즐겨 쓰자. 
- 캐스트는 사용을 지양해야 하나 어쩔 수 없이 필요해질 때가 생기는 것에 포함된다.(goto문과 같은 맥락이다) 
- C스타일 캐스트의 문제점 
	>1. 어떤 타입을 다른 타입으로 아무 생각 없이 바꾸어준다. 
		>>+ 어떤 객체의 상수성만 바꾸거나, 객체의 타입을 완전히 바꾸는 것 등을 세세히 조정할 수 없다. 
	>2. 눈으로 찾아내기가 힘들다. 

- static_cast
	>+ C스타일 캐스트와 같은 의미와 형변환 능력을 가진 기본적인 캐스트 연산자. 
	>+ C스타일과 제약도 같다.(struct->int, double->포인터 등은 이것으로 할 수 없다.) 
	>+ 상수성 제거도 불가능하다.
- const_cast
	>+ 표현식의 상수성(const)이나 휘발성(volatile) 제거 
	>+ 그 외의 용도로는 통하지 않는다. 
- dynamic_cast
	>+ 상속계층 관계를 가로지르거나 하향시킨 클래스 타입으로 '안전하게' 캐스팅 시 사용한다. 
	>+ 기본 클래스 객체의 포인터나 참조자 타입을 파생, 형제 클래스의 타입을 변환한다. 
	>+ 실패시 널 포인터 / 예외 발생. 
	>+ 상속 계층 구조를 오갈 때만 가능하다. 
	>+ 가상함수가 없는 타입에는 적용이 불가하다. 
	>+ 상수성 제거가 불가능하다. 
- reinterpret_cast
	>+ 변환 결과가 거의 항상 컴파일러에 따라 다르므로 직접 이식이 불가능하다. 
	>+ 가장 흔한 용도로는 함수 포인터 타입 변환이 있다. 
	>+ 이식성 저하, 잘못된 결과 가능성 증가. 그러므로 지양해야 한다. 

- 컴파일러가 C++ 캐스트 연산자를 지원하지 않을 시 매크로로 흉내내어 후일 코드를 간단히 수정할 수 있게 하자. 
- 다운 캐스팅(dynamic_cast)는 온전히 흉내낼 수 없다. -> 캐스팅 실패를 판별할 수 없기 때문이다.