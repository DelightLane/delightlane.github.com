---
layout: post
title:  "[More Effective C++] 항목 20 ~ 21"
date:   2016-11-08
tags: [work, cpp]
---

## 항목 20 : 반환값 최적화가 가능하게 하자. 
- 객체를 반환하면, 반환되는 객체를 제거할 방법이 없다. 
- ex) 값에 의한 반환을 없앨 수 없는 경우 
```cpp
const Rational operator (const Rational& lhs, const Rational& rhs) 
```
- 아무 유리수나 받아서 2개의 곱셈 결과를 내주도록 되어 있다. 하지만 두 유리수가 어떤 수일 지 누구도 모른다. 
- 포인터를 반환하는 방법 
	>+ 용법이 직관적이지 못하고(*(a*b)처럼 사용) 포인터의 리소스 누수가 고민거리이다.
- 참조자를 반환하는 방법 
	>+ 지역 변수는 함수를 벗어남과 동시에 제거되는데 참조자 반환이 되겠냐 
- 객체는 오직 값으로만 반환해야 하는 함수가 있다. 
- 반환되는 객체의 비용을 줄이는 방법을 찾는 노력을 해라. 
- 값으로 객체를 반환하면서도 임시 객체 비용이 들지 않는 함수를 작성해라. 
	>+ 객체 대신 생성자 인자 반환 
	>+ ex) 
	```cpp
	const Rational operator*(const Rational& lhs, const Rational& rhs) 
	{ 
	    return Rational(lhs.numerator() * rhs.numerator(), lhs.denominator() * rhs.denominator()); 
	} 
	```
	>+ 똑같이 비용이 들지만 이 경우 컴파일러가 반환 임시 객체에 대해 최적화를 해준다. 
	>+ ex) 
	```cpp
	Rational a = 10; 
	Rational b(1, 2); 
	Rational c = a * b; // operator* 호출 
	```
	>+ 컴파일러는 operator* 안의 임시객체와 operator*가 반환하는 임시객체를 모두 없애고 계산 결과 값을 객체 c에 대해 할당된 메모리에 직접 넣어 초기화해준다. 
	>+ 이 경우 operator* 호출 시 임시 객체 총 비용은 제로이다. 
	>+ 이것이 반환값 최적화!(거의 모든 컴파일러가 가진 기능이다.) 

## 항목 21 : 오버로딩은 불필요한 암시적 타입 변환을 막는 한 방법이다. 
- ex) 
```cpp
const UPInt operator+(const UPInt& lhs, const UPInt& rhs); 
UPInt upi1, upi2; 
UPInt upi3 = upi1 + upi2; // 문제 없음 
upi3 = upi1 + 10; // 암시적 타입 변환(임시 객체 문제) 
upi3 = 10 + upi2; 
```
- 타입 변환이 처음부터 필요 없게 오버로딩 해둔다. 
- ex)
```cpp
const UPInt operator+(int lhs, int rhs); // 에러 
```
- 오버로딩 되는 연산자 함수는 반드시 최소한 한개의 사용자 정의 타입을 매개변수로 가져야 한다는 c++ 규칙에 위배된다. 
- 80-20 법칙은 어디서든 고려 대상이다. -> 특별한 향상이 없다면 오버로딩은 무의미하다. 