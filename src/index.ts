import { pickRandomElement } from './utils/random'
import { FIVE_LETTER_TARGET_WORDS} from './words/words'
import { AppState } from './model'
import { backspace, submit, updateWord } from './state/update'

import { styles } from './theme/style'

const state: AppState = {
    target: pickRandomElement(FIVE_LETTER_TARGET_WORDS),
    currentWord: '',
    currentGuess: 0
}

export const WORD_LENGTH = 5
export const GUESSES = 6
export const TOAST_ID = 'toast'

function createBoard(root: HTMLElement) {
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

function createKeyboard(root: HTMLElement) {
    const keyboard = document.createElement("div")
    const keys = [["Q","W","E","R","T","Y","U","I","O","P"], ["A","S","D","F","G","H","J","K","L"], ["Z","X","C","V","B","N","M"]]
    keyboard.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
    `

    const createKey = (letter: string, onPress: () => void) => {
        const key = document.createElement("button")
        key.onclick = onPress
        key.style.cssText = `
            background-color: ${styles.colors.primaryBackground};
            padding: 1rem;
            border-radius: 4px;
            margin: 0.1rem;
            font-weight: bold;
            font-size: 1rem;
            border: 1px solid black;

        `
        key.innerText = letter
        key.id = `key:${letter}`

        return key
    }

    for (let i = 0; i < keys.length; i ++) {
        const row = keys[i]
        const rowContainer = document.createElement("div")
        rowContainer.style.cssText = `
        display: flex;
        flex-direction: row;  
        `

        if (i === keys.length - 1) {
            const enter = createKey("Enter", () => submit(state))
            rowContainer.appendChild(enter)
        }

        row.forEach(letter => {
            const key = createKey(letter, () => updateWord(state, letter))
            rowContainer.appendChild(key)
        })

        if (i === keys.length - 1) {
            const del = createKey("Del", () => backspace(state))
            rowContainer.appendChild(del)
        }
        
        keyboard.appendChild(rowContainer)
    }

    root.appendChild(keyboard)
}

function createHeader(root: HTMLElement) {
    const header = document.createElement("div")
    header.innerText = "WORDLE"
    header.style.cssText = `
        display: flex;
        font-weight: bold;
        justify-content: center;
        font-size: 2rem;
        border-bottom: 1px solid grey
    `

    root.appendChild(header)
}


const createApp = () => {
    const root = document.getElementById("root")
    root.style.cssText = `
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `

    createHeader(root)
    createBoard(root)
    createKeyboard(root)

    document.addEventListener("keydown", (e) => {
        if (e.code === "Backspace" && state.currentWord.length) {
            backspace(state)
        }
    })

    document.addEventListener("keypress", (e) => {
        const [code, letter] = e.code.split("Key")
    
        if (code === "Enter") {
            submit(state)
        }
    
        if (letter) {
            updateWord(state, letter)
        }
    })
}

createApp()