import { Colors, TOAST_ID } from "../model";
import { styles } from "../theme/style";
import { fadeOut } from "../utils/animation";

export function feedback(text: string, color: keyof Colors) {
    const toast = document.getElementById(TOAST_ID);
    toast.innerText = text;
    toast.style.display = 'block'
    toast.style.opacity = '1'
    toast.style.backgroundColor = styles.colors[color]
  
    fadeOut(TOAST_ID, 0.05, 15);
  }

export function createToast(root: HTMLElement) {

    const toast = document.createElement("div");
    toast.id = TOAST_ID;
    toast.style.cssText = `
        position: absolute;
        top: 15%;
        padding: 1rem;
        color: ${styles.colors.primaryBackground};
        align-self: center;
        border-radius: 4px;
    `;

    root.appendChild(toast)
}