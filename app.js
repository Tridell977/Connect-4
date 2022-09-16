const boardElem = document.getElementById('game_board')
const game = [];
const playerOne = "red";
const playerTwo = "yellow";
let nameCounter = 0;
let dropArray = [5, 5, 5, 5, 5, 5, 5]
const submitButton = document.getElementById('nameSubmit');
const nameEnter = document.getElementById('enterName');
const message = document.getElementById('message');
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
        columnElem.classList.add('column')
        for(let j = 0; j < 6; j++){
        const circleElem = document.createElement('div');
        circleElem.classList.add('circle');
        circleElem.id = i + ',' + j;
        columnElem.appendChild(circleElem);
        }
    }
}
renderGame();
boardElem.addEventListener('click', colorChange)




function colorChange(event){
    if(event.target.classList.contains('circle')){
        const circleIndex = event.target.id.split(',');
        const x = circleIndex[0];
        let y = dropArray[x];
        if(y < 0){
            message.innerText = "Column Full, please choose another";
            return;
        }
        dropCircle = document.getElementById(`${x},${y}`);
        if(currentPlayer === playerOne){
        dropCircle.classList.add('red');
        currentPlayer = playerTwo;
        } else {
            dropCircle.classList.add('yellow'); 
            currentPlayer = playerOne;
        }
        dropArray[x]--;
    }
}
submitButton.onclick = function(){
    const one = document.getElementById('oneName');
    const two = document.getElementById('twoName');
    if(nameCounter === 0){
    one.innerText = nameEnter.value;
    nameEnter.value = "";
    nameEnter.placeholder = "Player Name";
    nameCounter++;
    } else {
        two.innerText = nameEnter.value;
        nameEnter.value = "Enjoy the Game!"
        nameEnter.disabled = true;
        submitButton.disabled = true;
    }
}
// function checkWin(circle) {
//    // vertical check
//     vertCount = 0
//     testCircleIdx = circle.id.split(',');
//     x = testCircleIdx[0];
//     y = testCircleIdx[1];
//     for(let i = 0; i < 4; i++){
//          y = y + i;
//          testCircle = document.getElementById(`${x},${y}`);
//         if(testCircle.classList.contains('red')){
//             vertCount++;
//         }
//         if(vertCount === 3){
//             message.innerText = `${currentPlayer} wins!`
//         }
//     }
   // horizontal check

  // diagonal right check

   // diagonal left check
// }