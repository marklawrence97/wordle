import { AppState, Colors } from "../model";
import { GUESSES, TOAST_ID, WORD_LENGTH } from "../model";
import {
  FIVE_LETTER_TARGET_WORDS,
  FIVE_LETTER_VALID_GUESSES,
} from "../words/words";
import { styles } from "../theme/style";
import { fadeOut } from "../utils/animation";

export function updateWord(state: AppState, letter: string) {
  const { guesses, currentWord } = state;

  const tile = document.getElementById(
    `${guesses.length}:${currentWord.length}`
  );

  if (currentWord.length < WORD_LENGTH) {
    tile.innerText = letter;
    state.currentWord += letter;
  }
}

export function backspace(state: AppState) {
  const { guesses, currentWord } = state;
  const tile = document.getElementById(
    `${guesses.length}:${currentWord.length - 1}`
  );
  tile.innerText = "";
  state.currentWord = currentWord.slice(0, currentWord.length - 1);
}

export function submit(state: AppState) {
  const { guesses, currentWord } = state;

  if (currentWord.length === WORD_LENGTH && guesses.length < GUESSES) {
    const lower = currentWord.toLowerCase();

    if (FIVE_LETTER_TARGET_WORDS.includes(lower)) {
      if (lower === state.target) {
        feedback("Correct!", "success");
      }

      updateTiles(state, lower);
      state.guesses.push(lower);
      state.currentWord = "";
      return;
    }

    if (FIVE_LETTER_VALID_GUESSES.includes(lower)) {
      updateTiles(state, lower);
      state.guesses.push(lower);
      state.currentWord = "";
    } else {
      feedback("Not a word", "error");
    }
  }
}

function updateTiles(state: AppState, guess: string) {
  const { guesses, target } = state;

  const { success, secondaryBackground, warning } = styles.colors;

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === target[i]) {
      const tile = document.getElementById(`${guesses.length}:${i}`);
      tile.style.backgroundColor = success;
      const key = document.getElementById(`key:${guess[i].toUpperCase()}`);
      key.style.backgroundColor = success;
    } else if (target.includes(guess[i])) {
      const tile = document.getElementById(`${guesses.length}:${i}`);
      tile.style.backgroundColor = warning;
      const key = document.getElementById(`key:${guess[i].toUpperCase()}`);
      key.style.backgroundColor = warning;
    } else {
      const tile = document.getElementById(`${guesses.length}:${i}`);
      tile.style.backgroundColor = secondaryBackground;
      const key = document.getElementById(`key:${guess[i].toUpperCase()}`);
      key.style.backgroundColor = secondaryBackground;
    }
  }
}

function feedback(text: string, color: keyof Colors) {
  const toast = document.getElementById(TOAST_ID);
  toast.innerText = text;
  toast.style.cssText = `
        background-color: ${styles.colors[color]};
        align-self: center;
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1.5rem;
    `;

  fadeOut(TOAST_ID, 0.05, 15);
}
