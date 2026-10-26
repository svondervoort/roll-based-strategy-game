import { GamePhase } from "../App";
import { PlayerKind, type PlayerType } from "../types/PlayerType";

export function Player({
  player,
  gamePhase,
  onClick,
}: {
  player: PlayerType;
  gamePhase: GamePhase;
  onClick?: (player: PlayerType) => void;
}) {
  const pct = (player.hp / player.maxHp) * 100;

  return (
    <button
    type="button"
    disabled={ player.kind === PlayerKind.User || player.hp <= 0 }
    className={`
      w-full text-start flex flex-col gap-2 p-4 border-b border-gray-500 bg-transparent transition-colors
      ${player.kind !== PlayerKind.User && gamePhase === GamePhase.PlayerAction && player.hp > 0 ? 'hover:bg-amber-100 cursor-pointer' : ''}
      `}
    onClick={() => onClick?.(player)}
    >
      <div>{ player.hp > 0 ? player.icon : '☠️' } {player.name} — {player.hp}/{player.maxHp}</div>
      <div className="h-3 w-full bg-gray-200">
        <div className="h-full transition-all duration-300" style={{ width: `${pct}%`, background: player.color }} />
      </div>
    </button>
  );
}
