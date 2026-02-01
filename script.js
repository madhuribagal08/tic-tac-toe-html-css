const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
let currentPlayer = 'X';
let board = Array(9).fill(null);

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  
  for (const [a,b,c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      status.textContent = `${board[a]} wins! 🎉`;
      cells.forEach(cell => cell.removeEventListener('click', handleClick));
      return true;
    }
  }
  if (!board.includes(null)) {
    status.textContent = "It's a draw!";
    return true;
  }
  return false;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add('taken');

  if (!checkWinner()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.addEventListener('click', handleClick);
  });
  currentPlayer = 'X';
  status.textContent = "X's turn";
}

resetBtn.addEventListener('click', resetGame);
resetGame();
