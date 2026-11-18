import type { CardType } from "./CardType";
import type { PlayerType } from "./PlayerType";

export type LogType = {
  id: string;
  timestamp: Date;
  attacker: PlayerType;
  target: PlayerType;
  movementCard: CardType;
  actionCard: CardType;
};
