
const DEFAULT_TIME = 9;
let score = 0;
let time = DEFAULT_TIME;
let isPlaying = false;
let timeInterval;
let words = []; // 배열
let checkInterval;
let random = Math.floor(Math.random() * words.length); 
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.startButton');

init();

function init() {
    buttonChange('Loading...')
    getWords() // init이되면 단어를 불러오고
    wordInput.addEventListener('input', checkMatch) // 단어가 일치하는지 체크시작
    wordInput.disabled = true;
}

// 버튼이 클릭될때 시작 가능하게
function run() { // onclick 사용
    if(isPlaying) {
        return;
    }
    wordInput.disabled = false;
    wordInput.value = "";
    score = 0;
    isPlaying = true; // 실행중이 false가 기본값이라 실행시 true로 변경
    time = DEFAULT_TIME; // 정지되고 다시 시작할때 시간 리셋
    // countDown 함수를 1초마다 계속 실행시켜주는 interval
    wordInput.focus(); // 실행이되면 input으로 이동
    scoreDisplay.innerText = score;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50); // 짧은시간동안 겜실행중인지 계속 체크
    buttonChange('Playing...');
    wordDisplay.innerText = words[random];
}

function checkStatus() { //게임이 실행중인지 아닌지 확인을 하는 메서드
    if(!isPlaying && time === 0) {
        buttonChange('Game Start');
        clearInterval(checkInterval);
        wordInput.disabled = true;
    }
}

function getWords() { // 단어 불러오기
    axios.get('https://random-word-api.herokuapp.com/word?number=50')
        .then(function (response) {
            // handle success

            response.data.forEach((word) => {
                if(word.length < 10){
                    words.push(word);
                }
            })

            buttonChange('Game Start');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function checkMatch() {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = "";
        if(!isPlaying) {
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = DEFAULT_TIME;
        // 단어 인덱스 길이만큼 곱하면 그안에서 랜덤활성 + Math.floor사용하여 소수점 차단
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}

// 버튼을 눌렀을때 시간이 시작되는 기능 (초당 감소)
function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval)
    } // 지금 timeInterval이 계속 돌기 때문에 정지 시켜야한다.
    timeDisplay.innerText = time;
}

// 버튼이 바뀌면서 시작가능하게
function buttonChange(text) {
    button.innerText = text;
    text === 'Game Start' ? button.classList.remove('loading') : button.classList.add('loading');
}
