---
layout: post
title:  "[More Effective C++] 항목 22 ~ 23"
date:   2016-11-09
tags: [work, cpp]
---

## 항목 22 : 단독 연산자(op) 대신에 =이 붙은 연산자(op=)를 사용하는 것이 좋을 때가 있다. 
- x = x + y, x = x - y가 되면 x += y, x -= y도 되리라 기대하게 된다. 
	>+ 하지만 x와 y가 사용자 정의 타입일 때는 보장되지 않는다. 
- C++에서는 operator+, operatr=, operator += 사이엔 아무 관계가 없다. 즉 기대한 관계를 가지게 하려면 연산자 함수를 스스로 구현해야 한다. 
- 자연스런 관계를 지어두는 괜찮은 방법 -> 대입 형태를 사용해서 단독 형태를 구현하는 것 
- ex) 
```cpp
const Rational operator+(const Rational& lhs, const Rational& rhs) 
{ 
    return Rational(lhs) += rhs; 
} 
```
- 대입 형태 연산자만 신경쓰는 것으로 코드의 유지보수가 끝난다. 
- 대입 형태 연산자가 public이면 단독 형태를 클래스의 프랜드로 하지 않아도 된다. 
- 단독 형태 연산자를 모두 전역 유효 범위에 두어도 크기 신경쓰지 않는 프로그래머라면 템플릿으로 클래스 내부 단독 형태 연산자 함수 구현을 없앨 수 있다. 
- ex) 
```cpp
template<class T> 
const T operator+(const T& lhs, constT& rhs) 
{ 
    return T(lhs) += rhs; 
} 
```
- 체크할 수 있는 효율에 관련된 포인트 
	>1. 일반적으로 대입 형태 연산자는 단독 형태 연산자보다 효율적이다. 
		>>+ 보통 단독 형태 연산자는 새 객체를 반환한다. 
	>2. 대입 형태 연산자와 단독 형태 연산자를 동시에 제공함으로써 클래스 사용자에게 "효율과 편리성"을 경우에 따라 저울질 할 기회를 줄 수 있다. 
		>>+ ex) 
		```cpp
		result = a + b + c + d; // 임시 객체가 필요하다 
		result = a; 
		result += b; 
		result += c; 
		result += d; // 임시 객체가 필요없다.
		``` 
		>>+ 즉 사용자가 쓰고 싶은 것을 취사 선택하여 사용할 수 있다.(구현이 똑같음을 보장하기 때문에) 
	>3. 단독 형태 연산자를 구현할 때 임시 객체 / 이름 있는 객체 중 무엇을 반환할 것인가? 
	>+ ex) 
	```cpp
	template<class T> 
	const T operator+(const T& lhs, const T& rhs) 
	{ 
	    return T(lhs) += rhs; // 임시 객체 반환 
	} 
	template<class T> 
	const T operator+(const T& lhs, const T& rhs) 
	{ 
	    T result(lhs); 
	    return result += rhs; // 이름있는 객체 반환 
	} 
	```
	>+ 원래는 임시 객체에 컴파일시 반환값 최적화가 적용되어 더 효과적이었으나 개정되어 임시 객체에도 RVO가 먹이게 되었다. 
	>+ 하지만 구버전 컴파일러 사용 시 임시객체는 확실히 RVO가 된다. 

## 항목 23 : 정 안되면 다른 라이브러리를 사용하자! 
- 라이브러리의 이상 : 작고, 빠르고, 강력하고, 유연하고, 확장 가능하고, 직관적이고, 어디든 쓸 수 있고, 플랫폼 지원이 좋아야 하고, 사용상의 제약에 대해 자유롭고, 버그도 없어야 한다. 
- iostream / stdio?
	>+ 보통 stdio가 더 작고 빠르지만 iostream은 타입 안정성과 확장성을 갖추고 있다. 
- 비슷한 기능을 가진 라이브러리라도 어떤 철학에 따라 설계했느냐로 수행 성능성의 차이를 보일 수 있다. 
- 즉 병목현상 발견 시 라이브러리만 바꿔도 해결될 가능성이 있음을 잊지 말자. 