import { GameState } from "../App";
import type { GameControlsType } from "../types/GameContolsType";

export function GameControls({ gameState, onAddCards, onPickCard, onReset }: GameControlsType) {
  switch (gameState) {
    case GameState.SelectCards:
      return (
          <button type="button" onClick={onAddCards} className="p-4 border-2 cursor-pointer">
            Add cards
          </button>
      );

    case GameState.AddCards:
      return (
          <button type="button" onClick={onPickCard} className="p-4 border-2 cursor-pointer">
            Pick cards
          </button>
      );

    case GameState.CardsPicked:
      return (
        <button type="button" onClick={onReset} className="p-4 border-2 cursor-pointer">
          Reset game
        </button>
      );

    default: {
      return null;
    }
  }
}