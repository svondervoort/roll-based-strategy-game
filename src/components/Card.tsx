import { GameState, Owner } from "../App";
import type { CardType } from "../types/CardType";

export function Card({
  card,
  interactive,
  gameState,
  onClick,
}: {
  card: CardType;
  interactive: boolean;
  gameState: GameState;
  onClick?: () => void;
}) {
  const faceClasses = `
    flex flex-col justify-center items-center rounded-lg overflow-hidden absolute inset-0 outline-3 -outline-offset-3 outline-double
    shadow-lg backface-hidden transition-all duration-1000
    ${interactive ? `group-hover:shadow-lg` : `` /* Add visual feedback on hover */}
    ${gameState === GameState.CardsPicked && (!card.selected || card.owner !== Owner.Game) ? "grayscale" : "" /* Change visability depending on gameState */}
    `;

  return (
    <button
      type="button"
      disabled={!interactive}
      title={card.name}
      className={`
        ${interactive ? `cursor-pointer scale-100 hover:scale-125 hover:z-999!` : ``}
        ${interactive && gameState !== GameState.SelectCards ? `hover:rotate-6` : ``}
        ${(card.selected && gameState !== GameState.CardsPicked && card.owner === Owner.Player) || (card.selected && gameState === GameState.CardsPicked && card.owner === Owner.Game) ? "-top-8 z-999!" : "top-0" /* Highlight the card when it is selected */}
        ${card.visible ? "" : "rotate-y-180!" /* Reveal card value if visible */}
        group flex flex-col relative font-bold aspect-2/3 w-24 rotate-y-0 backface-visible transform-3d transition-all duration-500 z-0
        `}
      onClick={onClick}
    >
      {/* Card Front */}
      <span className={`${faceClasses} bg-white`} style={{ outlineColor: card.color }}>
        <span className="h-1/2 flex items-center justify-center w-full">{card.icon}</span>
        <span className="p-4 h-1/2 flex items-center justify-center text-white w-full" style={{ backgroundColor: card.color }}>{card.visible ? card.name : "?"}</span>
      </span>

      {/* Card Back */}
      <span className={`${faceClasses} outline-white/25! bg-slate-500 text-white rotate-y-180`}>
        <span>⁉️</span>
      </span>
    </button>
  );
}
