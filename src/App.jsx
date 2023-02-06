import { useState } from "react";
import "./css/style.css";

let backgroundState = "bg-slate-900";

function Square({ value, onSquareClick, className }) {
	return (
		<div className={className} onClick={onSquareClick}>
			{value}
		</div>
		// square border border-slate-600 w-12 h-full flex items-center justify-center font-bold
	);
}

function Board({ xIsNext, squares, onPlay }) {
	function handleClick(i) {
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}
		onPlay(nextSquares);
	}

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}
	let inGamestate = "text-amber-300";
	if (winner === null) {
		if (xIsNext) {
			backgroundState = "bg-red-400";
		} else {
			backgroundState = "bg-blue-400";
		}
	} else {
		backgroundState = "bg-emerald-300";
	}
	return (
		<div className="flex items-center flex-col">
			<div
				className={`status absolute top-0 font-bold text-2xl w-full text-center p-3 ${inGamestate}`}
			>
				{status}
			</div>
			<div className="board-row h-12 flex justify-center items-center flex-col w-fit">
				<div className="flex h-full border-b-8 border-red-900 rounded">
					<Square
						className={`square w-12 h-full flex items-center justify-center font-bold text-3xl ${
							squares[0] === "X" ? "text-amber-200" : "text-white"
						}`}
						value={squares[0]}
						onSquareClick={() => handleClick(0)}
					/>
					<div className="rounded-t w-2 bg-red-900"></div>
					<Square
						className={`square w-12 h-full flex items-center justify-center font-bold text-3xl ${
							squares[1] === "X" ? "text-amber-200" : "text-white"
						}`}
						value={squares[1]}
						onSquareClick={() => handleClick(1)}
					/>
					<div className="rounded-t w-2 bg-red-900"></div>
					<Square
						className={`square w-12 h-full flex items-center justify-center font-bold text-3xl ${
							squares[2] === "X" ? "text-amber-200" : "text-white"
						}`}
						value={squares[2]}
						onSquareClick={() => handleClick(2)}
					/>
				</div>
			</div>
			<div className="board-row h-12 flex justify-center items-center flex-col w-fit">
				<div className="flex h-full border-b-8 border-red-900 rounded">
					<Square
						className={`square w-12 h-full flex items-center justify-center font-bold text-3xl ${
							squares[3] === "X" ? "text-amber-200" : "text-white"
						}`}
						value={squares[3]}
						onSquareClick={() => handleClick(3)}
					/>
					<div className="h-14 rounded-b w-2 bg-red-900"></div>
					<Square
						className={`square w-12 h-full flex items-center justify-center font-bold text-3xl ${
							squares[4] === "X" ? "text-amber-200" : "text-white"
						}`}
						value={squares[4]}
						onSquareClick={() => handleClick(4)}
					/>
					<div className="h-14 rounded-b w-2 bg-red-900"></div>
					<Square
						className={`square w-12 h-full flex items-center justify-center font-bold text-3xl ${
							squares[5] === "X" ? "text-amber-200" : "text-white"
						}`}
						value={squares[5]}
						onSquareClick={() => handleClick(5)}
					/>
				</div>
			</div>
			<div className="board-row h-12 flex justify-center items-center flex-col w-fit">
				<div className="flex h-full">
					<Square
						className={`square w-12 h-full flex items-center justify-center font-bold text-3xl ${
							squares[6] === "X" ? "text-amber-200" : "text-white"
						}`}
						value={squares[6]}
						onSquareClick={() => handleClick(6)}
					/>
					<div className="rounded-b w-2 bg-red-900"></div>
					<Square
						className={`square w-12 h-full flex items-center justify-center font-bold text-3xl ${
							squares[7] === "X" ? "text-amber-200" : "text-white"
						}`}
						value={squares[7]}
						onSquareClick={() => handleClick(7)}
					/>
					<div className="rounded-b w-2 bg-red-900"></div>
					<Square
						className={`square w-12 h-full flex items-center justify-center font-bold text-3xl ${
							squares[8] === "X" ? "text-amber-200" : "text-white"
						}`}
						value={squares[8]}
						onSquareClick={() => handleClick(8)}
					/>
				</div>
			</div>
		</div>
	);
}

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}

	// const moves = history.map((squares, move) => {
	// 	let description;
	// 	if (move > 0) {
	// 		description = "Go to move #" + move;
	// 	} else {
	// 		description = "Go to game start";
	// 	}
	// 	console.log(move);
	// 	return (
	// 		<li key={move}>
	// 			<button onClick={() => jumpTo(move)}>{description}</button>
	// 		</li>
	// 	);
	// });
	
	const gameWinner = typeof calculateWinner(currentSquares) == 'string'
	if (gameWinner){
		backgroundState = 'bg-emerald-400'
	}
	
	return (
		<div
			className={`game h-screen ${backgroundState} flex items-center justify-center transition-colors duration-300`}
		>
			<div className="game-board">
				<Board
					xIsNext={xIsNext}
					squares={currentSquares}
					onPlay={handlePlay}
				/>
			</div>
			<div className="game-info">
				{/* <ol>{moves}</ol> */}
				{/* <button onClick={()=>jumpTo(0)}>RESTART</button> */}
			</div>
		</div>
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
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a];
		}
	}
	return null;
}
