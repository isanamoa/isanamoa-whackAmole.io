const start_game= document.querySelector(".start-game"); 
const moles = document.querySelectorAll(".mole");
const timer = document.querySelector(".timer");
const score = document.querySelector(".score");

let startInterval;
let timeInterval;
const runGame = () => {
    restMoleState();
    let stopTime = Date.now() + 10 * 1000;
    let scoreCount = 0;
    moleState();
    startInterval = setInterval(() => {
        let secondsLeft = Math.round((stopTime - Date.now()) / 1000);
        moleState();
        if (secondsLeft < 0){
            clearInterval(startInterval);
            moles.forEach((mole) => { 
                mole.style.top = '';
            });           
            return;
        }
        displayTimer(Math.abs(secondsLeft));
    }, 1000);
    
    moles.forEach((mole) => {
        mole.addEventListener('click', () => {
            mole.style.top = '';
            let gameAudio = new Audio("pop.mp3");
            gameAudio.addEventListener('canplaythrough', () =>{
                gameAudio.play();
            });
            score.textContent = scoreCount++;
        });
    });
}

function moleState(){
    let randNum = Math.round(Math.random() * moles.length);
    //console.log(randNum);
    clearTimeout(timeInterval);
    if(randNum <= 5){
        moles[randNum].style.top = '0';
            
        timeInterval = setTimeout(()=>{
            moles[randNum].style.top = '';
            clearTimeout(timeInterval);
        }, 900);
    }

}

function restMoleState(){
    clearInterval(startInterval);
    timer.textContent = 10;
    score.textContent = 0;
    moles.forEach((mole) => { 
        mole.style.top = '';
    });
}

function displayTimer(secondsLeft) {
    let seconds = secondsLeft % 60;
    let display = seconds;
    timer.textContent = display;
}

start_game.addEventListener("click", runGame);

//runGame();