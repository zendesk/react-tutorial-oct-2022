import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Square class replaced by equivalent function component
// class Square extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }
//     render() {
//       return (
//         <button
//             className="square"
//             onClick={() => {
//                 this.props.onClick();
//                 console.log('SQUARE[' + this.props.idx + '] click');
//             }}>
//           {this.props.value}
//         </button>
//       );
//     }
//    }
function Square(props) {
    return (
        <button
            className="square"
            onClick={() => {
                console.log('SQUARE[' + props.idx + '] click');
                props.onClick();
            }}>
          {props.value}
        </button>
    );
}





class Board extends React.Component {

    renderSquare(i) {
        return <Square
            idx={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}











class Game extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares_copy = current.squares.slice();
    if (calculateWinner(squares_copy)) {
        console.log('Game over!');
        return;
    } else if (squares_copy[i]) {
        console.log('try again, square ' + i + ' already clicked');
        return;

    } else {
        console.log('BOARD click: ' + i);
        squares_copy[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares_copy,
          }]),  
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext
        });
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return(
        <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )  
    })

    let status;
    if (winner) {
        status = 'Winner:' + winner;
        console.log('Winner:' + winner);
    } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    } 

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
    const winning_lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winning_lines.length; i++) {
      const [a, b, c] = winning_lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
