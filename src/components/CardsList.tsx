import type { GameState } from "../App";
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
  gameState,
  onClick,
}: {
  title: string,
  owner: Owner,
  cards: CardType[];
  interactive: boolean;
  gameState: GameState;
  onClick?: (card: CardType) => void;
}) {
  return (
    <div>
      <h2>{ title }</h2>
      <div className={`
          flex flex-wrap perspective-midrange
          ${ owner === Owner.Game ? "" : "gap-2" }
        `}>
        {cards.map((card, i) => (
          <div key={card.id} className={`
            ${ i !== 0 && owner === Owner.Game ? "-ms-22" : "" }
          `}>
            <Card card={card} interactive={interactive} gameState={gameState} onClick={ () => onClick?.(card) }></Card>
          </div>
        ))}
      </div>
    </div>
  );
}
