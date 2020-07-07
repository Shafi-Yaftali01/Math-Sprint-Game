// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const value10 = document.getElementById('value-10');
const value25 = document.getElementById('value-25');
const value50 = document.getElementById('value-50');
const value99 = document.getElementById('value-99');
// Best Score Page
const bestScores = document.querySelectorAll('.best-score-value');
const itemContainer = document.getElementById('item-container');
// Final Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];
let equationValue;
let playerGuessArray = [];
let bestScoreArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';

// Scroll
let valueY = 80;
let firstScroll = false;

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

// Refresh Splash Page Best Scores
function refreshBestScore() {
  bestScores.forEach((bestScore, index) => {
    const bestScoreEl = bestScore;
    bestScoreEl.textContent = `${bestScoreArray[index].bestScore}s`;
  });
}

// Check Local Storage for Best Scores, Set bestScoreArray
function checkLocalStorage() {
  if (localStorage.getItem('bestScores')) {
    bestScoreArray = JSON.parse(localStorage.bestScores);
  } else {
    bestScoreArray = [
      { questions: 10, bestScore: finalTimeDisplay },
      { questions: 25, bestScore: finalTimeDisplay },
      { questions: 50, bestScore: finalTimeDisplay },
      { questions: 99, bestScore: finalTimeDisplay },
    ];
    localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
  }
  refreshBestScore();
}

// Update Best Score Array
function updateBestScore() {
  [...bestScoreArray].forEach((equation, index) => {
    const equationQuestions = +equation.questions;
    // Select correct Best Score to update
    if (questionAmount == equationQuestions) {
      if (localStorage.getItem('bestScores')) {
        bestScoreArray = JSON.parse(localStorage.bestScores);
        // Return number with decimal from string
        const storedScore = parseFloat(bestScoreArray[index].bestScore);
        // Check if the new final score is less, if it is update it
        if (storedScore === 0 || storedScore > finalTime) {
          bestScoreArray[index].bestScore = finalTimeDisplay;
        }
      }
    }
  });
  // Update Splash Page
  refreshBestScore();
  // Save to Local Storage
  localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
}

// Stop Timer, Process Results, go to Score Page
function checkScore() {
  if (playerGuessArray.length === +questionAmount) {
    clearInterval(timer);
    // Check for wrong guess, add penaltyTime
    equationsArray.forEach((evaluated, index) => {
      if (equationsArray[index].evaluated === playerGuessArray[index]) {
        // Correct Guess, No Penalty
      } else {
        // Incorrect Guess, Add Penalty
        penaltyTime += 0.5;
      }
    });
    // Format & Display Time
    finalTime = timePlayed + penaltyTime;
    finalTimeDisplay = finalTime.toFixed(1);
    baseTime = timePlayed.toFixed(1);
    penaltyTime = penaltyTime.toFixed(1);
    baseTimeEl.textContent = `Base Time: ${baseTime}s`;
    penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`;
    finalTimeEl.textContent = `${finalTimeDisplay}s`;
    updateBestScore();
    // Scroll to Top, go to Score Page
    itemContainer.scroll(0, -5000);
    showScorePage();
    // Turn on Play Again button after delay
    setTimeout(() => {
      playAgainBtn.style.display = 'block';
    }, 2000);
  }
}

// Add a tenth of a second to timePlayed
function addTime() {
  timePlayed += 0.1;
  checkScore();
}

// Start timer when game page is clicked
function startTimer() {
  // Reset times
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
  timer = setInterval(addTime, 100);
  gamePage.removeEventListener('click', startTimer);
  // Scroll first time
  itemContainer.scroll(0, valueY);
  setTimeout(() => {
    firstScroll = true;
  }, 250);
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

// Get Random Number up to a certain amount
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);


  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  // Loop through for each correct equation, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }

  // Loop through for each wrong equation, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(2);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }

  shuffle(equationsArray);

  // Add Equations to DOM
  equationsArray.forEach((equation) => {
    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    // Equation Text
    const equationText = document.createElement('h1');
    equationText.textContent = equation.value;
    // Append
    item.appendChild(equationText);
    itemContainer.appendChild(item);
  });
  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

// Displays 3, 2, 1, GO!
function countdownStart() {
  countdown.textContent = '3';
  setTimeout(() => {
    countdown.textContent = '2';
  }, 1000);
  setTimeout(() => {
    countdown.textContent = '1';
  }, 2000);
  setTimeout(() => {
    countdown.textContent = 'GO!';
  }, 3000);
}

// Navigate from Splash Page to CountdownPage to Game Page
function showCountdown() {
  countdownPage.style.display = 'flex';
  splashPage.style.display = 'none';
  populateGamePage();
  countdownStart();
  setTimeout(showGamePage, 4000);
}

// Take user selection right or wrong and add to the playerGuessArray
function select(rightOrWrong) {
  // Scroll after first scroll
  if (firstScroll === true) {
    valueY += 80;
    itemContainer.scroll(0, valueY);
  }
  // Add player guess to array
  switch (rightOrWrong) {
    case true:
      playerGuessArray.push('true');
      break;
    case false:
      playerGuessArray.push('false');
      break;
    default:
      break;
  }
}

// Get the value from selected radio button
function getRadioValue(form, name) {
  let val;
  const radios = form.elements[name];
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      val = radios[i].value;
      break;
    }
  }
  return val;
}

// Form that decides amount of Questions
function selectQuestion(e) {
  e.preventDefault();
  questionAmount = getRadioValue(this, 'questions');
  showCountdown();
}

// Switch selected input styling
startForm.addEventListener('click', () => {
  radioContainers.forEach((radioEl) => {
    radioEl.classList.remove('selected-label');
  });
  if (value10.checked) {
    radioContainers[0].classList.add('selected-label');
  }
  if (value25.checked) {
    radioContainers[1].classList.add('selected-label');
  }
  if (value50.checked) {
    radioContainers[2].classList.add('selected-label');
  }
  if (value99.checked) {
    radioContainers[3].classList.add('selected-label');
  }
});

// Event Listeners
gamePage.addEventListener('click', startTimer);
startForm.addEventListener('submit', selectQuestion);

// On Load
checkLocalStorage();
