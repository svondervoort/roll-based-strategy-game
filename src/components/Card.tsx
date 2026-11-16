import { GamePhase, Owner } from "../App";
import type { CardType } from "../types/CardType";

export function Card({
  card,
  interactive,
  gamePhase,
  onClick,
}: {
  card: CardType;
  interactive: boolean;
  gamePhase: GamePhase;
  onClick?: () => void;
}) {
  const faceClasses = `
    flex flex-col justify-center items-center rounded-lg overflow-hidden absolute inset-0
    shadow-lg backface-hidden transition-all duration-1000
    ${interactive ? `group-hover:shadow-lg` : `` /* Add visual feedback on hover */}
    ${(gamePhase === GamePhase.AiAction || gamePhase === GamePhase.PlayerAction) && (!card.selected || card.owner !== Owner.Game) ? "grayscale" : "" /* Change visability depending on gamePhase */}
    `;

  return (
    <button
      type="button"
      disabled={!interactive}
      title={card.name}
      className={`
        ${interactive ? `cursor-pointer scale-100 hover:scale-125 hover:z-999!` : ``}
        ${interactive && gamePhase !== GamePhase.Planning ? `hover:rotate-6` : ``}
        ${(card.selected && gamePhase !== GamePhase.AiAction && gamePhase !== GamePhase.PlayerAction && card.owner === Owner.Player) || (card.selected && (gamePhase === GamePhase.AiAction || gamePhase === GamePhase.PlayerAction) && card.owner === Owner.Game) ? "-top-8 z-999!" : "top-0" /* Highlight the card when it is selected */}
        ${card.visible ? "" : "rotate-y-180!" /* Reveal card value if visible */}
        group flex flex-col relative font-bold aspect-2/3 w-32 rotate-y-0 backface-visible transform-3d transition-all duration-500 z-0
        `}
      onClick={onClick}
    >
      {/* Card Front */}
      <span className={`${faceClasses} bg-amber-50`}>
        <span className="absolute inset-s-2 inset-y-2 w-6 border-2 border-r-0 border-slate-900/50 rounded-s"></span>
        <span className="absolute inset-e-2 inset-y-2 w-6 border-2 border-l-0 border-slate-900/50 rounded-e"></span>
        <span className="absolute top-1 inset-x-8 text-[10px] uppercase text-slate-900/50 leading-tight overflow-hidden whitespace-nowrap text-ellipsis">
          {card.visible ? card.type : "?"}
        </span>
        <span
          className="h-1/2 flex items-center justify-center w-full text-4xl"
          style={{ backgroundColor: card.color }}
        >
          {card.icon}
        </span>
        <span className="p-4 h-1/2 flex items-center justify-center text-slate-900/50 w-full">
          {card.visible ? card.name : "?"}
        </span>
      </span>

      {/* Card Back */}
      <span className={`${faceClasses} bg-amber-50 rotate-y-180 text-4xl`}>
        <span>⁉️</span>
      </span>
    </button>
  );
}
