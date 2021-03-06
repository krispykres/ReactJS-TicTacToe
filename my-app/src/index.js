import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
class Square extends React.Component {
  //Here we are rendering buttons to use an onClick event to call the the onClick props in the Board component. The value is passed as the props value from the renderswuare method in the board component.
  render() {
    return (
      <button
       className="square"
       onClick={ () => this.props.onClick() }
      >
         {this.props.value}
      </button>
    );
  }
}
*/

//class component above converted into a functional component
function Square(props) {
    return (
      <button
       className="square"
       onClick={ props.onClick }
      >
         {props.value}
      </button>
    )
}

class Board extends React.Component {
    
  //This method returns the Square component, passing down 2 props: value and onClick. The onClick prop is a function that the square component can call when clicked.
  renderSquare(i) {
    return (
    <Square
      value={this.props.squares[i]}
      onClick={ () => this.props.onClick(i) }
    />
    );
  }

  //Here we are rendering the entire board, passing values to be accepted by our renderSquare function
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
      };
  }
    
  //handleClick method to get the array, duplicate it and save it as squares, have the associated value of the position in the array be x, and update the state of the array to reflect the new value (X).
  //State is now held in the board component instead of the square components
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    //This if statement allows the handleClick function to return early by ignoring a click if someone has won the game or if a Square is already filled.
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
          squares: squares
      }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
    });
  }
    
  jumpTo(step) {
      this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
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
        return (
            <li key={move}>
                <button onClick={ () => this.jumpTo(move)}>{desc}</button>
            </li>
        );
    });
      
    let status;
    if(winner) {
        status = 'Winner: ' + winner; 
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



// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
