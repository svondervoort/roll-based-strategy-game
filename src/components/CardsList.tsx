import type { GamePhase } from "../App";
import { Owner } from "../App";
import type { CardType } from "../types/CardType";

import { Card } from "./Card";

export enum CardsListStyle {
  Stacked = "stacked",
  
}

export function CardsList({
  title,
  owner,
  cards,
  interactive,
  gamePhase,
  onClick,
}: {
  title: string,
  owner: Owner,
  cards: CardType[];
  interactive: boolean;
  gamePhase: GamePhase;
  onClick?: (card: CardType) => void;
}) {
  return (
    <div>
      <h2 className="mb-4">{ title }</h2>
      <div className={`
          flex flex-wrap perspective-midrange
          ${ owner === Owner.Game ? "" : "gap-2" }
        `}>
        {cards.map((card, i) => (
          <div key={card.id} className={`
            ${ i !== 0 && owner === Owner.Game ? "-ms-22" : "" }
          `}>
            <Card card={card} interactive={interactive} gamePhase={gamePhase} onClick={ () => onClick?.(card) }></Card>
          </div>
        ))}
      </div>
    </div>
  );
}
