const start = document.querySelector('.start');
const reset = document.querySelector('.reset');
const wordDisplay = document.querySelector('.word-display');
const wordInput = document.querySelector('.word-input');
const score = document.querySelector('.score');
const time = document.querySelector('.time');
let timeInterval;

start.addEventListener('click', () => {
        start.style.display = "none";
        reset.style.display = "block";
})

reset.addEventListener('click', () => {
    wordDisplay.innerText = "";
    wordInput.value = "";
    start.style.display = "block";
    reset.style.display = "none";
    score.innerText = 0;
    time.innerText = 0;
    clearInterval(timeInterval);
})

fetch("https://random-word-api.herokuapp.com/word?number=50")
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        // Loading bar
const DEFAULT_TIME = 10;
let wordList = result;
let count = 0;
let time_left = DEFAULT_TIME;

wordDisplay.innerText = wordList[0];
time.innerText = DEFAULT_TIME;

// When user type word (count score & time reset)
wordInput.addEventListener("keydown", () =>{
    if (event.code === "Enter" ) {
        if (wordInput.value === wordDisplay.innerText){
            count++; 
            if (count === wordList.length) {
                wordInput.disabled = true;
                alert("Game Over");
                wordInput.value = "";
                clearInterval(timeInterval);
                return false;
            }
            wordDisplay.innerText = wordList[count];
            wordInput.value = ""; 
            score.innerText = count;
            time.innerText = DEFAULT_TIME;
            time_left = DEFAULT_TIME;
        } else {
            alert("Try Again");
        }
    }
});

// Set Timer setInterval(function, seconds)
 timeInterval = setInterval( () => {
    time_left--;
    time.innerHTML = time_left;
    if (time_left === 0) {
        clearInterval(timeInterval); // stop when 0 second
    }
}, 1000)
    })





