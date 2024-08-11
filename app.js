const colorCodeContainer = document.getElementById('color-rgb');
let randomColor = null;
const optionsContainer = document.getElementById('options-container');
const scoreContainer = document.getElementById('score');
let score = 0;
function generateRandomNumber(min, max){
    return  min + Math.floor(Math.random()*(max-min));
}

function generateRandomColor(){
    
    const r = generateRandomNumber(0,255);
    const g = generateRandomNumber(0,255);
    const b = generateRandomNumber(0,255);
    return  `rgb(${r}, ${g}, ${b})`;

}

function increaseScore(){
    score+=1;
    scoreContainer.innerText = score;
}

function validateResult(el){
    const selectedColor = el.target.style.backgroundColor;
    if(selectedColor==randomColor){
        increaseScore();
    }else{
        score = 0;
    }

    window.localStorage.setItem('score', score);
    startGame();
}

function startGame(){
    score =  Number(window.localStorage.getItem('score'))?? 0;
    scoreContainer.innerText = score;
    optionsContainer.innerHTML  = null;
    randomColor = generateRandomColor();
    colorCodeContainer.innerText = randomColor;

    const ansInd = generateRandomNumber(0,5);

    for(let i=0; i<6; i++){
        const div = document.createElement('div');
        div.addEventListener('click', validateResult);
        div.style.backgroundColor = i===ansInd ? randomColor : generateRandomColor();
        optionsContainer.appendChild(div);
    }
}

window.addEventListener('load', ()=>startGame());