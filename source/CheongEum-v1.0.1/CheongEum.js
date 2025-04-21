// URL에서 쿼리 파라미터 확인하기
// URLSearchParams 객체를 사용하여 현재 URL의 쿼리 문자열을 파싱합니다.
const urlParams = new URLSearchParams(window.location.search);
// 'type' 파라미터의 값을 가져옵니다.
const typeParam = urlParams.get('type');

// type=udl인 경우에만 실행
// UDL 모드가 활성화된 경우에만 접근성 기능을 실행합니다.
if (typeParam === 'udl') {

	// 웹 페이지가 로드된 후 실행
	// DOMContentLoaded 이벤트는 HTML 문서가 완전히 로드되고 파싱되었을 때 발생합니다.
	document.addEventListener('DOMContentLoaded', function() {
		chungEumInit();
	});

	// 청음 기능 초기화 함수
	function chungEumInit() {
		// 키보드 포커스 가능한 모든 요소 선택
		// tabindex 속성이 있는 요소와 기본적으로 포커스 가능한 a, button, input 요소를 모두 선택합니다.
		const focusElements = document.querySelectorAll('[tabindex], a, button, input, select, textarea');
		
		// 각 요소에 포커스 이벤트 리스너 추가
		// 키보드 탐색 시 요소에 포커스가 갈 때 텍스트를 읽어줍니다.
		focusElements.forEach(element => {
			// 포커스 이벤트 리스너
			element.addEventListener('focus', function() {
				// 요소가 이미지인 경우 alt 텍스트 읽기
				if (this.tagName.toLowerCase() === 'img') {
					speakImageAlt(this);
				} else {
					speakElementContent(this);
				}
			});
		});

		// 요소 내용을 음성으로 읽어주는 함수
		function speakElementContent(element) {
			// aria-label이 있으면 해당 내용 사용, 없으면 텍스트 내용 사용
			const ariaLabel = element.getAttribute('aria-label');
			let elementText = ariaLabel || element.textContent.trim();
			
			// 요소 유형에 따라 접두사 추가
			if (element.tagName.toLowerCase() === 'a') {
				elementText = '링크: ' + elementText;
			} else if (element.tagName.toLowerCase() === 'button') {
				elementText = '버튼: ' + elementText;
			} else if (element.tagName.toLowerCase() === 'input') {
				elementText = '입력창: ' + elementText;
			} else if (element.tagName.toLowerCase() === 'select') {
				elementText = '콤보박스: ' + elementText;
			}
			
			// 텍스트가 있는 경우에만 음성 출력
			if (elementText) {
				chungEum(elementText);
			}
		}
		
		// 이미지 alt 텍스트를 음성으로 읽어주는 함수
		function speakImageAlt(image) {
			// alt 텍스트가 있는 경우에만 음성 출력
			// 이미지의 alt 속성 값을 가져옵니다.
			const altText = image.getAttribute('alt');
			// alt 텍스트가 존재하고 비어있지 않은 경우에만 음성으로 읽어줍니다.
			if (altText && altText.trim()) {
				chungEum(altText);
			}
		}
		
		// 모든 입력 요소 선택
		// 페이지 내의 모든 input과 textarea 요소를 선택합니다.
		const inputElements = document.querySelectorAll('input, textarea');
		
		// 각 요소에 키보드 입력 이벤트 리스너 추가
		// 키보드로 입력할 때마다 입력된 문자를 음성으로 읽어줍니다.
		inputElements.forEach(element => {
			element.addEventListener('keydown', function(event) {
				// 입력된 키 값 가져오기
				const keyValue = event.key;
				
				// 특수기호 및 키 이름을 한글로 변환
				let keyName = getKeyNameInKorean(keyValue);
				
				// 변환된 키 이름 읽기
				chungEum(keyName);
			});
		});
		
		// 키 이름을 한글로 변환하는 함수
		function getKeyNameInKorean(key) {
			// 특수 키에 대한 매핑
			const keyMap = {
				'Enter': '엔터',
				'Escape': '이스케이프',
				'Backspace': '백스페이스',
				'Tab': '탭',
				'Delete': '삭제',
				'ArrowLeft': '왼쪽 화살표',
				'ArrowRight': '오른쪽 화살표',
				'ArrowUp': '위쪽 화살표',
				'ArrowDown': '아래쪽 화살표',
				'Home': '홈',
				'End': '엔드',
				'PageUp': '페이지 업',
				'PageDown': '페이지 다운',
				'CapsLock': '캡스 락',
				'Control': '컨트롤',
				'Alt': '알트',
				'Shift': '시프트',
				' ': '스페이스',
				'!': '느낌표',
				'@': '골뱅이',
				'#': '샵',
				'$': '달러',
				'%': '퍼센트',
				'^': '캐럿',
				'&': '앰퍼샌드',
				'*': '별표',
				'(': '왼쪽 괄호',
				')': '오른쪽 괄호',
				'-': '마이너스',
				'_': '언더스코어',
				'+': '플러스',
				'=': '등호',
				'{': '왼쪽 중괄호',
				'}': '오른쪽 중괄호',
				'[': '왼쪽 대괄호',
				']': '오른쪽 대괄호',
				'|': '파이프',
				'\\': '백슬래시',
				';': '세미콜론',
				':': '콜론',
				'\'': '작은따옴표',
				'"': '큰따옴표',
				',': '쉼표',
				'.': '마침표',
				'<': '작다',
				'>': '크다',
				'/': '슬래시',
				'?': '물음표'
			};
			
			// 매핑된 이름이 있으면 사용, 없으면 원래 키 값 사용
			return keyMap[key] || key;
		}

		// Swiper 버튼 처리
		// Swiper 네비게이션 버튼을 선택합니다
		const swiperButtons = document.querySelectorAll('.swiper-button-prev, .swiper-button-next');
		
		// 각 Swiper 버튼에 포커스 이벤트 리스너 추가
		swiperButtons.forEach(button => {
			// 기존 aria-label 제거 및 한국어 aria-label 설정
			if (button.classList.contains('swiper-button-prev')) {
				button.removeAttribute('aria-label');
				button.setAttribute('aria-label', '이전 슬라이드');
			} else if (button.classList.contains('swiper-button-next')) {
				button.removeAttribute('aria-label');
				button.setAttribute('aria-label', '다음 슬라이드');
			}
		});

	} // chungEumInit

} // if (typeParam === 'udl')

/**
 * 텍스트를 음성으로 읽어주는 함수
 * @param {string} text - 읽을 텍스트
 * @param {string} lang - 언어 설정 (기본값: 한국어)
 * @param {number} rate - 음성 속도 (기본값: 1, 범위: 0.1-10)
 */
function chungEum(text, lang = 'ko-KR', rate = 1.5) {

	// type=udl인 경우에만 실행
	// UDL 모드가 활성화된 경우에만 접근성 기능을 실행합니다.
	if (typeParam === 'udl') {
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
		
		// 음성 속도 설정
		// 음성의 속도를 설정합니다. 1이 기본 속도이며, 값이 클수록 빠르게 읽습니다.
		speech.rate = rate;

		// 음성 출력
		// speechSynthesis.speak() 메서드를 호출하여 텍스트를 음성으로 출력합니다.
		window.speechSynthesis.speak(speech);
	} // if (typeParam === 'udl')

} // chungEum