import { AppState, GUESSES, WORD_LENGTH } from "../model";
import { MAX_WIDTH } from "../theme/style";

export function createBoard(root: HTMLElement, state: AppState): void {
  const { guesses } = state;

  const board = document.createElement("div");
  board.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin: 1rem 0rem;
  `;

  const grid = document.createElement("div");
  grid.style.cssText = `
        display: grid;
        grid-template-rows: repeat(${GUESSES}, 1fr);
        height: 420px;
        width: 100%;
        max-width: ${MAX_WIDTH};
        grid-gap: 5px;
    `;

  for (let i = 0; i < GUESSES; i++) {
    const row = document.createElement("div");
    row.style.cssText = `
            display: grid;
            grid-template-columns: repeat(${WORD_LENGTH}, 1fr);
            grid-gap: 5px;
        `;

    let previousGuess = "";
    if (guesses.length >= i) {
      previousGuess = guesses[i] || "";
    }

    for (let j = 0; j < WORD_LENGTH; j++) {
      const tile = document.createElement("div");
      tile.style.cssText = `
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid black;
              font-size: 2rem;
              font-weight: bold;
            `;

      tile.innerText = previousGuess.slice(j, j + 1).toUpperCase();

      tile.id = `${i}:${j}`;
      row.appendChild(tile);
    }

    grid.appendChild(row);
  }

  board.appendChild(grid);
  root.appendChild(board);
}
