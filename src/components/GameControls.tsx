import { GameState } from "../App";
import type { GameControlsType } from "../types/GameContolsType";

export function GameControls({ gameState, onAddCards, onPickCards, onResetRound }: GameControlsType) {
  switch (gameState) {
    case GameState.SelectCards:
      return (
          <button type="button" onClick={onAddCards} className="p-4 border-2 cursor-pointer">
            Add cards
          </button>
      );

    case GameState.AddCards:
      return (
          <button type="button" onClick={onPickCards} className="p-4 border-2 cursor-pointer">
            Pick cards
          </button>
      );

    case GameState.CardsPicked:
      return (
        <button type="button" onClick={onResetRound} className="p-4 border-2 cursor-pointer">
          Reset game
        </button>
      );

    default: {
      return null;
    }
  }
}