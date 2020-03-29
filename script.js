const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
const countdown = document.getElementById('countdown');
const startForm = document.getElementById('start-form');
const value10 = document.getElementById('value-10');
const value25 = document.getElementById('value-25');
const value50 = document.getElementById('value-50');
const value99 = document.getElementById('value-99');
const itemContainer = document.getElementById('item-container');

const finalTimeEl = document.getElementById('final-time');
const baseTimeEl = document.getElementById('base-time');
const penaltyTimeEl = document.getElementById('penalty-time');

const playAgainBtn = document.getElementById('play-again');

let questionAmount;
let equationsArray = [];
let symbol = 'x';
let equationValue;

let correctEquation = true;
let playerGuessArray = [];

let timer;
let timePlayed = 0;
let penaltyTime = 0;
let finalTime = 0;

let valueY = 80;
let firstScroll = false;

// Displays 3, 2, 1, GO!
function countdownStart() {
    countdown.innerText = '3'; 
    setTimeout(() => { countdown.innerText = '2' }, 1000);
    setTimeout(() => { countdown.innerText = '1' }, 2000);
    setTimeout(() => { countdown.innerText = 'GO!' }, 3000);
}

// Navigate from Splash Page to CountdownPage to Game Page
function showCountdown() {
    countdownPage.style.display = 'flex';
    splashPage.style.display = 'none';
    populateGamePage();
    countdownStart();
    setTimeout(showGamePage, 4000);
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
    // Set blank space above
    itemContainer.innerHTML = '<div class="height-240"></div><div class="selected-item"></div>';
    // Randomly choose how many correct equations there should be
    correctEquations = getRandomInt(questionAmount);
    // Set amount of wrong equations
    wrongEquations = questionAmount - correctEquations;
    console.log('Correct:', correctEquations);
    // Loop through for each correct equation, multiply random numbers up to 9, push to array
    for (i = 0; i < correctEquations; i++) {
        firstNumber = getRandomInt(9);
        secondNumber = getRandomInt(9);
        equationValue = firstNumber * secondNumber;
        equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
        equationObject = { value: equation, evaluated: "true" }
        equationsArray.push(equationObject);
    }
    // Loop through for each wrong equation, mess with the equation results, push to array
    for (i = 0; i < wrongEquations; i++) {
        firstNumber = getRandomInt(9);
        secondNumber = getRandomInt(9);
        equationValue = firstNumber * secondNumber;
        wrong[0] = `${firstNumber} x ${secondNumber - 1} = ${equationValue}`;
        wrong[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
        wrong[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
        whichWrong = getRandomInt(2);
        equation = wrong[whichWrong];
        console.log('which Wrong',whichWrong);
        console.log('equation', equation);
        equationObject = { value: equation, evaluated: "false" }
        equationsArray.push(equationObject);
    }
    shuffle(equationsArray);
    console.log(equationsArray);
    // Create HTML element for each item in array
    for (i = 0; i < equationsArray.length; i++) {
        itemContainer.innerHTML += `
        <div class="item">
            <h1>${equationsArray[i].value}</h1>
        </div>`
    }
    // Set Space Below
    itemContainer.innerHTML += '<div class="height-500"></div>';
}

// Add a tenth of a second to timePlayed
function addTime() {
    timePlayed = timePlayed + .1;
    console.log(timePlayed);
    checkScore();
}

// Start timer when game page is clicked
gamePage.addEventListener('click', startTimer);
function startTimer() {
    console.log('timer start');
    timePlayed = 0;
    penaltyTime = 0;
    finalTime = 0;
    timer = setInterval(addTime, 100);
    gamePage.removeEventListener('click', startTimer);
    // Scroll first time
    itemContainer.scroll(0, valueY);
    setTimeout(() => firstScroll = true, 250);
}

// Take user selection right or wrong and add to the playerGuessArray
function select(rightOrWrong) {
    if (firstScroll == true) {
        valueY = valueY + 80;
        itemContainer.scroll(0, valueY);
    }
    switch(rightOrWrong) {
        case true:
            playerGuessArray.push('true');
            break;
        case false:
            playerGuessArray.push('false');
            break;            
    }
}

// Stop Timer, Process Results, go to Score Page
function checkScore() {
    if (playerGuessArray.length == questionAmount) {
        clearInterval(timer);
        console.log('player guesses', playerGuessArray);
        console.log(timePlayed);
        // Check for wrong guess, add penaltyTime
        equationsArray.forEach((evaluated, index) => {
            if (equationsArray[index].evaluated == playerGuessArray[index]) {
                console.log('you guessed right');
            } else {
                console.log('you guessed wrong');
                penaltyTime = penaltyTime + .5;
            }
        });
        // Format & Display Time
        finalTime = timePlayed + penaltyTime;
        finalTime = finalTime.toFixed(1);
        baseTime = timePlayed.toFixed(1);
        penaltyTime = penaltyTime.toFixed(1);
        baseTimeEl.innerText = `Base Time: ${baseTime}s`;
        penaltyTimeEl.innerText = `Penalty: +${penaltyTime}s`;
        finalTimeEl.innerText = `${finalTime}s`;
        // Scroll to Top, go to Score Page
        itemContainer.scroll(0, -5000);
        showScorePage();
        // Turn on Play Again button after delay
        setTimeout(() => playAgainBtn.style.display = 'block', 2000);
    } 
}

// Show Score Page
function showScorePage() {
    gamePage.style.display = 'none';
    scorePage.style.display = 'block';
}

// Displays Game Page
function showGamePage() {
    gamePage.style.display = 'block';
    countdownPage.style.display = 'none';
}

// Reset Game
function playAgain() {
    gamePage.addEventListener('click', startTimer);
    scorePage.style.display = 'none';
    splashPage.style.display = 'block';
    equationsArray = [];
    playerGuessArray = [];
    valueY = 80;
    playAgainBtn.style.display = 'none';
    firstScroll = false;
}

// Form that decides amount of Questions
startForm.addEventListener('submit', selectQuestion);
function selectQuestion(e) {
    e.preventDefault();
    questionAmount = getRadioVal(this, 'questions');
    console.log(questionAmount);
    showCountdown();
}

// Get the value from selected radio button
function getRadioVal(form, name) {
    let val;
    let radios = form.elements[name];
    for (i = 0; i < radios.length; i++) {
        if ( radios[i].checked ) { 
            val = radios[i].value; 
            break; 
        }
    }
    return val;
}

// Switch selected input styling
startForm.addEventListener('click', () => {
    if (value10.checked) {
        value10.parentElement.classList.add('selected-label');
        value25.parentElement.classList.remove('selected-label');
        value50.parentElement.classList.remove('selected-label');
        value99.parentElement.classList.remove('selected-label');
    } 
    if (value25.checked) {
        value25.parentElement.classList.add('selected-label');
        value10.parentElement.classList.remove('selected-label');
        value50.parentElement.classList.remove('selected-label');
        value99.parentElement.classList.remove('selected-label');
    } 
    if (value50.checked) {
        value50.parentElement.classList.add('selected-label');
        value10.parentElement.classList.remove('selected-label');
        value25.parentElement.classList.remove('selected-label');
        value99.parentElement.classList.remove('selected-label');
    }   
    if (value99.checked) {
        value99.parentElement.classList.add('selected-label');
        value10.parentElement.classList.remove('selected-label');
        value25.parentElement.classList.remove('selected-label');
        value50.parentElement.classList.remove('selected-label');
    } 
});

// Get Random Number up to a certain amount
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Shuffle an Array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
