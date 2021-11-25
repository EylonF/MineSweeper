'use strict'

console.log('hello js')



function setMinesNegsCount(cellI, cellJ, board) {
  var MinesNegsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i > board.length - 1) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j > board[i].length - 1) continue;
      if (i === cellI && j === cellJ) continue;

      if (board[i][j].isMine) MinesNegsCount++;
    }
  }
  return MinesNegsCount;
}

// function showNegs(cellI, cellJ, board) {
//   for (var i = cellI - 1; i <= cellI + 1; i++) {
//     if (i < 0 || i > board.length - 1) continue;
//     for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//       if (j < 0 || j > board[i].length - 1) continue;
//       if (i === cellI && j === cellJ) continue;
//       // var elCurrCell = document.querySelector(`#i${i} #j${j}`)
      
//       console.log(board[i][j])
//       // if (board[i][j]) {
//         // cellClicked(elCurrCell, i, j)
//       // }
//     }
//   }

// }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}