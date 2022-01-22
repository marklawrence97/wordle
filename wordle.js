const FIVE_LETTER_WORDS = ["cigar","rebut","sissy","humph","awake","blush","focal","evade","naval","serve","heath","dwarf","model","karma","stink","grade","quiet","bench","abate","feign","major","death","fresh","crust","stool","colon","abase","marry","react","batty","pride","floss","helix","croak","staff","paper","unfed","whelp","trawl","outdo","adobe","crazy","sower","repay","digit","crate","cluck","spike","mimic","pound","maxim","linen","unmet","flesh","booby","forth","first","stand","belly","ivory","seedy","print","yearn","drain","bribe","stout","panel","crass","flume","offal","agree","error","swirl","argue","bleed","delta","flick","totem","wooer","front","shrub","parry"]

const root = document.getElementById("root")
root.style.cssText = `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const size = 50
const height = '3.5rem'
const width = '3.5rem'
const wordLength = 5
const guesses = 6
const background = "white"
const toastId = "toast"
const error = "red"
const winner = "green"
const close = "yellow"
const missed = "grey"
const seed = getRandomSeed()
const random = Math.floor(psuedoRandomNumber(seed) * (FIVE_LETTER_WORDS.length - 1))
// State

let target = FIVE_LETTER_WORDS[random]
let currentWord = ''
let currentGuess = 0


document.addEventListener("keypress", (e) => {
    const [code, letter] = e.code.split("Key")

    if (code === "Enter") {
        submit()
    }

    if (letter) {
        updateWord(letter)
    }
})

document.addEventListener("keydown", (e) => {
    if (e.code === "Backspace" && currentWord.length) {
        backspace()
    }
})

function submit() {
    if (currentWord.length === wordLength && currentGuess < guesses) {
        const lower = currentWord.toLowerCase()
        if (FIVE_LETTER_WORDS.includes(lower)) {
            updateTiles(lower, target)
            if (lower === target) {
                feedback("Correct!", winner)
            }
            currentGuess += 1
            currentWord = ''
        } else {
            feedback("Not a word", error)
        }
    }
}

function updateTiles(guess, target) {
    for (let i = 0; i < wordLength; i++) {
        if (guess[i] === target[i]) {
            const tile = document.getElementById(`${currentGuess}:${i}`)
            tile.style.backgroundColor = winner
            const key = document.getElementById(`key:${guess[i].toUpperCase()}`)
            key.style.backgroundColor = winner
        } else if (target.includes(guess[i])) {
            const tile = document.getElementById(`${currentGuess}:${i}`)
            tile.style.backgroundColor = close
            const key = document.getElementById(`key:${guess[i].toUpperCase()}`)
            key.style.backgroundColor = close
        } else {
            const tile = document.getElementById(`${currentGuess}:${i}`)
            tile.style.backgroundColor = missed 
            const key = document.getElementById(`key:${guess[i].toUpperCase()}`)
            key.style.backgroundColor = missed
        }
    }
}

function updateWord(letter) {
    const tile = document.getElementById(`${currentGuess}:${currentWord.length}`)

    if (currentWord.length < wordLength) {
        tile.innerText = letter
        currentWord += letter
    }
}

function backspace() {
    const tile = document.getElementById(`${currentGuess}:${currentWord.length - 1}`)
    tile.innerText = ''
    currentWord = currentWord.slice(0, currentWord.length - 1)
}

function createBoard() {
    const grid = document.createElement("div")
    grid.style.cssText = `
        display: flex;
        flex-Direction: column;
        align-items: center;
    `

    const toast = document.createElement("div")
    toast.id = toastId
    toast.style.cssText = `
        background-color: ${background};
        color: ${background};
        align-self: center;
        padding: 16px;
        border-radius: 4px;
        margin-bottom: 24px;
    `
    toast.innerText = "Placeholder"

    grid.appendChild(toast)
    
    for (let i = 0; i < guesses; i++) {
        const row = document.createElement("div")
        row.style.cssText = `
            display: flex;
            flexDirection: row;
        `

        for (let j = 0; j < wordLength; j++) {
            const tile = document.createElement("div")
            tile.style.cssText = `
            height: ${height}; 
            width: ${width}; 
            border: 1px solid black;
            margin: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;`

            tile.id = `${i}:${j}`
            row.appendChild(tile)
        }

        grid.appendChild(row)
    }

    root.appendChild(grid)
}

function createHeader() {
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

function createKeyboard() {
    const keyboard = document.createElement("div")
    const keys = [["Q","W","E","R","T","Y","U","I","O","P"], ["A","S","D","F","G","H","J","K","L"], ["Z","X","C","V","B","N","M"]]
    keyboard.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
    `

    const createKey = (letter) => {
        const key = document.createElement("button")
        key.onclick = () => updateWord(letter)
        key.style.cssText = `
            background-color: ${background};
            width: 2.5rem;
            height: 3rem;
            border-radius: 4px;
            margin: 2px;
            font-weight: bold;
            font-size: 1rem;
            border: 1px solid black;

        `
        key.innerText = letter
        key.id = `key:${letter}`

        return key
    }

    keys.forEach(row => {
        const rowContainer = document.createElement("div")
        rowContainer.style.cssText = `
            display: flex;
            flex-direction: row;  
        `
        row.forEach(letter => {
            const key = createKey(letter)
            rowContainer.appendChild(key)
        })

        keyboard.appendChild(rowContainer)
    })

    root.appendChild(keyboard)
}

function feedback(text, color) {
    const toast = document.getElementById(toastId)
    toast.innerText = text;
    toast.style.cssText = `
        background-color: ${color};
        align-self: center;
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1.5rem;
    `

    fadeOut(toastId, 0.05, 15)
}

function untilNextWord() {
    // next word comes out at midnight

    const now = new Date()
    const midnight = (new Date(now)).setHours(24, 0, 0, 0);

    const distance = midnight - now

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

}

function getRandomSeed() {
    const today = new Date()
    const day = today.getDate()
    const year = today.getFullYear()

    const seed = `${day}${year}`

    return seed
}

function psuedoRandomNumber(a) {
    /*
        Psuedo random number based on seed
        Taken from: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
    */

    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function fadeOut(id, increment, speed) {
    const fade = () => {
        const element = document.getElementById(id)
        let opacity = 1
        
        const interval = setInterval(() => {
            if (opacity <= 0) {
                clearInterval(interval)
            }
            
            element.style.opacity = opacity - increment
            opacity -= increment
            
        }, speed)
    }

    setTimeout(() => {
        fade()
    }, 1000)
}

createHeader()
createBoard()
createKeyboard()

untilNextWord()

getRandomSeed()

/* 
TODO List:

toast should be absolute position
*/