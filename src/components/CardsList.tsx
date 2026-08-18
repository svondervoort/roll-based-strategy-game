import { Card } from "./Card";
import type { CardType } from "../types/CardType";

export function CardsList({
  title,
  cards,
  interactive,
  gameState,
  onClick,
}: {
  title: string,
  cards: CardType[];
  interactive: boolean;
  gameState: string;
  onClick?: (card: CardType) => void;
}) {
  return (
    <div>
      <h2>{ title }</h2>
      <div className="flex flex-wrap gap-2 perspective-midrange">
        {cards.map((card) => (
          <Card key={card.id} card={card} interactive={interactive} gameState={gameState} onClick={ () => onClick?.(card) }></Card>
        ))}
      </div>
    </div>
  );
}
