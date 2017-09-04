---
layout: post
title:  "[More Effective C++] 항목 14 ~ 15"
date:   2016-11-01
tags: [work, cpp]
---

## 항목 14 : 예외 지정(exception specification) 기능은 냉철하게 사용하자 
- 함수 선언 시 함수가 발생시킬 예외를 미리 지정하는 기능 : 예외 지정 
- 예외 지정의 장점 
	>1. 어떤 함수가 어떤 예외를 발생시키는지 드러나므로 코드 보기가 수월하다 
	>2. 예외 지정에 일관성이 없으면 컴파일러가 컴파일 도중에 발견해준다. 
	>3. 함수가 예외 지정 리스트에 없는 예외를 발생시킬 경우에 런타임 에러가 발생하며 unexpected라는 특수 함수가 자동으로 호출된다. 

- unexpected 함수의 기본 동작 : terminate 호출 
	>+ terminate : 기본적으로 abort 호출(기본적으로 바로 멈추어버려 활성 스택 프레임의 지역 변수는 소멸되지 않는다.)

- 결국 개발자가 예외 지정을 어기는 일은 재앙이 된다. 
- 컴파일러가 해주는 예외 지정 일관성 점검은 부분적이다. 
	>+ 예외 지정을 어기는 함수를 호출하는 부분까지 점검하진 않는다. 
	>+ ex) 
	```cpp
	extern void f1(); // 어떤 예외든 발생 
	void f2() throw(int); // int 타입 예외만 발생 
	void f2() throw(int) 
	{ 
	    f1(); 
	} // f1은 int 이외의 타입 예외를 발생시킬 수 있다. 하지만 문법은 맞고 컴파일러는 점검해주지 않는다. 결국 예외가 잘못 발생할 수 있다. 
	```
- 예외 지정 불일치가 최소화된 프로그램을 만들도록 스스로 노력하자. 
- 예외지정 불일치를 피하는 방법 
	>1. 템플릿에 예외 지정을 두지 않는다. 
		>>+ 템플릿의 타입 매개변수에서 발생된 예외에 대해 알 방법이 없다. 
		>>+ 템플릿이 받아들이는 타입 매개변수가 무궁무진하므로 예외 지정은 무의미하다.
	>2. 예외 지정이 안된 함수를 호출할 가능성을 가진 함수에는 예외지정을 두지 않는다. 
		>>+ ex) 콜백 함수 등록 시
		```cpp
		typedef void (*CallBackPtr)(int i , int j); 
		class CallBack 
		{ 
		public: 
		    CallBack(CallBackPtr fPtr) : func(fPtr) {} 
		    void makeCallBack(int i , int j) const throw(); 
		private: 
		    CallBackPtr func; 
		}; 

		void CallBack::makeCallback(int i, int j) const throw() 
		{ 
		    func(i, j); // 여기서 예외 지정을 어길 위험이 있다! func가 어떤 예외를 일으킬지 전혀 모른다! 
		}
		```
		>>+ typedef 타입인 CallBackPtr에 예외 지정을 하면 해결된다. 
		>>+ ex)
		```cpp
		typedef void (*CallBackPtr)(int i, int j) throw(); 
		```
		>>+ 예외 발생이 없다는 보장이 안된 콜백함수를 등록할 시 컴파일러 에러가 발생한다! 
	>3. "시스템"이 일으킬 가능성이 있는 예외(C++표준 예외)를 처리하자. 
		>>+ ex) operator new 계열을 쓸 때는 bad_alloc 예외를 염두에 두자. 

- C++은 예기치 않은 예외를 다른 타입 예외로 대체할 수 있는 장치를 만들어 놓았다. 
- ex) 
```cpp
class UnexpectedException {} // 모든 예기치 않은 예외는 이 타입으로 대체된다. 
void convertUnexpected() // 예기치 않은 예외 발생 시 호출되는 함수 
{ 
    throw UnexpectedException(); 
} 
set_unexpected(convertUnexpected); // convertUnexpected가 원래 unexpected 함수 대신 호출되게 설정한다. 
```
	>+ 예외 지정 리스트에 Unexpected Exception을 넣어서 예외 지정이 없는 함수를 사용할 수 있다. 
- 예기치 않은 에외를 다른 잘 알려진 타입으로 바꾸는 또 다른 방법 : unexpected 대신 호출되는 함수가 현재의 예외를 그대로 중계한다. 
	>+ 이 타입은 표준 타입 bad_exception 객체로 바뀐다. 
- ex) 
```cpp
void convertUnexpected() { thorw; } 
set_unexpected(convertUnexpected); 
```
	>+ 그리고 bad_exception(혹은 exception)을 예외 지정 리스트에 포함시키면 된다. 

- 예외 지정의 단점 
	>1. 컴파일러가 예외 지정 일치성을 부분적인 점검만 한다 
	>2. 템플릿과 예외지정은 같이 쓸 수 없다. 
	>3. 예외 지정을 어길 시 unexpected가 호출되어 프로그램이 멈추는데 이것을 어기기가 너무 쉽다. 
	>4. 예외 처리 코드가 준비되었음에도 unexpected가 호출될 수 있다. 
		>>+ ex) 
		```cpp
		void temp() 
		{ 
		    try 
		    { 
		        log(this); 
		    } 
		    catch(....} { } // log의 모든 예외를 잡아 처리한다. 
		} 
		```
		>>+ 여기서 log가 예외를 절대 발생시키지 못하도록 예외 지정이 되어 있고, log 내부 어떤 함수가 예외를 발생시키면, 그리고 log 자체에서 이걸 처리하지 못하면 unexpected가 호출된다!(catch에는 기회조차 없다.) 

- 예외 지정 기능은 신중히 쓰자! 

## 항목 15 : 예외 처리에 드는 비용에 대해 정확히 파악하자 
- 예외 처리 비용은 무료가 아니다. 
- 예외 처리 때의 비용 
	>1. 어떤 객체가 생성 과정을 완료했는지 체크할 때 내부적으로 사용되는 자료구조에 대한 메모리 소모 
		>>+ 자료구조를 업데이트하는 데 필요한 시간 소모 -> 예외 처리가 없을 시에도 지불하는 비용이다. 
		>>+ 예외 기능 없이 컴파일하게 컴파일러 설정이 가능하다. 
		>>+ 하지만 라이브러리에서 선언한 가상 함수에 대한 사용자 재정의가 허용되지 않고, 콜백 함수 사용 불가한 등 라이브러리로 예외가 전파되지 않음을 보장하기가 어렵다. 
	>2. try 블록으로 인해 생기는 비용 -> 예외 처리시 무조건 지불한다. 
		>>+ 예외 지정 기능을 사용할 시에도 try 블록과 비슷한 양의 코드가 생성되므로 비용도 try 블록과 비슷하다. 
	>3. 예외가 발생될 때의 비용 

- 예외 : '발생될 가능성이 낮은 이벤트'가 일어났음을 가르쳐주는 데이터 
	>+ 80-20의 법치에 따라 수행 성능에 거의 영향을 미치지 않는다. 
	>+ 프로그램 처리 중 꽤 자주 발생하는 상황에서 예외 사용시 고려를 해보아야 한다. 
