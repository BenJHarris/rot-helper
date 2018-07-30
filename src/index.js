import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class RotHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userString: "",
      letterShiftArray = []
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
          {this.createLetters(this.state.userString)}
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

  rotateChar(index, num) {
    let origVal = this.props.value.charCodeAt(0);
    let asciiVal = char.charCodeAt(0);
    asciiVal += num;
    this.setState({
      value: String.fromCharCode(asciiVal),
      offset: asciiVal - origVal
    });
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
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea value={this.props.value} onChange={this.props.handleChange} placeholder='Enter text to rotate' />
      </form>
    )
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
      <div className="rot-letter">
        <button onClick={() => this.rotate(this.state.value, 1)}>
          /\
        </button>
        <p>
          {this.state.value}
        </p>
        <button onClick={() => this.rotate(this.state.value, -1)}>
          \/
        </button>
        <p>
          {this.state.offset}
        </p>
      </div>
    )
  }


}


// ========================================

ReactDOM.render(
  <RotHelper />,
  document.getElementById('root')
);

  