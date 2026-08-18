import type { LogType } from "../types/LogType";

export function LogList({
  items,
}: {
  items: LogType[],
}) {
  return (
    <div>
      <ul className="">
        {items.map((item, index) => (
          <li key={ index }>{ item.playerCard.icon } { item.playerCard.name } + { item.actionCard.icon} { item.actionCard.name }</li>
        ))}
      </ul>
    </div>
  );
}
