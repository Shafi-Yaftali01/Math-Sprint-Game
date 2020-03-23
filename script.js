const countdownPage = document.getElementById('countdown-page');
const countdown = document.getElementById('countdown');
const startForm = document.getElementById('start-form');
const value10 = document.getElementById('value-10');
const value25 = document.getElementById('value-25');
const value50 = document.getElementById('value-50');
const value99 = document.getElementById('value-99');

let questionAmount;

// countdown.addEventListener('click', countdownStart);
// function countdownStart() {
//     countdown.innerText = '3';
//     setTimeout(() => { countdown.innerText = '2' }, 1000);
//     setTimeout(() => { countdown.innerText = '1' }, 2000);
//     setTimeout(() => { countdown.innerText = 'GO!'; }, 3000);
// }

startForm.addEventListener('submit', selectQuestion);
function selectQuestion(e) {
    e.preventDefault();
    questionAmount = getRadioVal(this, 'questions');
    console.log(questionAmount);
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


