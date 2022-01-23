import { GUESSES, WORD_LENGTH } from "../model";

export function createBoard(root: HTMLElement) {
  const grid = document.createElement("div");
  grid.style.cssText = `
        display: flex;
        flex-Direction: column;
        align-items: center;
    `;

  for (let i = 0; i < GUESSES; i++) {
    const row = document.createElement("div");
    row.style.cssText = `
            display: flex;
            flexDirection: row;
        `;

    for (let j = 0; j < WORD_LENGTH; j++) {
      const tile = document.createElement("div");
      tile.style.cssText = `
                height: 3rem; 
                width: 3rem; 
                border: 1px solid black;
                margin: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                line-height: 3rem;
                font-weight: bold;
            `;

      tile.id = `${i}:${j}`;
      row.appendChild(tile);
    }

    grid.appendChild(row);
  }

  root.appendChild(grid);
}
