---
layout: post
title:  "[Effective C++] 항목 27 ~ 28"
date:   2016-08-30
tags: [work, cpp]
---

## 항목 27 : 캐스팅은 절약, 또 절약! 잊지 말자 
- '어떤 일이 있어도 타입 에러가 생기지 않도록 보장한다' : c++의 동작 규칙 
- 캐스트는 이 타입 시스템을 무시할 수 있다.(그러므로 문제가 발생한다.) 

- c 스타일 캐스트 
	>1. (T)표현식 
	>2. T(표현식) 
- c++ 스타일 캐스트 
	>1. const_cast<T>(표현식) : 객체의 상수성을 없애는 용도 
	>2. dynamic_cast<T>(표현식) : 안전한 다운 캐스팅 시 사용하는 연산자. 주어진 객체가 어떤 클래스 상속 계통에 속한 특정 타입인지 아닌지 결정하는 작업에 쓰임. 구형 스타일 캐스트 문법으로는 흉내도 불가. / 런타임 비용이 신경 쓰일 정도로 높은 캐스트 연산자. 
	>3. reinterpret_cast<T>(표현식) : 포인터를 int로 바꾸는 등 하부 수준 캐스팅을 위한 연산자. 구현 환경에 의존적(이식성이 없다.) 그러므로 하부 수준 코드 이외엔 거의 없어야 한다. 
	>4. static_cast<T>(표현식) : 암시적 변환을 강제로 진행할 때, 타입 변환을 거꾸로 수행할 때(비상수 객체 -> 상수 객체, int -> double 등), (void* -> 일반 타입 포인터 등) 쓰인다. 

- c++ 스타일 캐스트를 쓰는 게 바람직한 이유 
	>1. 코드를 읽을 때 알아보기 쉽다. 
	>2. 캐스트 사용 목적을 더 좁혀서 지정하므로 컴파일러 쪽에서 사용 에러 진단이 가능하다. 

- 타입 변환으로 인해 런타임에 실행되는 코드가 만들어지는 경우가 적지 않다. 
	>+ 객체 하나가 가질 수 있는 주소가 오직 한 개가 아니라 그 이상이 될 수 있다.(c++에서만 가능한 상황) 
	>+ ex) 
	```cpp
	Derived d; 
	Base *pb = &d; 
	// 두 포인터의 값이 같지 않을 때가 생긴다. 
	```
	>+ 캐스팅이 들어가면 보기엔 맞는 것 같지만 실제론 틀린 코드를 모르는 경우가 발생한다. 
	>+ ex) 
	```cpp
	class SpecialWindow : public Window 
	{ 
	public: 
	    virtual void onResize() 
	    { 
	        static_cast<Window>(*this).onResize(); 
	        .... 
	    } 
	}; 
	```
	>+ onResize 호출이 일어나는 객체가 현재의 객체가 아니다. 
	>+ 캐스팅이 일어나며 *this의 기본 클래스 부분에 대한 사본이 생기는데 그 사본의 onResize를 호출하므로 미정의 동작을 발생시킨다. 
	>+ 수정 
	>+ ex)
	```cpp 
	class SpecialWindow : public Window 
	{ 
	public: 
	    virtual void onResize() 
	    { 
	        Window::onResize(); 
	        .... 
	    } 
	}; 
	```

- 캐스트 연산자가 입맛 당기는 상황이라면 뭔가가 꼬여가는 징조이다. 
- 수행 성능에 사활이 걸린 코드라면 dynamic_cast에 주의를 놓지 말 것! 
- 파생 클래스 객체임이 분명한 객체에게서 파생 클래스 함수를 호출하고 싶은데 그 객체 조작 수단이 기본 클래스의 포인터(혹은 참조자)뿐일 경우! 이 문제를 피하는 일반적인 두 가지 방법 
	>1. 파생 클래스 객체에 대한 포인터를 객체에 담아서 각 객체를 기본 클래스 인터페이스를 통해 조작할 필요를 없앤다. 
		>>+ 이 경우 기본 클래스에서 파생될 수 있는 모든 객체에 대한 포인터를 같은 컨테이너에 저장하지 못하므로 타입 안전성을 갖춘 컨테이너가 여러 개 필요하다. 
	>2. 원하는 조작을 가상 함수 집합으로 정리해서 기본 클래스에 넣어둔다. 
		>>+ 아무것도 안하는 기본 가상 함수를 기본 클래스에서 제공한다. 

- 폭포식 dynamic_cast는 반드시 피할 것! 
	>+ ex) 
	```cpp
	typedef std::vector<std::tr1::shared_ptr<Window>> VPW; 
	VPW winPtrs; 
	... 
	for(VPW::iterator iter = winPtrs.begin() ; iter != winPtrs.end() ; ++iter) 
	{ 
	    if (SpecialWindow1 *psw1 = dynamic_cast<SpecialWindow1*>(iter->get())) 
	    {.....} 
	    else if (SpecialWindow2 *psw2 = dynamic_cast<SpecialWindow2*>(iter->get())) 
	    {.....} 
	    .... 
	} 
	```
	>+ 크기만 하고 아름답지 않으며 속도도 둔하고 망가지기 쉽다. 
	>+ 파생 클래스가 추가될 때마다 조건 분기문을 추가해야 한다. 

## 항목 28 : 내부에서 사용하는 객체에 대한 '핸들'을 반환하는 코드는 되도록 피하자. 
- ex) 
```cpp
class Rectangle 
{ 
public: 
    .... 
    Point& upperLeft() const 
    { 
        return pData->ulhc; 
    } 
    Point& lowerRight() const 
    { 
        return pData->lrhc; 
    } 
    .... 
} 
```
	>+ 상수 멤버 함수지만 반환되는 참조자로 인해 내부값을 마음대로 수정할 수 있다. 
	>1. 클래스 데이터 멤버는 아무리 숨겨 봤자 그 멤버의 참조자를 반환하는 함수들의 최대 접근도에 따라 캡슐화 정도가 정해진다. 
	>2. 어떤 객체에서 호출한 상수 멤버 함수의 참조자 반환 값의 실제 데이터가 그 객체의 바깥에 저장되어 있다면 이 함수의 호출부에서 그 데이터의 수정이 가능하다.(비트 수준 상수성의 한계가 가진 부수적 성질) 

- 핸들(다른 객체가 손을 댈 수 있게 하는 매개자) : 참조자, 포인터, 반복자 
- 어떤 객체의 내부 요소(internals) : 데이터 멤버, 일반적 수단을 ㅗ접근이 불가능한 멤버 함수(protected 또는 private 멤버 함수) 
- 외부 공개가 되면 안되는 멤버 함수의 포인터를 반환하는 멤버 함수는 절대 만들지 말자!!!! 
- 위 예제는 다음으로 해결이 가능하다. 
- ex) 
```cpp
const Point& upperLeft() const 
{ 
    return pData->ulhc; 
} 
const Point& lowerRight() const 
{ 
    return pData->lrhc; 
} 
```
- 무효 참조 핸들 : 핸들이 있지만 핸들의 실제 객체 데이터가 없는 경우 
- ex) 
```cpp
GUIObject *pgo; 
.... 
const Point* pUpperLeft = &(boundingBox(*pgo).upperLeft()); 
```
	>+ boundingBox를 통해 임시 객체 생성 
	>+ 이 문장이 끝날 무렵 임시 객체가 소멸하지만 pUpperLeft는 소멸된 객체의 주소값을 가지고 있다. 