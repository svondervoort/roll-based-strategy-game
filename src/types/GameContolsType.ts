import type { GameState } from "../App";

export type GameControlsType = {
    gameState: GameState;
    onAddCards: () => void;
    onPickCard: () => void;
    onReset: () => void;
}