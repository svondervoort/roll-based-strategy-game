export enum PlayerKind {
  User = "user",
  AI = "ai",
}

export type PlayerType = {
  id: string;
  icon: string;
  name: string;
  color: string;
  hp: number;
  maxHp: number;
  kind: PlayerKind;
};
