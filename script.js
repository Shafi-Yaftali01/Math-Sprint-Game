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

let questionAmount;

function countdownStart() {
    countdown.innerText = '3'; 
    setTimeout(() => { countdown.innerText = '2' }, 1000);
    setTimeout(() => { countdown.innerText = '1' }, 2000);
    setTimeout(() => { countdown.innerText = 'GO!' }, 3000);
}

function showCountdown() {
    countdownPage.style.display = 'flex';
    splashPage.style.display = 'none';
    populateGamePage();
    countdownStart();
    setTimeout(showGamePage, 4000);
}

function populateGamePage() {
    itemContainer.innerHTML = '<div class="item"></div><div class="item"></div><div class="item"></div>';
    for (i = 0; i < questionAmount; i++) {
        // console.log('yes');
        itemContainer.innerHTML += `
        <div class="item">
            <h1>3 x 30 = 30</h1>
        </div>`
    }
}

function showGamePage() {
    gamePage.style.display = 'block';
    countdownPage.style.display = 'none';
}

startForm.addEventListener('submit', selectQuestion);
function selectQuestion(e) {
    e.preventDefault();
    questionAmount = getRadioVal(this, 'questions');
    console.log(questionAmount);
    showCountdown();
}

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


