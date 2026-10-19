import { GamePhase } from "../App";
import type { GameControlsType } from "../types/GameContolsType";

export function GameControls({ gamePhase, onPlanning, onPicking, onResetRound }: GameControlsType) {
  switch (gamePhase) {
    case GamePhase.Planning:
      return (
          <button type="button" onClick={onPlanning} className="p-4 border-2 cursor-pointer">
            Add cards
          </button>
      );

    case GamePhase.Picking:
      return (
          <button type="button" onClick={onPicking} className="p-4 border-2 cursor-pointer">
            Pick cards
          </button>
      );

    case GamePhase.Action:
      return (
        <button type="button" onClick={onResetRound} className="p-4 border-2 cursor-pointer">
          Next round
        </button>
      );

    default: {
      return null;
    }
  }
}