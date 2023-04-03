import React, { Component } from "react";

class TicTacToeSpace extends Component<any, any> {
  render() {
    return (
      <td
        className="gameSpace"
      >
        <button 
          className="gameSpaceButton" 
          onClick={() => {
            this.props.handleClick(this.props.spaceNumber)
          }} 
          disabled={this.props.disabled}
        >{this.props.letter || " "}</button>
      </td>
    );
  }
}

class TicTacToeRow extends Component<any, any> {
  render() {
    return (
      <tr>
        <TicTacToeSpace
          spaceNumber={this.props.spaceNumberBegin}
          handleClick={this.props.handleClick}
          letter={this.props.spaces[this.props.spaceNumberBegin]}
          disabled={this.props.disabled}
        />
        <TicTacToeSpace
          spaceNumber={this.props.spaceNumberBegin + 1}
          handleClick={this.props.handleClick}
          letter={this.props.spaces[this.props.spaceNumberBegin + 1]}
          disabled={this.props.disabled}
        />
        <TicTacToeSpace
          spaceNumber={this.props.spaceNumberBegin + 2}
          handleClick={this.props.handleClick}
          letter={this.props.spaces[this.props.spaceNumberBegin + 2]}
          disabled={this.props.disabled}
        />
      </tr>
    );
  }
}

export default class TicTacToeTable extends Component<any, any> {
  render() {
    return (
      <table
        id="gameTable"
        className="center-block"
      >
        <tbody>
          <TicTacToeRow
            spaceNumberBegin={1}
            spaces={this.props.spaces}
            handleClick={this.props.handleClick}
            disabled={this.props.computer.isPlaying}
          />
          <TicTacToeRow
            spaceNumberBegin={4}
            spaces={this.props.spaces}
            handleClick={this.props.handleClick}
            disabled={this.props.computer.isPlaying}
          />
          <TicTacToeRow
            spaceNumberBegin={7}
            spaces={this.props.spaces}
            handleClick={this.props.handleClick}
            disabled={this.props.computer.isPlaying}
          />
        </tbody>
      </table>
    );
  }
}