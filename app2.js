// DOM selectors
const boardElem = document.getElementById('game_board');
const submitButton = document.getElementById('nameSubmit');
const nameEnter = document.getElementById('enterName');
const message = document.getElementById('message');
const playerOne = document.getElementById('oneName');
const playerTwo = document.getElementById('twoName');
const state = {};


buildInitialState();
render();
boardElem.addEventListener("click", colorChange);
submitButton.addEventListener('click', chooseNames)





function buildInitialState(){
    state.board = [];
        for(let i = 0; i < 6; i++){
        state.board.push([]);
        for(let j = 0; j < 7; j++){
            state.board[i].push(['blank']);
        }
}
    state.gameLive = false;
    state.players = [{name: '', color: 'red'}, {name: '', color: 'yellow'}];
    state.currentPlayer = 0;
    state.nameCounter = 0;
    state.namePlaceHolder = '';
    state.namePlaceHolder2 = '';
}
    
function chooseNames() {
    let counter = state.nameCounter;
    randomNumber = Math.floor(Math.random() * 2);
    if(counter === 0){
        state.namePlaceHolder += nameEnter.value;
        nameEnter.value = "";
        nameEnter.placeholder = "Next Player Name";
        } else if(counter === 1){
            state.namePlaceHolder2 += nameEnter.value;
            nameEnter.value = "Enjoy the Game!"
            nameEnter.disabled = true;
            submitButton.disabled = true;
    }
    if(randomNumber === 0){
        state.players[0].name = state.namePlaceHolder;
        state.players[1].name = state.namePlaceHolder2;
    } else {
        state.currentPlayer = 1;
        state.players[0].name = state.namePlaceHolder2;
        state.players[1].name = state.namePlaceHolder;
    }
    render();
    state.nameCounter++;
}
function colorChange(event) {
    if(!state.gameLive){
        alert('please enter Players');
        return;
    }
    if(event.target.classList.contains('circle')){
        let turn = state.currentPlayer;
        const circleIndex = event.target.id.split(',');
        const x = Number(circleIndex[1]);
        for(let y = 5; y >= 0; y--){
            if (y < 0){
                return;
            } else if(state.board[y][x] == 'blank'){
                state.board[y][x] = state.players[turn].color;
                if(turn === 0){
                    state.currentPlayer = 1;
                } else {
                    state.currentPlayer = 0;
                }
                render();
                return;
            }
        }
    }
}
function renderPlayers() {
    if(state.nameCounter === 1){
        playerOne.innerText = state.players[0].name;
        playerTwo.innerText = state.players[1].name;
        state.gameLive = true;
    }
}
function renderBoard() {
    boardElem.innerHTML = '';
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++){
            const circleElem = document.createElement('div');
            circleElem.classList.add('circle');
            circleElem.id = i + ',' + j;
            boardElem.appendChild(circleElem);
            const circle = document.getElementById(`${i},${j}`);
            if(state.board[i][j] !== 'blank'){
                circle.classList.add(state.board[i][j]);
            }
        }
    }
}
function render() {
    renderPlayers();
    renderBoard();
}
// function checkWin(){
//    for
// }