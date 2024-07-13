const popped_bloons = document.getElementById('popped-bloons-number');
const best_score = document.getElementById('best-number');
const game = document.getElementById('game-container');

const popsound = new Audio('../Assets/Sound/pop.mp3');
popsound.volume = 0.6;
const themeSound = new Audio('../Assets/Sound/theme.mp3');
themeSound.volume = 0.4;
themeSound.loop = true;


let baloes_estourados = 0;

const createBloon = ()=>{
    
    let bloon = document.createElement('img');
    bloon.id = 'bloon';
    bloon.src = '../Assets/Img/balao.svg';
    bloon.style.position = 'relative';
    bloon.style.top = Math.floor(Math.random()*90)+'%';
    bloon.style.left = Math.floor(Math.random()*90)+'%';
    bloon.style.zIndex = 50;
    game.appendChild(bloon);

    bloon.addEventListener("click", ()=>{
        pop(bloon);
        setTimeout(function () {
            createBloon();
        },10)
        
    });
   
}
const pop = (bloon)=>{
    bloon.src = '../Assets/Img/balaopow.svg';
    popsound.play();
    themeSound.play();
    setTimeout(()=>{
        game.innerHTML = '';    
        baloes_estourados++;
        popped_bloons.innerHTML = baloes_estourados;  
    },10)
    
    
}
const updateBestScore = ()=>{
    const local_best_score = localStorage.getItem("BestScore");
    best_score.innerHTML = local_best_score !== null && !isNaN(local_best_score) ? local_best_score : 0;
}
game.addEventListener("click",function(event){
    if (event.target === game) {
        let score = Math.floor(baloes_estourados*(baloes_estourados/2));
        
        if (score > localStorage.getItem("BestScore")) {
            localStorage.setItem("BestScore",score);
            alert(`Você perdeu\nPontuação : ${score}\nEsta foi sua melhor pontuação!`);
            updateBestScore()
        }else{
            alert(`Você perdeu\nPontuação : ${score}`);
        }
        
        location.reload();
    }
})
createBloon();
updateBestScore();
