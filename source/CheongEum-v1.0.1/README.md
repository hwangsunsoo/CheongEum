# CheongEum.js 코드 분석

## 개요
이 코드는 웹 접근성을 향상시키기 위한 '청음(CheongEum)' 기능을 구현한 JavaScript 파일입니다. 주로 시각 장애인이나 접근성 지원이 필요한 사용자를 위해 웹 페이지의 요소들을 음성으로 읽어주는 기능을 제공합니다.

## 주요 기능

### 1. UDL 모드 확인
```javascript
const urlParams = new URLSearchParams(window.location.search);
const typeParam = urlParams.get('type');

if (typeParam === 'udl') {
    // 접근성 기능 활성화
}
```
- URL에서 `type=udl` 파라미터가 있는 경우에만 접근성 기능이 활성화됩니다.
- UDL은 아마도 "Universal Design for Learning"의 약자로 추정됩니다.

### 2. 초기화 함수 (chungEumInit)
웹 페이지가 로드된 후 실행되며 다음과 같은 기능을 설정합니다:

#### 2.1 포커스 가능한 요소 처리
```javascript
const focusElements = document.querySelectorAll('[tabindex], a, button, input, select, textarea');

focusElements.forEach(element => {
    element.addEventListener('focus', function() {
        // 요소 내용 읽기
    });
});
```
- 키보드로 탐색 가능한 모든 요소(링크, 버튼, 입력창 등)에 포커스 이벤트 리스너를 추가합니다.
- 요소에 포커스가 갈 때 해당 요소의 내용을 음성으로 읽어줍니다.

#### 2.2 요소 내용 읽기 함수
```javascript
function speakElementContent(element) {
    const ariaLabel = element.getAttribute('aria-label');
    let elementText = ariaLabel || element.textContent.trim();
    
    // 요소 유형에 따라 접두사 추가
    if (element.tagName.toLowerCase() === 'a') {
        elementText = '링크: ' + elementText;
    }
    // ...
    
    if (elementText) {
        chungEum(elementText);
    }
}
```
- 요소의 `aria-label` 속성이나 텍스트 내용을 읽습니다.
- 요소 유형에 따라 '링크:', '버튼:', '입력창:' 등의 접두사를 추가합니다.

#### 2.3 이미지 처리
```javascript
function speakImageAlt(image) {
    const altText = image.getAttribute('alt');
    if (altText && altText.trim()) {
        chungEum(altText);
    }
}
```
- 이미지의 대체 텍스트(alt 속성)를 음성으로 읽어줍니다.

#### 2.4 키보드 입력 처리
```javascript
const inputElements = document.querySelectorAll('input, textarea');

inputElements.forEach(element => {
    element.addEventListener('keydown', function(event) {
        const keyValue = event.key;
        let keyName = getKeyNameInKorean(keyValue);
        chungEum(keyName);
    });
});
```
- 입력 요소에서 키보드 입력이 발생할 때마다 입력된 키를 한글로 읽어줍니다.

#### 2.5 키 이름 한글 변환
```javascript
function getKeyNameInKorean(key) {
    const keyMap = {
        'Enter': '엔터',
        'Escape': '이스케이프',
        // ...
    };
    
    return keyMap[key] || key;
}
```
- 특수 키와 기호들을 한글 이름으로 변환합니다.

#### 2.6 Swiper 버튼 처리
```javascript
const swiperButtons = document.querySelectorAll('.swiper-button-prev, .swiper-button-next');

swiperButtons.forEach(button => {
    if (button.classList.contains('swiper-button-prev')) {
        button.removeAttribute('aria-label');
        button.setAttribute('aria-label', '이전 슬라이드');
    } else if (button.classList.contains('swiper-button-next')) {
        button.removeAttribute('aria-label');
        button.setAttribute('aria-label', '다음 슬라이드');
    }
});
```
- Swiper 슬라이더의 네비게이션 버튼에 한글 aria-label을 설정합니다.

### 3. 음성 출력 함수 (chungEum)
```javascript
function chungEum(text, lang = 'ko-KR', rate = 1.5) {
    if (typeParam === 'udl') {
        if (!('speechSynthesis' in window)) {
            console.log('이 브라우저는 음성 합성을 지원하지 않습니다.');
            return;
        }
        
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = lang;
        speech.rate = rate;
        window.speechSynthesis.speak(speech);
    }
}
```
- Web Speech API를 사용하여 텍스트를 음성으로 변환합니다.
- 기본 언어는 한국어(ko-KR)이며, 기본 속도는 1.5입니다.
- UDL 모드가 활성화된 경우에만 작동합니다.

## 요약
이 코드는 웹 접근성을 향상시키기 위한 음성 지원 기능을 구현하고 있습니다. URL 파라미터로 `type=udl`이 지정된 경우에만 활성화되며, 키보드 탐색 시 요소의 내용을 읽어주고, 입력 요소에서는 키보드 입력을 음성으로 안내해 줍니다. Web Speech API를 활용하여 텍스트를 음성으로 변환하는 기능을 제공합니다.
