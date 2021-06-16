import React, { Component } from "react";

class TicTacToeSpace extends Component<any, any> {
  render() {
    return (
      <td
        id={this.props.spaceNumber}
        className="gameSpace"
        onClick={this.props.handleClick}
      >
        {this.props.letter}
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
        />
        <TicTacToeSpace
          spaceNumber={this.props.spaceNumberBegin + 1}
          handleClick={this.props.handleClick}
          letter={this.props.spaces[this.props.spaceNumberBegin + 1]}
        />
        <TicTacToeSpace
          spaceNumber={this.props.spaceNumberBegin + 2}
          handleClick={this.props.handleClick}
          letter={this.props.spaces[this.props.spaceNumberBegin + 2]}
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
        disabled={this.props.computer.isPlaying}
      >
        <tbody>
          <TicTacToeRow
            spaceNumberBegin={1}
            spaces={this.props.spaces}
            handleClick={this.props.handleClick}
          />
          <TicTacToeRow
            spaceNumberBegin={4}
            spaces={this.props.spaces}
            handleClick={this.props.handleClick}
          />
          <TicTacToeRow
            spaceNumberBegin={7}
            spaces={this.props.spaces}
            handleClick={this.props.handleClick}
          />
        </tbody>
      </table>
    );
  }
}