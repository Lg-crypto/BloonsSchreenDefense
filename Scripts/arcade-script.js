const game = document.getElementById('game-container');
const bloons_number = document.getElementById('balloons-number');
const popped_bloons_number = document.getElementById('popped-balloons-number');
const best_score = document.getElementById('best-number');
const timer = document.getElementById('time');

const popsound = new Audio('../Assets/Sound/pop.mp3');
popsound.volume = 0.6;
const themeSound = new Audio('../Assets/Sound/theme.mp3');
themeSound.volume = 0.4;
themeSound.loop = true;

const phases_time = 30;
const number_of_bloons = [20,30,40];

var time = phases_time;
var fase = 0;
domIstouched = false;
if(localStorage.getItem("BestScore") == null){
    localStorage.setItem('BestScore', 0)
}

document.addEventListener("click",()=>{
   themeSound.play()

})

const second = ()=>{
    if (time === 0) {
        
        time = phases_time;
        game.innerHTML='';
        alert('TEMPO ESGOTADO!')
        location.reload()

    } else {
        time -= 1;
        return time;
    }
}
const timerfunction = ()=>{
    setInterval(() => timer.innerHTML = second(), 1000);
}
const createphase = ()=>{
    for (let i = 0; i < number_of_bloons[fase]; i++) {
        best_score.innerHTML = localStorage.getItem("BestScore");
        criarBalao();
        pop();
    }
};
const criarBalao = ()=>{
    game.innerHTML += `<div  ><img src="../Assets/Img/balao.svg" class="bloon"></div>`;
    
}
const nextPhase = ()=>{
    game.innerHTML = '';
    time = 30;
    fase ++;
    BestScore();
    createphase();
    return;
}
function pop() {

    var initial_bloons_number = number_of_bloons[fase];
    var popped_bloons = 0;
    
    const bloons = document.querySelectorAll('.bloon');
    for (let i = 0; i < bloons.length; i++) {

        const bloon = bloons[i];
        bloon.addEventListener('click',()=>{
            bloon.src = '../Assets/Img/balaopow.svg';
            bloon.classList.remove('bloon');
            removeEventListener('click',arguments.callee)
            initial_bloons_number--;
            popped_bloons++;
            bloons_number.innerHTML = initial_bloons_number;
            popped_bloons_number.innerHTML = popped_bloons;
            popsound.currentTime = 0;
            popsound.play();
            setTimeout(() => bloon.style.display = 'none'  , 10);
            
            if (popped_bloons === number_of_bloons[fase]) {
                nextPhase()
                if (fase === 3) {
                    alert('VOCÊ VENCEU TODAS AS FASES!')
                }
            }
        })
    }

}
const BestScore = ()=>{
    const currentScore = Math.floor(time*(time/2));
    const BestScore = localStorage.getItem("BestScore");
    if (currentScore > BestScore) {
        best_score.innerHTML = currentScore;
        localStorage.setItem("BestScore", currentScore);
        document.getElementById("best-h2").innerHTML = currentScore;  
    }

    return;
}






timerfunction()
createphase()
