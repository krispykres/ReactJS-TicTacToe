import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  //constructor to the class to initialize the state
  constructor(props) {
      super(props);
      this.state = {
          value: null,
      };
  }
    
  //Here we are rendering buttons that have an initial value of null, but state is updated to display 'X' every time they are clicked.
  render() {
    return (
      <button className="square" onClick={ () => this.setState({value: 'X'}) }>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  //This method is returns the Square component, passing a prop value of i
  renderSquare(i) {
    return <Square value={i} />;
  }

  //Here we are rendering the entire board, passing values to be accepted by our renderSquare function
  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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

