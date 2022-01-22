import { GUESSES, TOAST_ID, WORD_LENGTH } from "../model"
import { styles } from "../theme/style"

export function createBoard(root: HTMLElement) {
    const grid = document.createElement("div")
    grid.style.cssText = `
        display: flex;
        flex-Direction: column;
        align-items: center;
    `

    const toast = document.createElement("div")
    toast.id = TOAST_ID
    toast.style.cssText = `
        background-color: ${styles.colors.primaryBackground};
        color: ${styles.colors.primaryBackground};
        align-self: center;
        padding: 16px;
        border-radius: 4px;
        margin-bottom: 24px;
    `
    toast.innerText = "Placeholder"

    grid.appendChild(toast)
    
    for (let i = 0; i < GUESSES; i++) {
        const row = document.createElement("div")
        row.style.cssText = `
            display: flex;
            flexDirection: row;
        `

        for (let j = 0; j < WORD_LENGTH; j++) {
            const tile = document.createElement("div")
            tile.style.cssText = `
                height: 3rem; 
                width: 3rem; 
                border: 1px solid black;
                margin: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                font-weight: bold;
            `

            tile.id = `${i}:${j}`
            row.appendChild(tile)
        }

        grid.appendChild(row)
    }

    root.appendChild(grid)
}