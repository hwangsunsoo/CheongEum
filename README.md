## 🎯 `SpeechSynthesisUtterance`란?
`SpeechSynthesisUtterance`는 웹 브라우저에서 텍스트를 음성으로 변환하는 기능을 제공하는 Web Speech API의 핵심 인터페이스입니다.
이를 활용하면 웹 페이지에서 사용자에게 음성 피드백을 제공하거나, 접근성을 향상시키는 등 다양한 기능을 구현할 수 있습니다.
브라우저의 음성 합성 기능을 제어하는 객체로, 말할 텍스트와 음성의 속성(언어, 속도, 높낮이 등)을 설정할 수 있습니다.
이 객체를 `speechSynthesis.speak()` 메서드에 전달하면 브라우저가 해당 텍스트를 음성으로 읽어줍니다.

## 🛠️ 기본 사용법
```javascript
// 발화 객체 생성
const utterance = new SpeechSynthesisUtterance("안녕하세요!");

// 속성 설정
utterance.lang = "ko-KR"; // 언어 설정
utterance.rate = 1;       // 말하기 속도 (0.1 ~ 10)
utterance.pitch = 1;      // 음성 높낮이 (0 ~ 2)
utterance.volume = 1;     // 음량 (0 ~ 1)

// 음성 재생
window.speechSynthesis.speak(utterance);
```
이렇게 간단한 코드로도 텍스트를 음성으로 변환할 수 있습니다.

## 🎨 다양한 음성 선택
브라우저는 여러 종류의 음성을 지원합니다. `speechSynthesis.getVoices()` 메서드를 사용하면 사용 가능한 음성 목록을 확인할 수 있습니다.
```javascript
const voices = window.speechSynthesis.getVoices();
utterance.voice = voices.find(voice => voice.lang === "ko-KR");
```
이렇게 설정하면 한국어를 지원하는 음성 중 하나를 선택하여 사용할 수 있습니다.

## 📦 고급 기능
- 이벤트 핸들러: `onstart`, `onend`, `onerror` 등의 이벤트를 통해 음성 재생의 시작, 종료, 오류 등을 감지할 수 있습니다.
- 발화 큐 관리: 여러 개의 `SpeechSynthesisUtterance` 객체를 순차적으로 재생할 수 있으며, `pause()`, `resume()`, `cancel()` 메서드를 통해 재생을 제어할 수 있습니다.

## 🚧 주의사항
- 브라우저 호환: 대부분의 최신 브라우저에서 지원되지만, 일부 브라우저나 플랫폼에서는 제한적일 수 있습니다.
- 사용자 상호작용 필요: 일부 브라우저에서는 자동으로 음성을 재생하지 않고, 사용자와의 상호작용(예: 버튼 클릭)이 있어야 음성이 재생됩니다.
- 음성 목록 로딩 지연: `getVoices()` 메서드가 음성 목록을 즉시 반환하지 않을 수 있으므로, `voiceschanged` 이벤트를 사용하여 음성 목록이 로드된 후에 처리하는 것이 좋습니다.

## 💡 활용 예시
- 웹 기반 스크린리더: 시각 장애인을 위한 웹 콘텐츠 음성 안내 시스템 구현
- 교육용 콘텐츠: 외국어 학습 사이트에서 발음 연습기능 제공
- 알림 시스템: 실시간 알림을 음성으로 전달하여 사용자의 주의를 끌기

`SpeechSynthesisUtterance`를 활용하면 웹 애플리케이션에 음성 기능을 손쉽게 통합할 수 있습니다.
이를 통해 사용자 경험을 향상시키고, 다양한 접근성 기능을 구현할 수 있습니다.