import type { GameState } from "../App";

export type GameControlsType = {
    gameState: GameState;
    onAddCards: () => void;
    onPickCards: () => void;
    onResetRound: () => void;
}