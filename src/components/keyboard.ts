import { AppState } from "../model";
import { backspace, submit, updateWord } from "../state/update";
import { styles } from "../theme/style";

export function createKeyboard(root: HTMLElement, state: AppState) {
  const keyboard = document.createElement("div");
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];
  keyboard.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
    `;

  const createKey = (letter: string, onPress: () => void) => {
    const key = document.createElement("button");
    key.onclick = onPress;
    key.style.cssText = `
            background-color: ${styles.colors.cloud};
            padding: 1rem;
            border-radius: 4px;
            border: 0;
            margin: 0.1rem;
            font-weight: bold;
            font-size: 1rem;
        `;
    key.innerText = letter;
    key.id = `key:${letter}`;

    return key;
  };

  for (let i = 0; i < keys.length; i++) {
    const row = keys[i];
    const rowContainer = document.createElement("div");
    rowContainer.style.cssText = `
            display: flex;
            flex-direction: row;  
        `;

    if (i === keys.length - 1) {
      const enter = createKey("Enter", () => submit(state));
      rowContainer.appendChild(enter);
    }

    row.forEach((letter) => {
      const key = createKey(letter, () => updateWord(state, letter));
      rowContainer.appendChild(key);
    });

    if (i === keys.length - 1) {
      const del = createKey("Del", () => backspace(state));
      rowContainer.appendChild(del);
    }

    keyboard.appendChild(rowContainer);
  }

  root.appendChild(keyboard);
}
