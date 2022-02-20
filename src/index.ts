import { pickRandomElement } from "./utils/random";
import { FIVE_LETTER_TARGET_WORDS } from "./words/words";
import { AppState } from "./model";
import { backspace, submit, updateWord } from "./state/update";

import { createBoard } from "./components/board";
import { createKeyboard } from "./components/keyboard";
import { createHeader } from "./components/header";
import { isGameOver } from "./state/select";
import { createLeaderBoard, overlay } from "./components/modal";
import { createToast } from "./components/toast";
import { MAX_WIDTH } from "./theme/style";

const appState: AppState = {
  target: pickRandomElement(FIVE_LETTER_TARGET_WORDS),
  currentWord: "",
  guesses: [],
};

const createApp = () => {
  const root = document.getElementById("root");
  root.style.cssText = `
        display: flex;
        flex-direction: column;

        height: 100%;
        width: 100%;
        margin: 0 auto;
        max-width: ${MAX_WIDTH};
    `;

  const previousState = JSON.parse(localStorage.getItem("state"));
  const state = previousState || { ...appState };

  createHeader(root);
  createBoard(root, state);
  createToast(root);
  createKeyboard(root, state);

  for (let i = 0; i < state.guesses.length; i++) {
    const previousState = {
      ...state,
      currentWord: state.guesses[i],
      guesses: state.guesses.slice(0, i),
    };

    submit(previousState);
  }

  const modal = createLeaderBoard(state, () => {
    overlay(root, modal, false);
  });
  overlay(root, modal, isGameOver(state));

  document.addEventListener("keydown", (e) => {
    if (isGameOver(state)) return;

    if (e.code === "Backspace" && state.currentWord.length) {
      backspace(state);
    }
  });

  document.addEventListener("keypress", (e) => {
    if (isGameOver(state)) return;

    const [code, letter] = e.code.split("Key");

    if (code === "Enter") {
      submit(state);
      setTimeout(() => {
        const modal = createLeaderBoard(state, () => {
          overlay(root, modal, false);
        });
        overlay(root, modal, isGameOver(state));
      }, 1000);
    }

    if (letter) {
      updateWord(state, letter);
    }
  });
};

createApp();
