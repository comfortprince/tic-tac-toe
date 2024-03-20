import Square from './Square.js'

export default function Board({xIsNext, squares, onPlay}) {
	function handleClick(i) {
		const nextSquares = squares.slice()

		if(nextSquares[i] || calculateWinner(squares)) return

		if(xIsNext){
			nextSquares[i] = 'X'
		}else{
			nextSquares[i] = 'O'
		}

		onPlay(nextSquares)
	}

	const winner = calculateWinner(squares)
	let status

	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

	const rowsOfSquares = 	[[], [], []]
	for (let i = 0; i < squares.length; i++)
		rowsOfSquares[Math.floor(i/3)][i%3] = <Square key={i%3} value={squares[i]} onSquareClick={() => handleClick(i)} />

	const boardRows = []
	for(let i = 0; i !== 3; ++i)
		boardRows.push(
			<div key={i} className="board-row">
				{rowsOfSquares[i]}
			</div>
		)

	return (
		<>
			<div className="status">{status}</div>
			{boardRows}
		</>
	);
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}


