const boardElem = document.getElementById('game_board')
const game = [];
const playerOne = "Red";
const playerTwo = "Yellow";
let nameCounter = 0;
const submitButton = document.getElementById('nameSubmit');
const nameEnter = document.getElementById('enterName');
let currentPlayer = playerOne;
function buildinitialGame() {
     for(let i = 0; i < 7; i++){
        game.push([]);
     } 
}
buildinitialGame();
function renderGame() {
    for(let i = 0; i < 7; i++){
        columnElem = document.createElement('div');
        boardElem.appendChild(columnElem);
        for(let j = 0; j < 6; j++){
        const circleElem = document.createElement('div');
        circleElem.classList.add('circle');
        columnElem.appendChild(circleElem);
        }
    }
}
renderGame();
boardElem.addEventListener('click', colorChange)




function colorChange(event){
    if(event.target.className === 'circle'){
        if(currentPlayer === playerOne){
        event.target.classList.add('red');
        currentPlayer = playerTwo;
        } else {
            event.target.classList.add('yellow');  
            currentPlayer = playerOne;
        }
    }

}
submitButton.onclick = function(){
    const one = document.getElementById('oneName');
    const two = document.getElementById('twoName');
    if(nameCounter === 0){
    one.innerText = nameEnter.value;
    nameEnter.value = "";
    nameEnter.placeholder = "Player Two Name";
    nameCounter++;
    } else {
        two.innerText = nameEnter.value;
        nameEnter.value = "Enjoy the Game!"
        nameEnter.disabled = true;
    }
}
