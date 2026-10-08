import type { Owner } from "../App";

export enum CardKind {
  Default = "default",
  Color = "color",
  Movement = "movement",
  Action = "action",
}



export type CardType = {
  id: string;
  icon: string;
  name: string;
  color: string;
  type: CardKind;
  owner: Owner,
  visible: boolean;
  selected: boolean;
};
