import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class RotHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      string: ""
    }
  }

  render() {
    return (
      <div className="rot-helper-app">
        <div className="rot-helper-title">
          <RHTitle />
        </div>
        <div className="rot-helper-input">
          <RHInput handleChange={(event) => this.handleChange(event)} />
        </div>
        <div className="rot-helper-output">
          {this.createLetters(this.state.string)}
        </div>
      </div>
    );
  }

  createLetters(string) {
    let letters = []
    for (let i = 0; i < string.length; i++) {
      letters.push(<RHLetter value={string[i]} key={i} />)
    }
    return letters;
  } 

  handleChange(event) {
    this.setState({
      string: event.target.value
    })
  }
}

function RHTitle() {
  return (
    <h1>ROT Helper</h1>
  )
}

class RHInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'yeet'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea value={this.state.value} onChange={this.handleChange} />
      </form>
    )
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.handleChange(event);
  }
}

class RHLetter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      offset: 0
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.rotate(this.state.value, 1)}>
          up
        </button>
        <p>
          {this.state.value}
        </p>
        <button onClick={() => this.rotate(this.state.value, -1)}>
          down
        </button>
        <p>
          {this.state.offset}
        </p>
      </div>
    )
  }

  rotate(char, num) {
    let origVal = this.props.value.charCodeAt(0);
    let asciiVal = char.charCodeAt(0);
    asciiVal += num;
    this.setState({
      value: String.fromCharCode(asciiVal),
      offset: asciiVal - origVal
    });
  }
}


// ========================================

ReactDOM.render(
  <RotHelper />,
  document.getElementById('root')
);

  