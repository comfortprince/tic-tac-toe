
export default function Square({value, highlight, onSquareClick}) {
	const btn =
	<button
		style={{
			backgroundColor: highlight ? 'red' : ''
		}}
		className="square"
		onClick={onSquareClick}
	>
		{value}
	</button>

	return btn;
}
