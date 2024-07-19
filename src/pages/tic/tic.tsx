import { SetStateAction, useState } from "react";

type TSquare = "X" | "O" | null;

const getLinesByBoardSize = (boardSize: number) => {
  const lines = [];

  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      //   console.log(i, j, boardSize);
      row.push(i * boardSize + j);
    }
    lines.push(row);
  }

  for (let i = 0; i < boardSize; i++) {
    const col = [];
    for (let j = 0; j < boardSize; j++) {
      //   console.log(i, j, boardSize);
      col.push(j * boardSize + i);
    }
    lines.push(col);
  }

  const mainDiagonal = [];
  const secondaryDiagonal = [];
  for (let i = 0; i < boardSize; i++) {
    // console.log(i, boardSize ));
    mainDiagonal.push(i * (boardSize + 1));
    secondaryDiagonal.push((i + 1) * (boardSize - 1));
  }
  lines.push(mainDiagonal);
  lines.push(secondaryDiagonal);

  return lines;
};
export const Tic = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [squares, setSquares] = useState(
    Array(boardSize * boardSize).fill(null)
  );
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares: TSquare[]) => {
    const lines = getLinesByBoardSize(boardSize);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const winner = squares && squares[line[0]];

      //   console.log(line, winner);
      if (winner && line.every((index) => squares[index] === winner)) {
        // console.log(winner,line.every((index) => squares[index] === winner);
        return winner;
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (winner || squares[index]) return null;

    // console.log(newSquares);
    squares[index] = currentPlayer ? "X" : "O";
    setSquares(squares);
    setCurrentPlayer(!currentPlayer);
    console.log(squares);
    setWinner(calculateWinner(squares as TSquare[]) as SetStateAction<null>);
  };

  const renderSquare = (index: number) => {
    return (
      <button
        key={index}
        className={`${
          squares[index] === "X" ? "text-red-500" : "text-green-500"
        } w-16 h-16 border border-gray-500 text-2xl font-bold`}
        onClick={() => handleClick(index)}
      >
        {squares[index]}
      </button>
    );
  };
  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < boardSize; row++) {
      const boardRow = [];
      for (let col = 0; col < boardSize; col++) {
        boardRow.push(renderSquare((row * boardSize + col) as number));
      }
      board.push(
        <div key={row} className="flex">
          {boardRow}
        </div>
      );
    }
    return board;
  };

  const resetGame = () => {
    setSquares(Array(boardSize * boardSize).fill(null));
    setWinner(null);
    setCurrentPlayer(true);
  };

  //   console.log(Array.from({ length: 4 }).map((_, i) => i + 3));
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 h-screen bg-gray-50">
      <div className="flex justify-center items-center">
        <select
          className="mt-4 p-2 border border-gray-500 disabled:cursor-not-allowed"
          value={boardSize}
          disabled={squares.some((square) => square)}
          onChange={(e) => {
            const value = Number(e.target.value);
            setBoardSize(value);
            resetGame();
          }}
        >
          <option value="">Select board size</option>
          {Array.from({ length: 4 })
            .map((_, i) => i + 3)
            .map((d, i) => (
              <option key={i} value={d}>
                {d + " x " + d} Board Size
              </option>
            ))}
        </select>
      </div>
      <div className="flex flex-col items-center justify-center gap-2.5 h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-2">Tic-Tac-Toe</h1>
        {!winner && !squares.some((square) => square) && (
          <div className="mt-4 text-lg font-bold animate-ping text-blue-400">
            Start playing!!!
          </div>
        )}
        <div className="mt-5">{renderBoard()}</div>
        {winner && (
          <>
            <div className="mt-4 text-xl font-bold">Winner is {winner}</div>
            <button
              onClick={() => resetGame()}
              className="mt-4 text-xl font-bold px-5 py-2.5 bg-green-400 rounded-md text-white"
            >
              Start again
            </button>
          </>
        )}
        {!winner && !squares.every((square) => square !== null) && (
          <div className="mt-4 text-xl font-bold">
            Next player: {currentPlayer ? "X" : "O"}
          </div>
        )}
        {!winner && squares.every((square) => square !== null) && (
          <>
            <div className="mt-4 text-xl font-bold">Draw!!!</div>
            <button
              onClick={() => resetGame()}
              className="mt-4 text-xl font-bold px-5 py-2.5 bg-red-400 rounded-md text-white"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Tic;
