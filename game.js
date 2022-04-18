window.addEventListener('DOMContentLoaded', () => {
    // querySelectorAll will return an array like list
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.name-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    // stores the player either X or O
    let currentPlayer = 'X';
    let isGameActive = true;

    const PlayerX_Won = 'PlayerX_Won';
    const PlayerO_Won = 'PlayerO_Won';
    const Tie = 'Tie';

    /* 
        Tile index on the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningStatus = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6]
    ];

//loops to see if there is a winner or game is tied
    function resultValidation() {
        let roundWon = false;
        for(let i = 0; i <= 7; i++) {
            const winStatus = winningStatus[i];
            const a = board[winStatus[0]];
            const b = board[winStatus[1]];
            const c = board[winStatus[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            announce(currentPlayer === 'X' ? PlayerX_Won : PlayerO_Won);
            isGameActive = false;
            return;
        }
        if (!board.includes(''))
            announce(Tie);
    }

// announces winner
    const announce = (type) => {
        switch(type){
            case PlayerO_Won:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won!';
                break;
            case PlayerX_Won:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won!';
                break;
            case Tie:
                announcer.innerText = 'Tie!';
        }
        announcer.classList.remove('hide');
    };
// checks if tile has an X or O, makes sure players play empty tiles
    const isValid = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

// changes players on game board
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };


// represents a turn in the game
    const userAction = (tile, index) => {
        if(isValid(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index); 
            resultValidation();
            changePlayer();
        }
    }

//resets board
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});

