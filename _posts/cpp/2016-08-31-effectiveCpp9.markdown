---
layout: post
title:  "[Effective C++] 항목 29 ~ 30"
date:   2016-08-31
tags: [work, cpp]
---

## 항목 29 : 예외 안전성이 확보되는 그날을 위해 싸우고 또 싸우자! 
- 예외 안전성을 확보하기 위한 두 가지 요구사항 
	>1. 자원이 새도록 만들지 않습니다. : new Image(imgSrc) 표현식에서 예외를 던지면 unlock 함수가 실행되지 않게 되어 뮤텍스가 계속 잡힌 상태가 된다.(201page)
	>2. 자료구조가 더럽혀지는 것을 허용하지 않습니다. : new Image(imgSrc)가 예외를 던지면 bgImage가 가리키는 객체가 이미 삭제되어 있고 새 그림이 깔리지 않았는데도 imageChanges변수가 증가한다. 

- 예외 안전성을 갖춘 함수는 아래의 세가지 보장 중 하나를 제공한다. 
	>1. 기본적인 보장 : 함수 동작 중 예외가 발생하면, 실행 중인 프로그램에 관련된 모든 것들을 유효한 상태로 유지한다. 모든 객체 상태는 일관성을 유지한다. 하지만 프로그램 상태 예측은 불가할 수 있다. 
	>2. 강력한 보장 : 함수 동작 중 예외가 발생하면, 프로그램 상태를 절대로 변경하지 않겠다는 보장. 호출 성공 시 마무리까지 완벽히 성공하지만 실패 시 호출이 없었던 것처럼 프로그램 상태가 되돌아간다. 
	>3. 예외 불가 보장 : 예외를 절대로 던지지 않겠다는 보장. 약속한 동작은 언제나 끝까지 완수하는 함수 
- ex) 기본 제공 타입(int, 포인터 등)에 대한 모든 연산은 예외를 던지지 않도록 되어있다. 
	>+ 어떤 예외도 던지지 않게 예외 지정이 된 함수는 예외 불가 보장을 제공한다고 생각하는 것은 잘못된 생각이다. 
- ex) int doSomething() throw(); 
	>+ 절대 예외를 던지지 않겠다는 말이 아니라 만약 예외가 발생하면 매우 심각한 에러이므로 unexpected 함수(지정되지 않은 예외 발생 시 실행되는 처리자)가 호출되어야 한다는 뜻이다. 
	>+ 함수가 어떤 특성을 갖느냐는 구현이 결정한다. 선언은 그저 선거 공약 같은 것이다. 
- 할 수 있으면 예외 불가 보장이 좋지만 현실적으로는 대부분 기본적인 보작 혹은 강력한 보장 중 한 가지를 선택하게 된다. 
- 복사 후 맞바꾸기 전략은 '객체의 상태를 전부 바꾸거나 안 바꾸거나' 방식으로 유지하려 할 때 적절하다. 그러나 함수 전체의 강력한 예외 안전성 보장은 되지 않는 것이 정설이다. 
- ex) 
```cpp
void someFunc() 
{ 
    ....  // 이 함수의 현재 상태를 사본으로 한다. 
    f1(); 
    f2();  // f1(), f2()의 예외 안전성이 강력하지 않으면 someFunc() 역시 강력한 예외 안전성을 제공하지 않는다. 
    ....  // 변경된 상태를 바꾸어 넣는다. 
} 
```
	>+ 만약 f1(), f2() 모두 강력한 예외 안전성을 보장해도 f1 후에는 값이 바뀌어 있을 것이고 f2()시 예외를 던지면 이미 상태가 변한 상태이므로 someFunc()는 강력한 예외 안전성이 아니다. 

- 대다수의 함수에 있어 무리 없는 선택을 한다면 기본적인 보장이 우선이다. 

## 항목 30 : 인라인 함수는 미주알 고주알 따져서 이해해 두자. 
- 인라인 함수
	>+ 함수처럼 보이고 / 함수처럼 동작하고 / 매크로보다 안전 
	>+ 함수 호출 시 발생하는 오버헤드 걱정이 없다. 
	>+ 컴파일러가 함수 본문에 문맥별 최적화를 걸기가 용이하다.(대체적으로 컴파일러 최적화는 함수 호출이 없는 코드가 연속적으로 이어지는 구간에 적용되도록 설계되기 때문이다.) -> 실제로 아웃라인(outline) 함수 호출은 최적화 적용이 되지 않는다. 
- 인라인 함수 아이디어 : 함수 호출문을 그 본문으로 바꿔치기하자. 
	>1. 목적 코드의 크기가 커진다
		>>+ 메모리제한 컴퓨터에선 프로그램 크기가 그 기계 허용 공간을 초과할 수 있다. 
		>>+ 성능의 걸림돌(수행성능 하락) : 페이징 횟수 증가, 명령어 캐시 적중률 하락 
	>2. 본문 길이가 굉장히 짧은 인라인 함수를 사용하면 함수 본문의 크기가 함수 호출문에 대해 만들어지는 코드보다 작아질 수 있다. 
- inline은 컴파일러에 요청하는 것으로, 명령이 아니다. 

- inline 정의 방법 
	>1. 암시적 방법
		>+ 클래스 선언에 바로 정의 
		>+ 프랜드 함수도 클래스 내부에서 정의될 수 있다. 
	>2. 명시적 방법
		>+ 함수 정의 앞에 inline 키워드를 붙인다. 

- 대부분의 빌드 환경에서 인라인을 컴파일 도중에 수행하므로 인라인 함수는 대체적으로 헤더 파일에 인라인 함수가 있어야 한다. 
	>+ 바꿔치기 할 때 컴파일러가 함수 형태를 알아야 하기 때문이다. 
- 템플릿이 사용되는 부분에서 해당 템플릿을 인스턴스로 만들려면 어떻게 생겼는지 알아야 하므로 역시 대체적으로 헤더 파일에 있는 것이 옳다. 
- 인라인 함수라도 복잡한 함수는 절대 인라인 확장의 대상이 아니다.(루프, 재귀함수 등) 
- 가상 함수 호출 같은 것도 인라인 해 주지 않는다. 
- 인라인 함수가 실제로 인라인 되는가는 빌드 환경(컴파일러)에 달려 있다. 
	>+ 인라인 실패 시 경고 메세지를 내주는 것이 보통이다. 

- 완벽한 인라인 조건이라도 인라인 되지 않는 상황 
	>1. 인라인 함수의 주소를 취하는 코드가 있을 경우 
	>2. 선언된 함수를 함수 포인터로 호출하는 경우 
		>>+ 컴파일러가 함수 포인터를 필요로 하는 경우도 생긴다. 
		>>+ ex) 어떤 배열의 원소가 객체일 때 객체 생성 소멸 시 생성자 / 소멸자의 함수 포인터를 얻는 경우(생성자 / 소멸자 inline 불가) 

- 생성자 / 소멸자는 인라인되기 좋지 않다. 
	>+ 비어있는 것처럼 보여도 최소한 자신의 데이터 멤버와 기본 클래스의 생성자 호출, 이 호출된 생성자들도 인라인 될 수 있기 때문이다. 
- 라이브러리 설계 시 inline 선언하면 바이너리 업그레이드를 제공할 수 없다. 
	>+ 업그레이드 시 컴파일을 다시 해야 한다. 인라인이 아니라면 링크만 하면 된다. 
- 대부분의 디버거가 디버깅하기 곤란해한다.(있지도 않은 함수에 중단점을 어떻게??) 
- 우선 아무것도 인라인하지 않는다. 꼭 인라인 해야 하거나 정말 단순한 함수에 한해서만 인라인한다. 
	>+ 디버깅 하고픈 부분에 디버거를 쓸 수 있게 만들고 정말 필요한 위치에 인라인을 한다.(수동 최적화) 
- 80-20의 법칙을 잊지 말자. 