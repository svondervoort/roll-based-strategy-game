import type { LogType } from "../types/LogType";

export function LogList({
  items,
}: {
  items: LogType[],
}) {
  return (
    <div>
      <ul className="flex flex-col gap-1">
        {items.map((item, index) => (
          <li key={ index } className="flex gap-4 items-center border-b border-gray-500 p-1">
              <div className="size-8 flex items-center justify-center" style={{ backgroundColor: item.playerCard.color }}>{ item.playerCard.icon }</div>
              <div>{ item.movementCard.icon} { item.movementCard.name }</div>
              <div>{ item.actionCard.icon} { item.actionCard.name }</div>
            </li>
        ))}
      </ul>
    </div>
  );
}
