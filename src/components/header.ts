export function createHeader(root: HTMLElement) {
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
