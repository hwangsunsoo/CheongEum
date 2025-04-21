// 웹 페이지가 로드된 후 실행
// DOMContentLoaded 이벤트는 HTML 문서가 완전히 로드되고 파싱되었을 때 발생합니다.
document.addEventListener('DOMContentLoaded', function() {

	// URL에서 쿼리 파라미터 확인하기
	// URLSearchParams 객체를 사용하여 현재 URL의 쿼리 문자열을 파싱합니다.
	const urlParams = new URLSearchParams(window.location.search);
	// 'type' 파라미터의 값을 가져옵니다.
	const typeParam = urlParams.get('type');

	// type=udl인 경우에만 실행
	// UDL 모드가 활성화된 경우에만 접근성 기능을 실행합니다.
	if (typeParam === 'udl') {

		// 이미지 요소에 마우스오버 이벤트 리스너 추가
		// 페이지 내의 모든 이미지 요소를 선택합니다.
		const images = document.querySelectorAll('img');
		
		// 각 이미지에 마우스오버 이벤트 리스너를 추가합니다.
		images.forEach(image => {
			image.addEventListener('mouseover', function() {
				// alt 텍스트가 있는 경우에만 음성 출력
				// 이미지의 alt 속성 값을 가져옵니다.
				const altText = this.getAttribute('alt');
				// alt 텍스트가 존재하고 비어있지 않은 경우에만 음성으로 읽어줍니다.
				if (altText && altText.trim()) {
					chungEumScreenReaderSpeakText(altText);
				}
			});
		});
		
		// udl-hover 클래스를 가진 모든 요소 선택
		// 'udl-hover' 클래스가 적용된 모든 요소를 선택합니다.
		const hoverElements = document.querySelectorAll('.udl-hover');
		
		// 각 요소에 마우스오버 이벤트 리스너 추가
		hoverElements.forEach(element => {
			element.addEventListener('mouseover', function() {
				// aria-label이 있으면 해당 내용 사용, 없으면 텍스트 내용 사용
				// 접근성을 위한 aria-label 속성을 우선적으로 사용합니다.
				const ariaLabel = this.getAttribute('aria-label');
				// aria-label이 없으면 요소의 텍스트 내용을 사용합니다.
				const elementText = ariaLabel || this.textContent.trim();
				
				// 텍스트가 있는 경우에만 음성 출력
				if (elementText) {
					chungEumScreenReaderSpeakText(elementText);
				}
			});
		});
		
		// udl-focus 클래스를 가진 모든 요소 선택
		// 'udl-focus' 클래스가 적용된 모든 요소를 선택합니다.
		const focusElements = document.querySelectorAll('.udl-focus');
		
		// 각 요소에 포커스 이벤트 리스너 추가
		// 키보드 탐색 시 요소에 포커스가 갈 때 텍스트를 읽어줍니다.
		focusElements.forEach(element => {
			element.addEventListener('focus', function() {
				// aria-label이 있으면 해당 내용 사용, 없으면 텍스트 내용 사용
				const ariaLabel = this.getAttribute('aria-label');
				const elementText = ariaLabel || this.textContent.trim();
				
				// 텍스트가 있는 경우에만 음성 출력
				if (elementText) {
					chungEumScreenReaderSpeakText(elementText);
				}
			});
		});
		
		// udl-input 클래스를 가진 모든 요소 선택
		// 'udl-input' 클래스가 적용된 모든 입력 요소를 선택합니다.
		const inputElements = document.querySelectorAll('.udl-input');
		
		// 각 요소에 키보드 입력 이벤트 리스너 추가
		// 키보드로 입력할 때마다 입력된 문자를 음성으로 읽어줍니다.
		inputElements.forEach(element => {
			element.addEventListener('keyup', function(event) {
				// 입력된 키 값 가져오기
				// event.key는 사용자가 누른 키의 값을 나타냅니다.
				const keyValue = event.key;
				
				// 특수 키가 아닌 경우에만 음성 출력
				// 일반 문자 키인 경우 (길이가 1인 경우)에만 음성으로 읽어줍니다.
				if (keyValue.length === 1) {
					chungEumScreenReaderSpeakText(keyValue);
				} else if (keyValue === 'Enter') {
					// Enter 키 입력 시 전체 입력 내용 읽기
					// 입력 완료 시 전체 내용을 읽어줍니다.
					const fullText = this.value || this.textContent;
					if (fullText.trim()) {
						chungEumScreenReaderSpeakText(fullText.trim());
					}
				}
			});
		});
		
	}

});

/**
 * 텍스트를 음성으로 읽어주는 함수
 * @param {string} text - 읽을 텍스트
 * @param {string} lang - 언어 설정 (기본값: 한국어)
 */
function chungEumScreenReaderSpeakText(text, lang = 'ko-KR') {
	// Web Speech API 지원 여부 확인
	// 브라우저가 Web Speech API를 지원하는지 확인합니다.
	if (!('speechSynthesis' in window)) {
		console.log('이 브라우저는 음성 합성을 지원하지 않습니다.');
		return;
	}
	
	// Web Speech API를 사용하여 텍스트를 음성으로 변환
	// SpeechSynthesisUtterance 객체는 음성 합성 서비스가 읽을 텍스트를 나타냅니다.
	const speech = new SpeechSynthesisUtterance(text);

	// 언어 설정
	// 음성 합성에 사용할 언어를 설정합니다. 기본값은 한국어(ko-KR)입니다.
	speech.lang = lang;

	// 음성 출력
	// speechSynthesis.speak() 메서드를 호출하여 텍스트를 음성으로 출력합니다.
	window.speechSynthesis.speak(speech);
}
