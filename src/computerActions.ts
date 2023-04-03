import Chance from "chance";

class RandomSpace {
  indexRange: number[];
  spaces: string[];
  constructor(indexRange: number[], spaces: string[]) {
    this.indexRange = indexRange;
    this.spaces = spaces;
  }

  get(): number {
    let emptySpaces = this.getEmptySpaces();
    let maxIndex: number = emptySpaces.length - 1;

    if (maxIndex === 0) {
      return emptySpaces[0];
    } else if (maxIndex !== -1) {
      let found: boolean = false;
      let chance = new Chance();
      while (!found) {
        let randomIndex: number = chance.integer({ min: 0, max: maxIndex });
        let spaceNumber: number = emptySpaces[randomIndex];
        if (this.spaces[spaceNumber] === "") {
          return spaceNumber;
        }
      }
    }
    return -1;
  }

  getEmptySpaces(): number[] {
    //get the emptySpaces
    let emptySpaces: number[] = [];
    this.indexRange.forEach((index) => {
      if (this.spaces[index] === "") {
        emptySpaces.push(index);
      }
    });
    return emptySpaces;
  }
}

export default class ComputerActions {
  winningCombos: number[][];
  spaces: string[];
  letterSelection: string;
  constructor(
    winningCombos: number[][],
    spaces: string[],
    letterSelection: string
  ) {
    this.winningCombos = winningCombos;
    this.spaces = spaces;
    this.letterSelection = letterSelection;
  }

  getWinSpace(): number {
    let spaceNumber: number = -1;

    const spaceFound = this.winningCombos.some((combo) => {
      let emptySpaces: number = 0;
      let computerSpaces: number = 0;

      combo.forEach((space: number) => {
        let value: string = this.spaces[space];
        if (value === "") {
          spaceNumber = space;
          emptySpaces++;
        } else if (value === this.letterSelection) {
          computerSpaces++;
        }
      });

      return emptySpaces === 1 && computerSpaces === 2;
    });
    if (!spaceFound) spaceNumber = -1;
    return spaceNumber;
  }

  getBlockSpace(): number {
    let spaceNumber: number = -1;

    let spaceFound = this.winningCombos.some((combo) => {
      let emptySpaces: number = 0;
      let userSpaces: number = 0;

      combo.forEach((space) => {
        let value: string = this.spaces[space];
        if (value === "") {
          spaceNumber = space;
          emptySpaces++;
        } else if (value !== this.letterSelection) {
          userSpaces++;
        }
      });

      return emptySpaces === 1 && userSpaces === 2;
    });
    if (!spaceFound) spaceNumber = -1;
    return spaceNumber;
  }

  getCornerSpace(): number {
    let cornerSpaces: number[] = [1, 3, 7, 9];

    let space = new RandomSpace(cornerSpaces, this.spaces);
    return space.get();
  }

  getEmptySpace(): number {
    const indexes: number[] = Array.from({ length: 9 }, (_, index) => {
      return index + 1;
    });

    let space = new RandomSpace(indexes, this.spaces);
    return space.get();
  }

  play() {
    let spaceNumber: number;
    spaceNumber = this.getWinSpace();
    if (spaceNumber === -1) {
      spaceNumber = this.getBlockSpace();
    }
    if (spaceNumber === -1) {
      spaceNumber = this.getCornerSpace();
    }
    if (spaceNumber === -1) {
      spaceNumber = this.getEmptySpace();
    }

    return spaceNumber;
  }
}
