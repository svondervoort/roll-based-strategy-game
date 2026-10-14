import type { LogType } from "../types/LogType";

import { timeFormatter } from "../helpers/Helpers";

export function LogList({
  items,
}: {
  items: LogType[],
}) {
  return (
    <div className="flex flex-col shrink min-h-0">
      <h2 className="p-4 mb-0 shrink-0">Log</h2>
      <ul className="flex flex-col gap-1 overflow-x-hidden overflow-y-auto min-h-0">
        {items.map((item, index) => (
          <li key={ index } className="flex flex-col border-b border-gray-500">
              <div className="flex gap-4 items-center px-4 py-1">
                <div className="size-8 flex items-center justify-center rounded-lg shrink-0" style={{ backgroundColor: item.playerCard.color }}>{ item.playerCard.icon }</div>
                {/* <div className="grow-1 w-1/2">{ item.movementCard.icon} { item.movementCard.name }</div> */}
                <div className="grow-1 w-1/2">{ item.actionCard.icon} { item.actionCard.name }</div>
              </div>
              <small className="text-gray-500 px-4 py-1">{ timeFormatter.format(item.timestamp) }</small>
            </li>
        ))}
      </ul>
    </div>
  );
}
