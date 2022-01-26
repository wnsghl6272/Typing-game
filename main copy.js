const DEFAULT_TIME = 9;
let score = 0;
let time = DEFAULT_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;
const random = Math.floor(Math.random() * words.length);

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const button = document.querySelector('.startButton');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');

init();

function init() {
    buttonChange('Loading...');
    getWords();
    wordInput.addEventListener('input', checkMatch);
    wordInput.disabled = true;
}

function run() {
    if(isPlaying) {
        return;
    }
    wordInput.value = "";
    isPlaying = true;
    time = DEFAULT_TIME;
    wordInput.focus();
    score = 0;
    scoreDisplay.innerText = score;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('Playing...');
    wordInput.disabled = false;
    wordDisplay.innerText = words[random];
}

function checkStatus() {
    if(!isPlaying && time === 0) {
        buttonChange('Game Start');
        clearInterval(checkInterval);
        wordInput.disabled = true;
    }
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
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}

function getWords() {
    fetch("https://random-word-api.herokuapp.com/word?number=50")
    .then((response) => response.json())
    .then(response => {
        words = response;
        buttonChange('Game Start');
    });

    // response.forEach((word) => {
    //     if(word.length < 10) {
    //         words.push(word);
    //     }
    // })
    
    // axios.get('https://random-word-api.herokuapp.com/word?number=50')
    // .then(function (response) {
    //     // handle success

    //     response.data.forEach((word) => {
    //         if(word.length < 10){
    //             words.push(word);
    //         }
    //     })

    //     buttonChange('Game Start');
    // })
    // .catch(function (error) {
    //     // handle error
    //     console.log(error);
    // })
    // .then(function () {
    //     // always executed
    // });
}

function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying) {
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.innerText = text;
    text == 'Game Start' ? button.classList.remove('loading') : button.classList.add('loading');
}



