import { GameState, Owner } from "../App";
import { PlayerType } from "../types/PlayerType";

export function Player({
  player,
}: {
  player: PlayerType;
}) {
  const pct = (player.hp / player.maxHp) * 100;

  return (
    <div className="flex flex-col gap-2 p-4 border-b border-gray-500">
      <div>{player.icon} {player.name} — {player.hp}/{player.maxHp}</div>
      <div className="h-3 w-full bg-gray-200">
        <div className="h-full transition-all duration-300" style={{ width: `${pct}%`, background: player.color }} />
      </div>
    </div>
  );
}
