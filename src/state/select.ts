import { AppState } from "../model";

export const isGameOver = ({ guesses, target }: AppState) => guesses.length > 0 && guesses[guesses.length - 1] === target