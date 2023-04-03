import React, { Component } from "react";
import TicTacToeTable from "./TicTacToeTable";
import ComputerActions from "./computerActions";
import { RootState } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";

import { setLetterSelection, setSpace, endGame, resetGame } from "./gameSlice";

class TicTacToePrompt extends Component<any, any> {
  render() {
    return (
      <div id="prompt" className={this.props.className}>
        Do you want to be <br />
        <button className="letterButton xLetter" onClick={()=> { this.props.handleClick('X') }}>
          X
        </button>
        {" "}or{" "}
        <button className="letterButton oLetter" onClick={()=> { this.props.handleClick('O') }}>
          O
        </button>
        ?
      </div>
    );
  }
}

class TurnIndicator extends Component<any, any> {
  render() {
    const { isPlaying } = this.props.computer;
    return (
      <div className={isPlaying ? "computersTurn" : "usersTurn"}>
        {isPlaying ? "computer's" : "your"} Turn
      </div>
    );
  }
}

class GameOverNotification extends Component<any, any> {
  render() {
    return (
      <div className={this.props.className} id="prompt">
        Game Over. {this.props.message}
        <div>
          <button className="resetButton" onClick={this.props.onClick}>Play again?</button>
        </div>
      </div>
    );
  }
}

const winningCombos: number[][] = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9]
];

function allFilled(spaces: string[]): boolean {
  let emptySpaces: string[] = spaces.filter((space: string) => {
    return space === "";
  });
  return emptySpaces.length === 0;
}

function hasWon(spaces: string[], letterSelection: string): boolean {
  return winningCombos.some((combo) => {
    let winFound = combo.every((spaceNumber: number) => {
      return spaces[spaceNumber] === letterSelection;
    });
    return winFound;
  });
}

export default function TicTacToeGame() {
  const game = useAppSelector((state: RootState) => state.game);
  const { computer, user, spaces, displayTable, ended } = game;

  const dispatch = useAppDispatch();

  function selectLetter(userSelection: string) {
    const computerSelection: string = userSelection === "O" ? "X" : "O";
    dispatch(setLetterSelection({ userSelection, computerSelection }));
  }

  function spaceSelected(spaceNumber: number) {
    // To store new value of `spaces` since `dispatch` is like `setState` where the updated value is not immediately available
    const spacesState = [...spaces];
    if (user.isPlaying) {
      let success: boolean = true;
      if (spacesState[spaceNumber] === "") {
        spacesState[spaceNumber] = user.letterSelection;
        dispatch(
          setSpace({
            isUser: true,
            spaceNumber,
            letter: user.letterSelection
          })
        );
      } else {
        success = false;
      }
      
      if (success) {
        const spacesAllFilled = allFilled(spacesState);
        const userWon = hasWon(spacesState, user.letterSelection);
        if (spacesAllFilled || userWon) {
          dispatch(endGame({ isUserWinner: userWon, isDraw: !userWon }));
        } else {
          setTimeout(function () {
            const computerAction = new ComputerActions(
              winningCombos,
              spacesState,
              computer.letterSelection
            );
            const spaceNumber = computerAction.play();
            spacesState[spaceNumber] = computer.letterSelection;
            dispatch(
              setSpace({
                isUser: false,
                spaceNumber,
                letter: computer.letterSelection
              })
            );

            const computerWon = hasWon(spacesState, computer.letterSelection);
            if (spacesAllFilled || computerWon) {
              dispatch(
                endGame({ isUserWinner: !computerWon, isDraw: !computerWon })
              );
            }
          }, 2000);
        }
      }
    }
  }

  let message: string = "";
  if (user.isWinner) {
    message = "You win.";
  }
  if (computer.isWinner) {
    message = "Computer wins.";
  }
  if (!message) message = "Draw.";

  return (
    <div>
      <TicTacToePrompt
        handleClick={selectLetter}
        className={displayTable ? "hide" : "show"}
      />

      <div id="game-over-notification" className={ended ? "show" : "hide"}>
        <div id="shadow-overlay"></div>
        <GameOverNotification
          id="game-over"
          message={message}
          onClick={() => {
            dispatch(resetGame());
          }}
        />
      </div>

      <div id="chalkboard-wrapper">
        <div id="chalkboard" className={displayTable ? "show" : "hide"}>
          <TurnIndicator computer={computer} />
          <TicTacToeTable
            handleClick={spaceSelected}
            computer={computer}
            spaces={spaces}
          />
        </div>
      </div>
    </div>
  );
}
