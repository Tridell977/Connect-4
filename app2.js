const boardElem = document.getElementById('game_board');
const submitButton = document.getElementById('nameSubmit');
const nameEnter = document.getElementById('enterName');
const message = document.getElementById('message');
const playerOne = document.getElementById('oneName');
const playerTwo = document.getElementById('twoName');
let gameLive = false;
const state = {};
buildInitialState();
boardElem.addEventListener("click", colorChange);

function buildInitialState(){
    state.board = [];
        for(let i = 0; i < 6; i++){
        state.board.push([]);
        for(let j = 0; j < 7; j++){
            state.board[i].push(['blank']);
            const circleElem = document.createElement('div');
            circleElem.classList.add('circle');
            circleElem.id = i + ',' + j;
            boardElem.appendChild(circleElem);
        }
}
    state.players = [{name: '', color: ''}, {name: '', color: ''}];
    state.currentPlayer = 0;
    state.nameCounter = 0; 
}
    submitButton.onclick = function() {
        let counter = state.nameCounter;
        if(counter === 0){
            state.players[counter].name = nameEnter.value;
            nameEnter.value = "";
            nameEnter.placeholder = "Player Name";
            } else {
                state.players[counter].name = nameEnter.value;
                nameEnter.value = "Enjoy the Game!"
                nameEnter.disabled = true;
                submitButton.disabled = true;
        }
        render();
        state.nameCounter++;
    }
function renderPlayers() {
    if(state.nameCounter === 1){
        randomNumber = Math.floor(Math.random() * 2);
        gameLive = true;
        if(randomNumber === 0){
            playerOne.innerText = state.players[0].name;
            state.players[0].color = "red";
            playerTwo.innerText = state.players[1].name;
            state.players[1].color = "yellow";
        } else {
            state.currentPlayer = 1;
            playerOne.innerText = state.players[1].name;
            state.players[1].color = "red";
            playerTwo.innerText = state.players[0].name;
            state.players[0].color = "yellow";
        }
    }
}

function colorChange(event) {
    if(!gameLive){
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
                console.log(state.board[y][x]);
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
function renderBoard() {
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++){
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