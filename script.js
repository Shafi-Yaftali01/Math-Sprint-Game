const countdownPage = document.getElementById('countdown-page');
const countdown = document.getElementById('countdown');

countdown.addEventListener('click', countdownStart);
function countdownStart() {
    countdown.innerText = '3';
    setTimeout(() => { countdown.innerText = '2' }, 1000);
    setTimeout(() => { countdown.innerText = '1' }, 2000);
    setTimeout(() => { countdown.innerText = 'GO!'; }, 3000);
}