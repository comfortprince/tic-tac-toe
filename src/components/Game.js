import { useState } from 'react'

import Board from './Board.js'

export default function App() {
	const [history, setHistory] = useState([Array(9).fill(null)])
	const [currentMove, setCurrentMove] = useState(0)
	const xIsNext = currentMove % 2 === 0
	const currentSquares = history[currentMove];
	const [sortAscending, setSortAscending] = useState(true)

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
		setHistory(nextHistory)
		setCurrentMove(nextHistory.length - 1)
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove)
	}

	const moves = history.map((squares, move, moves) => {
		if(move === (moves.length - 1)){
			return (
				<li key={move} >
					<span 
						style={{
							fontSize: 'small',
							fontWeight: '600'
						}}
					> 
						You are at move #{move} 
					</span>
				</li>	
			)
		}

		let description;
		if (move > 0) {
			description = 'Go to move #' + move;
		} else {
			description = 'Go to game start';
		}

		return (
			<li key={move} >
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

	const sortedMoves = sortAscending ? moves : moves.reverse()

	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<div>
					<input type="checkbox" onClick={() => { setSortAscending(!sortAscending) }} />
					<span> { sortAscending ? 'ascending' : 'descending' } </span>
				</div>

				<ol>
					{sortedMoves}
				</ol>
			</div>
		</div>
	);
}