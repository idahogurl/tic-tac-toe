import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialPlayerState = {
  isWinner: false,
  isPlaying: false,
  letterSelection: ""
};

const initialSpacesState = ["-1", "", "", "", "", "", "", "", "", ""]; //-1 simplifies zero-indexing

const initialState = {
  user: { ...initialPlayerState, isPlaying: true },
  computer: { ...initialPlayerState },
  displayTable: false,
  spaces: [...initialSpacesState],
  ended: false
};

export interface IPlayer {
  letterSelection: string;
  isWinner: boolean;
  isPlaying: boolean;
}

export interface IGame {
  user: IPlayer;
  computer: IPlayer;
  displayTable: boolean;
  spaces: string[];
  ended: boolean;
}

interface ISetSpaceAction {
  isUser: boolean;
  spaceNumber: number;
  letter: string;
}

interface ILetterSelection {
  userSelection: string;
  computerSelection: string;
}

interface ISetCurrentPlayerAction {
  isUser: boolean;
}

interface IEndGameAction {
  isUserWinner: boolean;
  isDraw: boolean;
}

// interface IUpdatePlayerAction {
//   isUser: boolean;
//   player: IPlayer;
// }

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setLetterSelection: (
      state: IGame,
      action: PayloadAction<ILetterSelection>
    ) => {
      const { userSelection, computerSelection } = action.payload;
      state.user.letterSelection = userSelection;
      state.computer.letterSelection = computerSelection;
      state.displayTable = true;
    },
    setSpace: (state: IGame, action: PayloadAction<ISetSpaceAction>) => {
      const { isUser, spaceNumber, letter } = action.payload;
      state.spaces[spaceNumber] = letter;
      state.user.isPlaying = !isUser;
      state.computer.isPlaying = isUser;
    },
    endGame: (state: IGame, action: PayloadAction<IEndGameAction>) => {
      const { isUserWinner, isDraw } = action.payload;
      if (isUserWinner) {
        state.user.isWinner = true;
      } else if (!isDraw) {
        state.computer.isWinner = true;
      }
      state.ended = true;
    },
    resetGame: () => {
      return initialState;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setLetterSelection,
  setSpace,
  resetGame,
  endGame
} = gameSlice.actions;

export default gameSlice.reducer;
