import { getTimeUntilNextWord } from "../utils/date";
import { Colors } from "../model";

export function createLeaderBoard() {
  const content = document.createElement("div");
  content.style.cssText = `
        background-color: white;
        border-radius: 4px;
        padding: 4rem;
        box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 29px 0px;
    `;
  const { hours, minutes, seconds } = getTimeUntilNextWord();
  content.innerText = `New word in: ${hours}:${minutes}:${seconds}`;

  setInterval(() => {
    const { hours, minutes, seconds } = getTimeUntilNextWord();
    content.innerText = `New word in: ${hours}:${minutes}:${seconds}`;
  }, 1000);

  return content;
}

export function overlay(
  root: HTMLElement,
  content: HTMLElement,
  toggle: boolean,
  backgroundColor?: keyof Colors
) {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
        height: 100%;
        width: 100%;
        position: absolute;
        display: ${toggle ? "flex" : "none"};
        justify-content: center;
        align-items: center;
        inset: 0;
        background-color: ${
          backgroundColor ? backgroundColor : "rgba(255,255,255,0.3)"
        };
        animation-duration: 0.25s;
        animation-name: slide-in;
    `;

  overlay.appendChild(content);
  root.appendChild(overlay);
}
