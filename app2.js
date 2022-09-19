// DOM selectors
const boardElem = document.getElementById('game_board');
const submitButton = document.getElementById('nameSubmit');
const resetButton = document.querySelector('#resetButton')
const nameEnter = document.getElementById('enterName');
const message = document.getElementById('message');
const playerOne = document.getElementById('oneName');
const playerTwo = document.getElementById('twoName');
const state = {};


buildInitialState();
render();
boardElem.addEventListener("click", colorChange);
submitButton.addEventListener('click', chooseNames);
resetButton.addEventListener('click', resetGame);
setInterval(function() {
    if(state.players[state.currentPlayer].name === 'computer' && state.gameLive){
        setTimeout(computerMoves, 1000);
    }
}, 5000)





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
    state.numberOfMoves = 0;
    state.draw = false;
    state.nameCounter = 0;
    state.namePlaceHolder = '';
    state.namePlaceHolder2 = '';
    state.winner = '';
}
    
function chooseNames() {
    if(!nameEnter.value){
        message.innerText = "Please choose a valid Name";
        return;
    }
    let counter = state.nameCounter;
    randomNumber = Math.floor(Math.random() * 2);
    if(counter === 0){
        state.namePlaceHolder += nameEnter.value;
        } else if(counter === 1){
            state.namePlaceHolder2 += nameEnter.value;
            state.gameLive = true;
            if(randomNumber === 0){
                state.players[0].name = state.namePlaceHolder;
                state.players[1].name = state.namePlaceHolder2;
            } else {
                state.players[0].name = state.namePlaceHolder2;
                state.players[1].name = state.namePlaceHolder;
            }
    }
    render();
    state.nameCounter++;
}
function colorChange(event) {
    if(!state.players[0].name){
        message.innerText = "Please Choose Player Names.";
        return;
    }
    if(!state.gameLive){
        message.innerText = "Please Reset the Game";
        return;
    }
    if(event.target.classList.contains('circle')){
        const circleIndex = event.target.id.split(',');
        const x = Number(circleIndex[1]);
        dropCircle(x);
    }
}
function changeTurn(num){
    if(num === 0){
        state.currentPlayer = 1;
    } else {
        state.currentPlayer = 0;
    }
}
function computerMoves(){
    let x;
    if(checkMoveHorizontal()){
        x = checkMoveHorizontal();
    } else if(checkMoveVertical()){
        x = checkMoveVertical();
    } else {
    x = Math.floor(Math.random() * 7)
    }
    dropCircle(x);
    function checkMoveHorizontal(){
        for(let i = 5; i > -1 ; i--){
            for(let j = 0; j < 6; j++){
                const color = state.players[state.currentPlayer].color;
                if(state.board[i][j] === color){
                    if(state.board[i][j +1] === color){
                        if(state.board[i][j + 2] === color){
                            return j + 3;
                        }
                        return j + 2;
                    }
                    return j + 1;
                } 
    }
}
}
    function checkMoveVertical() {
        for(let i = 0; i < 6; i++){
            for(let j = 5; j > -1; j--){
            const color = state.players[state.currentPlayer].color;
            if(state.board[i][j] === color){
                if(state.board[i][j +1] === color){
                    if(state.board[i][j + 2] === color){
                        return j - 3;
                    }
                    return j - 2;
                }
                return j - 1;
            } }
        }
    }
}
function dropCircle(column){
    for(let y = 5; y >= 0; y--){
        if (y < 0){
            return;
        } else if(state.board[y][column] == 'blank'){
            state.board[y][column] = state.players[state.currentPlayer].color;
            state.numberOfMoves++;
            checkWin();
            checkDraw();
            changeTurn(state.currentPlayer);
            render();
            return;
        }
    }
}
function renderPlayers() {
    if(!state.gameLive && !state.draw){
        nameEnter.disabled = false;
        submitButton.disabled = false;
        nameEnter.value = '';
        nameEnter.placeholder = 'Player name';
    } else {
        message.innerText = `${state.players[state.currentPlayer].name} it's your turn!`;
        nameEnter.value = "Enjoy the Game!";
        nameEnter.disabled = true;
        submitButton.disabled = true;
    }
    playerOne.innerText = state.players[0].name;
    playerTwo.innerText = state.players[1].name;
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
    renderWin();
    renderDraw();
}
function checkWin(){
    // calling all the functions to check if there is a win
horizontalWin();
verticalWin();
diagonalLtoRWin();
diagonalRtoLWin();
// all functions for win
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
                state.gameLive = false;
                state.winner = state.board[i][j];
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
                    state.gameLive = false;
                    state.winner = state.board[j][i];
                    return;
                }
            }
        }
    }
    function diagonalLtoRWin() {
        for(let i = 3; i < 6; i++){
            let matchCircles = 0;
            let up = i;
            let y = i - 2;
            let down = 5;
            for(let j = 0; j < i; j++){
            if(state.board[up][j] === state.board[up - 1][j + 1]){
                matchCircles++;
            } else {
                matchCircles = 0;
            }
            if(matchCircles === 3){
                state.gameLive = false;
                state.winner = state.board[up][j];
                return;
            }
            up--;
            }
            matchCircles = 0;
            for(j = 0; j < i; j++){
                if(state.board[down][y] === state.board[down - 1][y + 1]){
                    matchCircles++;
                } else {
                    matchCircles = 0;
                }
                if(matchCircles === 3){
                    state.gameLive = false;
                    state.winner = state.board[down][y];
                    return;
                }
                down--;
                y++;
            }
        }
    }
    function diagonalRtoLWin() {
        let runBottom = 5;
        let runTop = 5;
        for(let i = 0; i < 3; i++){
            let matchCircles = 0;
            let up = i;
            for(let j = 0; j < runBottom; j++){
                if(state.board[up][j] === state.board[up + 1][j + 1]){
                    matchCircles++;
                } else{
                    matchCircles = 0;
                }
                if(matchCircles === 3){
                    state.gameLive = false;
                    state.winner = state.board[up][j];
                    return;
                }
                up++;
            }
            matchCircles = 0;
            runBottom--;
            for(let j = 0; j < runTop; j++){
                let y = j + 1;
                if(state.board[j][y] === state.board[j + 1][y + 1]){
                    matchCircles++;
                } else {
                    matchCircles = 0;
                }
                if(matchCircles === 3){
                    state.gameLive = false;
                    state.winner = state.board[j][y];
                    return;
                }
            }
            runTop--;
        }
    }
}
function checkDraw() {
    if(state.numberOfMoves > 41){
        state.draw = true;
        state.gameLive = false;
    }
}
function renderDraw() {
    if(state.draw){
        message.innerText = "No more possible moves. It's a draw!";
    }
}
function renderWin () {
    if(state.winner){
        if(state.winner === state.players[0].color) {
        message.innerText = `Congrats ${state.players[0].name}!! Reset if you want to play again!`;
    } else {
        message.innerText = `Congrats ${state.players[1].name}!! Reset if you want to play again!`;
    }
}
}
function resetGame(){
    message.innerText = 'To play a computer enter player name as "computer"';
    buildInitialState();
    render();
}