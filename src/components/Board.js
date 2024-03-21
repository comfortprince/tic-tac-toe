import Square from './Square.js'

export default function Board({xIsNext, squares, onPlay}) {
	function handleClick(i, currentMoveLocation) {
		const nextSquares = squares.slice()

		if(nextSquares[i] || calculateGameStatus(squares).winner) return

		if(xIsNext){
			nextSquares[i] = 'X'
		}else{
			nextSquares[i] = 'O'
		}

		onPlay(nextSquares, currentMoveLocation)
	}

	const gameStatus = calculateGameStatus(squares)
	let status = setStatusDesc(gameStatus, xIsNext)

	const rowsOfSquares = [[], [], []]
	generateRowsOfSquares(rowsOfSquares, squares, gameStatus, handleClick)

	const boardRows = []
	generateBoardRows(boardRows, rowsOfSquares)

	return (
		<>
			<div className="status">{status}</div>
			{boardRows}
		</>
	);
}

function generateBoardRows(boardRows, rowsOfSquares) {
	for(let i = 0; i !== 3; ++i)
		boardRows.push(
			<div key={i} className="board-row">
				{rowsOfSquares[i]}
			</div>
		)
}

function generateRowsOfSquares(rowsOfSquares, squares, gameStatus, handleClick) {
	for (let i = 0; i < squares.length; i++){
		const square =
			<Square
				key={i}
				value={squares[i]}
				highlight={gameStatus.status === gameStatus.WINNER && gameStatus.winningLine.includes(i)}
				onSquareClick={() => handleClick(i, {row: Math.floor(i/3), col: i%3})}
			/>
		rowsOfSquares[Math.floor(i/3)][i%3] = square
	}
}

function setStatusDesc(gameStatus, xIsNext) {
	let status
	if (gameStatus.status === gameStatus.WINNER) {
		status = "Winner: " + gameStatus.winner;
	} else if (gameStatus.status === gameStatus.DRAW) {
		status = "Game Over! Draw. Try Again."
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}
	return status
}

function calculateGameStatus(squares) {
  const gameStatus = {
	winner: null,
	status: null,
	winningLine: null,
	WINNER: 'WINNER',
	ONGOING: 'ONGOING',
	DRAW: 'DRAW'
  }

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      gameStatus.winner = squares[a]
      gameStatus.status = gameStatus.WINNER
      gameStatus.winningLine = lines[i]
      return gameStatus;
    }
  }
  
  if(!squares.includes(null)){
    gameStatus.status = gameStatus.DRAW
    return gameStatus
  }

  gameStatus.status = gameStatus.ONGOING
  return gameStatus
}


