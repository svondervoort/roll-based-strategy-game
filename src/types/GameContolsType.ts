import type { GamePhase } from "../App";

export type GameControlsType = {
    gamePhase: GamePhase;
    onPlanning: () => void;
    onPicking: () => void;
    onResetRound: () => void;
}