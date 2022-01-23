import { getTimeUntilNextWord } from "../utils/date";
import { AppState, Colors } from "../model";
import { isSuccess } from "../state/select";

import Close from '../images/close.svg'

export function createLeaderBoard(state: AppState, onClose: () => void) {
  const container = document.createElement("div");
  const content = document.createElement("div")
  const counter = document.createElement("p");
  const header = document.createElement("h3")
  const toolbar = document.createElement("div")
  toolbar.style.display = 'flex'
  toolbar.style.justifyContent = 'flex-end'

  const img = document.createElement("div")
  img.innerHTML = Close
  img.style.height = '2rem'
  img.style.width = '2rem'
  img.style.margin = '0.5rem'
  img.onclick = () => onClose()

  toolbar.appendChild(img)

  container.appendChild(toolbar)

  if (isSuccess(state)) {
    header.innerText = "Nicely done!"
    content.appendChild(header)
  } else {
    header.innerText = "Close! Try again tomorrow"
    content.appendChild(header) 
  }

  container.style.cssText = `
      display: flex;
      background-color: white;
      border-radius: 4px;
      box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 29px 0px;
      flex-direction: column;
    `;

  content.style.cssText = `
    display: flex;
    padding: 2rem;
    flex-direction: column;
  `
  const { hours, minutes, seconds } = getTimeUntilNextWord();
  counter.innerText = `New word in: ${hours}:${minutes}:${seconds}`;

  setInterval(() => {
    const { hours, minutes, seconds } = getTimeUntilNextWord();
    counter.innerText = `New word in: ${hours}:${minutes}:${seconds}`;
  }, 1000);

  content.appendChild(counter)

  container.appendChild(content)

  return container;
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
