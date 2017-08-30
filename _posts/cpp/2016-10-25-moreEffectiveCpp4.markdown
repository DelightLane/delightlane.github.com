---
layout: post
title:  "[More Effective C++] 항목 9 ~ 10"
date:   2016-10-25
tags: [work, cpp]
---

## 항목 9 : 리소스 누수를 피하는 방법의 정공은 소멸자이다. 
- 지역 리소스(스택에서 생긴 리소스)를 조작하는 데에는 포인터를 피하자. 
	>+ 리소스 누수를 막기 위해서는 try-catch 등의 이유로 코드가 복잡해진다. 
	>+ 마무리 코드를 소멸자로 옮기면 '어떤 요인이든 함수가 종료되면 저절로 없어지는' 지역 객체의 특성으로 인해 성가신 일이 필요 없어진다.(ex 스마트 포인터) 
- 동적 할당 리소스는 객체로 포장하라!

## 항목 10 : 생성자에서는 리소스 누수가 일어나지 않게 하자.
- C++는 생성 과정의 완료된 객체만을 안전하게 소멸시킨다. 
	>+ 생성자가 실행을 마치기 전에는 생성 작업이 완료된 걸로 간주되지 않는다. 
- 생성 과정을 끝내지 못한 객체의 소멸자 동작에는 오버헤드가 필요하다. 
	>+ C++는 오버헤드를 피하고 생성 중 중단된 객체가 자동으로 소멸되지 않는 것에 대한 부담을 프로그래머가 지게 만든다. 
- 즉 사용자가 직접 생성자를 설계해야 한다. 
- 그 방법은? 
	>1. 가능한 모든 예외를 받고 마무리 코드를 실행한 후 받은 예외를 다시 발생시켜 전파시킨다. 
		>>+ ex)
		```cpp
		BookEntry::BookEntry(const string& name, const string& address, const string& imageFileName, const string& audioClipFileName) 
		: theName(name), theAddress(address), theImage(0), theAudioClip(0) 
		{ 
    		try 
    		{ 
		        if(imageFileName != "") 
		        { 
		            theImage = new Image(imageFileName); 
		        } 
		        if(audioClipFileName != "") 
		        { 
		            thisAudioClip = new AudioClip(audioClipFileName); 
		        } 
		    } 
		    catch(...) // 모든 예외를 받음 
		    { 
		        delete theImage; 
		        delete theAudioClip;  // 필요한 마무리 동작을 취한다. 
		        throw; // 받은 예외를 다시 전파 
		    } 
		}
		```
		>>+ 데이터 멤버 중 포인터가 아닌 것은 클래스 생성자 호출 전 초기화리스트에서 이미 초기화가 이루어지므로 생성 상태이다.(클래스 생성자 실행시) 그러므로 이들은 BookEntry 객체 소멸 시 자동으로 소멸한다. 
		>>+ 이들 데이터 멤버 생성자에서의 예외는 데이터 멤버 클래스 관할이므로 여기서 처리할 필요가 없다.
		>>+ catch 블록 문장이 BookEntry 소멸자와 코드 중복이므로 보조 함수로 분리가 가능하다.
	>2. 힙 생성 객체가 들어갈 포인터(theImage, theAudioClip)를 상수 포인터로 선언한다. 
		>>+ ex)
		```cpp
		class BookEntry 
		{ 
		public: 
		.... 
		private: 
		.... 
		    Image* const theImage; 
		    AudioClip* const theAudioClip; // 포인터가 상수가 된다. 
		}; 
		```
		>>+ 포인터 상수에 값을 줄 방법이 달리 없기 때문에 초기화 리스트를 통해 초기화 되어야 한다. 
		>>+ 하지만 : theImage(imageFileName != "" ? new Image(imageFileName) : 0), 식으로 하면 절대 예외 발생 시 소멸되지 않는다. try/chatch 문도 문장이므로 초기화 리스트에 넣을 수 없다.(표현식만 받아들일 수 있다.) 
		>>+ 초기화되는 포인터값을 반환하는 private 정적 멤버 함수를 만들고 그 내부에 try/catch문을 넣는다. 
		>>+ 깔끔하지만 개념상 생성자가 있어야 할 코드가 쪼개져 있으므로 유지보수시 머리가 아프다. 
	>.3 포인터 객체를 지역객체로 관리하는 리소스로 취급한다.(즉, 스마트 포인터를 사용한다.) 
		>>+ex) 
		```cpp
		private: 
		.... 
		    const auto_ptr<Image> theImage; 
		    const auto_ptr<AudioClip> theAudioCli; 
		```
		>>+ 메모리 누수도 일으키지 않고, 멤버 초기화 리스트를 통해 초기화가 가능해진다. 
		>>+ 즉, : theImage(imageFileName != "" ? new Image(imageFileName) : 0), 가 가능해진다.! 
		>>+ 예외가 발생하더라도 생성 완료된 객체이므로 자동으로 소멸된다. 
		>>+ '객체'이므로 BookEntry 객체 소멸 시 자동으로 소멸한다. 즉 손으로 삭제해줄 필요가 없어진다. 