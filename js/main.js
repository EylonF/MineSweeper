'use strict'


const NORMAL = "😀";
const WIN = "😎";
const LOSE = "🤯";
const FLAG = "🚩"
const MINE = "💣"
const LIFE = "❤"


var gElModal = document.querySelector('.modal')
var gGameInterval
var gBoard = []

var gLevel = {
    SIZE: 4,
    MINES: 2,
    LIFES: 1,
    CELLS: 16
}

var gGame = {
    isOn: false,
    isOver: false,
    shownCount: 0,
    secsPassed: 0
}

function initGame() {
    gElModal.querySelector(' button').innerText = NORMAL
    gBoard = createBoard(gLevel.SIZE)
    createRandomMines()
    renderBoard(gBoard)
    gGame = {
        isOn: false,
        isOver: false,
        shownCount: 0,
        secsPassed: 0
    }
    clearInterval(gGameInterval)
    gElModal.querySelector(' h1 span').innerText = 0

    switch (gLevel.SIZE) {
        case 4:
            gLevel.LIFES = 1
            gLevel.MINES = 2
            gLevel.CELLS = 16
            break;
        case 8:
            gLevel.LIFES = 2
            gLevel.MINES = 12
            gLevel.CELLS = 64
            break;
        case 12:
            gLevel.LIFES = 3
            gLevel.MINES = 30
            gLevel.CELLS = 144
            break;
    }

    renderLifes(gLevel.LIFES)
}

function createBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isBombed: false,
                isMarked: false
            }

        }
    }
    // board[1][1].isMine = true
    // board[3][3].isMine = true

    return board;
}

function renderBoard(board) {
    var strHTML = ''
    // console.table(board);
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]

            switch (gLevel.SIZE) {
                case 4:
                    strHTML += `<td data-i="${i}" data-j="${j}" onmousedown="cellMarked(this,event,${i}, ${j})" onclick="cellClicked(this, ${i}, ${j})" class="cell"></td>`

                    break;
                case 8:
                    strHTML += `<td data-i="${i}" data-j="${j}" onmousedown="cellMarked(this,event,${i}, ${j})" onclick="cellClicked(this, ${i}, ${j})" class="cell-medium"></td>`

                    break;
                case 12:
                    strHTML += `<td data-i="${i}" data-j="${j}" onmousedown="cellMarked(this,event,${i}, ${j})" onclick="cellClicked(this, ${i}, ${j})" class="cell-hard"></td>`

                    break;

            }

        }
        strHTML += '</tr>'
    }
    // strHTML += ''
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
    // console.log (strHTML)
}

function cellClicked(elCell, i, j) {

    if (!gGame.isOver) {
        if (!gGame.isOn) {
            gGame.isOn = true
            gGameInterval = setInterval(() => {
                gGame.secsPassed++
                gElModal.querySelector('.game h1 span').innerText = gGame.secsPassed
                // console.log(gGame.secsPassed)
            }, 1000);
        }


        if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
            if (gBoard[i][j].isMine) {
                gLevel.LIFES--
                gBoard[i][j].isBombed = true
                renderLifes(gLevel.LIFES)
                elCell.innerText = MINE
                gBoard[i][j].isShown = true
                if (!gLevel.LIFES) {
                    gElModal.querySelector(' button').innerText = LOSE
                    gameOver()
                }
            } else {
                gGame.shownCount++
                // console.log('gGame.shownCount', gGame.shownCount)
                var mineNegs = setMinesNegsCount(i, j, gBoard)
                elCell.style.backgroundColor = '#D0CAB2'
                gBoard[i][j].isShown = true
                if (mineNegs) {
                    elCell.innerText = mineNegs
                } else {
                    elCell.innerText = ''
                    showNegs(i, j, gBoard,)
                    
                }
            }
        }
    }
    checkVictory(gBoard)
}

function gameOver() {
    gGame.isOver = true
    clearInterval(gGameInterval)
    gGame.isOn = false
}

function checkVictory(board) {
    var markedCount = 0
    var notMineCount = 0
    var shownCount =0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            // cellsCount++
            if (!board[i][j].isMine) notMineCount++
            if (board[i][j].isMarked || board[i][j].isBombed) markedCount++
            if (board[i][j].isShown) shownCount++
           
        }
    }
    // console.log('shownCount',shownCount)
    // console.log('notMineCount',notMineCount)
    // console.log('markedCount',markedCount)
    if (shownCount === notMineCount && shownCount + markedCount === gLevel.CELLS) {
        gElModal.querySelector(' button').innerText = WIN
        gameOver()
    }

}

function cellMarked(elCell, ev, i, j) {
    if (!gGame.isOver) {
        if (ev.which === 3 && !gBoard[i][j].isShown) {
            elCell.addEventListener('contextmenu', (ev) => {
                ev.preventDefault();
            })
            // console.log(elCell)
            if (!gGame.isOn) {
                gGame.isOn = true
                gGameInterval = setInterval(() => {
                    gGame.secsPassed++
                    gElModal.querySelector('.game h1 span').innerText = gGame.secsPassed
                    // console.log(gGame.secsPassed)
                }, 1000);
            }
            if (!gBoard[i][j].isMarked) {
                gBoard[i][j].isMarked = true
                elCell.innerText = FLAG
            } else {
                gBoard[i][j].isMarked = false
                elCell.innerText = ''
            }
        }
        checkVictory(gBoard)
    }
}

function chengeBoardZise(size) {
    gLevel.SIZE = size
    switch (gLevel.SIZE) {
        case 4:
            gLevel.MINES = 2
            gLevel.LIFES = 1
            gLevel.CELLS = 16
            break;
        case 8:
            gLevel.MINES = 12
            gLevel.LIFES = 2
            gLevel.CELLS = 62

            break;
        case 12:
            gLevel.MINES = 30
            gLevel.LIFES = 3
            gLevel.CELLS = 144

            break;
    }
    // console.log(gLevel.MINES)

    initGame()

}

function createRandomMines() {
    for (var i = 0; i < gLevel.MINES; i++) {
        var currI = getRandomInt(0, gLevel.SIZE)
        var currj = getRandomInt(0, gLevel.SIZE)
        if (gBoard[currI][currj].isMine) i--
        gBoard[currI][currj].isMine = true
        // if (i === elCellI && j === elCellJ) {
        //     i--
        // } else {
        // }
    }
    // renderBoard(gBoard)
}

function showNegs(cellI, cellJ, board) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > board[i].length - 1) continue;
            if (i === cellI && j === cellJ) continue;
            var elCurrCell = gElModal.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            // console.log (elCurrCell)
            cellClicked(elCurrCell, i, j)
        }
    }
}

function renderLifes(lifes) {
    var elLifes = gElModal.querySelector(' p')
    switch (lifes) {
        case 1:
            elLifes.innerText = LIFE
            break;
        case 2:
            elLifes.innerText = `${LIFE}  ${LIFE}`
            break;
        case 3:
            elLifes.innerText = `${LIFE} ${LIFE} ${LIFE}`
            break;
        default:
            elLifes.innerText = ''
            break;


    }
}