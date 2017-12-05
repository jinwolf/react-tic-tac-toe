import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Board from './board.js'

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: new Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    if (this.calculateWin(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.slice(0, this.state.stepNumber + 1).concat({squares: squares}),
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1
    });
  }

  toStep(move) {
    this.setState(
      {
        xIsNext: (move % 2) === 0,
        stepNumber: move
      }
    )
  }

  calculateWin(squares) {
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

    for(let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      console.log(a, b, c);
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

        return squares[a];
      }
    };

    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const moves = history.map((step, move) => {
      return (
        <li key={move}>
          <button onClick={() => this.toStep(move)}>
          {move === 0 ? `go to game start`: move}</button>
        </li>
      );
    });

    const winner = this.calculateWin(current.squares)
    const status = (winner || "") ? `${winner} is the winner!` : "";

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div><ol>{moves}</ol></div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game/>, document.getElementById('root'));
