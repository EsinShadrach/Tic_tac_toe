```js
import "./squares.css";

export default function Board() {
	return (
		<>
			<div className="board-row">
				<Square value="1" />
				<Square value="2" />
				<Square value="3" />
			</div>
			<div className="board-row">
				<Square value="4" />
				<Square value="5" />
				<Square value="6" />
			</div>
			<div className="board-row">
				<Square value="7" />
				<Square value="8" />
				<Square value="9" />
			</div>
		</>
	);
}

function Square({ value }) {
	return (
        <button className="square">{value}</button>
    )
}
// We can pass in values to like call in our JSX
// Using curly braces in JSX means to go back to javascript World
// In here we made a param called value
// When we ever want to pass in something into our value we simple do this <Square value="9" />
```