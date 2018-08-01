import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class RotHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStr: "",
      currentStr: "",
      letterShiftArray: [],
      globalOffset: 0
    }
  }

  render() {
    return (
      <div className="rot-helper-app">
        <div className="rot-helper-title">
          <RHTitle />
        </div>
        <div className="rot-helper-input">
          <RHInput 
            handleChange={(event) => this.handleChange(event)} 
          />
        </div>
        <div className="rot-helper-controls">
          <RHControl
            handleGlobalRotate={this.handleGlobalRotate.bind(this)}
            handleReset={this.handleReset.bind(this)}
          />
        </div>
        <div className="rot-helper-letters">
          {this.createLetters(this.calcString())}
        </div>
        <div className="rot-helper-output">
        <p>{this.calcString()}</p>
        </div>
      </div>
    );
  }

  createLetters(string) {
    let letters = []
    for (let i = 0; i < string.length; i++) {
      letters.push(<RHLetter 
        value={string[i]} 
        key={i} 
        index={i}
        handleRotate={this.handleRotate.bind(this)}
        offset={this.state.letterShiftArray[i] + this.state.globalOffset} />)
    }
    return letters;
  } 

  handleChange(event) {
    let str = event.target.value;
    let lsa = this.state.letterShiftArray;
    for (let i = 0; i < str.length; i++) {
      if (lsa[i] === undefined) {
        lsa[i] = 0;
      }
    }
    this.setState({
      userStr: str,
      letterShiftArray: lsa,
    });
  }

  handleRotate(index, num) {
    let lsa = this.state.letterShiftArray;
    lsa[index] += num;
    this.setState ({
      letterShiftArray: lsa,
    });
  }

  handleGlobalRotate(num) {
    let offset = this.state.globalOffset + num
    this.setState({
      globalOffset: offset
    })
  }

  handleReset() {
    let lsr = this.state.letterShiftArray;
    for (let i = 0; i < lsr.length; i++) {
      lsr[i] = 0;
    }
    this.setState({
      letterShiftArray: lsr,
      globalOffset: 0
    });
  }

  calcString() {
    let str = this.state.userStr;
    let lsa = this.state.letterShiftArray;
    let currentStr = "";
    for (let i = 0; i < str.length; i++) {
      currentStr += String.fromCharCode(str.charCodeAt(i) + lsa[i] + this.state.globalOffset);
    }
    return currentStr;
  }
}

class RHTitle extends React.Component {

  render() {
    return (
      <h1>ROT Helper</h1>
    )
  }

}

class RHInput extends React.Component {

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea 
          value={this.props.value}
          onChange={this.props.handleChange} 
          placeholder='Enter text to rotate' />
      </form>
    )
  }
}

class RHLetter extends React.Component {

  render() {
    return (
      <div className="rot-letter">
        <button onClick={() => this.props.handleRotate(this.props.index, 1)}>
          /\
        </button>
        <div className="char-container">
          {this.props.value}
        </div>
        <button onClick={() => this.props.handleRotate(this.props.index, -1)}>
          \/
        </button>
        <div className="char-container">
          {this.props.offset}
        </div>
      </div>
    )
  }
}

class RHControl extends React.Component {
  render() {
    return (
    <div className="rot-letter">
      <button onClick={() => this.props.handleGlobalRotate(1)}>
        /\
      </button>
      <button onClick={() => this.props.handleReset()}>
        X
      </button>
      <button onClick={() => this.props.handleGlobalRotate(-1)}>
        \/
      </button>
    </div>
  );
  }
}


// ========================================

ReactDOM.render(
  <RotHelper />,
  document.getElementById('root')
);

  