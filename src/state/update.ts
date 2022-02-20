import { AppState, Colors } from "../model";
import { GUESSES, TOAST_ID, WORD_LENGTH } from "../model";
import {
  FIVE_LETTER_TARGET_WORDS,
  FIVE_LETTER_VALID_GUESSES,
} from "../words/words";
import { styles } from "../theme/style";
import { feedback } from "../components/toast";

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
      window.localStorage.setItem("state", JSON.stringify(state));
      return;
    }

    if (FIVE_LETTER_VALID_GUESSES.includes(lower)) {
      updateTiles(state, lower);
      state.guesses.push(lower);
      state.currentWord = "";
      window.localStorage.setItem("state", JSON.stringify(state));
    } else {
      feedback("Not a word", "error");
    }
  }
}

function updateTiles(state: AppState, guess: string) {
  const { guesses, target } = state;

  const { success, secondaryBackground, warning } = styles.colors;

  for (let i = 0; i < WORD_LENGTH; i++) {
    const tile = document.getElementById(`${guesses.length}:${i}`);

    const key = document.getElementById(`key:${guess[i].toUpperCase()}`);
    tile.style.color = styles.colors.primaryBackground;

    if (guess[i] === target[i]) {
      tile.style.backgroundColor = success;
      tile.style.borderColor = success;
      key.style.backgroundColor = success;
    } else if (target.includes(guess[i])) {
      tile.style.backgroundColor = warning;
      tile.style.borderColor = warning;
      key.style.backgroundColor = warning;
    } else {
      tile.style.backgroundColor = secondaryBackground;
      tile.style.borderColor = secondaryBackground;
      key.style.backgroundColor = secondaryBackground;
    }
  }
}
