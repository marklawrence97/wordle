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

const state: AppState = {
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
        max-width: 450px;
    `;
  createHeader(root);
  createBoard(root);
  createKeyboard(root, state);
  createToast(root)

  const modal = createLeaderBoard(state, () => {overlay(root, modal, false)});
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
        const modal = createLeaderBoard(state, () => { overlay(root, modal, false)});
        overlay(root, modal, isGameOver(state));
      }, 1000);
    }

    if (letter) {
      updateWord(state, letter);
    }
  });
};

createApp();
