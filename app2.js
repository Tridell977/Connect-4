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
        state.players[0].name = state.namePlaceHolder2;
        state.players[1].name = state.namePlaceHolder;
    }
    render();
    state.nameCounter++;
}
function colorChange(event) {
    if(!state.players[0].name){
        alert('please enter Players');
        return;
    }
    if(!state.gameLive){
        alert("please reset game");
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
    checkWin();
}
function checkWin(){
horizontalWin();
verticalWin();
diagonalLtoRWin();
   function horizontalWin(){
    for(let i = 0; i < 6; i++){
        let matchCircles = 0;
        for(let j = 0; j < 6; j++){
            if(state.board[i][j] === state.board[i][j+1]){
                matchCircles++;
            } else {
                matchCircles = 0;
            }
            if(matchCircles === 3){
                console.log('you win h')
                state.gameLive = false;
                return;
            }
        }
    }
    }
    function verticalWin() {
        for(let i = 0; i < 7; i++){
            let matchCircles = 0;
            for(let j = 5; j > 0; j--){
                if(state.board[j][i] === state.board[j - 1][i]){
                    matchCircles++;
                } else {
                    matchCircles = 0;
                }
                if(matchCircles === 3){
                    console.log('you win v');
                    state.gameLive = false;
                    return;
                }
            }
        }
    }
    function diagonalLtoRWin() {
        for(let i = 3; i < 6; i++){
            let matchCircles = 0;
            let up = i;
            let down = 5;
            counter = 6;
            for(let j = 0; j < i; j++){
            if(state.board[up][j] === state.board[up - 1][j + 1]){
                matchCircles++;
                up--;
            } else {
                matchCircles = 0;
            }
            if(matchCircles === 3){
                console.log('you win dl')
                state.gameLive = false;
                return;
            }
            }
            for(j = 1; j < counter; j++){
                if(state.board[down][j] === state.board[down - 1][j + 1]){
                    matchCircles++;
                    down--;
                } else {
                    matchCircles = 0;
                }
                if(matchCircles === 3){
                    console.log('you win dl')
                    state.gameLive = false;
                    return;
                }
            }
            counter--;
        }
    }
}