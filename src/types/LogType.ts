import type { CardType } from "./CardType";

export type LogType = {
  id: string;
  timestamp: Date,
  playerCard: CardType;
  movementCard: CardType;
  actionCard: CardType;
};
