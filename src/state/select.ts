import { AppState, GUESSES } from "../model";

export const isSuccess = ({ guesses, target }: AppState): boolean => guesses.length > 0 && guesses[guesses.length - 1] === target

export const isFail = ({ guesses }: AppState): boolean => guesses.length >= GUESSES

export const isGameOver = (state: AppState): boolean => isSuccess(state) || isFail(state)
