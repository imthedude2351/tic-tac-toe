/*----- constants -----*/
const colorLookup = {
    null: 'white',
    '1': 'orchid',
    '-1': 'lightblue'
};

const winningCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

/*----- app's state (variables) -----*/
let board, turn, winner;

// /*----- cached element references -----*/
const msgEl = document.querySelector('h1');
const button = document.querySelector('button');
const squares = [...document.querySelectorAll('.grid > div')];

// /*----- event listeners -----*/
for (var i = 0; i < squares.length; i++)
{
    squares[i].addEventListener('click', handleClick);
}

button.addEventListener('click', init);

// /*----- functions -----*/
init();

function handleClick(evt) {
const idx = parseInt(evt.target.id.replace('s',''));
if (board[idx] || winner) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
} 

function getWinner() {
    for (let i = 0; i < winningCombination.length; i++) {
        if (Math.abs(board[winningCombination[i][0]]
             + board[winningCombination[i][1]]
              + board[winningCombination[i][2]]) === 3)
               return board[winningCombination[i][0]]; 
    }
    if (board.includes(null)) return null;
    return 'Tie';
}

function render() {
    board.forEach(function(sq, idx) {
        squares[idx].style.background = colorLookup[sq]; 
    });
    if (winner === 'Tie') {
        msgEl.innerHTML = `Tie! Play Again`;
    } else if (winner) {
        msgEl.innerHTML = `Ayeee ${colorLookup[winner].toUpperCase()} won!`;
    } else {
        msgEl.innerHTML = `It's ${colorLookup[turn].toUpperCase()}'s Turn`;
    }
}

function init() {
    board = [null,null,null,null,null,null,null,null,null];
    turn = 1;
    winner = null;
    render();
}